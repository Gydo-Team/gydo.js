const client = require('../utils/client');
const { EventEmitter } = require('events');

/**
 * An Event Listener for when Client got an Error
 */
class ClientError extends EventEmitter {
    constructor() {
        super();
        client.on('error', (err) => {
            this.emit('error', err);
            
            /**
            * Client Error if there is something wrong
            * @type {?string}
            */
            this.error = err ?? null;
        });
    }
}

module.exports = ClientError;