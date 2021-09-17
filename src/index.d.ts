// Imports 
import { 
    Client,
    Message,
    Presence,
    Channel,
    ClientPresenceStatus,
    Intents
} from "discord.js";

//#region Class(es)
export class config {
    public constructor (va: IConfig);
    public readonly ping: number;
    private readonly token: string | Client;
    public prefix: string;
    public readonly username: string;
    public guildMemberAdd(va: IGuildMember): Message;
    public guildMemberRemove(va: IGuildMember): Message;
    public readonly currentStatus: string;
    public status(status:string, type:ActivityTypes);
    public cmd(cmd: ICommand): Message;
    public MessageDetect(): Message;
    public loopStatus(arrayOfStatus: string[], time: number, type: ActivityTypes): Presence;
    public addIntents(int: Intents): Promise<void>;
    public removeIntents(int: Intents): Promise<void>;
    private readonly _slashName: string;
    private readonly _slashDesc: string;
    private readonly _slashCode: string;
    private readonly _slashGuildId: string | Channel;
    public slashCommandDetect(slashCommand:string): Message;
    public slashCommand(command: ISlashCMD): void;
}

// Interfaces
export interface IConfig {
    token: string;
    prefix: string;
}

export interface IGuildMember {
    channel: Channel;
    message: Message;
}

export interface ActivityTypes {
    type: "PLAYING" 
    | "LISTENING" 
    | "STREAMING" 
    | "WATCHING" 
    | "COMPETING";
}

export interface ICommand {
    name: string;
    code: string;
}

export interface ISlashCMD {
    name: string;
    description: string;
    code: string;
    guildId?: Channel;
}

//#endregion