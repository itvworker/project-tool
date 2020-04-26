import CryptoJS from 'crypto-js';  //引用AES源码js

console.log(CryptoJS);

//解密方法
function decrypt(word) {
    return CryptoJS.AES.decrypt(word, "78945613ABCDEF").toString(CryptoJS.enc.Utf8)
  
}

//加密方法
function encrypt(word) {
    return  CryptoJS.AES.encrypt(word, "78945613ABCDEF").toString()
}

export default {
    decrypt ,
    encrypt
}