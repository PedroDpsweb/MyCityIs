import { Injectable } from '@angular/core';
const AES = require("crypto-js/aes");
const SHA256 = require("crypto-js/sha256");
const CryptoJS = require("crypto-js");

@Injectable({
  providedIn: 'root'
})
export class ToolsService {

  constructor() { }

  getFormatedDate(){
    let date = new Date().toString();
    let formatedDate = date.split(' ');
    let outputDate = "";
    for(let i=0;i<5; i++){
      outputDate += formatedDate[i] + " ";
    }

    return outputDate;
  }

  /**
   * De formato Date a Milisegundo y viceversa
   */
  dateConverter(date){
    let result;
      if(typeof date === 'string'){
        result = Date.parse(date);
        return result;
      }else{
        let result = new Date(date).toString();
    let formatedResult = result.split(' ');
    let outputResult = "";
    for(let i=0;i<5; i++){
      outputResult += formatedResult[i] + " ";
    }
        return outputResult;
      }
  }

  encryptPlainText(text){
    let ciphertext = CryptoJS.AES.encrypt(text, 'secret key 123');
    return ciphertext.toString();
  }

  decryptPlainText(text){
    let bytes  = CryptoJS.AES.decrypt(text, 'secret key 123');
    let plaintext = bytes.toString(CryptoJS.enc.Utf8);
    return plaintext;

  }

  encryptObject(object){

  }

  decryptObject(object){

  }


}
