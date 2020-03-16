import isValid from './validation';

describe('#isValid', () => {
  test('email', () => {
    let result = isValid('email', 'plaintext');
    expect(result).toBeFalsy();

    result = isValid('email', 'plaintext@');
    expect(result).toBeFalsy();

    result = isValid('email', 'email@example.com');
    expect(result).toBeTruthy();

    result = isValid('email', 'email.12@example.com');
    expect(result).toBeTruthy();
  });
  test('password', () => {
    let result = isValid('password', '');
    expect(result).toBeFalsy();

    result = isValid('password', 'securePassword');
    expect(result).toBeTruthy();
  });
  test('passwordConfirmation', () => {
    const obj = { password: 'securePassword' };

    let result = isValid('passwordConfirmation', '', obj);
    expect(result).toBeFalsy();

    result = isValid('passwordConfirmation', 'anotherPassword', obj);
    expect(result).toBeFalsy();

    result = isValid('passwordConfirmation', 'securePassword', obj);
    expect(result).toBeTruthy();
  });
});
