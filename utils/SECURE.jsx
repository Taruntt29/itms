import { AES, enc } from "crypto-js";

export const API_KEY = "apiTarun";
export const USERID_KEY = "idTarun";
export const ROLE_KEY = "roleTarun";
export const WAREHOUSE_KEY = "warehouseTarun";
export const PASSWORD_KEY = "passTarun";
export const STATUS_KEY = "loginTarun";

export const encryptData = (str, key) => {
  return AES.encrypt(str, key).toString();
};
export const decryptData = (str, key) => {
  if (str === null) {
    return "";
  }
  const decryptedBytes = AES.decrypt(str, key);
  return decryptedBytes.toString(enc.Utf8);
};
