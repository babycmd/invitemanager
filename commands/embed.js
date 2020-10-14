const db = require("quick.db");
const fs = require("fs");
const yaml = require("js-yaml");
const Discord = require("discord.js");
const {
  mainprefix,
  defaultjoinmessage,
  defaultleavemessage,
  color
} = yaml.load(fs.readFileSync("./config.yml"));

module.exports = {
  name: "embed",
  description: "set embed color for server",
  run: async (client, message, args) => {
    let color = args[0];
    let embed = db.fetch(`embed_${message.guild.id}`);
    db.set(`embed_${message.guild.id}`, color);
    const sucs = new Discord.MessageEmbed()
      .setDescription(
        `Set The Embed Color For **${message.guild.name}** to ${color}`
      )
      .setColor(`${embed || color}`)
      .setAuthor(client.user.username, client.user.avatarURL());
    message.channel.send(sucs);
  }
};
