import { RTMClient } from "@slack/rtm-api";
import { SLACK_OUATH_TOKEN, BOT_SPAM_CHANNEL } from "./constants";
import { WebClient } from "@slack/web-api";
const packageJson = require("../package.json")

const rtm = new RTMClient(SLACK_OUATH_TOKEN);
const web = new WebClient(SLACK_OUATH_TOKEN)

rtm.start() 
    .catch(console.error)


rtm.on('ready', async () => {
    console.log("Bot started!")
    sendMessage(BOT_SPAM_CHANNEL, `Bot version ${packageJson.version} is online`)
})

function hello(channelId, userId) {
    sendMessage(channelId, `Heya! <@${userId}>`)
}

rtm.on('slack_event', async (eventType, event) => {
    if (event && event.type === 'message') {
        if (event.text === '!hello') {
            hello(event.channel, event.user)
        }
    }
})


async function sendMessage(channel, message) {
    await web.chat.postMessage({
        channel: channel,
        text: message,
    })
}