'use strict';

/**
 * Event for a when Message is Updated
 */
class MessageUpdate {
    /**
     * Message Update Event
     * @param {string|Channel} channel
     * @param {string} message
     */
    constructor(channel, message, client) {
        if(client === null) throw new Error('Client Parameter cannot be null or undefined')
        
        if(!channel) throw new Error(`Channel cannot be empty`);
        if(!message) throw new Error(`Message cannot be empty`);
        if(typeof message !== 'string') throw new TypeError('Message NOT a string');
        
        this.messsage = message;
        this.channel = channel;
        
        client.on('messageUpdate', async (oldMessage, newMessage) => {
            const msgUpdateChannel = oldMessage.guild.channels.cache.get(channel);
            
            const code = message
            .replaceAll('$[oldMessage]', oldMessage.content)
            .replaceAll('$[newMessage]', newMessage.content)
            .replaceAll('$[author.id]', oldMessage.author.id)
            .replaceAll('$[author.tag]', oldMessage.author.tag)
            .replaceAll('$[author]', oldMessage.author)
            .replaceAll('$[channel]', oldMessage.channel)
            
            if(oldMessage.content === newMessage.content) return;
            
            await msgUpdateChannel.send({
                content: code
            });
        });
    }
    
    toJSON() {
        return {
            message: this.message,
            channel: this.channel,
        };
    }
}

module.exports = MessageUpdate;