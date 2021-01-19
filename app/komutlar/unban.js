const Discord = require("discord.js");

exports.run = async (client, message, args) => {
  let embed = new Discord.MessageEmbed().setAuthor(message.member.displayName, message.author.avatarURL({dynamic: true})).setColor("#00ffdd").setTimestamp();
  
  if(!message.member.roles.cache.has("775089240974950477") && !message.member.hasPermission('ADMINISTRATOR')) return message.channel.send(embed.setDescription("Bu komutu kullanabilmek için gerekli rollere sahip değilsin!")).then(x => x.delete({timeout: 5000}));
  if (!args[0] || isNaN(args[0])) return message.channel.send(embed.setDescription("Geçerli bir kişi ID'si belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  let kisi = await client.users.fetch(args[0]);
  if(kisi) {
    let reason = args.splice(1).join(" ") || "sebep belirtilmedi";
    message.guild.members.unban(kisi.id).catch(err => message.channel.send(embed.setDescription("Belirtilen ID numarasına sahip bir ban bulunamadı!")).then(x => x.delete({timeout: 5000})));
    message.react("775837548105957397").catch();
    if(client.channels.cache.has("777670434044248105")) client.channels.cache.get("777670434044248105").send(new Discord.MessageEmbed().setColor("#00ffdd").setTimestamp().setTitle('Ban Kaldırıldı!').setDescription(`**Kaldıran Yetkili:** ${message.author} (${message.author.id})\n**Banı Kaldırılan Üye:** ${kisi.tag} (${kisi.id})`));
  } else {
    message.channel.send(embed.setDescription("Geçerli bir kişi ID'si belirtmelisin!")).then(x => x.delete({timeout: 5000}));
  };
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["yasak-kaldır"],
  permLevel: 0
};

exports.help = {
  name: 'unban',
};