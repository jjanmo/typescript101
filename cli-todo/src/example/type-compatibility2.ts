/*
인터페이스의 타입 호환성

인터페이스 A가 인터페이스 B로 할당가능한 조건
1. B에 존재하는 모든 필수 속성이 A에도 존재해야 한다.
2. 같은 속성 이름인 경우, A 속성이 B 속성에 할당 가능해야한다.

✅
위의 조건은 설명이 있어서 적어놓은 것이다. 사실 이러한 조건이라는 것보다 호환이 가능하다는 것에 대한 이해가 중요하다고 생각한다. 
어떤 인터페이스가 타입에 대해서 더 큰 범위를 갖고 있는지에 대한 이해를 통해서 코드를 바라보는 것이 먼저이다.
*/

export {};

interface Person {
  name: string;
  age: number;
}

interface Product {
  name: string;
  price: number;
}

// 1)
// const person: Person = { name: 'michael', age: 11, country: 'korea' }; // error
// → 할당하려는 객체가 Person 타입에 없는 속성(country)을 가지고 있다. 즉 할당하려는 객체의 타입가 Person 타입보다 구체적이다(더 작다).

// 2)
const product1: Product = { name: 'wallet', price: 30000 };
// const person: Person = product1; // error
// → product의 타입의 속성인 price가 Person 타입에는 없다,

// 3)
const obj = { name: 'apple', price: '2000' };
// const product2: Product = obj; //error
// → obj의 price 타입이 문자열이기때문에 할당 불가능

//--------------------------

interface Person1 {
  name: string;
  age: number;
  gender: string;
}

interface Product1 {
  name: string;
  age: string | number;
}

// Product1이 Person1보다 더 큰 집합 → Person1을 Product1로 할당 가능

const obj1 = {
  name: 'jjanmo',
  age: 25,
  gender: 'male',
};

const person11: Person1 = obj1;
const product11: Product1 = obj1;
