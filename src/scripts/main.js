'use strict';

const discord = require('discord.js');
const client = new discord.Client();

const chalk = require("chalk");

client.commands = new discord.Collection();
client.cmdcode = new discord.Collection();

class gydo {
    /**
     * 
     * Simple and needed setup to start the bot
     * @param {string} Clients Token
     * @param {string<Prefix>} Clients Prefix
     */
    constructor (va) {
        if(!va.token) throw new Error(`INVALID_TOKEN`);

        if(!va.prefix) return console.error(`No Prefix Given!`);
        this.prefix = va.prefix
        this.token = va.token
        
        if(typeof va.token !== 'string') return console.error(`Token must be a string!`);
        if(typeof va.prefix !== 'string') throw new Error(`PREFIX_NOT_A_STRING`)

        client.login(this.token);
        client.on('ready', async () => {
            console.log(chalk.red(`Bot is Ready! | Logged in as ${client.user.tag}`))
        });
    }
    
    guildMemberAdd(va) {
        if(!va.message) throw new Error(`NO_LEAVE_MESSAGE_GIVEN`)
        this.message = va.message
        
        if(!va.channel) throw new Error(`NO_LEAVE_MESSAGE_CHANNEL`);
        
        if(typeof this.message !== 'string') throw new Error(`LEAVE_MESSAGE_NOT_STRING`);
        
        if(typeof va.channel !== 'string') throw new Error(`LEAVE_CHANNEL_NOT_VALID`);
        this.channel = va.channel
        
        if(this.message.length < 1) throw new Error(`NO_LEAVE_MESSAGE_GIVEN`);
        
        if(this.channel.length < 1) throw new Error(`NO_LEAVE_CHANNEL_ID_GIVEN`)
        
        if(this.message == null) return
        if(this.channel == null) return


        if(typeof va.channel !== 'number') return console.error(`Put a valid Channel ID!`)
        client.on('guildMemberAdd', member => {
            const welcomeChannel = member.guild.channels.cache.get(this.channel);
            
            const welcome = this.message
            .split("{member-tag}").join(`${member.user.tag}`)
            .split("{member}").join(`<@!` + `${member.user.id}` + `>`)
            .split("{guildname}").join(`${member.guild.name}`)
            .split("{member-id}").join(`${member.user.id}`)
            .split("{guild-member-count}").join(`${member.guild.memberCount}`)
            

            welcomeChannel.send(`${welcome}`)
        });
    }
    
    /**
     * A leave message (guildMemberRemove Event)
     * @param {string<message>} Message
     * @param {Number<channel>} IDNum
     * @retuens {channel <message>}
    */ 
    guildMemberRemove(va) {
        if(!va.message) throw new Error(`NO_LEAVE_MESSAGE_GIVEN`)
        this.message = va.message
        
        if(!va.channel) throw new Error(`NO_LEAVE_MESSAGE_CHANNEL`);
        
        if(typeof this.message !== 'string') throw new Error(`LEAVE_MESSAGE_NOT_STRING`);
        
        if(typeof va.channel !== 'string') throw new Error(`LEAVE_CHANNEL_NOT_VALID`);
        this.channel = va.channel
        
        if(this.message.length < 1) throw new Error(`NO_LEAVE_MESSAGE_GIVEN`);
        
        if(this.channel.length < 1) throw new Error(`NO_LEAVE_CHANNEL_ID_GIVEN`)
        
        if(this.message == null) return
        if(this.channel == null) return
        
        if(typeof va.default !== 'boolean') throw new Error(`STATEMENT_NOT_BOOLEAN`)

        client.on('guildMemberRemove', member => {
            const leaveChannel = member.guild.channels.cache.get(this.channel)
            
            if(va.default == true) {
                leaveChannel.send(`Sad to see you leave ${member.user.tag}`)
                return;
            }
            
            const message = this.message
            .split("{member-tag}").join(`${member.user.tag}`)
            .split("{member-id}").join(`${member.user.id}`)
            .split("{guildname}").join(`${member.guild.name}`)
            
            leaveChannel.send(`${message}`)
        });
    }
    
    /**
    * 
    * @param {string} Client User Status
    * @returns {string[options]}
    */
    status(va) {
        this.status = va.status
        if(!this.status) throw new Error(`NO_STATUS_GIVEN`)
        this.type = va.type
        if(!this.type) throw new Error(`NO_STATUS_TYPE_GIVEN`);
        
        let statTypes = ["PLAYING", "LISTENING", "WATCHING", "STREAMING", "COMPETING"]
        
        if(!statTypes.includes(this.type)) throw new Error(`NO_STATUS_TYPE_GIVEN`)
        
        if(typeof this.status !== "string") throw new Error(`NOT_VALID_STATUS`)
        
        if(typeof this.type !== "string") throw new Error(`INVALID_STATUS_TYPE`)
        
        if(this.status.length < 1) throw new Error(`EMPTY_STATUS`)
        
        client.on("ready", async () => {
            client.user.setActivity(this.status, { type: this.type })
            await console.log(chalk.blue(`Bot's status set to: ${this.status}`))
        });
    }
    
