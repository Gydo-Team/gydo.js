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
    /**
     * @typedef {Object} BotOptions
     * @property {string} token
     * @property {string} prefix
     * @property {boolean} logEvents
     */

    /**
     * Starting point of your bot
     * @param {BotOptions} options
     */
    constructor(options) {
        super({
            intents: [
                Intents.FLAGS.GUILDS,
                Intents.FLAGS.GUILD_MESSAGES,
            ],
        });
        const { token, prefix } = options;
        if (!token) throw new Error('No Token Provided');
        if (!prefix) throw new Error('No Prefix Provided');
        if (options.logReady !== false) options.logReady = true;

        this.prefix = prefix;

        this.login(token);
        if (options.logReady !== false) {
            this.once('ready', (c) => {
                console.log(
                    chalk.red(`Bot is Ready | Logged in as ${c.user.tag}`)
                );
            });
        }

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
    command(options) {
        const { name, code } = options;

        if(!name) throw new Error('No Command Name Given');
        if(!code) throw new Error('No Command Code Given');

        this.commands.set(name, {
            name,
            code,
        });
    }

    /**
     * @callback OnReady
     * @param {Client} client
     */

    /**
     * Call a function when the bot is ready
     * @param {OnReady} cb
     */
    onReady(cb) {
        if (typeof cb !== 'function') throw new TypeError('First Argument must be a function');

        this.once('ready', cb);
    }

    /** 
     * Sets the activity of your bot.
     * @param {string} name
     * @param {string} type
     */
    setActivity(name, type) {
        this.once('ready', () => {
            this.user.setActivity(name, { type });
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
