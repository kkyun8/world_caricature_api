import line from "@line/bot-sdk";

export const lineConfig = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

export const lineClient = new line.Client(lineConfig);
export const lineBot = line;

/**
 * ラインメッセージリターン
 * @param {*} event
 */
export function lineHandleEvent(event) {
  if (event.type !== "message" || event.message.type !== "text") {
    return Promise.resolve(null);
  }
  const echo = { type: "text", text: event.message.text };

  // use reply API
  return lineClient.replyMessage(event.replyToken, echo);
}
