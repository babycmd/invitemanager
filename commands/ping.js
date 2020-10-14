const Discord = require("discord.js")
const db = require("quick.db")
const fs = require('fs')
const yaml = require("js-yaml");
const { mainprefix, color } = yaml.load(fs.readFileSync("./config.yml"));

module.exports = {
    name: "ping",
    description: "check my ping :)",
    run: async (client, message, args) => {
      let embed = db.fetch(`embed_${message.guild.id}`)
      const msg = await message.channel.send(`🏓 Pinging....`);
      
      let pembed = new Discord.MessageEmbed()
      .setColor("#ff8cf0")
      .setTitle("🏓 Pong!")
      .setThumbnail(message.guild.iconURL())
      .addField("**Latency**", `\`${Date.now() - message.createdTimestamp}ms\``)
      .addField("**API Latency**", `\`${Math.round(client.ws.ping)}ms\``)
      .setTimestamp()
      .setFooter(`${message.author.username}`, message.author.avatarURL());

      msg.edit(' ', pembed);
      
    }
}