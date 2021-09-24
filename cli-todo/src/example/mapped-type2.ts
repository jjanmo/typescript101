export {};

type Nation = 'Korea' | 'Japan' | 'China';

interface Person {
  name: string;
  age: number;
  country: Nation;
}

type T1 = Person['name']; // Person['name']에 해당하는 타입을 할당 → string

// 타입의 속성을 readonly로 변환시키고 싶을 때
type Readonly<T> = { readonly [K in keyof T]: T[K] };
// 타입의 속성을 optional로 변환시키고 싶을 때
type Partail<T> = { [K in keyof T]?: T[K] };
// 타입의 선택된 속성만을 사용할 수 있도록 변환하고 싶을 때
type Pick<T, K extends keyof T> = { [P in K]: T[K] };
// 속성의 키가 K로 정의되고 값이 T타입을 가진 객체를 만들 때
// → Constructs an object type whose property keys are Keys and whose property values are Type
type Record<K extends string, T> = { [P in K]: T };

// mapped type을 이용해서 새로운 타입 생성
type T2 = Readonly<Person>;
type T3 = Partail<Person>;
type T4 = Pick<Person, 'name' | 'country'>;

// Person의 모든 속성이 readonly로 변환한 타입을 가진 객체를 생성
const person2: T2 = {
  name: 'suzi',
  age: 25,
  country: 'Korea',
};
// person1.name = 'iu'; // error : readonly이기 때문에 수정할 수 없음

// Person 타입의 속성을 모두 사용하지 않아도 되는 타입을 가진 객체를 생성
const person3: T3 = {
  name: 'jjanmo',
  age: 30,
};

const person4: T4 = {
  name: 'nakata',
  country: 'Japan', // country가 없어도 error : 선택된 속성
  // age: 17, // error : 선택되지 않은 속성
};

// 공식문서 예제 응용
type SubjectInfo = {
  professor: string;
  creditHours: number;
};

type SubjectName = 'Biochemistry' | 'Genetics' | 'Virology';

const subjects: Record<SubjectName, SubjectInfo> = {
  Biochemistry: { professor: 'Dr.Hun', creditHours: 40 },
  Genetics: { professor: 'Dr.Lee', creditHours: 43 },
  Virology: { professor: 'Dr.Pyee', creditHours: 39 },
};

// ✅ Readonly / Partial / Pick / Record 은 이미 타입스크립트에 내장 타입으로서 위에처럼 만들지 않고 그냥 import해서 사용이 가능하다.
// → 위의 타입 정의 코드를 주석해도 됨
