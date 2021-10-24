'use strict';

const discord = require('discord.js');
const { Intents, Client, MessageEmbed, Constants, Collection } = require("discord.js");
const intents = new Intents();
const client = require('../utils/client');
const fs = require("fs");
const chalk = require("chalk");

client.commands = new Collection();
client.cmdcode = new Collection();
client.cmdTyping = new Collection();
client.botprefix = new Collection();
client.slashName = new Collection();
client.slashCode = new Collection();
client.slashEphemeral = new Collection();
client.cmdreply = new Collection();
client.cmds = new Collection();

const Interpreter = require("./interpreter");
const { ApplicationCommandOptionTypes } = Constants;
const ActivityManager = require("../managers/ActivityManager");
const SlashCommandManager = require('../managers/SlashCommandManager');
const SaveEmbed = require('../utils/embed');
const EventsManager = require('../managers/EventsManager');
const BaseBot = require('./BaseBot');

/**
 * Bot/Client class for Discord Bots
 * @extends {BaseBot}
 */
class Bot extends BaseBot {
    /**
     * Simple and needed setup to start the bot
     * @param {string} options.token
     * @param {string} options.prefix
     * @param {boolean} options.logEvents If you want to log the events on what is happening on the bot
     * @example
     * // Example
     * const gydo = require("gydo.js-dev");
     * const bot = new gydo.Bot({ 
     *     token: "TOKEN",
     *     prefix: "!"
     * });
     */
    constructor (options = {}) {
        super(client);
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
            if (wantLogged !== false) console.log(chalk.red(`Bot is Ready! | Logged in as ${client.user.tag}`));
            
            /** 
             * Bot's token
             * Never share your bot's token with anyone!
             * @type {?string}
             * @readonly
             */
            Object.defineProperty(this, 'token', { value: token });
            
            /** 
             * Client's User Tag
             * @type {?string}
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
        this.activity = new ActivityManager(this);
        
        /**
         * Slash Commands
         * @type {SlashCommandManager}
         */
        this.slashCommand = new SlashCommandManager(client);
        
        /**
         * Events Manager for manual Events Managing
         * @type {EventsManager}
         */
        this.events = new EventsManager();
        
        /**
         * The Raw Properties of the bot that is currently running. Meaning the not simplified Client that is currently running, if any
         * @type {Client}
         */
        this.botClient = client;
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
        client.cmdTyping.set(commandOptions.name, commandOptions.sendTyping);
    }

    /**
     * Detects the command, if any.
     */
    MessageDetect() {
        new Interpreter(client);
    }
}

module.exports = Bot;