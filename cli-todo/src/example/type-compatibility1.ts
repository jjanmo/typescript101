/*
Type Compatibility : 타입 호환성

TypeScript의 타입 호환성은 구조적 서브 타이핑(structural subtyping)을 기반으로 한다. 
구조적 타이핑이란 서로 두 타입간의 내부적 구조가 같은지만으로 타입의 호환성이 결정되는 것을 말한다.
그래서 타입이 계층구조로 부터 자유롭다.

ex)
class Foo {
  method(input: string): number { ... }
}
class Bar {
  method(input: string): number { ... }
}
let foo: Foo = new Bar(); // Okay.

VS

이와는 반대로 형식적 서브 타이핑(nominal subtyping)이 존재한다. 이는 주로 많이 보았던, Java, C++ 등이 여기에 해당한다.
형식적 타이핑은 명시적으로 타입을 상속하겠다는 선언을 통해야 같은 타입을 갖는 것으로 간주된다. 이러한 선언이 없다면, 호환되지 않는다.
그래서 타입 간의 관계가 계층구조이다.

ex)
class Foo {
  method(input: string): number { ... }
}
class Bar {
  method(input: string): number { ... }
}
let foo: Foo = new Bar(); // ERROR!!
*/

export {};

function fn1(x: number, y: number | string) {
  const result1: number = x;
  // const result2: number = y;  // error :
}

function fn2(x: number | string) {
  const num1: number | string = x;
  const num2: number | string | boolean = x;
  // const num3: number | boolean = x; // error :
}
