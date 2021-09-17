'use strict';
const discord = require('discord.js');
const { Intents, Client, MessageEmbed } = require("discord.js");
const intents = new Intents();
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        intents
    ]
});
const fs = require("fs");
const chalk = require("chalk");

client.commands = new discord.Collection();
client.cmdcode = new discord.Collection();
client.botprefix = new discord.Collection();
client.embed = new discord.Collection();
client.slashName = new discord.Collection();
client.slashCode = new discord.Collection();

const guildMemberAdd = require("../events/guildMemberAdd");
const guildMemberRemove = require("../events/guildMemberRemove");
const interpreter = require("./interpreter");
const { Message, Presence, Channel } = require("discord.js");

class config {
    /**
     * 
     * Simple and needed setup to start the bot
     * @param {string} token
     * @param {string} prefix
     * @example
     * // Bot Setup
     * const gydo = require("gydo.js-dev");
     * const bot = new gydo.config({ 
     *     token: "TOKEN",
     *     prefix: "!"
     * });
     */
    constructor ({ token, prefix }) {
        if(!token) throw new Error(`INVALID_TOKEN`);

        if(!prefix) throw new Error(`No Prefix Given!`);
        
        /** 
         * Bot's prefix 
        */
        this.prefix = prefix;
        
        /** 
         * Bot's token
         * Never share your bot's token with anyone!
         * @private
        */
        this.token = token;
        
        if(typeof token !== 'string') throw new Error(`Token must be a string!`);
        if(typeof prefix !== 'string') throw new Error(`PREFIX_NOT_A_STRING`)
        
        client.botprefix.set("prefix", this.prefix)

        client.login(token);
        client.on('ready', async () => {
            console.log(chalk.red(`Bot is Ready! | Logged in as ${client.user.tag}`))
        });

        /**
         * 
         * Bot Websocket Ping in Miliseconds 
         * @returns {number}
         *
         */
        this.ping = client.ws.ping;
    }
    
    /**
     * A Welcome Message (guildMemberAdd Event)
     * Requires a channel id to return the message
     * @param {string} channel
     * @param {string} message
     * @returns {Message}
     * @example bot.guildMemberAdd({
         channel: "1234567891011",
         message: "{member} Welcome!"
     })
    */ 
    guildMemberAdd({ channel, message }) {
        guildMemberAdd(client, channel, message)
    }
    
    /**
     * A leave message (guildMemberRemove Event)
     * @param {string} channel
     * @param {string} message
     * @returns {Message}
     * @example bot.guildMemberAdd({
         channel: "1234567891011",
         message: "Sad to see you leave {member}.."
     })
    */ 
    guildMemberRemove({ channel, message }) {
        guildMemberRemove(client, channel, message)
    }
    
    /** 
     * @typedef {object} ActivityTypes 
     * @property {"PLAYING"|"LISTENING"|"WATCHING"|"COMPETING"|"STREAMING"} type
    */
    
    /**
    * Sets the Status for the Bot
    * @param {string|Presence} status
    * @param {ActivityTypes} type
    * @returns {Presence}
    */
    status(status, { type }) {
        /**
         * Bot's Current Status, if you have set one.
        */
        this.currentStatus = status;
        
        if(!this.currentStatus) throw new Error(`NO_STATUS_GIVEN`)
        
        if(typeof this.currentStatus !== "string") throw new Error('Status not a string')
        
        client.on("ready", async () => {
            client.user.setActivity(this.currentStatus, { type: type })
            await console.log(chalk.blue(`Bot's status set to: ${this.currentStatus}`))
        });
    }

