const guildMemberAdd = require("../events/guildMemberAdd");
const guildMemberRemove = require("../events/guildMemberRemove");
const MessageUpdate = require('../events/MessageUpdate');

/**
 * Base Class of the Class Bot, all events goes here
 */
class BaseBot {
    /** 
     * Initiate the Bot
     * @param {Client} client
     */
    constructor(client) {
        if(client === null) throw new Error('Client Parameter cannot be null or undefined');
        
        this.client = client;
    }
    
    /**
     * A Welcome Message (guildMemberAdd Event)
     * Requires a channel id to return the message
     * @param {string} options.channel
     * @param {string} options.message
     * @example bot.guildMemberAdd({
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
     * @param {string} options.channel
     * @param {string} options.message
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
        new MessageUpdate({
            channel: options.channel,
            message: options.message
        });
    }
    
    toJSON() {
        return this.client.toJSON();
    }
}

module.exports = BaseBot;