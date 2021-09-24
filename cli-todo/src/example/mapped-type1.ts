/*
mapped type : 기존에 정의된 타입을 새로운 타입으로 변환해주는 문법.
              마치 배열의 map()과 같은 기능을 한다고 생각하면 된다.
              즉, 정의된 타입의 속성을 순회하면서 해당 로직에 따라서 변환 시켜준다.

많이 사용되는 곳 : interface의 속성을 optional 혹은 readonly로 바꿀 수 있다.

syntax
type <name> = { [P in K] : T }
→ [P in K] : for in 과 유사하게 동작, K타입의 속성을 순회하면서 해당 속성을 키로 정의한다.

*/

type Subject = 'Genetics' | 'Virology' | 'Biochemistry';

// 해당 과목에 해당 교수를 추가한 타입을 만들고 싶을 때
type SubjectDetails = { [K in Subject]: string };

const subjects: SubjectDetails = {
  Genetics: 'Dr.Lee',
  Virology: 'Dr.Pyee',
  Biochemistry: 'Dr.Hun',
};
