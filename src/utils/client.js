'use strict';
const discord = require('discord.js');
const { Intents, Client } = require("discord.js");

// DO NOT TOUCH, Removing this client constant will break gydo
const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES,
        // intents
    ]
});

module.exports = client;