    /**
     * Sets a new command for the bot
     * @param {string} name
     * @param {string} code
     * @returns {Message}
     * @example
     * bot.cmd({
         name: 'ping',
         code: 'pong!'
     })
     */
    cmd({ name, code }) {
        this.cmdname = name;
        
        if(!name) throw new Error(`CMD_NAME_EMPTY`)

        if(!code) throw new Error(`CMD_CODE_EMPTY`)

        if(typeof name !== 'string') throw new TypeError(`CMD_NAME_NOT_STRING`)
        if(typeof code !== 'string') throw new TypeError(`CMD_CODE_NOT_STRING`)

        client.commands.set(name, name);
        client.cmdcode.set(name, code);
    }

    /**
     * Detects the command
     * (Must have the right Intents)
     */
    MessageDetect() {
        interpreter(client);
    }
    
    /**
     * A Loop Status for your Discord Bot
     * @param {string[]} arrayOfStatus
     * @param {number} time
     * @param {ActivityTypes} type
     * @example bot.loopStatus(["Hey!", "Hello!", "!help"], 2000, { type: "PLAYING" })
    */
    loopStatus(arrayOfStatus, time, { type }) {
        // Errors 
        if(!arrayOfStatus) throw new Error(`NO_STATUS_GIVEN`);
        if(!time) throw new Error(`NO_LOOP_MS_TIME_GIVEN`);
        if(!type) throw new Error(`NO_STATUS_TYPE_GIVEN`)
        
        if(typeof time !== 'number') throw new TypeError(`Time NOT a NUMBER`);
        
        // Sets the Changing Status Loop
        client.on("ready", async () => {
            let index = 0;
            setInterval(() => {
                if(index === arrayOfStatus.length) index = 0;
                const res = arrayOfStatus[index];
                client.user.setActivity(res, { type: type })
                index++;
            }, time);
        });
    }
    
    /** 
     * Adding Intents to your Discord bot
     * @param {Intents} int
     * @returns {Promise<void>}
     * @see {@link https://discordjs.guide/popular-topics/intents.html#privileged-intents}
    */
    addIntents(int) {
        if(!int) throw new TypeError("No Intents Given");
        
        intents.add(int)
    }
    
    /** 
     * Removing Intents to your Discord bot
     * @param {Intents} int 
     * @returns {Promise<void>}
     * @see {@link https://discordjs.guide/popular-topics/intents.html#privileged-intents}
    */
    removeIntents(int) {
        if(!int) throw new TypeError("No Intents Given");
        
        intents.remove(int)
    }
    
    /** 
     * Detect a Slash Command
     * @param {string} slashCommand
    */
    slashCommandDetect(slashCommand) {
        client.on("interactionCreate", async (interaction) => {
            if(!interaction.isCommand()) return;
            
            const { commandName, options } = interaction;
            
            const r = client.slashCode.get(slashCommand);
            const s = `${r}`
            const res = s
            .split(`{ping}`).join(`${client.ws.ping}`)
            
            try {
                if(commandName === slashCommand) {
                    interaction.reply({
                        content: res,
                    });
                }
            } catch (err) {
                console.error(err);
            }
        });
    }
    
    /**
     * @typedef {object} ISlashCMD
     * @property {string} name
     * @property {string} description
     * @property {string} code 
     * @property {string} [guildId]
    */
    
    /** 
     * Discord Slash Commands
     * @param {ISlashCMD} command
    */
    slashCommand(command = { name, description, code, guildId }) {
        if(!command.name) throw new Error(`No Slash Command Name`);
        if(!command.description) throw new Error(`No Slash Command Description`);
        if(!command.code) throw new Error(`No Slash Command Code`);
        
        this._slashName = command.name;
        this._slashDesc = command.description;
        this._slashCode = command.code;
        this._slashGuildId = command.guildId;
        
        client.once('ready', () => {
            const guild = client.guilds.cache.get(command.guildId);

            let commands;
            if(guild) {
                commands = guild.commands;
            } else {
                commands = client.application?.commands;
            }
            
            commands?.create({
                name: this._slashName,
                description: this._slashDesc
            });
        });
        
        client.slashName.set(this._slashName, this._slashName);
        client.slashCode.set(this._slashName, this._slashCode);
    }
}

exports.config = config;