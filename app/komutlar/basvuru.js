const Discord = require(`discord.js`)

exports.run = async (client, message, args) => {


let kanal = "777655395081519134"

let isim = args.slice(0).join(' ')

let yaş = args[1]

let il = args[2]

let cinsiyet = args[3]

if(!isim) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`İsim Nedir.`)).then(a => a.delete({timeout:3000}))

if(isNaN(yaş)) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`Yaşını Yazmalısın.`)).then(a => a.delete({timeout:3000}))

if(!il) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`Oturduğun İl.`)).then(a => a.delete({timeout:3000}))

if(!cinsiyet) return message.channel.send(new Discord.MessageEmbed().setColor("RANDOM").setDescription(`Cinsiyetin Nedir Erkek/Kadın.`)).then(a => a.delete({timeout:3000}))


message.channel.send("Başvuru Başarıyla Gönderilmiştir.").then(a => a.delete({timeout:30000}))

let emebed = new Discord.MessageEmbed()
.setColor("RANDOM")
.addField(`Başvuru Yapan Üye`,`${message.author} (${message.author.id})`)
.addField(`İsim`,`${isim} `)
.addField(`Yaş`,yaş)
.addField(`İl`,il)
.addField(`Cinsiyeti`,cinsiyet)
client.channels.cache.get(kanal).send(emebed)
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'başvuru',
};