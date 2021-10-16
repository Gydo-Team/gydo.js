const client = require('../utils/client');
const { MessageEmbed } = require('discord.js');
const discord = require('discord.js');

client.embedTitle = new discord.Collection();
client.embedDesc = new discord.Collection();

client.embedFooter = new discord.Collection();
client.embedFields = new discord.Collection();
client.embedColor = new discord.Collection();
client.embedTimestamp = new discord.Collection();
client.embedAuthor = new discord.Collection();
client.embedAuthorURL = new discord.Collection();
client.doesEmbed = new discord.Collection();

/**
 * Discord Message Embed
 */
class Embed {
    /** 
     * @typedef {object} IEmbed
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
     * @typedef {object[]} IEmbedFields
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
        
        this.target = target;
        this.embedTitle = title;
        this.embedDesc = description;
        this.embedFooter = footer;
        this.embedFields = fields;
        this.embedColor = color;
        this.embedTimestamp = timestamp;
        this.embedAuthor = author;
        this.embedAuthorURL = authorURL;
        
        client.embedTitle.set(target, title);
        client.embedDesc.set(target, description);
        client.embedFooter.set(target, footer);
        client.embedFields.set(target, fields);
        client.embedColor.set(target, color);
        client.embedTimestamp.set(target, timestamp);
        client.embedAuthor.set(target, author);
        client.embedAuthorURL.set(target, authorURL);
    }
    
    /** 
     * Turns a Raw JSON Embed to Embed
     * @returns {MessageEmbed}
     */
    static JSONtoEmbed(rawjson) {
        const JSONparse = JSON.parse(rawjson);
        const Embed = new MessageEmbed(JSONparse);
        
        return Embed;
    }
    
    /**
     * Returns an Object of your Embed's properties
     * @returns {Object}
     */
    toJSON() {
        return {
            title: this.embedTitle,
            description: this.embedDesc,
            footer: this.embedFooter,
            fields: this.embedFields,
            color: this.embedColor,
            timestamp: this.embedTimestamp,
            author: this.embedAuthor,
            authorURL: this.embedAuthorURL
        }
    }
}

module.exports = Embed;