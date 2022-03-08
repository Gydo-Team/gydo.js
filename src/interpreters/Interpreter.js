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
            
            const {
                name,
                code,
            } = client.commands.get(command);
            
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
