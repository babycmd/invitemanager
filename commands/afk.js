const Discord = require("discord.js");
const db = require("quick.db");
const fs = require("fs");
const yaml = require("js-yaml");
const {
  mainprefix,
  defaultjoinmessage,
  defaultleavemessage,
  color
} = yaml.load(fs.readFileSync("./config.yml"));

module.exports = {
  name: "afk",
  description: "set yourself afk",
  run: async (client, message, args) => {
    let embed = db.fetch(`embed_${message.guild.id}`);
    var USER = message.author;
    var REASON = args.slice(0).join("  ");
    const no = new Discord.MessageEmbed()
      .setColor(`${embed || color}`)
      .setDescription(`Please mention a reason to be **afk!**`)
      .setFooter(client.user.username, client.user.avatarURL());
    if (!REASON) return message.channel.send(no);
    db.set(`afk_${USER.id}`, REASON);
    db.set(`afktime_${USER.id}`, Date.now());
    const afk = new Discord.MessageEmbed()
      .setColor(`${embed || color}`)
      .setDescription(`Your Now **Afk** ${USER}`)
      .setFooter(client.user.username, client.user.avatarURL());
    message.channel.send(afk);
  }
};
