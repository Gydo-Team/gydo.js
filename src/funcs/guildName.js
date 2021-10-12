/**
 * Name of the Guild the Message was sent on
 */
const guildName = async (client, code, author, args, message) => {
    if (code === null) return;
    
    const res = code.replaceAll("$[guildName]", message.guild.name)
    
    return res;
}

module.exports = guildName;