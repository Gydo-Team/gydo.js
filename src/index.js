'use strict';

module.exports = {
    // Main Classes/Functions
    Bot: require("./bot/main"),
    interpreter: require('./bot/interpreter'),
    CommandHandler: require('@gydojs/cmdhandler'),
    
    // Events
    MessageUpdate: require('./events/MessageUpdate'),
    guildMemberRemove: require('./events/guildMemberRemove'),
    guildMemberAdd: require('./events/guildMemberAdd'),
    
    // Managers
    BaseBot: require('./managers/BaseBot'),
    EventsManager: require('./managers/EventsManager'),
    ActivityManager: require("./managers/ActivityManager"),
    Embed: require('./managers/Embed'),
    SlashCommandManager: require('./managers/SlashCommandManager'),
    
    // Utils
    Util: require('./utils/util'),
    Types: require('./utils/types'),
    RawClient: require('./utils/client'),
    InterpreterError: require('./utils/InterpreterError'),
};