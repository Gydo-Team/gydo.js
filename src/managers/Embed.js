'use strict';

const client = require('../utils/client');
const { MessageEmbed, Collection } = require('discord.js');
const discord = require('discord.js');
const { embeds } = require('../Collections');

/**
 * Discord Message Embed
 */
class Embed {
    /** 
     * @typedef {Object} EmbedStructure
     * @property {string} [title]
     * @property {string} [author]
     * @property {string} [authorURL]
     * @property {string} [description]
     * @property {string} [footer]
     * @property {IEmbedFields[]} [fields]
     * @property {string} [color]
     * @property {boolean} [timestamp]
     */
    
    /**
     * @typedef {Object[]} EmbedFields
     * @property {string} [name]
     * @property {string} [value]
     * @property {boolean} [inline]
     */
    
    /** 
     * Discord Embed
     * @param {string} target
     * @param {IEmbed} options
     */
    constructor(target, options = { title, author, authorURL, description, footer, fields, color, timestamp }) {
        
        if(!target) throw new Error('No Command Specified');

        const { title, description, footer, fields, color, timestamp, author, authorURL } = options;
        
        this.target = target ?? null;
        this.title = title ?? null;
        this.description = description ?? null;
        this.footer = footer ?? null;
        this.fields = fields ?? null;
        this.color = color ?? null;
        this.timestamp = timestamp ?? null;
        this.author = author ?? null;
        this.authorURL = authorURL ?? null;
        
        embeds.set(target, { ...this });
    }
    
    /** 
     * Turns a Raw JSON or Object Embed to Embed
     * @returns {MessageEmbed}
     */
    static JSONtoEmbed(rawjson) {
        const parsed = JSON.parse(rawjson);
        const Embed = new MessageEmbed(parsed);
        
        return Embed;
    }
    
    /**
     * Returns an Object of your Embed's properties
     * @returns {Object}
     */
    toJSON() {
        return {
            title: this.title,
            description: this.description,
            footer: this.footer,
            fields: this.fields,
            color: this.color,
            timestamp: this.timestamp,
            author: {
                name: this.author,
                url: this.authorURL,
            },
        }
    }
}

module.exports = Embed;