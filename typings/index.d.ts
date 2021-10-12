// Imports 
import { 
    Client,
    ClientUser,
    Message,
    Presence,
    Channel,
    ClientPresenceStatus,
    Intents,
    Constants,
    User,
    GuildMember,
    Role,
    MessageEmbed,
    Base
} from "discord.js";
import { EventEmitter } from 'events';
import {
    Snowflake,
} from 'discord-api-types/v9'

//#region Class(es)
export class config {
    public constructor (va: IConfig);
    public readonly ping: number | null;
    private readonly token: string;
    public readonly prefix: string;
    public readonly id: Snowflake | null;
    public readonly tag: string | null;
    public activity: ActivityManager;
    public slashCommand: SlashCommandManager;
    public guildMemberAdd(va: IGuildMember): void;
    public guildMemberRemove(va: IGuildMember): void;
    public MessageUpdate(va: IEvents): void;
    public cmd(cmd: ICommand): void;
    public MessageDetect(): void;
    public toJSON(): JSON;
}

export class ActivityManager {
    public constructor(client: Client);
    public setActivity(status: string, options: ActivityTypes): Presence;
    public setUserStatus(status: NormalStatusTypes): Presence;
    public loopStatus(arrayOfStatus: string[] | Array<string>, time: number, type: ActivityTypes): Presence[];
    public readonly normalStatus: string;
    public readonly currentStatus: string;
}

export class SlashCommandManager {
    public constructor(client: Client);
    public optionTypes: typeof Constants;
    public detect(slashCommand: string): Message;
    public create(command: ISlashCMD): void;
    private readonly _slashName: string;
    private readonly _slashDesc: string;
    private readonly _slashCode: string;
    private readonly _slashGuildId: string | Channel;
    private readonly _slashOptions: ICMDSlashOptions[];
    private readonly _slashEphemeral: boolean;
}

export class Embed {
    public constructor(cmd: string, options: IEmbed);
    private readonly cmd: string;
    private readonly embedTitle: string | null;
    private readonly embedDesc: string | null;
    private readonly embedFooter: string | null;
    private readonly embedFields: IEmbedFields[] | null;
    private readonly embedColor: string | null;
    private readonly embedTimestamp: boolean | null;
    private readonly embedAuthor: string | null;
    private readonly embedAuthorURL: string | null;
    public static JSONtoEmbed(rawjson: JSON): MessageEmbed;
}

export class MessageUpdate extends Base {
    public constructor(options: IGuildMember);
    public readonly message: string;
    public readonly channel: Channel;
    public toJSON(): JSON;
}

export class ClientError extends EventEmitter {
    public readonly error: string | null;
}

export class interpreter {
    public constructor(client: Client);
    private _getEmbed(client: Client, command: string): MessageEmbed | null;
    private _isReply(command: string, client: Client): boolean | null;
    private readonly code: string;
    private readonly res: string;
    private readonly functions: Array<string> | null;
    private readonly args: Array<string>;
    private readonly _message: string;
    private readonly currentCommand: string | null;
    private _startInterpreter(client: Client): string;
}

export class EventsManager extends EventEmitter {}

export class guildMemberRemove {
    public constructor(channel: string, message: string, client: Client);
    public message: string;
    public channel: string;
}

export class guildMemberAdd {
    public constructor(channel: string, message: string, client: Client);
    public message: string;
    public channel: string;
}

export class Util {
    public static mention(target: string, mentionType: string ): string;
}

//#endregion

//#region Interfaces and Types
export interface IConfig {
    token: string;
    prefix: string;
    manualIntents?: boolean;
    logEvents?: boolean;
}

export interface IGuildMember {
    channel: Channel;
    message: Message;
}

export interface IEvents {
    channel?: Channel | string;
    message?: Message | string;
}

export type ActivityOptions = 
    | "PLAYING" 
    | "LISTENING"
    | "STREAMING"
    | "WATCHING"
    | "COMPETING";
    
export type NormalStatusTypes =
    | 'online'
    | 'idle'
    | 'dnd'
    | 'invisible';

export interface ActivityTypes {
    type: ActivityOptions;
    url?: string;
}

export interface ICommand {
    name: string;
    code: string
    messageReply?: boolean;
}

export interface ISlashCMD {
    name?: string;
    description?: string;
    code?: string;
    ephemeral?: boolean;
    guildId?: Channel;
    options?: ICMDSlashOptions | ICMDSlashOptions[];
}

export interface ICMDSlashOptions {
    name?: string;
    description?: string;
    required?: boolean;
    type?: typeof Constants;
}

export interface IEmbed {
    title?: string;
    author?: string;
    authorURL?: string;
    description?: string;
    footer?: string;
    fields?: IEmbedFields[];
    color?: ColorResolvable;
    timestamp?: boolean;
}

// HexColorString from discord.js' Embeds
export type HexColorString = `#${string}`;

// ColorResolvable from discord.js' Embeds
export type ColorResolvable =
  | 'DEFAULT'
  | 'WHITE'
  | 'AQUA'
  | 'GREEN'
  | 'BLUE'
  | 'YELLOW'
  | 'PURPLE'
  | 'LUMINOUS_VIVID_PINK'
  | 'FUCHSIA'
  | 'GOLD'
  | 'ORANGE'
  | 'RED'
  | 'GREY'
  | 'DARKER_GREY'
  | 'NAVY'
  | 'DARK_AQUA'
  | 'DARK_GREEN'
  | 'DARK_BLUE'
  | 'DARK_PURPLE'
  | 'DARK_VIVID_PINK'
  | 'DARK_GOLD'
  | 'DARK_ORANGE'
  | 'DARK_RED'
  | 'DARK_GREY'
  | 'LIGHT_GREY'
  | 'DARK_NAVY'
  | 'BLURPLE'
  | 'GREYPLE'
  | 'DARK_BUT_NOT_BLACK'
  | 'NOT_QUITE_BLACK'
  | 'RANDOM'
  | readonly [number, number, number]
  | number
  | HexColorString;

export interface IEmbedFields {
    name?: string;
    value?: string;
    inline?: boolean;
}

//#endregion