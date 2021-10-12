'use strict';
const discord = require('discord.js');
const { Intents, Client } = require("discord.js");

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        // intents
    ]
});

module.exports = client;