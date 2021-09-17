// Interpreter 
// Detects the messages and see if
// it matches the command you made

const discord = require("discord.js");

const interpreter = async (client) => {
    const s = client.botprefix.get("prefix")

    const prefix = `${s}`

        
    client.on("messageCreate", (message) => {
        const prefix = "?";
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        
        const h = client.cmdcode.get(command)

        const cmdName = client.commands.get(command)

            
        const code = `${h}`
            
        let res = code
        .split("{ping}").join(`${client.ws.ping}`)
        .split("{message-author-tag}").join(`${message.author.tag}`)
        .split("{message-author-id}").join(`${message.author.id}`)
        .split("{bot-user-tag}").join(`${client.user.tag}`)
        .split("{bot-user-id}").join(`${client.user.id}`)
        .split("{guildname}").join(`${message.guild.name}`)
    
        if(command === cmdName) {
            message.channel.send({
                content: res
            });
        }
    });
}

module.exports = interpreter;