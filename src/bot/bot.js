const {
    Collection,
    Client, 
    Intents,
} = require('discord.js');
const chalk = require('chalk');

const MessagesInterpreter = require('../interpreters/Interpreter');

/**
 * Starting point of your bot
 * @class
 * @extends {Client}
 */
class Bot extends Client {
    constructor(options) {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
            ],
        });
        const { token, prefix } = options;
        if(!token) throw new Error('No Token Provided');
        if(!prefix) throw new Error('No Prefix Provided');

        this.prefix = prefix;

        this.login(token);
        this.once('ready', (c) => {
            console.log(
                chalk.red(`Bot is Ready | Logged in as ${c.user.tag}`)
            )
        });

        this.commands = new Collection();

        // Start listening to messages
        this._listenMessages();
    }

    /**
     * @typedef {Object} CommandOptions
     * @property {string} name
     * @property {string} code
     */

    /**
     * Register a command
     * @param {CommandOptions} options
     */
    command(options = {}) {
        const { name, code } = options;

        if(!name) throw new Error('No Command Name Given');
        if(!code) throw new Error('No Command Code Given');

        this.commands.set(name, {
            name,
            code,
        });
    }

    /**
     * Starts to listen to Message Events
     * Should only be initiated once.
     * @private
     */
    _listenMessages() {
        new MessagesInterpreter(this);
    }
}

module.exports = Bot;
