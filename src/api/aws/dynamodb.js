import { ddb } from "../../config/aws/index.js";

export let orderStatusLabels = [];

/**
 *
 * @param {*} order
 */
export async function updateOrder(order) {
  const params = {
    ExpressionAttributeNames: {
      "#OS": "order_status",
      "#IK": "idempotency_key",
      "#POI": "payment_order_id",
      "#PST": "payment_source_type",
    },
    ExpressionAttributeValues: {
      ":os": {
        S: order.order_status.S,
      },
      ":ik": {
        S: order.idempotency_key.S,
      },
      ":poi": {
        S: order.payment_order_id.S,
      },
      ":pst": {
        S: order.payment_source_type.S,
      },
    },
    Key: {
      order_id: {
        S: order.order_id.S,
      },
    },
    TableName: "orders",
    UpdateExpression: "SET #OS = :os, #IK = :ik, #POI = :poi, #PST = :pst",
  };
  const result = ddb.updateItem(params).promise();
  return result;
}
/**
 *
 */
async function scanOrderStatusLabels() {
  orderStatusLabels = [];
  const params = {
    ExpressionAttributeValues: {
      ":i": { S: "order_status" },
    },
    TableName: "order_item_labels",
    FilterExpression: "item_id = :i",
  };

  const result = ddb.scan(params).promise();
  await result.then((res) => {
    orderStatusLabels = [...res.Items];
  });
}

// functions
scanOrderStatusLabels();
