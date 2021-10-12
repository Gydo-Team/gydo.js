'use strict';

const client = require('../utils/client');
const chalk = require('chalk');

/** 
 * All Activity functions
*/
class ActivityManager {
    constructor(wantLogged) {
        this.wantLogged = wantLogged;
    }
    
    /** 
     * @typedef {object} ActivityTypes 
     * @property {"PLAYING"|"LISTENING"|"WATCHING"|"COMPETING"|"STREAMING"} type
     * @property {string} [url]
     */
    
    /**
     * Sets the Status for the Bot
     * @param {string|Presence} status
     * @param {ActivityTypes} options 
     * @returns {Presence}
     */
    setActivity(status, options = { type, url }) {
        /**
         * Bot's Current Status, if you have set one.
         * @type {?string}
        */
        this.currentStatus = status;
        
        if(!this.currentStatus) throw new Error(`No Status Given`)
        
        if(typeof this.currentStatus !== "string") throw new Error('Status not a string');
        
        client.on("ready", async () => {
            client.user.setActivity(this.currentStatus, { type: options.type, url: options.url || null })
            if(this.wantLogged === true) console.log(chalk.blue(`Bot's status set to: ${this.currentStatus}`));
        });
    }
    
    /** 
     * @typedef {"idle"|"dnd"|"invisible"|"online"} NormalStatusTypes
     */

    // This is not like the other Status method, this is just a normal status
    // Like Idle, Do not Disturb, etc.
    /** 
     * Status for your discord bot
     * @param {NormalStatusTypes} status
     */
    setUserStatus(status) {
        if(typeof status != 'string') throw new TypeError(`Status NOT a string`);
        
        /**
        * Normal User Status
        * @type {?string}
        */
        this.normalStatus = status;
        
        client.once('ready', async () => {
            client.user.setStatus(status);
            if(this.wantLogged) console.log(chalk.blue(`Set Normal Status to: ${this.normalStatus}`));
        });
    }
    
    /**
     * A Loop Status for your Discord Bot
     * @param {string[]|Array<string>} arrayOfStatus
     * @param {number} time
     * @param {ActivityTypes} type
     * @example bot.loopStatus(["Hey!", "Hello!", "!help"], 2000, { type: "PLAYING" })
     */
    loopStatus(arrayOfStatus, time, { type }) {
        // Errors 
        if(!arrayOfStatus) throw new Error(`NO_STATUS_GIVEN`);
        if(!time) throw new Error(`No Time Given`);
        if(!type) throw new Error(`NO_STATUS_TYPE_GIVEN`)
        
        if(typeof time !== 'number') throw new TypeError(`Time NOT a NUMBER`);
        
        // Sets the Changing Status Loop
        client.on("ready", async () => {
            let i = 0;
            setInterval(() => {
                if(i === arrayOfStatus.length) i = 0;
                const res = arrayOfStatus[i];
                client.user.setActivity(res, { type: type })
                i++;
            }, time);
        });
    }
}

module.exports = ActivityManager;