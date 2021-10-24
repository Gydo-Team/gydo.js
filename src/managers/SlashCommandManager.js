'use strict';
const { Constants } = require('discord.js');
const { ApplicationCommandOptionTypes } = Constants;
const getOptions = require('../utils/getOptions');

/** 
 * Discord Slash Commands
 */
class SlashCommandManager {
    /**
     * Manager for Slash Commands
     */
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
        this.client.on("interactionCreate", async (interaction) => {
            if(!interaction.isCommand()) return;
            
            const { commandName, options } = interaction;
            
            const r = this.client.slashCode.get(slashCommand);
            const cmdName = this.client.slashName.get(slashCommand);
            
            // 'Interpreting' happens here
            const code = `${r}`
            
            
            const res = await this._startInterpreter(code, options);
            
            const isEphemeral = this.client.slashEphemeral.get(cmdName) ?? null;
            
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
     * @typedef {Object} ISlashCMD
     * @property {string} [name]
     * @property {string} [description]
     * @property {string} [code] 
     * @property {string} [guildId]
     * @property {ICMDSlashOptions|ICMDSlashOptions[]} [options]
     */
    
    /** 
     * @typedef {Object|Object[]} ICMDSlashOptions
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
        
        this.client.on('ready', () => {
            const guild = this.client.guilds.cache.get(command.guildId);

            let commands;
            if(guild) {
                commands = guild.commands;
            } else {
                commands = this.client.application?.commands;
            }
            
            commands?.create({
                name: this._slashName,
                description: this._slashDesc,
                options: this._slashOptions || null,
            });
        });
        
        this.client.slashName.set(command.name, command.name);
        this.client.slashCode.set(this._slashName, this._slashCode);
        this.client.slashEphemeral.set(this._slashName, this._slashEphemeral);
    }
    
    /**
     * Starts the Interpreter for Slash Commands
     * @param {string} code - The Code of the Command if any
     * @param {CommandInteractionOptionResolver} options
     * @returns {string}
     * @private
     */
    _startInterpreter(code, options) {
        if(!code) return;
        
        let getStrKey = code
        .split('$[getString;')[1]
        .split(';')[0]
        .split(']')[0];
            
        let getStrFallback = code
        .split(`$[getString;${getStrKey};`)[1]
        .split(']')[0] ?? '';

        let getStr = getOptions(options, 'string', getStrKey) || getStrFallback;
        
        const result = code
        .replaceAll('$[ping]', this.client.ws.ping)
        .replaceAll(
            `$[getString;${getStrKey}${getStrFallback ? `;${getStrFallback}` : ''}]`,
            getStr
        )
        
        return result;
    }
}

module.exports = SlashCommandManager;