const Discord = require('discord.js')

exports.run = async (client, message, args) => {

let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic : true})).setColor('#00ffdd')

if(args[0] && args[0].includes('list')) {
    try {
      message.guild.fetchBans().then(bans => {
        message.channel.send(`# Sunucudan yasaklanmış kişiler; ⛔\n\n${bans.map(c => `${c.user.id} | ${c.user.tag}`).join("\n")}\n\n# Toplam "${bans.size}" adet yasaklanmış kullanıcı bulunuyor.`, {code: 'xl', split: true});
      });
	  } catch (err) { message.channel.send(`Yasaklı kullanıcı bulunmamakta!`).then(x => x.delete({timeout: 5000}));; }
    return;
  };

  if (args[0] && (args[0].includes('bilgi') || args[0].includes('info'))) {
    if(!args[1] || isNaN(args[1])) return message.channel.send(embed.setDescription(`Geçerli bir ban yemiş kullanıcı ID'si belirtmelisin!`)).then(x => x.delete({timeout: 5000}));;
    return message.guild.fetchBan(args.slice(1).join(' ')).then(({ user, reason }) => message.channel.send(embed.setDescription(`**Banlanan Üye:** ${user.tag} (${user.id})\n**Ban Sebebi:** ${reason ? reason : "Belirtilmemiş!"}`))).catch(err => message.channel.send(embed.setDescription("Belirtilen ID numarasına sahip bir ban bulunamadı!")).then(x => x.delete({timeout: 5000})));
  };

 let victim = message.mentions.members.first() || message.guild.members.cache.get(args[0]);
  let reason = args.splice(1).join(" ");
  if (!reason) return message.channel.send(embed.setDescription("Geçerli bir üye ve sebep belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  if (!victim) {
    let kisi = await client.users.fetch(args[0]);
    if(kisi) {
      message.guild.members.ban(kisi.id, {reason: reason}).catch();
      message.react("775837548105957397").catch();
      if(client.channels.cache.has("777670434044248105")) client.channels.cache.get("777670434044248105").send(new Discord.MessageEmbed().setColor('#00ffdd').setTimestamp().setTitle('Üye Banlandı!').setDescription(`** <a:dcworker:775837529374851092> Banlayan Yetkili:** ${message.author} (${message.author.id})\n** <a:greenbrave:775837559615258625> Banlanan Üye:** ${kisi.tag} (${kisi.id})\n** <a:space:775837545321070634> Sebep:** ${reason}`));
    } else {
      message.channel.send(embed.setDescription("Geçerli bir üye ve sebep belirtmelisin!")).then(x => x.delete({timeout: 5000}));
    };
    return message.reply('Geçerli bir üye ve sebep belirtmelisin!').then(x => x.delete({timeout: 5000}));
  };

    if(message.member.roles.highest.position <= victim.roles.highest.position) return message.channel.send(embed.setDescription("Banlamaya çalıştığın üye senle aynı yetkide veya senden üstün!")).then(x => x.delete({timeout: 5000}));
  if(!victim.bannable) return message.channel.send(embed.setDescription("Botun yetkisi belirtilen üyeyi banlamaya yetmiyor!")).then(x => x.delete({timeout: 5000}));
  victim.send(embed.setDescription(`${message.author} tarafından **${reason}** sebebiyle sunucudan banlandın.`)).catch();
  victim.ban({reason: reason}).then(x => message.react("775837548105957397")).catch();

  message.channel.send(embed.setImage("https://cdn.discordapp.com/attachments/778279470608023563/778300127008784454/ban7.gif").setDescription(`\`${victim.user.tag}\` üyesi ${message.author} tarafından **${reason}** nedeniyle **banlandı!**`));
  if(client.channels.cache.has("777670434044248105")) client.channels.cache.get("777670434044248105").send(new Discord.MessageEmbed().setColor('#00ffdd').setTimestamp().setTitle('Üye Banlandı!').setDescription(`**Banlayan Yetkili:** ${message.author} (${message.author.id})\n**Banlanan Üye:** ${victim.user.tag} (${victim.user.id})\n**Sebep:** ${reason}`));


}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'bann',
};