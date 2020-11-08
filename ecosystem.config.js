module.exports = {
  apps: [
    {
      name: "pinbot",
      script: "bot.js",
      watch: ".",
      // prettier-ignore
      ignore_watch: ["[\/\\]\./", "node_modules", ".git"],
    },
  ],
};
