function playAudio(audioFile) {
    fetch('https://your-glitch-app.glitch.me/play', {  // Remplacez par l'URL de votre app Glitch
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            guildId: 'YOUR_GUILD_ID',  // Remplacez par votre ID de serveur
            channelId: '1033564536378236958',  // Remplacez par l'ID de votre canal vocal
            audioFile: audioFile,
        }),
    }).then(response => {
        if (response.ok) {
            console.log('Audio command sent successfully');
        } else {
            console.error('Error sending audio command');
        }
    });        
}
