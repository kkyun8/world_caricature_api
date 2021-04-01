import { Client, Environment } from "square";

// TODO: environment
export const squareClient = new Client({
  environment: Environment.Sandbox,
  accessToken: process.env.SQUARE_ACCESS_TOKEN,
});
