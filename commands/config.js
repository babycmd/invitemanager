const db = require("quick.db");
const fs = require("fs");
const yaml = require("js-yaml");
const Discord = require("discord.js");
const { mainprefix, defaultjoinmessage, defaultleavemessage, color } = yaml.load(
  fs.readFileSync("./config.yml")
);
module.exports = {
  name: "config",
  description: "null",
  run: async (client, message, args) => {
     let embed = db.fetch(`embed_${message.guild.id}`)
    if (!message.member.hasPermission("MANAGE_GUILD"))
      return message.channel.send(
        "You need `MANAGE GUILD` to configure the server settings!"
      );
    let content = args[0];
    let prefix = await db.get(`guildprefix_${message.guild.id}`);
    if (prefix === null) prefix = mainprefix;
    if (!content) {
      let kk = new Discord.MessageEmbed()
        .setColor(`${embed || color}`)
        .setTitle(`${message.guild.name} Settings`)
        .setDescription(
          ` Invaild Value of \`\`\`key\`\`\` Not AVaild value.
      \`\`\`${prefix}config [key] [value]\`\`\`
      \`\`\`joinMessage\`\`\`,\`\`\`joinMessageChannel\`\`\`,\`\`\`joinMessage\`\`\`,\`\`\`leaveMessage\`\`\`,\`\`\`leaveMessageChannel\`\`\`,\`\`\`prefix\`\`\`,\`\`\`show\`\`\``
        )
        .setFooter(message.guild.name, client.user.displayAvatarURL());
     return message.channel.send(kk);
    }
    if (content.toLowerCase() === "prefix") {
      let prefixembed = new Discord.MessageEmbed()
           .setColor(`${embed || color}`)
        .setTitle(`**prefix**`)
        .setDescription(
          `This config is currently set.
      Use \`\`\`${prefix}config prefix <value>\`\`\` to change it.
      **Current Value**
      \`\`\`${prefix}\`\`\`
      `
        )
        .setFooter(message.guild.name, client.user.displayAvatarURL());
      let newprefix = args[1];

      if (!newprefix) {
        return message.channel.send(prefixembed);
      }
      let changedprefix = new Discord.MessageEmbed()
        .setTitle(`**Prefix Updated**`)
             .setColor(`${embed || color}`)
        .setDescription(
          `** Old Value **\n${prefix}\n** New Value **\n${newprefix}`
        )
        .setFooter(message.guild.name, client.user.displayAvatarURL());
      db.delete(`guildprefix_${message.guild.id}`);
      db.set(`guildprefix_${message.guild.id}`, newprefix);
      return message.channel.send(changedprefix);
    }

    if (content.toLowerCase() === "joinmessage") {
      let joinmessage = args.slice(1).join(" ");
      let joinmessageconfig = new Discord.MessageEmbed()
        .setTitle(`**Join Message**`)
            .setColor(`${embed || color}`)
        .setDescription(
          `This config is currently set.
        Use \`\`\`${prefix}config joinmessage <message>\`\`\` to change it.
        ** EVENTS **
        {user} = member username
        {inviter} = inviter
        {createdat} = member account creation date
        {jointimes} = shows how many time this user joined guild 
        `
        )
        .setFooter(message.guild.name, client.user.displayAvatarURL());
      if (!joinmessage) {
        return message.channel.send(joinmessageconfig);
      }
      let oldjoinmessage = db.get(`joinmessage_${message.guild.id}`);
      if (oldjoinmessage === null) oldjoinmessage = "None";
      let jointimesdata = db.get(
        `jointimes_${message.guild.id}_${message.author.id}`
      );
      if (jointimesdata === null) jointimesdata = "First Time";
      let joinmsgreplace = joinmessage
        .toLowerCase()
        .replace("{user}", message.author.username)
        .replace("{guild}", message.guild.name)
        .replace("{inviter}", message.author.username)
        .replace("{jointimes}", jointimesdata)
        .replace("{createdat}", message.author.createdAt.toLocaleDateString())
        .replace("{user}", message.author.username)
        .replace("{guild}", message.guild.name)
        .replace("{inviter}", message.author.username)
        .replace("{jointimes}", jointimesdata)
        .replace("{createdat}", message.author.createdAt.toLocaleDateString())
        .replace("{user}", message.author.username)
        .replace("{guild}", message.guild.name)
        .replace("{inviter}", message.author.username)
        .replace("{jointimes}", jointimesdata)
        .replace("{createdat}", message.author.createdAt.toLocaleDateString())
        .replace("{user}", message.author.username)
        .replace("{guild}", message.guild.name)
        .replace("{inviter}", message.author.username)
        .replace("{jointimes}", jointimesdata)
        .replace("{createdat}", message.author.createdAt.toLocaleDateString())
        .replace("{user}", message.author.username)
        .replace("{guild}", message.guild.name)
        .replace("{inviter}", message.author.username)
        .replace("{jointimes}", jointimesdata)
        .replace("{createdat}", message.author.createdAt.toLocaleDateString())
        .replace("{user}", message.author.username)
        .replace("{guild}", message.guild.name)
        .replace("{inviter}", message.author.username)
        .replace("{jointimes}", jointimesdata)
        .replace("{createdat}", message.author.createdAt.toLocaleDateString())
        .replace("{user}", message.author.username)
        .replace("{guild}", message.guild.name)
        .replace("{inviter}", message.author.username)
        .replace("{jointimes}", jointimesdata)
        .replace("{createdat}", message.author.createdAt.toLocaleDateString())
        .replace("{user}", message.author.username)
        .replace("{guild}", message.guild.name)
        .replace("{inviter}", message.author.username)
        .replace("{jointimes}", jointimesdata)
        .replace("{createdat}", message.author.createdAt.toLocaleDateString())
        .replace("{user}", message.author.username)
        .replace("{guild}", message.guild.name)
        .replace("{inviter}", message.author.username)
        .replace("{jointimes}", jointimesdata)
        .replace("{createdat}", message.author.createdAt.toLocaleDateString());

      let joinmessagevalueupdate = new Discord.MessageEmbed()
        .setTitle(`**JoinMessage Updated!**`)
        .setColor(`${embed || color}`)
        .setDescription(
          `** Old Value **\n${oldjoinmessage}\n** New Value **\n${joinmsgreplace}`
        )
        .setFooter(message.guild.name, client.user.displayAvatarURL());
      db.delete(`joinmessage_${message.guild.id}`);
      db.set(`joinmessage_${message.guild.id}`, joinmsgreplace);
      return message.channel.send(joinmessagevalueupdate);
    }
    if (content.toLowerCase() === "leavemessage") {
      let leavemessage = args.slice(1).join(" ");
      let leavemessageconfig = new Discord.MessageEmbed()
        .setTitle(`**Leave Message**`)
        .setColor(`${embed || color}`)
        .setDescription(
          `This config is currently set.
        Use \`\`\`${prefix}config leavemessage <message>\`\`\` to change it.
        ** EVENTS **
        {user} = member username
        `
        )
        .setFooter(message.guild.name, client.user.displayAvatarURL());
      if (!leavemessage) {
        return message.channel.send(leavemessageconfig);
      }
      let oldleavemessage = db.get(`leavemessage_${message.guild.id}`);
      if (oldleavemessage === null) oldleavemessage = "None";
      let leavemsgreplace = leavemessage
        .toLowerCase()
        .replace("{user}", message.author.username)
        .replace("{user}", message.author.username)
        .replace("{user}", message.author.username)
        .replace("{user}", message.author.username)
        .replace("{user}", message.author.username)
        .replace("{user}", message.author.username)
        .replace("{user}", message.author.username)
        .replace("{user}", message.author.username);

      let joinmessagevalueupdate = new Discord.MessageEmbed()
        .setTitle(`**LeaveMessage Updated!**`)
        .setColor(`${embed || color}`)
        .setDescription(
          `** Old Value **\n${oldleavemessage}\n** New Value **\n${leavemsgreplace}`
        )
        .setFooter(message.guild.name, client.user.displayAvatarURL());
      db.delete(`leavemessage_${message.guild.id}`);
      db.set(`leavemessage_${message.guild.id}`, leavemsgreplace);
      return message.channel.send(joinmessagevalueupdate);
    }
    if (content.toLowerCase() === "joinmessagechannel") {
      let joinchannelmessagedata = db.get(
        `joinchannelmessage_${message.guild.id}`
      );
      if (joinchannelmessagedata === null) joinchannelmessagedata = "none";
      let joinchannel = message.mentions.channels.first();
      let joinchannelmessage = new Discord.MessageEmbed()
        .setTitle(`** joinMessageChannel **`)
        .setColor(`${embed || color}`)
        .setDescription(
          `This config is currently set.
        Use \`\`\`${prefix}config joinMessageChannel #channel\`\`\` to change it.

        **Current Value**
        <#${joinchannelmessagedata}>
        `
        )
        .setFooter(message.guild.name, client.user.displayAvatarURL());
      if (!joinchannel) {
        return message.channel.send(joinchannelmessage);
      }
      const joinmessageupdated = new Discord.MessageEmbed()
        .setTitle(`**JoinMessageChannel Updated**`)
        .setColor(`${embed || color}`)
        .setDescription(
          `** Old Value **\n<#${joinchannelmessagedata}>\n** New Value **\n<#${joinchannel.id}>`
        )
        .setFooter(message.guild.name, client.user.displayAvatarURL());
      db.delete(`joinchannelmessage_${message.guild.id}`);
      db.set(`joinchannelmessage_${message.guild.id}`, joinchannel.id);
      return message.channel.send(joinmessageupdated);
    }
    if (content.toLowerCase() === "leavemessagechannel") {
      let leavechanneldata = db.get(`leavechannelmessage_${message.guild.id}`);
      if (leavechanneldata === null) leavechanneldata = "none";

      let leavechannel = message.mentions.channels.first();
      let leavemessageembed = new Discord.MessageEmbed()
        .setTitle(`** LeaveMessageChannel **`)
         .setColor(`${embed || color}`)
        .setDescription(
          `This config is currently set.
        Use \`\`\`${prefix}config LeaveMessageChannel #channel\`\`\` to change it.

        **Current Value**
        <#${leavechanneldata}>
        `
        )
        .setFooter(message.guild.name, client.user.displayAvatarURL());
      if (!leavechannel) {
        return message.channel.send(leavemessageembed);
      }
      const leavemessageupdated = new Discord.MessageEmbed()
        .setTitle(`**LeaveChannelMessage Updated**`)
           .setColor(`${embed || color}`)
        .setDescription(
          `** Old Value **\n<#${leavechanneldata}>\n** New Value **\n<#${leavechanneldata.id}>`
        )
        .setFooter(message.guild.name, client.user.displayAvatarURL());
      db.delete(`leavechannelmessage_${message.guild.id}`);
      db.set(`leavechannelmessage_${message.guild.id}`, leavechannel.id);
      return message.channel.send(leavemessageupdated);
    }
    if (content.toLowerCase() === "show") {
      let joinmessage = db.get(`joinmessage_${message.guild.id}`);
      if (joinmessage === null) joinmessage = defaultjoinmessage;
      let leavemessage = db.get(`leavemessage_${message.guild.id}`);
      if (leavemessage === null) leavemessage = defaultleavemessage;
      let joinchannelmessage = db.get(`joinchannelmessage_${message.guild.id}`);
      let joinchannelmessage2 = db.get(
        `joinchannelmessage_${message.guild.id}`
      );
      if (joinchannelmessage === null) joinchannelmessage = "None";
      else joinchannelmessage = `<#${joinchannelmessage2}>`;
      let leavechannelmessage = db.get(
        `leavechannelmessage_${message.guild.id}`
      );
      let leavechannelmessage2 = db.get(
        `leavechannelmessage_${message.guild.id}`
      );
      if (leavechannelmessage === null) leavechannelmessage = "None";
      else leavechannelmessage = `<#${leavechannelmessage2}>`;
      let guildconfig = new Discord.MessageEmbed()
        .setAuthor(
          `${message.guild.name} Server Config.`,
          message.author.displayAvatarURL()
        )
           .setColor(`${embed || color}`)
        .addField(`Prefix`, prefix, true)
        .addField(`JoinMessage`, joinmessage, true)
        .addField(`LeaveMessage`, leavemessage, true)
        .addField(`JoinMessageChannel`, joinchannelmessage, true)
        .addField(`LeaveMessageChannel`, leavechannelmessage, true)
        .setFooter(client.user.username, client.user.displayAvatarURL());
     
      return message.channel.send(guildconfig);
    }
  }
};
