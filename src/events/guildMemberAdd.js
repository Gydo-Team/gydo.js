const Util = require('../utils/util');

/**
 * Event for when a memeber leaves, and sends a message if specified
 */
class guildMemberAdd {
    /**
     * Detects 'guildMemberAdd' Event
     * @param {string} channel
     * @param {string} message
     * @param {Client} client
     */
    constructor(channel, message, client) {
        if(client === null) throw new Error('Client Parameter has no Value')
        
        if(!message) throw new Error(`NO_LEAVE_MESSAGE_GIVEN`)
        this.message = message
            
        if(!channel) throw new Error(`NO_LEAVE_MESSAGE_CHANNEL`);
        this.channel = channel
    
        client.on('guildMemberAdd', member => {
            const welcomeChannel = member.guild.channels.cache.get(this.channel);
                
            const welcome = this.message
            .replaceAll("{member-tag}", member.user.tag)
            .replaceAll("{member}", Util.mention(member.user.id, "user"))
            .replaceAll("{guildname}", member.guild.name)
            .replaceAll("{member-id}", member.user.id)
            .replaceAll("{guild-member-count}", member.guild.memberCount)
                
    
            welcomeChannel.send(`${welcome}`)
        });
    }
}

module.exports = guildMemberAdd;