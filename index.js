// https://discordjs.guide/creating-your-bot/#creating-the-bot-file

const Discord = require('discord.js');
const config = require('./config.json');
const piadas = require('./piadas.json');
const client = new Discord.Client();

let indexPiada = 0;

const wait = async (ms) => {
	return new Promise(resolve => {
		setTimeout(resolve, ms);
	});
};

client.once('ready', () => {
	console.log('Ready!');
});

client.on('message', async message => {

	if (message.content === '!piada') {

		if (piadas[indexPiada].tempo) {
			message.channel.send(piadas[indexPiada].texto);

			for (let i = 0; i < 4; i++) {
				await wait(1000);

				message.channel.send('.');
			}

			await wait(1000);
			message.channel.send(piadas[indexPiada].resposta);
		}
		else {
			message.channel.send(piadas[indexPiada].texto);
		}


		if (indexPiada === piadas.length) {
			indexPiada = 0;
		}
		else {
			indexPiada++;
		}
	}

});


client.login(config.token);