    /**
     * Sets a new command for the bot
     * @param {String|Object}
     * @returns {String} Code
     */
    cmd(name, code) {
        if(!name) throw new Error(`CMD_NAME_EMPTY`)

        if(!code) throw new Error(`CMD_CODE_EMPTY`)

        if(typeof name !== 'string') throw new Error(`CMD_NAME_NOT_STRING`)
        if(typeof code !== 'string') throw new Error(`CMD_CODE_NOT_STRING`)

        client.commands.set(name, name);
        client.cmdcode.set(name, code);
    }

    /**
     * Detects the command
     * @returns {String|Object<command>}
     */
    MessageDetect() {
        client.on('message', message => {
            const args = message.content.slice(this.prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            
            if(message.author.bot) return;
            
            const h = client.cmdcode.get(command)
            
            const code = `${h}`
            
            const res = code
            .split("{ping}").join(`${client.ws.ping}`)
            .split("{message-author-tag}").join(`${message.author.tag}`)
            .split("{message-author-id}").join(`${message.author.id}`)
            .split("{bot-user-tag}").join(`${client.user.tag}`)
            .split("{bot-user-id}").join(`${client.user.id}`)
            .split("{guildname}").join(`${message.guild.name}`)
    
            try {
                if(command === client.commands.get(command)) {
                    message.channel.send(res)
                }
            } catch (err) {
                console.error(err)
            }
        })
    }
    
    /**
     * A Loop Status for your Discord Bot
     * @param {Object} Status
     * @param {Number} Miliseconds
     * Must be less than 1000 ms
    */
    loopStatus(object, time, type = {}) {
        this.object = object
        this.time = time
        this.type = type
        
        const stat = this.type
        
        let types = [
            "PLAYING",
            "STREAMING",
            "LISTENING",
            "WATCHING"
        ]
    
        // Errors 
        if(!object) throw new Error(`NO_STATUS_GIVEN`);
        if(!time) throw new Error(`NO_LOOP_MS_TIME_GIVEN`);
        if(!type) throw new Error(`NO_STATUS_TYPE_GIVEN`)
        
        if(typeof this.object !== "object") throw new Error(`NOT_ARRAY`);
        if(typeof this.time !== 'number') throw new Error(`TIME_NOT_A_NUMBER`);
        
        // Sets the Changing Status Loop
        client.on("ready", async () => {
            let index = 0
            let arr = this.object
            setInterval(() => {
                if(index === arr.length) index = 0;
                const res = arr[index];
                client.user.setActivity(res, { type: `${stat}` })
                index++;
            }, this.time);
        });
        
        type = { types: type }
    }
}

module.exports = gydo
//             OLD CODE
/*
client.on('guildMemberAdd', member => {
  if(setup.MemberLog.memberleavejoin === '') {console.log()}
  if(setup.MemberLog.memberleavejoin === 'CHANNEL ID') {console.log()}
  if(setup.MemberLog.serverid === '') {console.log()}
  if(setup.MemberLog.serverid === 'guildID') {console.log()}
  if(setup.MemberLog.JoinMessage === '') {console.log('Message Error. No message found in MemberLog: message field'); process.kill(process.pid)}
  const guildID = `${setup.MemberLog.serverid}`
  const channelID = `${setup.MemberLog.memberleavejoin}`;
  if(member.guild.id === guildID) {
     const channel = client.channels.cache.get(channelID);

     var text = setup.MemberLog.JoinMessage
     var text2 = text.replace("{author}", `${member}`)
     var text3 = text2.replace("{ping}", `${client.ws.ping}`)
     var text4 = text3.replace("{server}", `${member.guild.name}`)
     var newtext = text4.replace("{memberCount}", `${member.guild.members.cache.size}`)

channel.send(newtext);
  }
});

client.on('guildMemberRemove', member => {
  if(setup.MemberLog.memberleavejoin === '') {console.log()}
  if(setup.MemberLog.memberleavejoin === 'CHANNEL ID') {console.log()}
  if(setup.MemberLog.serverid === '') {console.log()}
  if(setup.MemberLog.serverid === 'guildID') {console.log()}
  const guildID = `${setup.MemberLog.serverid}`
  const channelID = `${setup.MemberLog.memberleavejoin}`;
  if(member.guild.id === guildID) {
     const channel = client.channels.cache.get(channelID);

channel.send(`Sad to see you leave ${member}.`);
  }
});*/
