const db = require("quick.db");
const Discord = require("discord.js");
const fs = require("fs");
const moment = require('moment')
const yaml = require("js-yaml");
const { mainprefix, color } = yaml.load(fs.readFileSync("./config.yml"));


module.exports = {
  name: "userinfo",
  description: "check someones info",
  run: async (client, message, args) => {
      let embed = db.fetch(`embed_${message.guild.id}`)
      let user = message.mentions.members.first() || message.author
      const info = new Discord.MessageEmbed()
      .setColor(`${embed || color}`)
      .setTitle(`🔍 User Informantion For **${user.tag}**`)
      .setFooter(client.user.username, client.user.avatarURL())
      .addField(`Joined This Server`, `${moment.utc(user.joinedAt).format('LLL')}`)
      .addField(`Created Their Account`, `${moment.utc(user.createdAt).format('LLL')}`)
      .addField(`📂 Messages`, `${db.fetch(`messages_${message.guild.id}_${user.id}` || 0)}`)
      message.channel.send(info)
      }
}
      