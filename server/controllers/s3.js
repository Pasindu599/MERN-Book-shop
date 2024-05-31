const aws = require("aws-sdk");
const dotenv = require("dotenv");
const { randomBytes } = require("crypto");
const { promisify } = require("util");

dotenv.config();

const region = "eu-north-1";
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucketName = "direct-image-upload-mern";

const s3 = new aws.S3({
  region,
  accessKeyId,
  secretAccessKey,
  signatureVersion: "v4",
});

const generateUploadUrl = async () => {
  const rawBytes = await promisify(randomBytes)(16);
  const imageName = rawBytes.toString("hex");

  const params = {
    Bucket: bucketName,
    Key: imageName,
    Expires: 60,
  };

  const url = await s3.getSignedUrlPromise("putObject", params);
  return url;
};

module.exports = generateUploadUrl;
