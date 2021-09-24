/*
generic : 타입정보가 동적으로 결정되는 타입. 제네릭을 통해서 같은 규칙을 여러 타입에 적용할 수 있기 때문에 
타입을 생성할 때 발생할 수 있는 중복을 제거할 때 사용할 수 있다. 
*/

// 1)
function makeNumberArray(defaultValue: number, length: number): number[] {
  const arr: number[] = [];
  for (let i = 0; i < length; i++) {
    arr.push(defaultValue);
  }

  return arr;
}

function makeStringArray(defaultValue: string, length: number): string[] {
  const arr: string[] = [];
  for (let i = 0; i < length; i++) {
    arr.push(defaultValue);
  }

  return arr;
}

console.log(makeNumberArray(1, 5));
console.log(makeStringArray('1', 5));

// ✅ 문제점 : 중복되는 코드 ⬆
console.log('--------------');

// 2)
function makeArray(defaultValue: string | number, length: number): Array<string | number> {
  const arr: Array<string | number> = [];
  for (let i = 0; i < length; i++) {
    arr.push(defaultValue);
  }

  return arr;
}

console.log(makeArray(1, 5));
console.log(makeArray('1', 5));
// console.log(makeArray(true, 5)); //error : 타입을 추가하지 않아서

// ✅ 문제점 : 타입이 추가될 때마다 지속적으로 수정이 필요하고 코드가 길어진다.
console.log('--------------');

// 3)
function makeGenericArray<T>(defaultValue: T, length: number): Array<T> {
  const arr: Array<T> = [];
  for (let i = 0; i < length; i++) {
    arr.push(defaultValue);
  }

  return arr;
}

console.log(makeGenericArray(1, 5));
console.log(makeGenericArray('1', 5));
console.log(makeGenericArray(true, 5));
