import crypto from "crypto";
import squareConnect from "square-connect";
import { SquareConnectInit } from "@api/square/index.js";

export const payment = async (body) => {
  // TODO: 改善
  SquareConnectInit();

  const request_params = body;
  const { amount, currency, order } = body;

  // length of idempotency_key should be less than 45
  const idempotency_key = crypto.randomBytes(22).toString("hex");

  // Charge the customer's card
  const payments_api = new squareConnect.PaymentsApi();

  const request_body = {
    source_id: request_params.nonce,
    amount_money: {
      amount,
      currency,
    },
    idempotency_key,
  };

  try {
    const { result, ...httpResponse } = await payments_api.createPayment(
      request_body
    );
    console.log(result);
    // TODO:
    // res.status(200).json({
    //   title: "Payment Successful",
    //   result: result,
    // });
    const { payment, errors } = httpResponse;
    if (errors) {
      // TODO: createError
    } else {
      order.paymentStatus = payment.status;
      order.paymentOrderId = payment.order_id;
      order.paymentSourceType = payment.source_type;
      order.status = 2;
      order.idempotencyKey = idempotency_key;
      // TODO: create url key
      order.pictureUrlKey = "";
      // TODO: createOrder DB insert
      // TODO: AWS SES mail or line message
    }
  } catch (error) {
    // TODO: error
    // res.status(500).json({
    //   title: "Payment Failure",
    //   result: error.response.text,
    // });
  }
};
