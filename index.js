console.log("\nLoading...");
console.log("If This Take Too long make sure u have add right token!");
const fs = require("fs");
const yaml = require("js-yaml");
const { mainprefix, token, color } = yaml.load(fs.readFileSync("./config.yml"));
const Discord = require("discord.js");
const client = new Discord.Client();
const db = require("quick.db");
const { join } = require("path");
const { readdirSync } = require("fs");
client.commands = new Discord.Collection();
client.login('token');
const xpfile = require("./xp.json");
const ms = require("ms");

client.on("ready", () => {
  client.user.setActivity("baby dev", { type: "PLAYING" });
  console.clear();
  console.log(
    "\x1b[36m%s\x1b[0m", 
    `
 yeet                                                                  `
  );
  console.log(
    "\n\x1b[32m%s\x1b[0m",
    `          $[INFO]: Logged on ${client.user.tag} | ${client.user.id}`
  );
  console.log("\x1b[32m%s\x1b[0m", `           $[INFO]: PREFIX ${mainprefix}`);
});

const commandFiles = readdirSync(join(__dirname, "commands")).filter(file =>
  file.endsWith(".js")
);

for (const file of commandFiles) {
  const command = require(join(__dirname, "commands", `${file}`));
  client.commands.set(command.name, command);
}

client.on("message", async message => {
  let prefix = await db.get(`guildprefix_${message.guild.id}`);
  if (prefix === null) prefix = mainprefix;
  if (message.author.bot) return;
  if (message.channel.type === "dm") return;

  if (message.content.startsWith(prefix)) {
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/);

    const command = args.shift().toLowerCase();

    if (!client.commands.has(command)) return;

    try {
      client.commands.get(command).run(client, message, args);
    } catch (error) {
      console.error(error);
    }
  }
});
const guildInvites = new Map();

client.on("inviteCreate", async invite =>
  guildInvites.set(invite.guild.id, await invite.guild.fetchInvites())
);
client.on("ready", () => {
  client.guilds.cache.forEach(guild => {
    guild
      .fetchInvites()
      .then(invites => guildInvites.set(guild.id, invites))
      .catch(err => console.log(err));
  });
});
const { defaultjoinmessage, defaultleavemessage } = yaml.load(
  fs.readFileSync("./config.yml")
);
client.on("guildMemberAdd", async member => {
  let joinchannelmessage = db.get(`joinchannelmessage_${member.guild.id}`);
  if (!joinchannelmessage === null) {
    return console.log(`None`);
  }
  let joinmessage = db.get(`joinchannelmessage_${member.guild.id}`);
  if (joinmessage === null) joinmessage = defaultjoinmessage;

  const catchedInvites = guildInvites.get(member.guild.id);
  const newInvites = await member.guild.fetchInvites();
  guildInvites.set(member.guild.id, newInvites);
  try {
    const usedInvite = newInvites.find(
      inv => catchedInvites.get(inv.code).uses < inv.uses
    );
    db.add(`invites_${member.guild.id}_${usedInvite.inviter.id}`, 1);
    db.set(`inviter_${member.id}`, usedInvite.inviter.id);
    let inv = db.fetch(`invites_${member.guild.id}_${usedInvite.inviter.id}`);
    //let jointimes = db.get(`jointimes_${member.guild.id}_${member.author.id}`)
    //if(jointimes === null) jointimes = "First Time";
    let joinmessage2 = defaultjoinmessage
      .toLowerCase()
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{user}", member.user.tag)
      .replace("{inviter}", usedInvite.inviter.tag)
      .replace("{inviter}", usedInvite.inviter.tag)
      .replace("{inviter}", usedInvite.inviter.tag)
      .replace("{inviter}", usedInvite.inviter.tag)
      .replace("{inv}", inv)
      .replace("{inv}", inv)
      .replace("{inv}", inv)
      .replace("{inv}", inv)
      .replace("{inv}", inv)
      .replace("{inv}", inv);

    //  .replace("{jointimes}", jointimes)
    //  .replace("{jointimes}", jointimes)
    // .replace("{jointimes}", jointimes)
    //  .replace("{jointimes}", jointimes)

    db.add(`jointimes_${member.guild.id}_${member.id}`, 1);
    db.add(`Regular_${member.guild.id}_${usedInvite.inviter.id}`, 1);
    client.channels.cache.get(joinchannelmessage).send(joinmessage2);
  } catch (err) {
    console.log(err);
  }
});

