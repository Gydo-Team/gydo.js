const Util = require('../utils/util');
const moment = require('moment');

/**
 * Author of the Message that has been sent, if any
 */
const messageAuthor = async (client, code, author, args, message) => {
    if (code === null) return;
    
    const userCreatedAt = moment(message.member.user.createdAt).toString().split(" ").join(", ").slice(0, 28);
    
    const res = await code
    // Mentions the Author of the Message
    .replaceAll("$[author]", Util.mention(author.id, "user"))
    // Author's User Tag
    .replaceAll("$[author.tag]", author.tag)
    // The ID of the Author
    .replaceAll("$[author.id]", author.id)
    // Date of when the user is created at
    .replaceAll("$[author.createdAt]", userCreatedAt)
    
    return res;
}

module.exports = messageAuthor;