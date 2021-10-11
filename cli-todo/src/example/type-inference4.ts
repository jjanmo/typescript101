export {};

// 함수에서의 타입 추론

function fn1(x = 10, y = 'hello') {
  return `${x} !== ${y}`;
}
// 기본 매개변수에 의해서 x는 number type, y는 string type으로 타입 추론된다. 마찬가지로 반환값 역시 string type으로 추론된다.

// fn1(10, 20); // 매개변수의 타입 추론에 의한 에러
// const result: number = fn1; // 리턴값의 타입 추론에 의한 에러

function fn2(n: number) {
  if (n > 10) return n;
  else return `${n} is too small`;
}

// fn2의 리턴값은 자동으로 string | number로 추론된다.
