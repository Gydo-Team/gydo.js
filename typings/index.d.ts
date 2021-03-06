import {
    Awaitable,
    Client,
    Collection,
} from 'discord.js';

//#region Interfaces
export interface BotOptions {
    token: string;
    prefix: string;
    logReady?: boolean;
}

export interface CommandOptions {
    name: string;
    code: string;
}
//#endregion

//#region Classes
export class Bot extends Client {
    public prefix: string;
    public commands: Collection<string, CommandOptions>;

    public constructor(options: BotOptions);
    public command(options: CommandOptions): void;
    private _listenMessages(): void;
    public onReady(cb: (client?: Client<true>) => Awaitable<void>): void;
    public setActivity(name: string, type: string): void;
}

export class MessagesInterpreter {
    public constructor(bot: Bot);
    public bot: Bot;
    public prefix: string;
    public listenMessages(): void;
}
//#endregion
