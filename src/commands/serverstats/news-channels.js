const Discord = require('discord.js');

const Schema = require("../../database/models/stats");

module.exports = async (client, interaction, args) => {
    var channelName = await client.getTemplate(interaction.guild);
    channelName = channelName.replace('{emoji}', "📢")
    channelName = channelName.replace('{name}', 'News Channels: ${interaction.guild.channels.cache.filter(channel => channel.type === 'GUILD_NEWS').size || 0}')

    await interaction.guild.channels.create(channelName, {
        type: 'GUILD_VOICE', permissionOverwrites: [
            {
                deny: 'CONNECT',
                id: interaction.guild.id
            },
        ],
    }).then(async (channel) => {
        Schema.findOne({ Guild: interaction.guild.id }, async (err, data) => {
            if (data) {
                data.NewsChannels = channel.id;
                data.save();
            }
            else {
                new Schema({
                    Guild: interaction.guild.id,
                    NewsChannels: channel.id
                }).save();
            }
        })
        
        client.succNormal({
            text: 'News channel count created!',
            fields: [
                {
                    name: '📘┆Channel',
                    value: '${channel}'
                }
            ],
            type: 'editreply'
        }, interaction);
    })

}

 