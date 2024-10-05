import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import CryptoJS from 'crypto-js';
import JSEncrypt from 'jsencrypt';

@Injectable()
export class EncryptionUtil {

    public encryptSHA256(stParam: string) {
        const encodeMsg = CryptoJS.enc.Utf8.parse(stParam + 'tengoelgatolospantalones');
        const retornoMsg = CryptoJS.SHA256(encodeMsg).toString();

        return 'FAPE_' + retornoMsg; // probar textos en backend
    }

    public encryptMessage(name: string, pubKey: string): string {
        const crypt = new JSEncrypt({log: true});
        crypt.setKey(pubKey);
        const message = crypt.encrypt(name);
        return message || '';
    }

    public encryptPassword(pass: string, pubKey: string): string {
        const crypt = new JSEncrypt();
        crypt.setKey(pubKey);
        const encPass = crypt.encrypt(pass) || '';
        return this.encryptMessage(encPass, environment.gatewayComprasBackendPSE.pubKey);
    }

    /** Return a random password. */
    public getRandomPassword() {
        return CryptoJS.lib.WordArray.random(10).toString();
    }

    /**
     * Encrypt received text with AES-256 (CryptoJS.PBKDF2 key), using a custom password.
     * Return a secure message request (json): {m : 'Encrypted Message', p : 'password',  s : 'salt', i : 'iv'}
     * @param text
     */

    public createSecureRequest(text: any, pass: string) {
        const salt = 	CryptoJS.lib.WordArray.random(128 / 8);
        const iv = 	CryptoJS.lib.WordArray.random(128 / 8);

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
        return {m : encrypted.toString(), p : password, s : salt.toString(), i : iv.toString()};
    }

    /**
     * Decrypt a secure message response with AES-256 (CryptoJS.PBKDF2 key), using a custom password.
     * SecureResponse parameter format (json): {m : 'Encrypted Message', s : 'salt', i : 'iv'}
     */
    public resolveSecureResponse(secureResponse: any, pass: string) {
        const text = secureResponse.m;
        const salt = CryptoJS.enc.Hex.parse(secureResponse.s);
        const iv	 = CryptoJS.enc.Hex.parse(secureResponse.i);

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

    public encrypt(name: string, key: string): string {
        const crypt = new JSEncrypt();
        crypt.setKey(key);
        const message = crypt.encrypt(name);
        return message || '';
    }

    public encryptSHA512(stParam: string, salt: string) {
        // const encodeMsg = CryptoJS.enc.Utf8.parse(stParam);
        const retornoMsg = CryptoJS.SHA512(stParam + salt).toString();
        return retornoMsg;
    }
}
