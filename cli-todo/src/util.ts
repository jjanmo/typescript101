// enum 객체에 해당하는 하는 값인지를 확인하는 유틸함수
// -> 자세한 설명은 wil.md에서... 😎
export const checkIsValidEnumValue = (enumObject: any, value: number | string): boolean => {
  return Object.keys(enumObject)
    .filter(key => isNaN(Number(key)))
    .some(key => enumObject[key] === value);
};
