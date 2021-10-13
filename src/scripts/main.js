'use strict';
const discord = require('discord.js');
const { Intents, Client, MessageEmbed, Constants, Collection } = require("discord.js");
const intents = new Intents();
const client = require('../utils/client');
const fs = require("fs");
const chalk = require("chalk");

client.commands = new Collection();
client.cmdcode = new Collection();
client.botprefix = new Collection();
client.slashName = new Collection();
client.slashCode = new Collection();
client.slashEphemeral = new Collection();
client.cmdreply = new Collection();
client.cmds = new Collection();

const guildMemberAdd = require("../events/guildMemberAdd");
const guildMemberRemove = require("../events/guildMemberRemove");
const Interpreter = require("./interpreter");
const { Message, Presence, Channel, User, GuildMember, Role } = require("discord.js");
const { ApplicationCommandOptionTypes } = Constants;
const ActivityManager = require("../managers/ActivityManager");
const SlashCommandManager = require('../managers/SlashCommandManager');
const SaveEmbed = require('../utils/embed');
const MessageUpdate = require('../events/MessageUpdate');
const EventsManager = require('../managers/EventsManager');

class config {
    /**
     * 
     * Simple and needed setup to start the bot
     * @param {string} options.token
     * @param {string} options.prefix
     * @param {boolean} logEvents If you want to log the events on what ks happening on the bot
     * @example
     * // Example
     * const gydo = require("gydo.js-dev");
     * const bot = new gydo.config({ 
     *     token: "TOKEN",
     *     prefix: "!"
     * });
     */
    constructor (options = {}) {
        // const { token, prefix, logEvents } = options;
        
        const { token, prefix, logEvents } = Object.defineProperties(options, {
            token: {
                writable: true,
            },
            prefix: {
                writable: true,
            },
            logEvents: {
                writable: true,
            },
        });
        
        if(!token) throw new Error(`INVALID_TOKEN`);

        if(!prefix) throw new Error(`No Prefix Given!`);
        
        if(typeof token !== 'string') throw new TypeError(`Token must be a string!`);
        if(typeof prefix !== 'string') throw new TypeError(`Prefix NOT a string`)

        /** 
         * Bot's prefix
         * @type {string}
         */
        this.prefix = prefix;

        client.botprefix.set("prefix", this.prefix)
        
        let wantLogged = logEvents ? true : false;

        client.login(token);
        client.once('ready', async () => {
            if (wantLogged === true || !wantLogged) console.log(chalk.red(`Bot is Ready! | Logged in as ${client.user.tag}`));
            
            /** 
             * Bot's token
             * Never share your bot's token with anyone!
             * @type {?string}
             * @private
             */
            this.token = token;
            
            /** 
             * Client's User Tag
             * @readonly
             */
            this.tag = client.user?.tag ?? null;
                
            /**
             * Bot Websocket Ping in Miliseconds 
             * @type {?number}
             * @readonly
             */
            this.ping = client.ws.ping ?? null;
                
            /** 
             * Bots ID
             * @type {?Snowflake}
             * @readonly
             */
            this.id = client.user?.id ?? null;
        });
        
        /**
         * Activity of your Discord Bot
         * @type {ActivityManager}
         */
        this.activity = new ActivityManager(wantLogged);
        
        /**
         * Slash Commands
         * @type {SlashCommandManager}
         */
        this.slashCommand = new SlashCommandManager();
        
        /**
         * Events Manager for manual Events Managing
         * @type {EventsManager}
         */
        this.events = new EventsManager();
    }
    
    /**
     * A Welcome Message (guildMemberAdd Event)
     * Requires a channel id to return the message
     * @param {string} options.channel
     * @param {string} options.message
     * @example bot.guildMemberAdd({
         channel: "1234567891011",
         message: "{member} Welcome!"
     })
     */ 
    guildMemberAdd(options = {}) {
        const channel = Object.defineProperty(options, 'channel', { writable: true });
        const message = Object.defineProperty(options, 'message', { writable: true });
        
        new guildMemberAdd(channel, message, client);
    }
    
    /**
     * A leave message (guildMemberRemove Event)
     * @param {string} options.channel
     * @param {string} options.message
     * @example bot.guildMemberAdd({
         channel: "1234567891011",
         message: "Sad to see you leave {member}.."
     })
     */ 
    guildMemberRemove(options = {}) {
        const channel = Object.defineProperty(options, 'channel', { writable: true });
        const message = Object.defineProperty(options, 'message', { writable: true });
        
        new guildMemberRemove(channel, message, client);
    }
    
    /**
     * Executes the command if any when a message is updated
     * @param {Channel|string} options.channel
     * @param {Message|string} options.message
     */
    MessageUpdate(options = {}) {
        new MessageUpdate({
            channel: options.channel,
            message: options.message
        });
    }

    /**
     * Sets a new command for the bot
     * @param {string} commandOptions.name
     * @param {string} commandOptions.code
     * @param {string} [commandOptions.messageReply]
     * @example
     * bot.cmd({
         name: 'ping',
         code: 'pong!'
     })
     */
    cmd(commandOptions = {}) {
        /**
         * Shows the commands you have put, if there is one
         * @type {?string}
         */
        this.cmdname = commandOptions.name;
        
        if(!commandOptions.name) throw new Error(`CMD_NAME_EMPTY`)

        if(!commandOptions.code) throw new Error(`CMD_CODE_EMPTY`)

        if(typeof commandOptions.name !== 'string') throw new TypeError(`CMD_NAME_NOT_STRING`)
        if(typeof commandOptions.code !== 'string') throw new TypeError(`CMD_CODE_NOT_STRING`)

        client.commands.set(commandOptions.name, commandOptions.name);
        client.cmdcode.set(commandOptions.name, commandOptions.code);
        client.cmdreply.set(commandOptions.name, commandOptions.messageReply);
    }

    /**
     * Detects the command, if any.
     */
    MessageDetect() {
        new Interpreter(client);
    }
    
    /**
     * When a client error occurs, the callback will be called
     */
    onError(callback) {
        client.on('error', (err) => callback(err));
    }
    
    toJSON() {
        return client.toJSON();
    }
}

module.exports = config;