const client = require("../utils/client");
const EventEmitter = require('events').EventEmitter;

/**
 * Events Manager for manual event managing
 * @extends {EventEmitter}
 */
class EventsManager extends EventEmitter {
    /**
     * Will automatically emit events
     */
    constructor() {
        super();
        client.on('ready', (client) => {
            this.emit('ready', client);
        });
        
        client.on('messageCreate', (message) => {
            this.emit('messageCreate', message);
        });
        
        client.on('interactionCreate', (interaction) => this.emit('interactionCreate', interaction));
        
        client.on('error', (err) => this.emit('error', err));
    }
}

module.exports = EventsManager;