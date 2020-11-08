# PinBot

A simple bot that pins (`!pin`) or unpins (`!unpin`) a message whose ID is passed in parameter 🙂
/
Un bot tout simple qui épingle (`!pin`) ou désépingle (`!unpin`) un message dont l'ID est passé en paramètre 🙂

Syntax/Syntaxe :

```
!pin <message ID>
!unpin <message ID>
```

# Setup

In order to get the bot working, create a `config.json5` file at the root of the project containing the following:

```js
{
  // The bot's auth token
  token: "Your bot's auth token here :)",

  // The bot's commands prefix
  prefix: "!"
}
```

And then install the dependencies :

```bash
yarn
```

# Running the bot

```bash
# Start the bot and watch for changes (useful for dev)
yarn watch

# Normally start the bot
node bot.js
```
