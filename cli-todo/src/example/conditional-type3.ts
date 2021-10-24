export {};
/*
ReturnType<T> : 타입스크립트 내장 타입
T가 함수일 때 함수 T의 반환 타입을 리턴해준다.

*/

type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;
// T가 함수 (...args) => R에 할당가능한 타입이면 R 타입을 반환한다.
// → 여기서 infer의 의미 : 타입스크립트 엔진이 런타임 상황에서 타입을 추론할 수 있도록 만들어 주는 키워드로서 결과적으로 함수의 리턴 타입을 R이라는 타입변수에 담을 수 있다.

type T1 = ReturnType<() => string>;

function f1(s: string): number {
  return s.length;
}
// 함수는 expression으로서 하나의 값을 나타낸다. 그렇기 때문에 type f1이라 함은 number 타입을 말한다.
type T2 = ReturnType<typeof f1>; // type T2 = number

// infer keyword에 대한 예시
type Unpacked<T> = T extends (infer U)[] // 어떤 타입의 배열인지는 아직 결정되지 않은 상태이기때문에 infer 키워드 사용
  ? U
  : T extends (...args: any[]) => infer U // 이 함수가 어떤 타입을 리턴할지는 아직 결정되지않은 상태이기때문에 infer 키워드 사용
  ? U
  : T extends Promise<infer U> // 프로미스의 값이 어떤 값인지 아직 결정되지 않았기때문에 infer 키워드 사용
  ? U
  : T;

// T 타입이 U타입을 가진 배열 타입이면, U 타입이고, 아니면
// T 타입이 함수에 할당가능한 타입이라면, 반환 타입인 U 타입이고, (함수에 할당 가능한 타입이) 아니면
// T 타입이 U타입을 가진 프로미스객체 타입이라면 U타입이고, 아니면
// 위 조건 모두를 만족하지 않으면 본래 T 타입이 된다.

type TT0 = Unpacked<string>;
type TT1 = Unpacked<string[]>;
type TT2 = Unpacked<() => string>;
type TT3 = Unpacked<Promise<string>>;
type TT4 = Unpacked<Promise<string[]>>;
type TT5 = Unpacked<Unpacked<Promise<string>[]>>;
// 🔥 위 예시를 해석해보자!!
