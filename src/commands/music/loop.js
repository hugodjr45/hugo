const Discord = require('discord.js');

module.exports = async (client, interaction, args) => {
    const player = client.player.players.get(interaction.guild.id);

    const channel = interaction.member.voice.channel;
    if (!channel) return client.errNormal({
        error: 'Tu n'es pas dans un canal vocal !',
        type: 'editreply'
    }, interaction);

    if (player && (channel.id !== player?.voiceChannel)) return client.errNormal({
        error: 'Tu n'es pas dans le même canal vocal que moi !',
        type: 'editreply'
    }, interaction);

    if (!player || !player.queue.current) return client.errNormal({
        error: "Il n'y a pas de musiques jouées dans ce serveur",
        type: 'editreply'
    }, interaction);

    player.setTrackRepeat(!player.trackRepeat);
    const trackRepeat = player.trackRepeat ? "enabled" : "disabled";

    client.succNormal({
        text: 'La boucle est **${trackRepeat}** pour la musique actuelle',
        type: 'editreply'
    }, interaction);
}

 
