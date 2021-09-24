/*
제네릭의 타입 종류를 제한하는 방법
*/

// A extends B | C
// → A가 B 혹은 C 에 할당가능해야한다 = A타입이 B타입 혹은 C타입이여야 한다

export {};

interface Person {
  name: string;
  age: number;
}

interface Korean extends Person {
  location: string;
}

// 객체의 속성을 서로 교환하는 함수
function swapProperty<T extends Person, K extends keyof Person>(p1: T, p2: T, key: K) {
  const tmp = p1[key];
  p1[key] = p2[key];
  p2[key] = tmp;
}

// K extends keyof Person
// → keyof Person = 'name' | 'age'  : Person의 속성을 유니온 타입으로 나타낸 것
// → K는 'name' 혹은 'age'에 할당가능 해야한다.

const p1: Person = {
  name: 'jjanmo',
  age: 25,
};

const p2: Korean = {
  name: 'gildong',
  age: 33,
  location: 'seoul',
};

swapProperty(p1, p2, 'age');
console.log(p1, p2);

// -------------------

interface Product {
  name: string;
  price: number;
}

const a1: Product = {
  name: 'pencil',
  price: 5000,
};

const a2: Product = {
  name: 'apple phone',
  price: 400000,
};

// swapProperty(a1, a2, 'age') // error : swapProperty의 타입에 맞지 않기때문에 → T extends Person
