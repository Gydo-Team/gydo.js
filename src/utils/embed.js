const client = require('./client');
const { MessageEmbed } = require('discord.js');

/** 
 * Saving the embeds data for later
 * @returns {MessageEmbed}
*/
const SaveEmbed = async (embed, cmdname) => {
    let EmbedResult;
    
    EmbedResult = new MessageEmbed();

    return EmbedResult;
};

module.exports = SaveEmbed;