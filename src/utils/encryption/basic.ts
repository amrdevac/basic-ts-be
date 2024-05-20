const secretKeyEnv = "testing";
import CryptoJS from "crypto-js";


export const encrypting = (
  data: any,
  secretKey: string = secretKeyEnv
): any => {
  const result = CryptoJS.AES.encrypt(
    JSON.stringify(data),
    secretKey
  ).toString();

  return result;
};

export const decrypting = (
  data: string,
  secretKey: string = secretKeyEnv
): string | boolean => {
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  try {
    const result = bytes.toString(CryptoJS.enc.Utf8);

    return result;
  } catch (error) {
    console.warn(error);
    return false;
  }
};
