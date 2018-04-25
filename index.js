const Discord = require("discord.js");
const bot = new Discord.Client({disableEveryone: true}); // botnya tidak akan bisa mention @everyone
const config = require("./config.json"); // kita akan menaruh prefix dan token disini

bot.on("ready", async () => {
  bot.user.setUsername("TOXBOT")
    console.log(`${bot.user.username} Sudah Coli!!`);
    bot.user.setActivity("YouPorn", {type: "WATCHING"});
});

bot.on('message', message => {

    // Variables - Variables make it easy to call things, since it requires less typing.
    let msg = message.content.toUpperCase(); // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author; // This variable takes the message, and finds who the author is.
    let cont = message.content.slice(prefix.length).split(" "); // This variable slices off the prefix, then puts the rest in an array based off the spaces
    let args = cont.slice(1); // This slices off the command in cont, only leaving the arguments.

    // Commands

    // Ping
    if (msg === prefix + 'PING') { // This checks if msg (the message but in all caps), is the same as the prefix + the command in all caps.

        // Now, let's send a response.
        message.channel.send('Ping!'); // This 'sends' the message to the channel the message was in. You can change what is in the message to whatever you want.

    }


    // Purge
    if (msg.startsWith(prefix + 'PURGE')) { // This time we have to use startsWith, since we will be adding a number to the end of the command.
        // We have to wrap this in an async since awaits only work in them.
        async function purge() {
            message.delete(); // Let's delete the command message, so it doesn't interfere with the messages we are going to delete.

            // Now, we want to check if the user has the `bot-commander` role, you can change this to whatever you want.
            if (!message.member.roles.find("name", "bot-commander")) { // This checks to see if they DONT have it, the "!" inverts the true/false
                message.channel.send('You need the \`bot-commander\` role to use this command.'); // This tells the user in chat that they need the role.
                return; // this returns the code, so the rest doesn't run.
            }

            // We want to check if the argument is a number
            if (isNaN(args[0])) {
                // Sends a message to the channel.
                message.channel.send('Please use a number as your arguments. \n Usage: ' + prefix + 'purge <amount>'); //\n means new line.
                // Cancels out of the script, so the rest doesn't run.
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]}); // This grabs the last number(args) of messages in the channel.
            console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

            // Deleting the messages
            message.channel.bulkDelete(fetched)
                .catch(error => message.channel.send(`Error: ${error}`)); // If it finds an error, it posts it into the channel.

        }

        // We want to make sure we call the function whenever the purge command is run.
        purge(); // Make sure this is inside the if(msg.startsWith)

    }
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
        .addField(":crown: Owner:", "α Ļ ḯ β Ÿ #4242"); // owner dari guild

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
