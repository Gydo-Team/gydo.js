const InterpreterError = require('../utils/InterpreterError');

/**
 * Ping of the current client logged on
 */
const ping = async (client, code, author) => {
    if (code === null) throw new InterpreterError('Empty Code', 'Receive an empty code');
    
    const res = await code.replaceAll("$[ping]", client.ws.ping);
    
    return res;
}

module.exports = ping;