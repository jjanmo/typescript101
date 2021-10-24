export {};

// 활용예시

// example1
// StringPropertyNames
type StringPropertyNames<T> = {
  [K in keyof T]: T[K] extends string ? K : never;
}[keyof T];

interface Person {
  name: string;
  age: number;
  nation: string;
}

type T1 = StringPropertyNames<Person>;

/*
T1 = {
  name : 'name';
  age : never; → 제거
  nation : 'nation;
}
위에 대괄호 전까지 해석하면 위와 같은 결과
[]의 의미는 키값을 나타내는데, T의 키값을 나타내므로 name → 'name' / age → never / nation → 'nation' 가 된다
즉, 'name' 또는 'nation'만 T1을 나타내게 된다.
*/

type StringProperties<T> = Pick<T, StringPropertyNames<T>>;
type T2 = StringProperties<Person>; //  string 만 모아 놓은 객체 타입을 만들수 있다.

// example2
// Overwrite
type Overwrite<T, U> = {
  [P in Exclude<keyof T, keyof U>]: T[P];
} & U;

/*
{
  [P in Exclude<keyof T, keyof U>]: T[P];
}
→ T와 U에서의 중복되는 속성을 제거한 타입을 만든다.

이후 위에서 만든 타입과 U를 intersection(& : 교집합) 한다. → 교집합이지만 인터페이스의 교집합은 합치는 것과 같음 
*/

interface Person1 {
  name: string;
  age: number;
}

type T3 = Overwrite<Person1, { age: string; nation: string }>;

const p: T3 = {
  name: 'mike',
  age: '18',
  nation: 'korea',
};
