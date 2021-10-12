'use strict';
const client = require('../utils/client');
const { Constants } = require('discord.js');
const { ApplicationCommandOptionTypes } = Constants;

/** 
 * Discord Slash Commands
 */
class SlashCommandManager {
    constructor(client) {
        this.client = client;
        
        /** 
        * Slash Command Option types (DJS)
        */
        this.optionTypes = ApplicationCommandOptionTypes;
    }
    
    /** 
     * Detect a Slash Command
     * @param {string} slashCommand
     */
    detect(slashCommand) {
        client.on("interactionCreate", async (interaction) => {
            if(!interaction.isCommand()) return;
            
            const { commandName, options } = interaction;
            
            const r = client.slashCode.get(slashCommand);
            const cmdName = client.slashName.get(slashCommand);
            const s = `${r}`
            const res = await s
            .replace(`{ping}`, client.ws.ping)
            
            const ephemeralCMD = client.slashEphemeral.get(cmdName);
            
            let isEphemeral;
            if(ephemeralCMD == true) {
                isEphemeral = true;
            } else if(ephemeralCMD == false) {
                isEphemeral = false;
            }
            
            try {
                if(commandName === slashCommand) {
                    await interaction.reply({
                        content: res,
                        ephemeral: isEphemeral,
                    });
                }
            } catch (err) {
                console.error(err);
            }
        });
    }
    
    /**
     * @typedef {object} ISlashCMD
     * @property {string} [name]
     * @property {string} [description]
     * @property {string} [code] 
     * @property {string} [guildId]
     * @property {ICMDSlashOptions|ICMDSlashOptions[]} [options]
     */
    
    /** 
     * @typedef {object|object[]} ICMDSlashOptions
     * @property {string} [name]
     * @property {string} [description]
     * @property {boolean} [required]
     * @property {ApplicationCommandOptionTypes} [type]
     */
    
    /** 
     * Discord Slash Commands
     * @param {ISlashCMD} command
     */
    create(command = { name, description, code, ephemeral, guildId, options }) {
        if(!command.name) throw new Error(`No Slash Command Name`);
        if(!command.description) throw new Error(`No Slash Command Description`);
        if(!command.code) throw new Error(`No Slash Command Code`);
        
        this._slashName = command.name;
        this._slashDesc = command.description;
        this._slashCode = command.code;
        this._slashGuildId = command.guildId;
        this._slashOptions = command.options;
        this._slashEphemeral = command.ephemeral;
        
        client.once('ready', () => {
            const guild = client.guilds.cache.get(command.guildId);

            let commands;
            if(guild) {
                commands = guild.commands;
            } else {
                commands = client.application?.commands;
            }
            
            commands?.create({
                name: this._slashName,
                description: this._slashDesc,
                options: this._slashOptions || null,
            });
        });
        
        client.slashName.set(command.name, command.name);
        client.slashCode.set(this._slashName, this._slashCode);
        client.slashEphemeral.set(this._slashName, this._slashEphemeral);
    }
}

module.exports = SlashCommandManager;