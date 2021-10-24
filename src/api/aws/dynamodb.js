import axios from "axios";
const labelKey = "@LABEL@";
const orderStatesKey = "@ORDERSTATUS@";
export let orderStatusLabels = [];

/**
 *
 * @param {*} order
 */
export async function updateOrder(params) {
  const result = await this.$axios.$post(
    `/dynamodb/order/status/${orderKey}${orderId}`,
    params
  );
  return result;
}
/**
 *
 */
async function queryOrderStatusLabels() {
  orderStatusLabels = [];
  const result = await this.$axios
    .$get(`/dynamodb/${labelKey}/begins-with/${orderStatesKey}`)
    .then((res) => {
      orderStatusLabels = [...res.Items];
    });
  return result;
}

// functions
queryOrderStatusLabels();
