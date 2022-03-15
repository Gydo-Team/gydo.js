import {
    Awaitable,
    Collection,
    Client,
    Intents,
} from 'discord.js';
import * as chalk from 'chalk';

import MessagesInterpreter from '../interpreters/Interpreter';

import { 
    BotOptions,
    CommandOptions,
} from '../../typings/index';

/**
 * Starting point of your bot
 * @class
 * @extends {Client}
 */
export default class Bot extends Client {
    prefix: string;
    commands: Collection<string, CommandOptions>;

    /**
     * @typedef {Object} BotOptions
     * @property {string} token
     * @property {string} prefix
     */

    /**
     * Starting point of your bot
     * @param {BotOptions} options
     */
    public constructor(options: BotOptions) {
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
    public command(options: CommandOptions) {
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
    private _listenMessages() {
        new MessagesInterpreter(this);
    }

    /**
     * @callback OnReady
     * @param {Client} client
     */

    /**
     * Call a function when the bot is ready
     * @param {OnReady} cb
     */
    public onReady(cb: (client: Client<true>) => Awaitable<void>) {
        if (typeof cb !== 'function') throw new TypeError('First Argument must be a function');

        this.once('ready', (c) => cb(c));
    }
}
