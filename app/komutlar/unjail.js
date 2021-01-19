const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

 if(!['777636726704701471'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
  

const kayıtlı = message.guild.roles.cache.find(r => r.id === '775830706504728596')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '776468034104983553')

  
let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
if(!member) return message.channel.send('Kimin Cezasını açmam Gerekiyor ?')
let stg = message.guild.member(member)

stg.roles.add(kayıtlı)

stg.roles.remove(kayıtsız)

db.add(`jailsayısı.${message.author.id}`, 1)
db.add(`erkekUye.${message.author.id}`, 1)
let erkek = db.get(`erkekUye.${message.author.id}`);
let kayıtlar = db.fetch(`kayıtSayi.${message.author.id}`); 
  
const embed = new Discord.MessageEmbed()
.setTitle(`Cezası bitmiştir.`)
     .addField(`Yetkili:`, `<@${message.author.id}> Tarafından Cezası Açıldı.!`) 
 .addField( `<@${stg.user.id}> Cezası bitmiştir`)
.setFooter(`BadTeam`)
.setColor('BLUE')
client.channels.cache.get('777657863526940753').send(embed)

  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['unjail','uj'],
    permLevel: 0
};

exports.help = {
    name: 'unjail',
};