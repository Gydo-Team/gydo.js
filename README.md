<div align="center">
  <br />
  <p>
    <a href="#"><img src="https://i.imgur.com/D0F1l8i.png" alt="logo"/></a>
  </p>
  <p>
    <a href="https://discord.gg/s5UcwZTzKg"><img src="https://img.shields.io/discord/823028211075383316?label=Gydo-JS%20Server&logo=discord" alt="Discord Server" /></a>
    <a href="https://npmjs.com/package/gydo.js"><img src="https://img.shields.io/npm/v/gydo.js?color=%23acff00&label=gydo.js&logo=npm" alt="npm gydo"></a>
    <img alt="GitHub code size in bytes" src="https://img.shields.io/github/languages/code-size/Gydo-Team/gydo.js" >
    <img alt="npm" src="https://img.shields.io/npm/dt/gydo.js">
  </p>
  <br />
</div>

# 📦 gydo.js

'Gydo-js' is a form of discord.js designed to simplify the process of creating a Discord bot.

## Table of Contents

- [Links](#links)
- [Contributing](#contributing)

## Rewrite

gydo.js is currently being rewritten, for more info go to our [GitHub repo](https://github.com/Gydo-Team/gydo.js)

If you see any bugs/issue you may report it to the GitHub repo.

## Example

```js
const { Bot } = require("gydo.js");
const bot = new Bot({
    token: "your bot token here",
    prefix: "!",
    // could be any prefix
});

bot.command({
    name: "ping",
    code: `Pong! | ${bot.ws.ping}`,
});
```

**Note:** the `Bot` class extends the [Client](https://discord.js.org/#/docs/discord.js/stable/class/Client) class, that is why we are able to access the ping value

## Contributing

You can contribute on gydo.js dev branch by making a pull request on our [GitHub Repository](https://github.com/Gydo-Team/gydo.js)

[See Contributing Guide](https://github.com/Gydo-Team/gydo.js-dev/blob/main/docs/CONTRIBUTING.md)

...and Thanks for Contributing!

## Links
Report the bugs on our Discord Server, and/or to our GitHub Repository.

[Gydo-JS Discord Server](https://discord.gg/s5UcwZTzKg)

[Github Repo](https://github.com/Gydo-Team/gydo.js)