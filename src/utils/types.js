'use strict';

/**
 * Types of Status for your bot 
 */
exports.Type = {
    Types: [
        "PLAYING", 
        "LISTENING", 
        "WATCHING", 
        "STREAMING"
    ]
}

/**
 * Types of Events
 */
exports.EventTypes = {
    guildMemberAdd: "guildMemberAdd",
    guildMemberRemove: "guildMemberRemove",
    messageUpdate: "messageUpdate",
}