"use strict";

const { MessageEmbed, Client } = require("discord.js");
const fs = require('fs');
const path = require('path');

/** 
 * Interpreter 
 * Detects the messages and see if
 * it matches the command you made
 */
class interpreter {
    /**
     * Interpreter
     * @param {Client} client
     */
    constructor(client, prefix) {
        const getPref = client.botprefix.get("prefix");
        const s = getPref ? getPref : prefix;
        
        if(client === null) throw new Error('Client Parameter has no value');

        client.on("messageCreate", async (message) => {
            const prefix = `${s}`;
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            
            // Raw Code
            const h = client.cmdcode.get(command);
    
            const cmdName = await client.commands.get(command)
            if(!message.content.startsWith(prefix)) return;
            if(message.author.bot) return;
                
            const code = `${h}`
            this.code = code;
            this._author = message.author;
            this.args = args;
            this._message = message;
            this.currentCommand = cmdName;
            
            let argNum;
            let argRes;
            
            if(args.length && args.length > -1 && cmdName != undefined) { 
                argNum = code.split("$[args;")[1].split("]")[0];
    
                argRes = args[argNum];
            } else if (!args.length) {
                argRes = "";
            }
            
            this.res = await code
            .replaceAll(`$[args;${argNum}]`, argRes)
            
            let interpret = await this._startInterpreter(client, message.author, args, message, cmdName);
            let res = await this.res;
            let EmbedResult = await this._getEmbed(client, command);
            if (EmbedResult === null) EmbedResult = [];
            
            const isReply = await this._isReply(command, client);

            // Sending the Message
            try {
                if(command === cmdName) {
                    if(res === null || typeof res !== 'string' && res === undefined) return;
                    
                    if(isReply === false) {
                        await message.channel.send({
                            content: res,
                            embeds: EmbedResult,
                        });
                    } else if(isReply === true) {
                        await message.reply({
                            content: res,
                            embeds: EmbedResult,
                        });
                    } else {
                        await message.channel.send({
                            content: res,
                            embeds: EmbedResult,
                        });
                    }
                }
            } catch (err) {
                console.error(err);
            }
        });
    }
    
    /** 
     * Gets the Embed of the command, if there is one
     * @param {Client} client The Client you are running
     * @param {string} command The name of the command
     * @returns {MessageEmbed[]|null}
     */
    _getEmbed(client, command) {
        // Raw Embed Values
        const RawEmbedTitle = client.embedTitle.get(command);
        const RawEmbedDescription = client.embedDesc.get(command);
        const RawEmbedFooter = client.embedFooter.get(command);
        const RawEmbedFields = client.embedFields.get(command);
        const RawEmbedColor = client.embedColor.get(command);
        const RawEmbedTimestamp = client.embedTimestamp.get(command);
        const RawEmbedAuthor = client.embedAuthor.get(command);
        const RawEmbedAuthorURL = client.embedAuthorURL.get(command);
            
        let EmbedRaw;
        let EmbedResult;
            
        if (RawEmbedTitle != undefined && RawEmbedDescription != undefined) {
            EmbedRaw = new MessageEmbed();
                
            if (RawEmbedTitle) {
                EmbedRaw.setTitle(RawEmbedTitle.toString());
            }   
            
            if (RawEmbedDescription) {
                EmbedRaw.setDescription(RawEmbedDescription.toString());
            }
            
            if (RawEmbedFooter) {
                EmbedRaw.setFooter(RawEmbedFooter.toString());
            }
            
            if (RawEmbedFields) {
                for(let i = 0; i < RawEmbedFields.length; i++) {
                    EmbedRaw.addField(RawEmbedFields[i].name, RawEmbedFields[i].value, RawEmbedFields[i].inline);
                }
            }
            
            if (RawEmbedColor) {
                EmbedRaw.setColor(RawEmbedColor.toString());
            }
            
            if (RawEmbedTimestamp && RawEmbedTimestamp == true) {
                EmbedRaw.setTimestamp();
            }
            
            if (RawEmbedAuthor) {
                let hasAuthorURL;
                if (RawEmbedAuthorURL) {
                hasAuthorURL = RawEmbedAuthorURL.toString();
            } else hasAuthorURL = null;
                EmbedRaw.setAuthor(RawEmbedAuthor.toString(), hasAuthorURL);
            }
            
            return EmbedResult = [EmbedRaw];
        } else { 
            return EmbedResult = [];
        }
    }
    
    /**
     * If wether the command should reply on the message
     * @param {string} command The name of the command
     * @param {Client} client Client you are running
     * @returns {boolean|null}
     */
    _isReply(command, client) {
        let reply = client.cmdreply.get(command);
        
        if (reply === true) {
            return true;
        } else if (reply === false && reply === null) {
            return false;
        } else return null;
    }
    
    /**
     * Starts the Interpreter
     * @param {Client} client
     * @returns {string}
     */
    async _startInterpreter(client, author, args, message, currentCommand) {
        const funcs = fs.readdirSync(path.join(__dirname, "../funcs")).filter(file => file.endsWith('.js'));
        
        this.functions = this.code.split("$");

        const functions = this.functions

        for (const func of funcs) {
            for (let x = functions.length - 1; x > 0; x--) {
                if (typeof this.res !== 'string') return;
                
                const res = await require(`../funcs/${func}`)(client, this.res, author, args, message, currentCommand);

                this.res = await res ?? null;
            }
        }
    }
}

module.exports = interpreter;