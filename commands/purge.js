const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
const yaml = require("js-yaml");
const { mainprefix, color } = yaml.load(fs.readFileSync("./config.yml"));

module.exports = {
  name: "clear",
  description: "clean a amount of messages in chat",
  run: async (client, message, args) => {
    let embed = db.fetch(`embed_${message.guild.id}`);
    let amount = args[0];
    if (!amount) return message.reply(`Please specify a amount to delete!`);
    if (isNaN(amount))
      return message.reply("The amount parameter isn`t a number!");
    if (amount > 100)
      return message.reply("You can`t delete more than 100 messages at once!");
    if (amount < 1)
      return message.reply("You have to delete at least 1 message!");
    await message.channel.messages.fetch({ limit: amount }).then(messages => {
      message.channel.bulkDelete(messages);
      message.channel.send(
        new Discord.MessageEmbed()
          .setColor(`${embed || color}`)
          .setDescription(`Deleted ${amount} Messages! ✅`)
      );
    });
  }
};
