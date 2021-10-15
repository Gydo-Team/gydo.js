/**
 * Guild Properties
 */
const guildName = async (client, code, author, args, message) => {
    if (code === null) return;
    
    const res = await code
    // Name of the Guild
    .replaceAll("$[guild.name]", message.guild.name)
    // Member Count of the Guild
    .replaceAll("$[guild.memberCount]", message.guild.memberCount)
    // The ID of the Guild
    .replaceAll("$[guild.id]", message.guild.id)
    // Date of when the bot joined the guild
    .replaceAll("$[guild.botJoinedAt]", message.guild.joinedAt)
    // Description of the Guild, if any
    .replaceAll("$[guild.description]", message.guild.description)
    
    return res;
}

module.exports = guildName;