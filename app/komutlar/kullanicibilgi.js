const Discord = require('discord.js');
const db = require('quick.db');
const moment = require("moment");
const ayarlar = require('../ayarlar.json');

exports.run = async (client, message, args, tools) => {
  
  if(!['775829009861967892'].some(role => message.member.roles.cache.get(role)) && !message.member.hasPermission('ADMINISTRATOR')) return message.reply(`Bu Komut İçin Yetkiniz Bulunmamaktadır.`) 

let user;

  if (message.mentions.users.first()) {
      user = message.mentions.users.first();
    } else {
        user = message.author;
    }

    const member = message.guild.member(user);

    const embed = new Discord.MessageEmbed()
    
        .setColor("GREEN")
    
    .setThumbnail(user.avatarURL)
    
    .setTitle(`${user.username}#${user.discriminator} Kullanıcı Bilgi'si`)
    
    .addField("İsim :",`${user.username}#${user.discriminator}`, true)
    .addField("İd :", `${user.id}`, true)
    .addField("Discord Tag :", `#${user.discriminator}`, true)
        .addField("<a:registerbook:775837534479056896> Hesap Oluşturma Tarihi :", `${moment.utc(user.createdAt).format('dddd, MMMM Do YYYY, ')}`, true)
        .addField("<a:hpt2:775837533904044102> Sunucuya Katılma Tarihi :", `${moment.utc(member.joinedAt).format('dddd, MMMM Do YYYY')}`, true)
        .addField("<a:space:775837545321070634>Durumu :", `${user.presence.status}`, true)
  
        .addField("Oynadığı Oyun :", `${user.presence.game ? user.presence.game.name : 'Bilinmiyor'}`, true)
        
    message.channel.send({embed});
    }

exports.conf = {
  enabled: true, 
  guildOnly: false,
  aliases: ['profil-bilgi','profilbilgi','kullanıcı-bilgi','kullanıcıbilgi','k-bilgi','kbilgi'], 
  permLevel: 0 
};

exports.help = {
  name: 'kullanıcı-bilgi', 
  description: 'Etiketlediğin / kendi profilin hakkında bilgi verir.',
  usage: 'kullanıcı-bilgi' 
};