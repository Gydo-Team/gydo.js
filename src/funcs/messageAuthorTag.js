const Util = require('../utils/util');

/**
 * User Tag of the User who sent the message
 */
const messageAuthorTag = async (client, code, author) => {
    if (code === null) return;
    
    const res = await code.replaceAll("$[author.tag]", author.tag);

    return res;
}

module.exports = messageAuthorTag;