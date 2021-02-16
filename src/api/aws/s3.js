import { s3, Bucket } from "../../config/aws/index.js";
import * as fs from "fs";

/**
 * 該当注文の登録済みの写真を削除
 *
 * @param {`注文番号`} orderNumber
 */
export const deleteAllOrderPicture = async (orderNumber) => {
  const params = {
    Bucket,
    Prefix: orderNumber,
  };
  const listObjectsPromise = await s3.listObjectsV2(params).promise();

  // empty check
  if (listObjectsPromise.Contents.length === 0) return;

  const Objects = listObjectsPromise.Contents.map((i) => {
    return { Key: i.Key };
  });

  const deleteParams = {
    Bucket,
    Delete: { Objects },
  };
  const deleteObjectsPromise = s3.deleteObjects(deleteParams).promise();
  await deleteObjectsPromise
    .then((data) => {
      // TODO: Success proc log.. etc..
      console.log("deleteObjectsPromise Success");
      for (const d of data?.Deleted) {
        console.log(d);
      }
    })
    .catch((err) => {
      // TODO: Error proc log.. etc..
      console.log("deleteObjectsPromise Error");
      console.log(err);
    });
};

/**
 * 写真をアップロード
 *
 * @param {注文番号} orderNumber
 * @param {出力されたファイル情報} resultImgs
 */
export const putOrderPicture = async (orderNumber, resultImgs) => {
  const result = { ok: true };

  for (const img of resultImgs) {
    const { filepath, filename } = img;

    // tmp に存在するパス
    const Body = fs.readFileSync(filepath);
    const params = {
      Body,
      Bucket,
      // orderNumber/filename s3 に登録されるパス
      Key: `${orderNumber}/${filename}`,
    };

    const putObjectPromise = s3.putObject(params).promise();
    await putObjectPromise
      .then((data) => {
        // TODO: Success proc log.. etc..
        console.log("putObjectPromise Success");
      })
      .catch((err) => {
        // TODO: Error proc log.. etc..
        console.log("putObjectPromise Error");
        console.log(err);
        result.ok = false;
      });
  }
  return result;
};
