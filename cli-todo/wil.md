# What I Learned this project

> 해당 프로젝트를 진행하면서 배운 내용을 간략하게 정리한다.

  <br />

## 프로젝트 셋업 과정

### nodemon usage

> basic usage

```shell
  nodemon  [node app]

  nodemon app.js
```

  <br />

> run non-node scripts : app.py라는 파일을 python이라는 명령어를 통해서 실행한다.

```shell
  nodemon --exec 'python' ./app.py
```

  <br />

> watch directory or file : 해당 디렉토리나 파일을 관찰하고 있다면 변경되면 자동으로 재시작

```shell
  nodemon --watch app

  nodemon --watch index.ts
```

<br />

> 종합 사용 : src라는 디렉토리를 관찰하다가 변화가 생기면 ts-node 명령어를 통해서 index.js를 실행한다.

```shell
  nodemon --watch src --exec 'ts-node' src/index.ts

  # src/**/* : src 하위 모두라는 의미로 사용 가능

  nodemon --watch '*.ts' --exec 'ts-node' src/index.ts

  # 모든 ts파일을 관찰하는 부분만 바뀐 명령어
```

  <br />

### tsc vs ts-node

- tsc : 타입스크립트를 자바스크립트로 변환 해주는 역할(transpile)

- ts-node : 타입스크립트를 수정 후 실행할 때마다 매번 자바스크립트로 바꾼 후 실행시켜주는 번거로움을 없애기 위해서 ts-node를 사용한다. ts-node는 메모리상에서 타입스크립트를 transpile하여 자바스크립트를 바로 실행할 수 있게 도와준다.

  <br />

## code 분석

### util 함수

```typescript
export const checkIsValidEnumValue = (enumObject: any, value: number | string): boolean => {
  return Object.keys(enumObject)
    .filter(key => isNaN(Number(key)))
    .some(key => enumObject[key] === value);
};
```

> 해당 함수는 들어온 값이 이넘에 속하는 값인지를 체크해서 속하면 true, 그렇지 않으면 false를 반환하는 함수이다. 이 코드가 왜 이렇게 작성되는지를 이해하면서 이넘의 속성을 이해할 수 있었다.

<br />

`enum이란`

열거형 속성으로서 상수들의 집합으로 이르 모아서 사용할 수 있게 만드는 자료형 타입을 말한다. 이넘은 그 자체로 객체이다. 하지만 일반적인 객체와의 차이점을 갖고 있다. 첫번째는 이넘은 read-only 속성으로서 선언 이후 임의로 변경이 불가능하다. 두번째는 이넘의 속성값으로는 문자열 혹은 숫자만 가능하다. 세번째는 양방향 바인딩이 된다.(이 부분은 예시를 통해서 알아보자.)

```typescript
enum Nation {
  America,
  Korea = 10,
  Japan,
}

console.log(Nation.America); // 0
console.log(Nation['America']); //  0
console.log(Nation.Korea); // 10
console.log(Nation['10']); // 'Korea'
console.log(Nation.Japan); // 11

enum State {
  TODO = 'todo',
  DOING = 'doing',
  DONE = 'done',
  // DELAY,
}
```

> 이넘은 명시적으로 값을 지정하지 않으면 자동으로 0부터 할당되는 기능이 있다. 그래서 America의 값이 0이 되는 것이다.

> Korea는 명시적으로 10이라는 값을 할당하였기 때문에 10이라는 값을 출력한다. 그런데 10이라고 명시적으로 할당한 뒤의 이넘 값은 10부터 +1이 되어서 자동할당 된다. 그래서 Japan의 값이 11이 되는 것이다.

> Korea의 경우 10이라는 값을 키값으로 불러오면 Korea라는 문자열을 출력한다. 이것이 이넘의 양뱡향 바인딩이다. 단, 이넘의 값으로 숫자를 할당할 때만 양방향 바인딩이 된다. 이넘의 값으로 문자열이 할당되면 단방향 바인딩만이 가능하다.

> 여기서는 Korea에 숫자를 할당했기 때문에 거기서 자동으로 값이 자동으로 할당 및 증가하였지만 문자열인 경우는 다르다. 문자열을 할당하는 경우(enum State), 모두 초기화를 시켜줘야한다. 만약에 DELAY 속성의 경우 Enum member must have initializer. 과 같은 에러를 볼수 있다.

```typescript
// example enum
enum SomeEnum {
  A,
  B,
  C,
  D,
}

export const checkIsValidEnumValue = (enumObject: any, value: number | string): boolean => {
  return Object.keys(enumObject) // 1)
    .filter(key => isNaN(Number(key))) // 2)
    .some(key => enumObject[key] === value); // 3)
};
```

> 1). Object.keys()는 이넘 객체의 key값들을 배열로 반환한다. 이넘은 양방향 바인딩이기 때문에 키값 배열로서 ['A', 'B', 'C', 'D', 0, 1, 2, 3 ]를 얻을 수 있다.

> 2). 여기서 우리는 value 값으로 숫자만을 받기 때문에 해당 숫자값이 이넘에 속한 값인지를 확인해야한다. 그렇기 때문에 위 배열에서 키값으로 숫자를 제거하는 것이다. (`이넘속성[문자열키값] = 숫자값` 이기 때문에)

> 3). some() 을 통해서 해당하는 값이 있는지를 확인한다. 있기만 하면 true를 반환한다.
