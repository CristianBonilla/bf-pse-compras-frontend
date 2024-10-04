import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import JSEncrypt from 'jsencrypt';
import CryptoJS from 'crypto-js';

const encryptor = new JSEncrypt();

@Injectable()
export class EncryptionService {

    public encryptMessage(name: string, pubKey: string = environment.gatewayComprasBackendPSE.pubKey): string {
        const crypt = new JSEncrypt();
        crypt.setKey(pubKey);
        return crypt.encrypt(name) || '';
    }

    public encryptSHA512(message: string) {
        const retornoMsg = CryptoJS.SHA512(message).toString();
        return retornoMsg;
    }

    public encryptSHA256(message: string) {
        const retornoMsg = CryptoJS.SHA256(message).toString();
        return retornoMsg;
    }
    public generateRandomKey(): string {
        return CryptoJS.lib.WordArray.random(10).toString();
    }
    public setPublicKey(publicKey: any): void {
        encryptor.setPublicKey(publicKey)
    }
    // public encryptAllValuesFromObject(body: Object, key: string) {
    //     const bodyEnc = JSON.parse(JSON.stringify(body))
    //     const paramsName = Object.keys(body)
    //     paramsName.forEach(parameter => {
    //         bodyEnc[parameter] = this.aesEncrypt(typeof (body[parameter]) !== 'string' ? JSON.stringify(body[parameter]) : body[parameter], key);
    //     })
    //     return bodyEnc
    // }
    public createSignature(signText: string, key: string) {
        const digest = this.encryptSHA256(signText).toString()
        return this.aesEncrypt(digest, key).toString()
    }
    public encryptWithPublicKey(key: string) {
        return encryptor.encrypt(key)
    }
    public aesDecrypt(decryptText: string, key: string): string {
        const bytes = CryptoJS.AES.decrypt(decryptText, key)
        return bytes.toString(CryptoJS.enc.Utf8)
    }
    public aesEncrypt(digest: string, key: string): string {
        return CryptoJS.AES.encrypt(digest, key).toString()
    }

    /**
   * Encrypt received text with AES-256 (CryptoJS.PBKDF2 key), using a custom password.
   * Return a secure message request (json): {m : 'Encrypted Message', p : 'password',  s : 'salt', i : 'iv'}
   * @param text
   */

    public createSecureRequest(text: any, pass: string) {
        const salt = CryptoJS.lib.WordArray.random(128 / 8);
        const iv = CryptoJS.lib.WordArray.random(128 / 8);

        const key = CryptoJS.PBKDF2(pass, salt, {
            keySize: 256 / 32, // 256
            iterations: 100
        });

        const encrypted = CryptoJS.AES.encrypt(text, key, {
            iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });

        const password = this.encryptMessage(pass, environment.gatewayComprasBackendPSE.pubKey); // RSA
        return { m: encrypted.toString(), p: password, s: salt.toString(), i: iv.toString() };
    }

    /**
     * Decrypt a secure message response with AES-256 (CryptoJS.PBKDF2 key), using a custom password.
     * SecureResponse parameter format (json): {m : 'Encrypted Message', s : 'salt', i : 'iv'}
     */
    public resolveSecureResponse(secureResponse: any, pass: string) {
        const text = secureResponse.m;
        const salt = CryptoJS.enc.Hex.parse(secureResponse.s);
        const iv = CryptoJS.enc.Hex.parse(secureResponse.i);

        const key = CryptoJS.PBKDF2(pass, salt, {
            keySize: 256 / 32, // 256
            iterations: 100
        });

        const decrypted = CryptoJS.AES.decrypt(text, key, {
            iv,
            padding: CryptoJS.pad.Pkcs7,
            mode: CryptoJS.mode.CBC
        });

        return decrypted.toString(CryptoJS.enc.Utf8); // stringify
    }
}
