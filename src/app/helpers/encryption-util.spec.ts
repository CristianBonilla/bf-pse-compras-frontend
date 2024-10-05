import { inject, TestBed } from '@angular/core/testing';
import { EncryptionUtil } from './encryption-util';

describe('EncryptionUtil', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [EncryptionUtil]
    });
  });

  it('should be created', inject([EncryptionUtil], (service: EncryptionUtil) => {
    expect(service).toBeTruthy();
  }));

  it('should return SHA256 encryptedText ', inject([EncryptionUtil], (service: EncryptionUtil) => {
    expect(service.encryptSHA256).not.toBeNull();
  }));

  it('should encrypt and decrypt a text ', inject([EncryptionUtil], (service: EncryptionUtil) => {
    const pass = service.getRandomPassword();
    const encrypt = service.createSecureRequest('Test', pass);
    const decrypt = service.resolveSecureResponse(encrypt, pass);
    expect(decrypt).toEqual('Test');
  }));

  it('should call encryptMessage and return the encrypted string', inject([EncryptionUtil], (service: EncryptionUtil) => {
    const message = 'this is a string';
    const encryptedMessage = service.encryptMessage(message, '');
    expect(encryptedMessage).not.toEqual(message);
  }));

//   it('should call encryptPassword and return the encrypted password string', inject([EncryptionUtil], (service: EncryptionUtil) => {
//     const password = '123456';
//     const encriptMessage = jest.spyOn(service, 'encryptMessage');
//     const encryptedPassword = service.encryptPassword(password, '');
//     expect(encryptedPassword).not.toEqual(password);
//     expect(encriptMessage).toHaveBeenCalled();
//   }));

});
