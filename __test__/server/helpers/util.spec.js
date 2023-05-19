import { isSpecialCharacter, IsJsonString } from '../../../src/server/helpers/util'

test('isSpecialCharacter function returns false for strings containing special characters', () => {
    const input = 'abc!def';
    const result = isSpecialCharacter(input);
    expect(result).toBe(false);
  });
  
  test('isSpecialCharacter function returns true for strings without special characters', () => {
    const input = 'abcdef';
    const result = isSpecialCharacter(input);
    expect(result).toBe(true);
  });

  
  test('IsJsonString function returns true for valid JSON string', () => {
    const input = '{"name":"test user"}';
    const result = IsJsonString(input);
    expect(result).toBe(true);
  });
  
  test('IsJsonString function returns false for invalid JSON string', () => {
    const input = '{name: "test user"}';
    const result = IsJsonString(input);
    expect(result).toBe(false);
  });
 

  
  
  
  