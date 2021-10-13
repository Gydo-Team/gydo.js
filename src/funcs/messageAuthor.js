const Util = require('../utils/util');
const moment = require('moment');

/**
 * Mentions the author of the message
 */
const messageAuthor = async (client, code, author, args, message) => {
    if (code === null) return;
    
    const userCreatedAt = moment(message.member.user.createdAt).toString().split(" ").join(", ").slice(0, 28);
    
    const res = await code
    .replaceAll("$[author]", Util.mention(author.id, "user"))
    .replaceAll("$[author.tag]", author.tag)
    .replaceAll("$[author.id]", author.id)
    .replaceAll("$[author.createdAt]", userCreatedAt)
    
    return res;
}

module.exports = messageAuthor;