"use strict";

const { MessageEmbed, Client } = require("discord.js");
const fs = require('fs');
const path = require('path');
const { embeds } = require('../Collections');
const InterpreterError = require('../utils/InterpreterError');

/** 
 * Message Event Interpreter
 * Specifically for gydo.js
 * Detects the messages and see if
 * it matches the command you made
 */
class interpreter {
    constructor(client, collections) {
        if(!client instanceof Client || !client) throw new Error('Client Parameter has no value');
                
        client.on('messageCreate', async (message) => {
            const getPref = client.botprefix.get("prefix");
            const prefix = getPref?.toString();
            
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            
            if(!message.content.startsWith(prefix)) return;
            if(message.author.bot) return;
            
            const {
                cmdName,
                code,
                messageReply,
                sendTyping,
            } = await this.getAllProperties(collections, command);

            this.code = code;
            this._author = message.author;
            this.args = args;
        
            this._message = message;
            this.currentCommand = cmdName;
                
            this.res = code;
            
            // Start the Interpreter
            await this.startInterpreter(client, message.author, args, message, cmdName);
            let res = await this.res;
            const isReply = messageReply ? true : false;
            let EmbedResult = await this._getEmbed(client, command);
        
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
     * Gets all Properties of the command(s) user has created
     * @param {Collection} collections - Collections of Commands and Embeds
     * @param {string} currentCommand - The current command being requested
     * @returns {Object}
     */
    async getAllProperties(collections, currentCommand) {
        const [commands] = collections;
        const cmdProperties = await commands.get(currentCommand);
        const cmdName = cmdProperties?.name;
        const code = `${cmdProperties ? cmdProperties?.code : ''}`
        const messageReply = cmdProperties?.messageReply;
        const sendTyping = cmdProperties?.sendTyping;
        
        return {
            cmdName,
            code,
            messageReply,
            sendTyping,
        }
    }
    
    /** 
     * Gets the Embed of the command, if there is one
     * @param {Client} client - The Client you are running
     * @param {string} command - The name of the command
     * @returns {MessageEmbed[]|null}
     * @private
     */
    _getEmbed(client, command) {
        if(embeds.get(command) === null) return null;
        
        // Raw Embed Values
        const RawEmbed = embeds.get(command);
            
        let EmbedRaw = new MessageEmbed();
        
        // Converts it all to an Embed
        if (
            RawEmbed?.title !== undefined && 
            RawEmbed?.description !== undefined
        ) {
            if (RawEmbed?.title) EmbedRaw.setTitle(RawEmbed?.title?.toString());
            
            if (RawEmbed?.description) EmbedRaw.setDescription(RawEmbed?.description?.toString());
            
            if (RawEmbed?.footer) EmbedRaw.setFooter(RawEmbed?.footer?.toString());
            
            if (RawEmbed?.fields) {
                const EmbedFields = RawEmbed?.fields?.forEach((x) => {
                    EmbedRaw.addField(x.name, x.value, x.inline ? x.inline : false);
                });
            }
            
            if (RawEmbed?.color) EmbedRaw.setColor(RawEmbed?.color?.toString());
            
            if (RawEmbed?.timestamp && RawEmbed?.timestamp === true) EmbedRaw.setTimestamp();
            
            if (RawEmbed?.author) {
                const AuthorURL = RawEmbed?.authorURL ? RawEmbed?.authorURL.toString() : null;
                
                EmbedRaw.setAuthor(RawEmbed?.author?.toString(), AuthorURL);
            }
            
            return [EmbedRaw];
        } 
        
        return [];
    }
    
    /**
     * Starts the Interpreter
     * @param {Client} client
     * @returns {string}
     */
    async startInterpreter(client, author, args, message, currentCommand) {
        const funcs = await fs.readdirSync(path.join(__dirname, "../funcs")).filter(file => file.endsWith('.js'));
        
        /**
         * Array of the things the interpreter needs to work on, if any
         * @type {Array|null}
         * @private
         */
        this.functions = this.code.split("$[");

        const functions = this.functions

        for await (const func of funcs) {
            for (let i = functions.length - 1; i > 0; i--) {
                if (typeof this.res !== 'string') throw new InterpreterError('Code type not string');
                
                const res = await require(`../funcs/${func}`)(client, this.res, author, args, message, currentCommand, this.code);

                this.res = await res ?? null;
            }
        }
    }
}

module.exports = interpreter;