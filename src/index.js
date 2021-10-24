'use strict';

module.exports = {
    // Main Classes/Functions
    Bot: require("./bot/main"),
    BaseBot: require('./bot/BaseBot'),
    interpreter: require('./bot/interpreter'),
    
    // Events
    MessageUpdate: require('./events/MessageUpdate'),
    guildMemberRemove: require('./events/guildMemberRemove'),
    guildMemberAdd: require('./events/guildMemberAdd'),
    
    // Managers
    EventsManager: require('./managers/EventsManager'),
    ActivityManager: require("./managers/ActivityManager"),
    Embed: require('./managers/Embed'),
    SlashCommandManager: require('./managers/SlashCommandManager'),
    
    // Utils
    Util: require('./utils/util'),
    Types: require('./utils/types'),
    RawClient: require('./utils/client'),
    InterpreterError: require('./utils/InterpreterError'),
    getOptions: require('./utils/getOptions'),
};