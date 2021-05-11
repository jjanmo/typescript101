# Typescript101

> **빠르게** 타입스크립트에 대해서 알아보자!

# Typescript 시작하기

1. `npm install -g typescript` : 타입스크립트 전역 설치
2. `npx tsc -init` : 타입스크립트를 초기화한다는 의미로서 `tsconfig.json` 타입스크립트 관련 컴파일 설정 정보가 들어있는 파일이 생성된다. `tsconfig.json`이 있는 해당 디렉토리가 타입스크립트 프로젝트의 루트가 된다.

   ```js
   compileOptions: {
     ('target'); //컴파일 타겟(ex. es5, es6 ....), 어떤 타겟으로 컴파일 하겠다는 의미
     ('module'); //어떤 모듈 시스템을 사용하겠다는 것을 설정
     ('strict'); //strict mode 여부(특별한 이유가 없다면 true)
     ('sourceMap'); // 소스맵은 배포용으로 빌드한 파일과 원본 파일을 연결시켜주는 기능을하는 파일로서 소스맵 파일의 생성여부를 설정할 수 있다.

     // 많은 옵션 존재, 상황에 따라서 필요한 옵션을 찾아서 적용하자
     // https://typescript-kr.github.io/pages/tsconfig.json.html
   }
   ```

3. `npx tsc` : 타입스크립트 파일 컴파일, 그냥 `tsc`라고 명령을 실행해도 된다. 컴파일러는 현재 디렉토리에서 부터 차례로 `tsconfig.json`를 검색한다. 설정한 옵션에 따라서 전체 프로젝트의 타입스크립트 파일들을 컴파일한다. 컴파일이 끝나면 해당 타입스크립트 파일에 대한 컴파일된 결과값으로 <u>js파일이 생성</u>된다.

<br />

# 타입스크립트 파일 실행 방법

1. 수동(?) 실행

   (위에서 설명한) 컴파일 명령어 `tsc` 를 실행한 후 생성된 자바스크립트 파일을 `node 파일명` 으로 실행한다.

2. package.json 설정

   ```json
   "scripts": {
       "start": "node index.js",
       "prestart" : "tsc"
   },

   ```

   > prestart 명령어로 인해서 start 전에 자동으로 타입스크립트 파일이 먼저 컴파일되어서 자바스크립트 파일이 생성된다. 그 중에서 엔트리 파일인 index.js를 노드로 실행한다.

3. extension 이용 : `Code Runner`

- Code Runner 설치
- `npm install -g ts-node`

  > ts-node는 타입스크립트를 노드에서 실행할 수 있게 해주는 패키지이다. 타입스크립트의 컴파일과 컴파일된 자바스크립트의 파일의 실행을 동시에 할 수 있게 해준다.

  > Path setting : `command + ,`를 통해서 세팅 설정으로 들어가서 `executor map`을 검색하여 `Code Runner : executor` 에서 `code-runner.executorMap`의 typescript에 ts-node로 설정 ( 혹은 이렇게 해서 실행이 안된다면, node_modules/.bin/ts-node로 바꿔보기)

  - 위 설정이 다 된다면, 상단 우측의 런 버튼 혹은 `control + option + n`으로 실행할 수 있다.

# 타입스크립트 타입

## 기본 타입

- number, boolean, string
- Array<number> : `Array<요소의 타입>`, number[] : `숫자타입인 배열`

  > 자바스크립트에는 Array라는 타입은 없다. object 타입이다.

- tuple

  ```typescript
     const data: [string, number ] = [msg, size];
     data[0].substr(1);
     data[1].substr(1): //error : number타입이기 때문에 해당 메소드를 사용할 수 없다.
  ```

- undefined
- null : `object` 타입으로 존재
- 숫자 리터럴 타입(Numeric Literal Types) / 문자열 리터럴 타입(String Literal Types)

  ```typescript
  //숫자 리터럴 타입
  let number: 10 | 20 | 30;
  number = 10;
  number = 15; //error

  //문자열 리터럴 타입
  let favMovie: 'batman begins' | 'about time';
  favMovie = 'matrix'; //error
  ```

  > number는 10, 20, 30 중 한가지를 가질 수 있는 타입, favMovie는 'batman begins'와 'about time' 둘 중 한가지를 가질 수 있는 타입

- any : 모든 타입을 가질 수 있는 것, 타입을 알 수 없는 경우 사용한다. 단, any 타입을 남발하는 것은 타입스크립트를 사용하는 의미가 없어진다.(비추)

  > 기존에 자바스크립트로 된 프로젝트를 타입스크립트로 변환시키는 경우 유용하게 사용될 수 있다. 혹은 임시로 타입을 유보할 때도 사용가능하다.

- 함수의 반환 타입

  - void : 아무값도 반환하지 않고 종료되는 함수의 타입
  - never : 항상 예외가 발생해서 비정상적으로 종료되거나 무한루프로 인해 종료되지않는 함수의 타입, never타입은 일반적으로 보기 어렵다.

  ```typescript
  function func1(): void {
    console.log('hello world');
  }

  function func2(): never {
    while (true) {
      //code here
    }
  }
  ```

- object

  ```typescript
  const me: object = {
    name: 'jjanmo',
  };
  console.log(me.age); //error
  ```

  > 자바스크립트에서는 객체의 없는 속성에 접근해도 에러가 나지 않았다. 단지 undefined라는 값이 나왔다. 하지만 타입스크립트에서는 타입에러가 발생한다.

  > 객체를 속성을 정의하기 위해선 `interface`를 사용해야한다

- union 타입과 intersection 타입

  ```typescript
  let number: (1 | 3 | 5) & (3 | 5 | 7);
  number = 3;
  number = 1; // error
  ```

  > number는 유니언 (1 | 3 | 5) 과 (3 | 5 | 7) 중에서 합집합인 3과 5만을 타입으로 가질 수 있는 변수이다.

- type 키워드를 사용한 타입

  ```typescript
  type Width = number | string;
  let width: Width;
  width = 200;
  width = '2vh';
  ```

  > type키워드를 사용해서 타입에 별칭을 주어서 타입으로서 사용할 수 있다. 이 경우에는 Width라는 타입은 2가지 타입을 모두 갖을 수 있게 된다.
