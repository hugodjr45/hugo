const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const perms = await client.checkBotPerms({
        flags: [Discord.Permissions.FLAGS.MANAGE_CHANNELS],
        perms: ["MANAGE_CHANNELS"]
    }, interaction)

    if (perms == false) return;

    let name = interaction.options.getString('name').toLowerCase();

    const channel = interaction.member.voice.channel;
    if (!channel) return client.errNormal({
        error: 'You're not in a voice channel!',
        type: 'editreply'
    }, interaction);

    if (!client.checkVoice(interaction.guild, channel)) return client.errNormal({
        error: 'You cannot edit this channel!',
        type: 'editreply'
    }, interaction);

    channel.edit({ name: name });

    client.succNormal({
        text: 'The channel was renamed to \'${name}\'',
        fields: [
            {
                name: '📘┆Channel',
                value: '${channel} (${channel.name})'
            }
        ],
        type: 'editreply'
    }, interaction);

}

 