import { inject, TestBed } from '@angular/core/testing';
import { EncryptionService } from './encryption-util';

describe('EncryptionService', () => {
  let service: EncryptionService;

  beforeEach(() => {
    service = new EncryptionService();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('encryptMessage', () => {
    const encrypt = service.encryptMessage('test');
    expect(encrypt).toBeDefined();
  });

  it('encryptSHA512', () => {
    const encrypt = service.encryptSHA512('test');
    expect(encrypt).toBe('ee26b0dd4af7e749aa1a8ee3c10ae9923f618980772e473f8819a5d4940e0db27ac185f8a0e1d5f84f88bc887fd67b143732c304cc5fa9ad8e6f57f50028a8ff');
  });

  it('encryptSHA256', () => {
    const encrypt = service.encryptSHA256('test');
    expect(encrypt).toBe('9f86d081884c7d659a2feaa0c55ad015a3bf4f1b2b0b822cd15d6c15b0f00a08');
  });
  it('generateRandomKey', () => {
    const randomKey = service.generateRandomKey()
    expect(typeof randomKey).toBe('string')
    expect(randomKey.length).toBeGreaterThan(0)
  })
  it('should encrypt and decrypt a text ', inject([EncryptionService], (service: EncryptionService) => {
    const pass = service.generateRandomKey();
    const encrypt = service.createSecureRequest('Test', pass);
    const decrypt = service.resolveSecureResponse(encrypt, pass);
    expect(decrypt).toEqual('Test');
  }));
  it('should encrypt and decrypt a text ', inject([EncryptionService], (service: EncryptionService) => {
    const pass = service.generateRandomKey();
    const encrypt = service.createSecureRequest('Test', pass);
    const decrypt = service.resolveSecureResponse(encrypt, pass);
    expect(decrypt).toEqual('Test');
  }));
  it('createSignature', () => {
    const getSignature = service.createSignature('new signature', '119')
    expect(typeof getSignature).toBe('string')
    expect(getSignature.length).toBeGreaterThan(0)
  })
});