client.on("guildMemberRemove", member => {
  let leavechannel = db.get(`leavechannelmessage_${member.guild.id}`);
  if (leavechannel === null) {
    return console.log(`nope!`);
  }
  let leavemssage = db.get(`leavemessage_${member.guild.id}`);
  if (leavemssage === null) leavemssage = defaultleavemessage;

  let inviter2 = db.fetch(`inviter_${member.id}`);
  const iv2 = client.users.cache.get(inviter2);
  const mi = member.guild.members.cache.get(inviter2);
  db.subtract(`invites_${member.guild.id}_${inviter2}`, 1);
  if (!inviter2) {
    client.channels.cache
      .get(leavechannel)
      .send(`${member} User Left But i cloudnt find who invited him!`);
    return;
  }
  let leavemssage2 = leavemssage
    .toLowerCase()
    .replace("{user}", member.user.tag)
    .replace("{user}", member.user.tag)
    .replace("{user}", member.user.tag)
    .replace("{user}", member.user.tag)
    .replace("{inviter}", `<@${inviter2}>`)
    .replace("{inviter}", `<@${inviter2}>`)
    .replace("{inviter}", `<@${inviter2}>`)
    .replace("{inviter}", `<@${inviter2}>`)
    .replace("{inviter}", `<@${inviter2}>`);

  db.add(`leaves_${member.guild.id}_${inviter2}`, 1);
  client.channels.cache.get(leavechannel).send(leavemssage2);
});

client.on("message", function(message) {
  if (message.author.bot) return;
  var addXP = Math.floor(Math.random() * 10);

  if (!xpfile[message.author.id]) {
    xpfile[message.author.id] = {
      xp: 0,
      level: 1,
      reqxp: 100
    };

    fs.writeFile("./xp.json", JSON.stringify(xpfile), function(err) {
      if (err) console.log(err);
    });
  }

  xpfile[message.author.id].xp += addXP;

  if (xpfile[message.author.id].xp > xpfile[message.author.id].reqxp) {
    xpfile[message.author.id].xp -= xpfile[message.author.id].reqxp;
    xpfile[message.author.id].reqxp *= 2;
    xpfile[message.author.id].reqxp = Math.floor(
      xpfile[message.author.id].reqxp
    );
    xpfile[message.author.id].level += 1;

    message
      .reply("You Are Now Level **" + xpfile[message.author.id].level + "**!")
      .then(msg => msg.delete({ timeout: 10000 }));
  }

  fs.writeFile("./xp.json", JSON.stringify(xpfile), function(err) {
    if (err) console.log(err);
  });
});

client.on("message", async message => {
  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`afk`)) return;
  let embed = db.fetch(`embed_${message.guild.id}`);
  if (await db.fetch(`afk_${message.author.id}`)) {
    db.delete(`afk_${message.author.id}`);
    db.delete(`afktime_${message.author.id}`);
    const embedz = new Discord.MessageEmbed()

      .setColor(`${embed || color}`)
      .setAuthor(message.author.username, message.author.avatarURL())
      .setDescription(
        `**Welcome back <@${message.author.id}>** I Removed your __AFK__`
      );

    message.channel.send(embedz);
  }

  var USER = message.mentions.users.first();
  if (!USER) return;
  var REASON = await db.fetch(`afk_${USER.id}`);

  if (REASON) {
    let gay = await db.fetch(`afktime_${USER.id}`);
    let timeObj = ms(Date.now() - gay);

    const afk = new Discord.MessageEmbed()

      .setColor(`${embed || color}`)
      .setDescription(
        `**THIS USER IS AFK** \n \n **AFK User:** \`${USER.tag}\` \n **AFK Duration:** \`${timeObj.hours} hour\` \`${timeObj.minutes} minutes \` \`${timeObj.seconds} seconds \` \n **Reason:** \`${REASON} \``
      );

    message.channel.send(afk);
  }
});
