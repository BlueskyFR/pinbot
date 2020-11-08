// Allow parsing of .json5 files (with comments and all the good stuff)
require("json5/lib/register");
const Discord = require("discord.js");
const bot = new Discord.Client();

// Load the config file
const config = require("./config.json5");

bot.on("ready", () => console.log(`Logged in as ${bot.user.tag}!`));

bot.on("message", (msg) => {
  if (!msg.content.startsWith(config.prefix) || msg.author.bot) return;

  const args = msg.content.slice(config.prefix.length).split(/ +/);
  const command = args.shift().toLowerCase();
  if (!command) return;

  switch (command) {
    case "pin":
      pin(msg, args, true);
      break;

    case "unpin":
      pin(msg, args, false);
      break;
  }
});

bot.login(config.token);

function error(msg, errorMsg) {
  msg.channel.send(`${msg.author} ${errorMsg}`);
  msg.react("❌");
}

/**
 *
 * @param {string} msg The message containing the command
 * @param {Array<string>} args The arguments supplied after the command
 * @param {boolean} pin Whether to pin (true) or unpin (false) the message
 * Note that asking to pin a already pinned message will do nothing, and vice-versa.
 */
async function pin(msg, args, shouldPin) {
  if (!args.length) return error(msg, "Il manque l'ID du message en argument 🙂");

  if (!msg.pinnable)
    return error(msg, `Je ne peux pas ${!shouldPin ? "dés" : ""}épingler ce message 😦`);

  // Fetch the message to pin or unpin and catch the error if the ID is invalid
  let fetchedMsg = await msg.channel.messages.fetch(args[0]).catch((e) => e);
  if (fetchedMsg instanceof Discord.Message) {
    if (shouldPin === fetchedMsg.pinned)
      return error(msg, `Le message est déjà ${shouldPin ? "épinglé" : "non-épinglé"} 🙂`);

    // Pin or unpin the message
    await fetchedMsg[shouldPin ? "pin" : "unpin"]();
    msg.react("✅");
  } else {
    error(msg, "Il semblerait que l'ID soit invalide 🤔");
  }
}
