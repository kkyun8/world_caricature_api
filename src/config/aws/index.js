import AWS from "aws-sdk";
import dotenv from "dotenv";
dotenv.config();

const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const region = process.env.AWS_DEFAULT_REGION;

export const Bucket = process.env.AWS_BUCKET;

AWS.config.update({ region });
export const s3 = new AWS.S3({ accessKeyId, secretAccessKey });
