const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true}); // botnya tidak akan bisa mention @everyone
const config = require("./config.json"); // kita akan menaruh prefix dan token disini

bot.on("ready", async () => {
  bot.user.setUsername("TOXBOT")
    console.log(`${bot.user.username} Sudah Coli!!`);
    bot.user.setActivity("Prefix %", {type: "WATCHING"});
});

bot.on("message", async message => {
    if (message.author.bot) return; // bot kita tidak akan menjawab jika command dikirim oleh bot lain
    if (message.channel.type === 'dm') return; // bot kita tidak akan menjawab jika kita menggunakan command di DM atau PM

    let prefix = config.prefix;
    let messageArray = message.content.split(" "); // command bisa disisipkan spasi
    let cmd = messageArray[0];
    let args = messageArray.slice(1);

    if (cmd === `${prefix}halo`) { // bukan ping tapi halo :U
        message.reply("Halo juga!! :kissing:");
    }

    if (cmd === `${prefix}ping`) {
       let ping = Date.now() - message.createdTimestamp
       let embed = new Discord.RichEmbed()
       .setTitle('PING! PONG! :ping_pong:')
       .addField('Latency',`${ping}ms`, true)
       .setColor('#33C1FF')
      message.channel.send({embed})
       
    }

    if (cmd === `${prefix}atfroost`) {
        message.channel.send("Haloo Prefix ku %");
    }

    if (cmd === `${prefix}avatar`) {
        var embed = new Discord.RichEmbed()
        .setAuthor("AVATAR")
        .setImage(message.author.avatarURL)
        .setColor("RANDOM")

        message.channel.send(embed)
        
    }
  
 if (cmd === `${prefix}help`) {
        let bicon = bot.user.displayAvatarURL;
        let embed = new Discord.RichEmbed()
        .setAuthor("Bantuan Command")
        .setDescription("Hallo Semua Aku **TOXBOT**")
        .setColor("RANDOM")
        .setThumbnail(bicon)
        .addField("Fitur ku:"," `halo` `ping` `avatar` `botinfo` `serverinfo`", true)
        .setFooter("Beta BOT")

        message.channel.send(embed);
    }
  

    if (cmd === `${prefix}botinfo`) {
        let bicon = bot.user.displayAvatarURL; // untuk menampilkan avatar dari bot kalian
        let botembed = new Discord.RichEmbed()
        .setAuthor("Informasi Bot:")
        .setColor("RANDOM") // kalian juga bisa menggunakan kode HEX, cari di google
        .setThumbnail(bicon) // thumbnail dari avatar bot kalian tadi
        .addField("Nama Bot:", bot.user.username)
        .addField("Dibuat:", bot.user.createdAt)
        .addField(":crown: Owner:", "Ata #4242"); // owner dari guild

        message.channel.send(botembed); // untuk mengirim embed yang sudah dibuat diatas..
    }

    if (cmd === `${prefix}serverinfo`) {
        let sicon = message.guild.iconURL; // kalau server gunakan icon bukan displayAvatar
        let serverembed = new Discord.RichEmbed()
        .setAuthor("Informasi Server")
        .setColor("RANDOM")
        .setThumbnail(sicon)
        .addField("Nama Server", message.guild.name) // nama dari guildnya
        .addField("Dibuat", message.guild.createdAt) // tanggal dibuat guildnya
        .addField("Kamu Join", message.member.joinedAt) // tanggal kamu join guild
        .addField("Owner", message.guild.owner); // owner dari guild

        message.channel.send(serverembed);
    }

    if(cmd === `${prefix}kick`){

        //!kick @daeshan askin for it
    
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("Can't find user!");
        let kReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("No can do pal!");
        if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
    
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("~Kick~")
        .setColor("#e56b00")
        .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
        .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Kicked In", message.channel)
        .addField("Tiime", message.createdAt)
        .addField("Reason", kReason);
    
        let kickChannel = message.guild.channels.find(`name`, "incidents");
        if(!kickChannel) return message.channel.send("Can't find incidents channel.");
    
        message.guild.member(kUser).kick(kReason);
        kickChannel.send(kickEmbed);
    
        return;
      }

      if(cmd === `${prefix}ban`){

        let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!bUser) return message.channel.send("Can't find user!");
        let bReason = args.join(" ").slice(22);
        if(!message.member.hasPermission("MANAGE_MEMBERS")) return message.channel.send("No can do pal!");
        if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");
    
        let banEmbed = new Discord.RichEmbed()
        .setDescription("~Ban~")
        .setColor("#bc0000")
        .addField("Banned User", `${bUser} with ID ${bUser.id}`)
        .addField("Banned By", `<@${message.author.id}> with ID ${message.author.id}`)
        .addField("Banned In", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", bReason);
    
        let incidentchannel = message.guild.channels.find(`name`, "incidents");
        if(!incidentchannel) return message.channel.send("Can't find incidents channel.");
    
        message.guild.member(bUser).ban(bReason);
        incidentchannel.send(banEmbed);
    
    
        return;
      }

      if(cmd === `${prefix}report`){

        //!report @ned this is the reason
    
        let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!rUser) return message.channel.send("Couldn't find user.");
        let rreason = args.join(" ").slice(22);
    
        let reportEmbed = new Discord.RichEmbed()
        .setDescription("Reports")
        .setColor("#15f153")
        .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
        .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
        .addField("Channel", message.channel)
        .addField("Time", message.createdAt)
        .addField("Reason", rreason);
    
        let reportschannel = message.guild.channels.find(`name`, "reports");
        if(!reportschannel) return message.channel.send("Couldn't find reports channel.");
    
    
        message.delete().catch(O_o=>{});
        reportschannel.send(reportEmbed);
    
        return;
      }
    });

bot.on('guildMemberAdd', member => {
    let channel = member.guild.channels.find('name', 'welcome-goodbye');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField(':bust_in_silhouette: | Nama : ', `${member}`)
        .addField(':wave: | Haloo!!', `Selamat Datang!!!, ${member}`)
        .addField(':id: | User :', "**[" + `${member.id}` + "]**")
        .addField(':family_mwgb: | Kamu Member Sekarang!!!', `${member.guild.memberCount}`)
        .addField("Nama", `<@` + `${member.id}` + `>`, true)
        .addField('Server', `${member.guild.name}`, true )
        .setFooter(`${member.guild.name}`)

        channel.sendEmbed(embed);
});

bot.on('guildMemberAdd', member => {

    console.log(`${member}`, "has joined" + `${member.guild.name}`)

});

bot.on('guildMemberRemove', member => {
    let channel = member.guild.channels.find('name', 'welcome-goodbye');
    let memberavatar = member.user.avatarURL
        if (!channel) return;
        let embed = new Discord.RichEmbed()
        .setColor('RANDOM')
        .setThumbnail(memberavatar)
        .addField('Nama:', `${member}`)
        .addField('Sudah Pergi', ':(')
        .addField('Bye Bye :(', 'Selamat tinggal')
        .addField('Member Sekarang', `${member.guild.memberCount}` + " members")
        .setFooter(`${member.guild.name}`)

        channel.sendEmbed(embed);
});

bot.on('guildMemberRemove', member => {
    console.log(`${member}` + "has left" + `${member.guild.name}` + "Sending leave message now")
    console.log("Leave Message Sent")
});

bot.login(process.env.BOT_TOKEN);
