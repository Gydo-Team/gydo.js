'use strict';

module.exports = {
    // Main Classes/Functions
    config: require("./scripts/main"),
    Embed: require('./managers/Embed'),
    interpreter: require('./scripts/interpreter'),
    
    // Events
    MessageUpdate: require('./events/MessageUpdate'),
    guildMemberRemove: require('./events/guildMemberRemove'),
    guildMemberAdd: require('./events/guildMemberAdd'),
    
    // Managers
    EventsManager: require('./managers/EventsManager'),
    ActivityManager: require("./managers/ActivityManager"),
    SlashCommandManager: require('./managers/SlashCommandManager'),
    ClientError: require('./managers/ClientError'),
    
    // Utils
    Util: require('./utils/util'),
};