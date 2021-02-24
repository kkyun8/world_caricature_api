export default {
  type: "flex",
  altText: "決済情報をご確認ください。",
  contents: {
    type: "bubble",
    // TODO: img url set ただhttpセットすると400エラー
    // hero: {
    //   type: "image",
    //   url: "product-img-url",
    //   size: "full",
    //   aspectRatio: "4:3",
    //   aspectMode: "cover",
    // },
    body: {
      type: "box",
      layout: "vertical",
      contents: [
        {
          type: "box",
          layout: "vertical",
          margin: "md",
          contents: [
            {
              type: "text",
              text: "product.title",
              weight: "bold",
              size: "xl",
              wrap: true,
              contents: [],
            },
            {
              type: "text",
              text: "product.information",
              size: "xs",
              color: "#AAAAAA",
              wrap: true,
              contents: [],
            },
          ],
        },
        {
          type: "box",
          layout: "baseline",
          margin: "md",
          contents: [
            {
              type: "text",
              text: "注文番号：",
              weight: "bold",
              size: "lg",
              align: "start",
              wrap: true,
              contents: [],
            },
            {
              type: "text",
              text: "order.order_number",
              weight: "bold",
              size: "lg",
              align: "end",
              wrap: true,
              contents: [],
            },
          ],
        },
        {
          type: "box",
          layout: "baseline",
          margin: "md",
          contents: [
            {
              type: "text",
              text: "価格：",
              weight: "bold",
              size: "lg",
              contents: [],
            },
            {
              type: "text",
              text: "order.price",
              weight: "bold",
              size: "lg",
              align: "end",
              wrap: true,
              contents: [],
            },
          ],
        },
        {
          type: "box",
          layout: "baseline",
          spacing: "xxl",
          margin: "xxl",
          contents: [
            {
              type: "text",
              text: "注文者名：",
              weight: "bold",
              contents: [],
            },
            {
              type: "text",
              text: "order.name",
              margin: "sm",
              wrap: false,
              contents: [],
            },
          ],
        },
        {
          type: "box",
          layout: "baseline",
          contents: [
            {
              type: "text",
              text: "お届け先：",
              weight: "bold",
              contents: [],
            },
            {
              type: "text",
              text: "order.address",
              contents: [],
            },
          ],
        },
      ],
    },
    // TODO: img url set ただhttpセットすると400エラー
    // footer: {
    //   type: "box",
    //   layout: "vertical",
    //   spacing: "sm",
    //   contents: [
    //     {
    //       type: "button",
    //       action: {
    //         type: "uri",
    //         label: "支払いページを開く",
    //         uri: "payment-url",
    //       },
    //       style: "primary",
    //     },
    //   ],
    // },
  },
};
