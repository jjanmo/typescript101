/*
내장타입인 Exclude / Extract 는 모두 조건부 타입으로 만들수 있다.

Exclude<T, U> : T가 U에 할당가능하다면, 그것을 제거하는 타입 → 할당가능한 것만 제거한다
Extract<T, U> : T가 U에 할당가능하지 않으면, 그것을 제거하는 타입 → 할당가능한 것만 뽑는다
*/
export {};

type T1 = number | string | never;
/*
never 타입의 두가지 용도
1) 함수의 리턴 타입으로서 리턴 타입을 보낼 수 없음을 의미하는 타입을 말한다
2) 조건 타입으로 부터 불필요한 값을 제거하는 경우 사용되는 타입을 말한다 ✅
  → never 타입은 공집합과 같다. 즉 empty union type으로 생각할 수 있다
  → 즉, union type에서의 never는 어떠한 의미도 없기 때문에 타입스크립트 내부적으로 제거된다
  → T1 = number | string 와 같다
*/

type Exclude<T, U> = T extends U ? never : T;
type T2 = Exclude<1 | 2 | 3, 1 | 3 | 5 | 7>;
/*
1 extends 1 | 3 | 5 | 7 : never
2 extends 1 | 3 | 5 | 7 : 2
3 extends 1 | 3 | 5 | 7 : never
→ never | 2 | never
→ 2
*/
type T3 = Exclude<string | number | (() => void), Function>;
/*
string extends Function : string
number extends Function : number
(() => void) extends Function : never
→ string | number | never
→ string | number
*/
type Extract<T, U> = T extends U ? T : never;
type T4 = Extract<1 | 2 | 3, 1 | 3 | 5 | 7>;
/*
1 extends 1 | 3 | 5 | 7 : 1
2 extends 1 | 3 | 5 | 7 : never
3 extends 1 | 3 | 5 | 7 : 3
→ 1 | never | 3
→ 1 | 3
*/
