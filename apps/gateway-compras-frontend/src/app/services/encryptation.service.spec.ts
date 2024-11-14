import { EncryptionService } from './encryptation.service';

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

  it('should call generateRandomKey', () => {
    const keyLength = 20;
    const randomKey = service.generateRandomKey(keyLength);
    expect(typeof randomKey).toBe('string');
    expect(randomKey.length).toBeGreaterThan(0);
  });

  it('should call encryptAllValuesFromObject', () => {
    const keyLength = 'key';
    const object = {
      a: 'b',
      c: {
        d: 'e'
      }
    };
    const encryptedObject = service.encryptAllValuesFromObject(object, keyLength);
    expect(typeof encryptedObject).toBe('object');
    expect(typeof encryptedObject.a).toBe('string');
    expect(typeof encryptedObject.c).toBe('string');
    expect(encryptedObject.a.length).toBeGreaterThan(0);
    expect(encryptedObject.c.length).toBeGreaterThan(0);
  });
});
