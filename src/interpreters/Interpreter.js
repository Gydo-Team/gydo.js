class MessagesInterpreter {
    constructor(bot) {
        this.bot = bot;
        this.prefix = this.bot.prefix;
        this.listenMessages();
    }
    
    listenMessages() {
        const prefix = this.prefix;
        const client = this.bot;

        client.on('messageCreate', (message) => {
            const args = message.content.slice(prefix.length).trim().split(/ +/);
            const command = args.shift().toLowerCase();
            
            if(!message.content.startsWith(prefix)) return;
            if(message.author.bot) return;
            
            const cmd = client.commands.get(command);
            if(!cmd) return;
            const { name, code } = cmd;
            
            try {
                if(command === name) {
                    message.channel.send({
                        content: code,
                    });
                }
            } catch (err) {
                throw err;
            }
        });
    }
}

module.exports = MessagesInterpreter;