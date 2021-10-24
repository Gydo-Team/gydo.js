"use strict";

const { MessageEmbed, Client } = require("discord.js");
const fs = require('fs');
const path = require('path');

/** 
 * Message Event Interpreter 
 * Detects the messages and see if
 * it matches the command you made
 */
class interpreter {
    /**
     * Interpreter
     * @param {Client} client - The Current Client that's running
     */
    constructor(client) {
        if(!client instanceof Client || !client) throw new Error('Client Parameter has no value');
                
        client.on('messageCreate', async (message) => {
            const getPref = client.botprefix.get("prefix");
            const s = getPref ? getPref : prefix;
            
            const prefix = `${s}`;
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            
            // Raw Code
            const h = client.cmdcode.get(command);
            
            const cmdName = client.commands.get(command)
            if(!message.content.startsWith(prefix)) return;
            if(message.author.bot) return;
            
            const code = `${h}`
            this.code = code;
            this._author = message.author;
            this.args = args;
            this._message = message;
            this.currentCommand = cmdName;
                
            this.res = code;
            
            // Start the Interpreter
            await this._startInterpreter(client, message.author, args, message, cmdName);
            let res = await this.res;
            let EmbedResult = await this._getEmbed(client, command);
                
            const isReply = await this._isReply(cmdName, client);
            const sendTyping = await client.cmdTyping.get(cmdName);
        
            // Sending the Message
            try {
                if(command === cmdName) {
                    if(this.res === null) return;
                    
                    if(isReply === false || !isReply && !sendTyping) {
                        await message.channel.send({
                            content: res,
                            embeds: EmbedResult,
                        });
                    } else if(isReply === true && !sendTyping) {
                        await message.reply({
                            content: res,
                            embeds: EmbedResult,
                        });
                    } else if (sendTyping) {
                        await message.channel.sendTyping();
                        await message.channel.send({
                            content: res,
                            embeds: EmbedResult,
                        });
                    } else if (sendTyping && isReply === true) {
                        await message.channel.sendTyping();
                        await message.reply({
                            content: res,
                            embeds: EmbedResult,
                        });
                    }
                }
            } catch (err) {
                // If error occurs, throw the Error
                throw err;
            }
        });
    }
    
    /** 
     * Gets the Embed of the command, if there is one
     * @param {Client} client The Client you are running
     * @param {string} command The name of the command
     * @returns {MessageEmbed[]|null}
     * @private
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
            
        let EmbedRaw = new MessageEmbed();
            
        if (
            RawEmbedTitle !== undefined && 
            RawEmbedDescription !== undefined
        ) {
            if (RawEmbedTitle) EmbedRaw.setTitle(RawEmbedTitle.toString());
            
            if (RawEmbedDescription) EmbedRaw.setDescription(RawEmbedDescription.toString());
            
            if (RawEmbedFooter) EmbedRaw.setFooter(RawEmbedFooter.toString());
            
            if (RawEmbedFields) {
                const EmbedFields = RawEmbedFields.map(x => {
                    EmbedRaw.addField(x.name, x.value, x.inline ? x.inline : null);
                });
            }
            
            if (RawEmbedColor) EmbedRaw.setColor(RawEmbedColor.toString());
            
            if (RawEmbedTimestamp && RawEmbedTimestamp == true) EmbedRaw.setTimestamp();
            
            if (RawEmbedAuthor) {
                const AuthorURL = RawEmbedAuthorURL ? RawEmbedAuthorURL.toString() : null;
                
                EmbedRaw.setAuthor(RawEmbedAuthor.toString(), AuthorURL);
            }
            
            return [EmbedRaw];
        } else return [];
    }
    
    /**
     * If wether the command should reply on the message
     * @param {string} command The name of the command
     * @param {Client} client Client you are running
     * @returns {boolean}
     * @private
     */
    _isReply(command, client) {
        let reply = client.cmdreply.get(command);
        
        return reply ? true : false;
    }
    
    /**
     * Starts the Interpreter
     * @param {Client} client
     * @returns {string}
     * @private
     */
    async _startInterpreter(client, author, args, message, currentCommand) {
        const funcs = fs.readdirSync(path.join(__dirname, "../funcs")).filter(file => file.endsWith('.js'));
        
        this.functions = this.code.split("$[");

        const functions = this.functions

        for await (const func of funcs) {
            for (let i = functions.length - 1; i > 0; i--) {
                if (typeof this.res !== 'string') return;
                
                const res = await require(`../funcs/${func}`)(client, this.res, author, args, message, currentCommand, this.code);

                this.res = await res ?? null;
            }
        }
    }
}

module.exports = interpreter;