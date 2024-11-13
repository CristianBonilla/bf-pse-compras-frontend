import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js';

const encryptor = new JSEncrypt();
@Injectable()
export class EncryptionService {
  public encryptMessage(message: string, pubKey: string = environment.gatewayComprasBackendPSE.pubKey): string {
    // encryptor.setKey(pubKey);
    this.setPublicKey(pubKey);
    return encryptor.encrypt(message) || '';
  }

  public setPublicKey(publicKey: any): void {
    encryptor.setPublicKey(publicKey);
  }

  public aesEncrypt(plainText: string, key: string): string {
    return CryptoJS.AES.encrypt(plainText, key).toString();
  }

  public aesDecrypt(cipherAEStext: string, key: string): string {
    const bytes = CryptoJS.AES.decrypt(cipherAEStext, key);
    return bytes.toString(CryptoJS.enc.Utf8);
  }

  public createSignature(textToSign: string, key: string) {
    const digest = CryptoJS.SHA256(textToSign).toString();
    return this.aesEncrypt(digest, key).toString();
  }

  public encryptAllValuesFromObject(body: Object, key: string) {
    const bodyEnc = JSON.parse(JSON.stringify(body));
    const parametersNames = Object.keys(body) as Array<keyof Object>;
    parametersNames.forEach((parameter) => {
      bodyEnc[parameter] = this.aesEncrypt(typeof (body[parameter]) !== 'string' ? JSON.stringify(body[parameter]) : body[parameter], key);
    });
    return bodyEnc;
  }

  public encryptWithPublicKey(key: string) {
    return encryptor.encrypt(key);
  }

  public generateRandomKey(keyLength: number): string {
    return CryptoJS.lib.WordArray.random(keyLength / 8).toString();
  }
}
