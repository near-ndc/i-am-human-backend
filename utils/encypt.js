const crypto = require("crypto");

function encryptWithPublicKey(publicKey, message) {
  const buffer = Buffer.from(message, "utf-8");
  const encrypted = crypto.publicEncrypt(publicKey, buffer);
  return encrypted.toString("base64");
}

function decryptWithPrivateKey(privateKey, encrypted) {
  const buffer = Buffer.from(encrypted, "base64");
  const decrypted = crypto.privateDecrypt(privateKey, buffer);
  return decrypted.toString("utf-8");
}

module.exports = {
  encryptWithPublicKey,
  decryptWithPrivateKey,
};
