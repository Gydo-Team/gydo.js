import {
    Client,
    Collection,
} from 'discord.js';

export interface BotOptions {
    token: string;
    prefix: string;
}

export interface CommandOptions {
    name: string;
    prefix: string;
}

export class Bot extends Client {
    public constructor(options: BotOptions);
    public prefix: string;
    public commands: Collection;
    public slashCommands: Collection;
    public command(options: CommandOptions): void;
    public slashCommand(options: CommandOptions): void;
    public listenMessages(): void;
}

export class MessagesInterpreter {
    public constructor(bot: Bot);
    public bot: Bot;
    public prefix: string;
    public listenMessages(): void;
}