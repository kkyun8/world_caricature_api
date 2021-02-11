import squareConnect from "square-connect";

export function SquareConnectInit() {
  const accessToken = process.env.SQUARE_ACCESS_TOKEN;
  // 初期化
  const defaultClient = squareConnect.ApiClient.instance;
  const oauth2 = defaultClient.authentications["oauth2"];
  oauth2.accessToken = accessToken;

  defaultClient.basePath = process.env.SQUARE_BASEPATH;
}
