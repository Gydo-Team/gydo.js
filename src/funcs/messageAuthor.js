const Util = require('../utils/util');

/**
 * Mentions the author of the message
 */
const messageAuthor = async (client, code, author) => {
    if (code === null) return;
    
    const res = await code
    .replaceAll("$[author]", Util.mention(author.id, "user"))
    .replaceAll("$[author.tag]", author.tag)
    .replaceAll("$[author.id]", author.id);
    
    return res;
}

module.exports = messageAuthor;