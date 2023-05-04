// By https://github.com/Nekros-dsc
const { Client } = require('discord.js-selfbot-v13');
const config = require('./config.json');

const client = new Client({
  checkUpdate: false,
});

client.on('ready', () => { 
  console.log(`Logged in as ${client.user.tag}!`)
});

client.on('messageCreate', async (message) => {
  if (!message.author.id === client.user.id || !message.content.startsWith(config.prefix)) return;
  
  const args = message.content.slice(config.prefix.length).trim().split(' ');
  const command = args.shift().toLowerCase();

  if (command === 'setstatus') {
    const statusType = args[0];
    const statusText = args.slice(1).join(' ');

    switch (statusType) {
      case 'playing':
        await client.user.setActivity(statusText, {type: 'PLAYING'});
        message.edit(`Updated status : \`Playing ${statusText}\``);
        break;
      case 'streaming':
        await client.user.setActivity(statusText, {type: 'STREAMING', url: config.activity.url});
        message.edit(`Updated status : \`Streaming ${statusText}\``);
        break;
      case 'listening':
        await client.user.setActivity(statusText, {type: 'LISTENING'});
        message.edit(`Updated status : \`Listening ${statusText}\``);
        break;
      case 'watching':
        await client.user.setActivity(statusText, {type: 'WATCHING'});
        message.edit(`Updated status : \`Watching ${statusText}\``);
        break;
        case 'competing':
        await client.user.setActivity(statusText, {type: 'COMPETING'});
        message.edit(`Updated status : \`Competing ${statusText}\``);
        break;
      default:
        message.edit(`Invalid status type : \`${statusType}\`\nValid Types : \`playing\`, \`streaming\`, \`listening\`, \`watching\`, \`competing\`.\nExample : \`${config.prefix}setstatus streaming By Nekros\``);
        break;
    }
  }
});

client.login(config.token);