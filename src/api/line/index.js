import line from "@line/bot-sdk";
import paymentFormat from "../../config/line/message_format/paymentFormat.js";
import { createLineBubbleFlexMsg } from "../../config/line/messageDesign.js";

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
  console.log("メッセージ受信");

  let hasReturnMsg = true;
  // 返事text obj
  let result = { type: "text", text: "" };
  try {
    //TODO: メッセージ内容に合わせて注文情報リターン
    if (event.type === "message" || event.message.type === "text") {
      // TODO: db確認
      const product = {};
      const order = {};

      const messageText = event.message.text;
      // flex messageは必須項目が設定されてないと400エラーになる
      switch (messageText) {
        case "注文確認":
          break;
        case "写真登録":
          break;
        case "決済確認":
          result = createLineBubbleFlexMsg(product, order, paymentFormat);
          break;
        default:
          hasReturnMsg = false;
          break;
      }
    }
  } catch (error) {
    result.text = "情報読み込み中エラーが発生しました。";
  }

  if (!hasReturnMsg) {
    result.text = "命令メッセージが間違っております。再入力してください。";
  }

  console.log("メッセージリターン");
  return lineClient.replyMessage(event.replyToken, result);
}
