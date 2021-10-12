const Util = require('../utils/util');

const messageAuthor = (client, code, author) => {
    if (code === null) return;
    
    const res = code.replaceAll("$[message.author]", Util.mention(author.id, "user"));
    
    return res;
}

module.exports = messageAuthor;