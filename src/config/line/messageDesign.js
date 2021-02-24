import { webUrl } from "../index.js";

//LINEメッセージを作る
export const createLineBubbleFlexMsg = (product, order, msgFormat) => {
  const msg = msgFormat;
  const productKeys = Object.keys(product).length === 0;
  const orderKeys = Object.keys(order).length === 0;
  if (productKeys || orderKeys) {
    return msg;
  }

  // TODO: payment url set
  const paymentUrl = `${webUrl}/payment-url`;
  // hero
  if (!msg.contents?.hero?.type && msg.contents?.hero?.type === "image") {
    if (msg.hero.url === "product-img-url") {
      // TODO: set img
      msg.hero.url = product.product_detail_image_url;
    }
  }
  // body
  if (msg.contents?.body?.contents) {
    msg.contents.body.contents.forEach((content) => {
      content.contents.forEach((c) => {
        if (c.type === "text") {
          let value = "";
          if (c.text?.indexOf("product.") === 0) {
            value = product[c.text];
          }
          if (c.text?.indexOf("order.") === 0) {
            switch (c.text) {
              case "order.name":
                value = `${order.nameKanzi} ${order.nameFurigana}`;
                break;
              case "order.address":
                value = `〒${order.postalCode} ${order.address1} ${order.address2}`;
                break;
              default:
                value = order[c.text];
                break;
            }
          }

          c.text = value;
        }
      });
    });
  }
  // footer
  if (msg.contents?.footer?.contents) {
    msg.contents.footer.contents.forEach((c) => {
      if (c.type === "button") {
        if (c.action?.type === "uri" && c.action?.uri === "payment-url") {
          c.action.uri = paymentUrl;
        }
      }
    });
  }

  return msg;
};
