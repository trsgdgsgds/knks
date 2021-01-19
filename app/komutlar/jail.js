const Discord = require('discord.js')
const db = require('quick.db')

exports.run = async (client, message, args) => {

 if(!['777636726704701471'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 
  

const kayıtlı = message.guild.roles.cache.find(r => r.id === '776468034104983553')
const kayıtsız2 = message.guild.roles.cache.find(r => r.id === '775797046774988811')
const kayıtsız = message.guild.roles.cache.find(r => r.id === '775797044601159680')

if(!kayıtlı) return message.reply('Cezalı Rolü Ayarlanmamış.') 
if(!kayıtsız) return message.reply('Cezasız Rolü Ayarlanmamış.') 
  
let member = message.mentions.users.first() || client.users.cache.get(args.join(' '))
if(!member) return message.channel.send('Kime Ceza Vermem Gerekiyor ?')
let stg = message.guild.member(member)

stg.roles.add(kayıtlı)
stg.roles.remove(kayıtsız2)
stg.roles.remove(kayıtsız)

db.add(`jailsayısı.${message.author.id}`, 1)
db.add(`erkekUye.${message.author.id}`, 1)
let erkek = db.get(`erkekUye.${message.author.id}`);
let kayıtlar = db.fetch(`jailsayısı.${message.author.id}`); 
  
const embed = new Discord.MessageEmbed()
.setTitle(`Ceza İşlemi Tamamlandı <a:mavimsitik:775837548105957397>`)
    .addField(`Ceza Veren:`, `<@${message.author.id}> Tarafından Ceza Verildi`) 
    .addField(`Cezalı:`, `<@${stg.user.id}> Kayıt Oldu`)
    .addField(`Verilen Rol:`, `<@&${kayıtlı.id}> Rolleri Verildi`) 
    .addField(`Yetkili Toplam:`, `\`${kayıtlar}\` Cezalandırmaya Sahip.`)
.setFooter(`BadTeam`)
.setColor('BLUE')
client.channels.cache.get('777657863526940753').send(embed)
  
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['jail','j'],
    permLevel: 0
};

exports.help = {
    name: 'jail',
};