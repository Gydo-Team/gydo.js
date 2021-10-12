'use strict';

const client = require('../utils/client');
const { Channel, Base } = require('discord.js');

/**
* Event for a when Message is Updated
* @extends {Base}
*/
class MessageUpdate extends Base {
    /**
    * Message Update Event
    * @param {string|Channel} channel
    * @param {string} message
    */
    constructor({ channel, message }) {
        super(client);
        
        if(!channel) throw new Error(`Channel cannot be empty`);
        if(!message) throw new Error(`Message cannot be empty`);
        if(typeof message !== 'string') throw new TypeError('Message NOT a string');
        
        this.messsage = message;
        this.channel = channel;
        
        client.on('messageUpdate', async (oldMessage, newMessage) => {
            const msgUpdateChannel = oldMessage.guild.channels.cache.get(channel);
            
            const code = message
            .replaceAll('{oldMessage}', oldMessage.content)
            .replaceAll('{newMessage}', newMessage.content)
            .replaceAll('{message.author.id}', oldMessage.author.id)
            .replaceAll('{message.author.tag}', oldMessage.author.tag)
            .replaceAll('{message.author.mention}', oldMessage.author)
            .replaceAll('{message.channel}', oldMessage.channel)
            
            if(oldMessage.content === newMessage.content) return;
            
            await msgUpdateChannel.send({
                content: code
            });
        });
    }
    
    /**
    * @returns {JSON}
    */
    toJSON() {
        return super.toJSON({
            message: this.message,
            channel: this.channel,
        });
    }
}

module.exports = MessageUpdate;