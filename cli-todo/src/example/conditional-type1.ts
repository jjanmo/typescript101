/*
conditional type : 입력된 제네는릭 타입에 따라서 타입을 결정할 수 있 타입 기능을 말한다.

syntax
→ T extends U ? X : Y
→ T가 U에 할당 가능하면 X타입을 , 그렇지 않으면 Y타입을 사용한다
*/
export {};
type IsStringType<T> = T extends string ? 'STRING' : 'NON-STRING';
// → 삼항연산자처럼 보이지만 이것은 값을 다루는 것이 아니라 타입을 다루는 것
// → 즉 STRING 나 NON-STRING 라는 문자열 리터럴 타입을 나타내는 것 ⭐️
type T1 = IsStringType<string>; // type STRING
type T2 = IsStringType<number>; // type NON-STRING
type T3 = IsStringType<boolean>; // type NON-STRING

type T4 = IsStringType<string | number>; // type STRING | type NON-STRING 모두에 해당한다.
/*
⭐️ 위 코드의 실제 내부적인 동작 : 
1) type T4 = IsStringType<string> |  IsStringType<number>
2) type T4 = 'STRING' | 'NON-STRING'
*/

// 특이한 부분 : T4의 타입이 둘 중에 하나로 정의됨

// T4와 비교
type T5 = Array<string | number>;
// T5의 타입이 string[] 혹은 number[] 정의되는 것이 아니라, 배열의 요소 값의 타입이 string 혹은 number가 될 수 있는 타입을 말하는 것
// → 이러한 해석이 일반적이다.
// → (string | number)[]

const arr: T5 = [1, 'weird', 11, 'unique'];
