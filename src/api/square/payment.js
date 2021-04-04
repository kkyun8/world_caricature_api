import crypto from "crypto";
import { squareClient } from "../square/index.js";
import { orderStatusLabels, updateOrder } from "../aws/dynamodb.js";
/**
 * リクエスト情報から決済を実行する
 *
 * @param {*} requestBody
 */
export const createOrderPayment = async (requestBody) => {
  let info = {
    result: undefined,
    errors: undefined,
    payment: undefined,
  };

  const { nonce } = requestBody;
  const { amount, currency, order } = requestBody;
  const NumberAmount = parseInt(amount, 10);
  // length of idempotency_key should be less than 45
  const idempotencyKey = crypto.randomBytes(22).toString("hex");

  // Charge the customer's card
  const paymentsApi = squareClient.paymentsApi;

  const amountMoney = {
    amount: NumberAmount,
    currency,
  };

  const body = {
    sourceId: nonce,
    idempotencyKey,
    amountMoney,
  };

  try {
    const { result, ...httpResponse } = await paymentsApi.createPayment(body);
    const { payment, errors } = result;
    const { statusCode } = httpResponse;

    info = {
      result,
      payment,
    };

    if (!errors && statusCode === 200) {
      const seconed = orderStatusLabels.find((o) => o.label_id.N == 2);
      order.order_status.S = seconed.label.S;

      const { status, orderId, sourceType } = payment;
      order.payment_status.S = status;
      order.payment_order_id.S = orderId;
      order.payment_source_type.S = sourceType;
      order.idempotency_key.S = idempotencyKey;

      const updateResult = updateOrder(order);
      await updateResult
        .then((res) => {
          const code = res.$response?.httpResponse?.statusCode;
          if (code === 200) {
            // TODO: AWS SES mail or line message
          } else {
            throw "ddb updateItem error";
          }
        })
        .catch((err) => {
          throw err;
        });
    } else {
      throw errors;
    }
  } catch (errors) {
    // TODO: insert error table
    console.log(errors);
    info.errors = errors;
  }

  return info;
};
