/**
 * Ping of the current client logged on
 */
const ping = async (client, code, author) => {
    if (code === null) return;
    
    const res = await code.replaceAll("$[ping]", client.ws.ping);
    
    return res;
}

module.exports = ping;