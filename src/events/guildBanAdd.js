/**
 * Handle the `guildBanAdd` event
 * @param {Client} client
 */
function guildBanAdd(client, channel, message) {
    if(!client || client === null) throw new Error('Client parameter cannot be null');
    
    client?.on('guildBanAdd', (ban) => {
        const channel = client?.channels.cache.get(channel);
        
        if(typeof message !== 'string') throw new TypeError('\'message\' needs to be a string');
        
        const code = message
        .replaceAll("$[user]", ban.user)
        .replaceAll("$[user.tag]", ban.user.tag)
        .replaceAll("$[user.id]", ban.user.id)
        .replaceAll("$[guild.name]", ban.guild.name)
        .replaceAll("$[guild.id]", ban.guild.id)
    });
}

module.exports = guildBanAdd;