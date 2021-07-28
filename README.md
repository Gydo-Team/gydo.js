<div align="center">
  <br />
  <p>
    <a href="https://discord.gg/s5UcwZTzKg"><img src="https://img.shields.io/discord/823028211075383316?label=Gydo-JS%20Server&logo=discord" alt="Discord Server"/></a>
    <a href="https://npmjs.com/package/gydo.js-dev"><img src="https://img.shields.io/npm/v/gydo.js-dev?color=%23acff00&label=gydo-js&logo=npm" alt="npm gydo" />
  </p>
</div>

# Gydo-JS

This project is still in beta! So you might encounter some bugs! Please report the bugs on [our discord server.](https://discord.gg/wGWWCvHU6s)

## How to Install Gydo-JS

Type in the cmd/terminal

`
npm i gydo-js
`

## Table of Contents

- [Setup](#setup)
  - [Create a command](#commands)
  - [Set Bot's Status](#botstatus)
- [Member Join Message](#joinmessageevent)
- [Member Leave Message](#memberleaveevent)
- [Links](#links)

## Setup

```js
const gydo = require('gydo-js');
const bot = new gydo({
    token: "<TOKEN HERE>",
    prefix: "<PREFIX>"
});
```

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
bot.cmd("<cmd name>", "<code>")
```
<br />

Every command will start with your prefix like `?ping` <br />

**Example Command:**
<br />
```js
bot.cmd("ping", "Pong! ({ping}ms)")
```
**Functions:**
<br />
`{ping}` - Sends the Bot's ping <br />

`{message-author-tag}` - Sends the tag of the user who sent/ran the command <br />

`{message-author-id}` - Sends the ID of the User who ran the command <br /> 

`{bot-user-tag}` - Sends the tag of your Bot <br />

`{bot-user-id}` - Sends the ID of your Bot <br />

`{guildname}` - Sends the Guild's name <br />

There is unfortunately, no documentation for this, _yet._

### Bot Status

```js
bot.status({
    status: "<your status>",
    type: "PLAYING"
});
```

or a **Changing Status Loop** <br />
```js
bot.loopStatus(["<status>", "another one"], 1000, { type: "PLAYING" })
```
<br />

Status Types: <br />
`PLAYING` <br />
`LISTENING` <br />
`STREAMING` <br />
`WATCHING` <br />

If you encounter any bugs please report it to [our Server](https://discord.gg/wGWWCvHU6s)

### Member Leave Event

```js
bot.guildMemberRemove({
    message: "Sad to see you leave {member-tag}",
    // put any message you want
    channel: "<CHANNEL ID>",
    default: false
});
```

Functions: <br />
`{member-tag}` - Returns the member's tag <br />

`{member-id}` - Returns the member's ID <br />

`{guildname}` - Returns the Guild's name <br />

If the `default` is set to true, It will ignore the custom message and will send this one instead: `Sad to see you leave MemberTag#0001` <br />


If set to false it will ignore the default message and will send the custom one. <br />

### Join Message Event

```js
bot.guildMemberAdd({
    // put any message here
    message: "{member-tag} Welcome to {guildname}!",
    channel: "<channel ID>"
});
```

Functions: <br />
`{member-tag}` - Return the member's tag <br />

`{member}` - Mentions the member that just joined <br />

`{guildname}` - Returns the Guild's name <br />

`{member-id}` - Returns the member's id <br />

`{guild-memmber-count}` - Returns the Guild's Member Count (Will Include Bots)

## Links
[Click here](https://gydo.gitbook.io/gydo-js/)

[Join our Discord server!](https://discord.gg/wGWWCvHU6s)