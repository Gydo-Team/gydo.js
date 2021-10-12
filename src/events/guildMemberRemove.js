/**
 * Event for when a memeber leaves, and sends a message if specified
*/
class guildMemberRemove {
    /**
     * Detects 'guildMemberRemove' Event
     * @param {string} channel
     * @param {string} message
     * @param {Client} client
     */
    constructor(channel, message, client) {
        if(client === null) throw new Error('Client Parameter has no Value')
        
        if(!message) throw new Error(`NO_LEAVE_MESSAGE_GIVEN`);
            this.message = message;
            
        if(!channel) throw new Error(`NO_LEAVE_MESSAGE_CHANNEL`);
        this.channel = channel;
            
        if(this.message == null) return
        if(this.channel == null) return
    
        client.on('guildMemberRemove', member => {
            const leaveChannel = member.guild.channels.cache.get(this.channel)
                
            const message = this.message
            .replaceAll("{member-tag}", member.user.tag)
            .replaceAll("{member-id}", member.user.id)
            .replaceAll("{guildname}", member.guild.name)
                
            leaveChannel.send(`${message}`)
        });
    }
}

module.exports = guildMemberRemove;