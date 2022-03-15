"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const chalk = __importStar(require("chalk"));
const Interpreter_1 = __importDefault(require("../interpreters/Interpreter"));
class Bot extends discord_js_1.Client {
    prefix;
    commands;
    constructor(options) {
        super({
            intents: [
                discord_js_1.Intents.FLAGS.GUILDS,
                discord_js_1.Intents.FLAGS.GUILD_MESSAGES,
            ],
        });
        const { token, prefix } = options;
        if (!token)
            throw new Error('No Token Provided');
        if (!prefix)
            throw new Error('No Prefix Provided');
        this.prefix = prefix;
        this.login(token);
        this.once('ready', (c) => {
            console.log(chalk.red(`Bot is Ready | Logged in as ${c.user.tag}`));
        });
        this.commands = new discord_js_1.Collection();
        this._listenMessages();
    }
    command(options) {
        const { name, code } = options;
        if (!name)
            throw new Error('No Command Name Given');
        if (!code)
            throw new Error('No Command Code Given');
        this.commands.set(name, {
            name,
            code,
        });
    }
    _listenMessages() {
        new Interpreter_1.default(this);
    }
    onReady(cb) {
        if (typeof cb !== 'function')
            throw new TypeError('First Argument must be a function');
        this.once('ready', (c) => cb(c));
    }
}
exports.default = Bot;
