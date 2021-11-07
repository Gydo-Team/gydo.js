'use strict';

const discord = require('discord.js');
const { Intents, Client, MessageEmbed, Constants, Collection } = require("discord.js");
const intents = new Intents();
const client = require('../utils/client');
const fs = require("fs");
const chalk = require("chalk");

const { commands, embeds } = require('../Collections');
client.botprefix = new Collection();

const Interpreter = require("./interpreter");
const { ApplicationCommandOptionTypes } = Constants;
const ActivityManager = require("../managers/ActivityManager");
const SlashCommandManager = require('../managers/SlashCommandManager');
const EventsManager = require('../managers/EventsManager');
const BaseBot = require('./BaseBot');

/**
 * Available options for your Bot
 * @typedef {Object} BotOptions
 * @property {string} token - The token of the Bot, required to initiate the Bot
 * @property {string} prefix - Prefix of the Bot
 * @property {boolean} [logEvents] - If you want gydo to log events
 */

/**
 * Bot/Client class for Discord Bots
 * @extends {BaseBot}
 */
class Bot extends BaseBot {
    /**
     * Simple and needed setup to start the bot
     * @param {BotOptions} options
     * @example
     * // Example
     * const gydo = require("gydo.js");
     * const bot = new gydo.Bot({ 
     *     token: "TOKEN",
     *     prefix: "!"
     * });
     */
    constructor (options) {
        super(client);
        const { token, prefix } = options;
        
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
        
        /**
         * Whether the Events should be logged or not 
         * @type {boolean}
         */
        this.wantLogged = options.logEvents ? true : false;
        
        client.login(token);
        client.on('ready', async (c) => {
            if (!options.logEvents || options.logEvents !== false) {
                console.log(chalk.red(`Bot is Ready! | Logged in as ${c.user.tag}`));
            }
            
            /** 
             * Bot's token
             * Never share your bot's token with anyone!
             * @type {?string}
             * @readonly
             */
            Object.defineProperty(this, 'token', { value: token, writable: false });
            
            /** 
             * Client's User Tag
             * @type {?string}
             * @readonly
             */
            this.tag = c.user?.tag ?? null;
                
            /**
             * Bot Websocket Ping in Miliseconds 
             * @type {?number}
             * @readonly
             */
            this.ping = c.ws.ping ?? null;
                
            /** 
             * Bots ID
             * @type {?Snowflake}
             * @readonly
             */
            this.id = c.user?.id ?? null;
        });
        
        /**
         * Manages the Presence of your Discord Bot
         * @type {ActivityManager}
         */
        this.activity = new ActivityManager(this);
        
        /**
         * Manages your Slash Commands
         * @type {SlashCommandManager}
         */
        this.slashCommand = new SlashCommandManager(client);
        
        /**
         * Manual Events Managing
         * @type {EventsManager}
         */
        this.events = new EventsManager();
    }
    
    /**
     * Command Options for a message command
     * @typedef {Object} ICommand
     * @param {string} name - Name of the Command
     * @param {string} code - Code of the Command
     * @param {boolean} [messageReply] - Optional property if you want the bot to reply to the message author
     * @param {boolean} [sendTyping] - If you want the bot to send the message typing
     */

    /**
     * Sets a new command for the bot
     * @param {ICommand} commandOptions
     * @example
     * bot.cmd({
         name: 'ping',
         code: 'pong!'
     })
     */
    cmd(commandOptions) {
        /**
         * Name of your commands, if any.
         * @type {?string}
         */
        this.cmdname = commandOptions.name;
        
        if(!commandOptions.name) throw new Error(`CMD_NAME_EMPTY`)

        if(!commandOptions.code) throw new Error(`CMD_CODE_EMPTY`)

        if(typeof commandOptions.name !== 'string') throw new TypeError(`CMD_NAME_NOT_STRING`)
        if(typeof commandOptions.code !== 'string') throw new TypeError(`CMD_CODE_NOT_STRING`)

        commands.set(commandOptions.name, { ...commandOptions });
    }

    /**
     * Listens/Detects for Message Creation, and Detects the command, if any.
     */
    MessageDetect() {
        new Interpreter(client, [
            commands,
            embeds
        ]);
    }
}

module.exports = Bot;