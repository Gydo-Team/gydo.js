const { commands } = require('../Collections');

/** 
 * Bans the user if specified
 */
const ban = async (client, code, author, args, message, currentCommand) => {
    if(code === null) return;
    
    // Gets the Code and turns in to a String
    // Seperating it also from the original code
    const rawCode = await commands.get(currentCommand)?.code?.toString();
    
    let m;
    await rawCode
    .replaceAll(`$[ban;`, (match) => {
        m += `${match}`;
    });
    
    if(!m) return code;
    let argTarget = rawCode
    .split('$[ban;')[1].split("]")[0];
    
    if(!argTarget) return code;

    const res = await code
    .replace(`$[ban;${argTarget}]`, '');

    const ban = await message.guild.members.ban(args[argTarget]).catch(err => {
        return message.channel.send(":x: An Error Occured while trying to ban the user (try checking if the bot has the permission to ban)");
    });

    if(ban) return res
    else return null
}

module.exports = ban;