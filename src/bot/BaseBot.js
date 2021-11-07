const guildMemberAdd = require("../events/guildMemberAdd");
const guildMemberRemove = require("../events/guildMemberRemove");
const MessageUpdate = require('../events/MessageUpdate');
const guildBanAdd = require('../events/guildBanAdd');

const { Client } = require('discord.js');

/**
 * @typedef {Object} GuildMemberEventsOptions
 * @property {string} message - Message for when a `guildMember` event is received
 * @property {string} channel - The Channel to send the Message
 */

/**
 * Base Class of/for the Bot Class, all events goes here
 */
class BaseBot {
    constructor(client) {
        if(!client instanceof Client || !client) throw new Error('Client Parameter cannot be null or undefined');
    
        /**
         * Client to manage things on
         * @type {Client}
         * @private
         */
        this.client = client;
    }
    
    /**
     * A Welcome Message (guildMemberAdd Event)
     * Requires a channel id to return the message
     * @param {GuildMemberEventsOptions} options
     * @example 
     * bot.guildMemberAdd({
         channel: "1234567891011",
         message: "$[member] Welcome!"
     })
     */ 
    guildMemberAdd(options = {}) {
        const channel = Object.defineProperty(options, 'channel', { writable: true });
        const message = Object.defineProperty(options, 'message', { writable: true });
        
        new guildMemberAdd(channel, message, this.client);
    }
    
    /**
     * A leave message (guildMemberRemove Event)
     * @param {GuildMemberEventsOptions} options
     * @example bot.guildMemberAdd({
         channel: "1234567891011",
         message: "Sad to see you leave $[member.tag].."
     })
     */ 
    guildMemberRemove(options = {}) {
        const channel = Object.defineProperty(options, 'channel', { writable: true });
        const message = Object.defineProperty(options, 'message', { writable: true });
        
        new guildMemberRemove(channel, message, this.client);
    }
    
    /**
     * Executes the command if any when a message is updated
     * @param {Channel|string} options.channel
     * @param {Message|string} options.message
     */
    MessageUpdate(options = {}) {
        new MessageUpdate(options.channel, options.message, this.client);
    }
    
    /**
     * Error Callback
     * @callback ClientError
     * @param {Error} err
     */
    
    /**
     * When a client error occurs, the callback will be called
     * @param {ClientError} callback
     */
    onError(callback) {
        if (typeof callback !== 'function') throw new Error('First Argument is not a function.');
        
        this.client.on('error', (err) => callback(err));
    }
    
    /**
     * Ready State Callback
     * @callback {BotReady}
     * @param {Client} client
     */
     
    /**
     * Will get called when the Bot is Ready
     * @param {BotReady} cb
     */
    onReady(cb) {
        if (typeof cb !== 'function') throw new Error('First Argument is not a function.');
        
        this.client.on('ready', (c) => cb(c));
    }
    
    /**
     * Listens for when a member is banned from a server
     * @param {string} channel
     * @param {string} message
     */
    guildBanAdd(channel, message) {
        guildBanAdd(this.client, channel, message);
    }
    
    toJSON() {
        return this.client.toJSON();
    }
}

module.exports = BaseBot;