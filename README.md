<div align="center">
  <br />
  <p>
    <a href="https://discord.gg/s5UcwZTzKg"><img src="https://img.shields.io/discord/823028211075383316?label=Gydo-JS%20Server&logo=discord" alt="Discord Server"/></a>
    <a href="https://npmjs.com/package/gydo-js"><img src="https://img.shields.io/npm/v/gydo-js?color=%23acff00&label=gydo-js&logo=npm" alt="npm gydo" />
  </p>
  <br />
</div>

# Gydo-JS

The Main branch of Gydo-JS
(Stable Branch)

Report bugs in our [Discord Server](https://discord.gg/s5UcwZTzKg)

[Dev Branch](https://npmjs.com/package/gydo.js-dev)

[Github Repo](https://github.com/Gydo-Team/gydo.js)

## Jump to Pages (Table of Contents)

- [Setup](#setup)
  - [Create a Command](#commands)
  - [Slash Commands](#slashcommands)
  - [Status](#status) 
- [Member Leave Message](#memberleaveevent)
- [Member Join Message](#joinmessageevent)
- [Links](#links)

## Setup

```js 
const gydo = require("gydo-js");
const bot = new gydo.config({
    // change the <token here> to your bots token, same with the prefix (you can only do one prefix yet)
    token: "<token here>",
    prefix: "<your prefix>"
});

```

You will automatically have this intents:
`GUILDS`
`GUILD_MESSAGES`

Which is enough, and what is required.

See Intents you need: <br />
[See DJS v13 Intents](https://discordjs.guide/popular-topics/intents.html)

Once you've completed the setup, you can run `node .` (or `node <filename>.js`) in your terminal to run the bot.

## Commands

**If you encounter any bugs, please report it to our** [Discord Server](https://discord.gg/s5UcwZTzKg)
<br />

**Before you put any commands put:**
<br />
```js
bot.MessageDetect()
```
<br />

For the command to **actually work**
(Make sure to put it above the commands)
<br />

To create a command do: <br />
```js
bot.cmd({
    name: "<cmd name>", 
    code: "<code>"
});
```
<br />

Every command will start with your prefix like `?ping` <br />

**Example Command:**
<br />
```js
bot.cmd({ 
    name: "ping",
    code: "Pong! ({ping}ms)"
});
```
**Functions:**
<br />
`{ping}` - Sends the Bot's ping <br />

`{message-author-tag}` - Sends the tag of the user who sent/ran the command <br />

`{message-author-id}` - Sends the ID of the User who ran the command <br /> 

`{bot-user-tag}` - Sends the tag of your Bot <br />

`{bot-user-id}` - Sends the ID of your Bot <br />

`{guildname}` - Sends the Guild's name <br />

Since this is the Dev branch, there is unfortunately, no documentation for this, _yet._

## Slash Commands

Make sure your bot has the permission to create slash commands 

Simple Ping Slash Command:
```js
bot.slashCommand({
    name: "ping",
    description: "a simple ping command",
    code: "pong",
    // optional
    guildId: "1234567890"
});
```

You can also put `{ping}` inside `code: ""` to get the bots ping.

If you want your slash command to only be created on a specific server, then you can put the server's guild ID in `guildId`

To detect the slash command: <br />
```js
bot.slashCommandDetect("ping")
```

You will have to do `bot.slashCommandDetect("<slashCommandName>")` to detect the slash commands you've created, otherwise the bot will say `"interaction failed"`

### Status

```js 
bot.status("<status>", { type: "PLAYING" });
``` 
<br />

or a **Changing Status Loop** <br />
```js
bot.loopStatus(["<status>", "another one"], 1000, { type: "PLAYING" })
```
<br />

It must be on an Array, otherwise it'll send an error. <br />

The Second Argument (or the time) is in Miliseconds (1000 = 1 second), and you can't go below 1000 ms, or it'll send an error. <br />

Status Types are: <br />
`PLAYING`, `LISTENING`, `WATCHING`, and `STREAMING`

### Member Leave Event

```js
bot.guildMemberRemove({
    message: "Sad to see you leave {member-tag}",
    // put any message you want
    channel: "<CHANNEL ID>"
});
```

Functions: <br />
`{member-tag}` - Returns the member's tag <br />

`{member-id}` - Returns the member's ID <br />

`{guildname}` - Returns the Guild's name <br />

### Join Message Event

```js
bot.guildMemberAdd({
    // put any message here
    message: "{member-tag} Welcome to {guildname}!",
    channel: "<channel ID>"
});
```

Functions: <br />
`{member-tag}` - Return the member's tag

`{member}` - Mentions the member that just joined

`{guildname}` - Returns the Guild's name

`{member-id}` - Returns the member's id

`{guild-memmber-count}` - Returns the Guild's Member Count (Will Include Bots)

## Links
Report the bugs on our Discord Server, and/or to our GitHub Repository.

[Gydo-JS Discord Server](https://discord.gg/s5UcwZTzKg)

[Dev Branch](https://npmjs.com/package/gydo.js-dev)

[Github Repo](https://github.com/Gydo-Team/gydo-js)