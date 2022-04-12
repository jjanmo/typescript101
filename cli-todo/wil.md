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

---

## code 분석

### util 함수

```typescript
const checkIsValidEnumValue = (
  enumObject: any,
  value: number | string
): boolean => {
  return Object.keys(enumObject)
    .filter((key) => isNaN(Number(key)))
    .some((key) => enumObject[key] === value);
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

> 여기서는 Korea에 숫자를 할당했기 때문에 거기서 자동으로 값이 자동으로 할당 및 증가하였지만 문자열인 경우는 다르다. 문자열을 할당하는 경우(enum State), 모두 초기화를 시켜줘야한다. 만약에 DELAY 속성의 경우 `Enum member must have initializer.` 과 같은 에러를 볼수 있다.

```typescript
// example enum
enum SomeEnum {
  A,
  B,
  C,
  D,
}

const checkIsValidEnumValue = (
  enumObject: any,
  value: number | string
): boolean => {
  return Object.keys(enumObject) // 1)
    .filter((key) => isNaN(Number(key))) // 2)
    .some((key) => enumObject[key] === value); // 3)
};
```

> 1). Object.keys()는 이넘 객체의 key값들을 배열로 반환한다. 이넘은 양방향 바인딩이기 때문에 키값 배열로서 ['A', 'B', 'C', 'D', 0, 1, 2, 3 ]를 얻을 수 있다.

> 2). 여기서 우리는 value 값으로 숫자만을 받기 때문에 해당 숫자값이 이넘에 속한 값인지를 확인해야한다. 그렇기 때문에 위 배열에서 키값으로 숫자를 제거하는 것이다. (`이넘속성[문자열키값] = 숫자값` 이기 때문에)

> 3). some() 을 통해서 해당하는 값이 있는지를 확인한다. 있기만 하면 true를 반환한다.

### mapped type의 실제 사용

```ts
enum Priority {
  High,
  Medium,
  Low,
}

const PRIORITY_NAME_MAP = {
  [Priority.High]: '높음',
  [Priority.Medium]: '중간',
  [Priority.Low]: '낮음',
};
```

위 코드는 이넘을 이용해서 이넘에 해당하는 값을 찍어주고 싶어서 이넘맵을 만든 코드이다. 이넘을 `매핑한다`라고 생각하면 된다. 위 코드 자체가 문제는 없지만 개선의 여지가 있다. 만약에 이넘이 추가 되었다고 가정을 한다면, 이와 동시에 아래 맵핑 코드에도 추가를 시켜줘야한다. 하지만 위의 코드에서는 그러한 디버깅을 자동적으로 해줄 수 있는 시스템이 없다. 이를 위해서 타입시스템을 이용할 수 있다.

```ts
const PRIORITY_NAME_MAP: { [key in Priority]: string } = {
  [Priority.High]: '높음',
  [Priority.Medium]: '중간',
  [Priority.Low]: '낮음',
};
```

`mapped type`을 이용하면 위와 같이 `PRIORITY_NAME_MAP`의 타입을 정의할 수 있다. 위 코드는 <u>해당 객체의 키값은 이넘 Priority의 키값에 속하는 값으로 순회하여서 만들어지는 타입</u>임을 나타낸다. 그렇기 때문에 이넘에 값이 추가되면 추가된 값에 대한 맵핑을 해줘야한다는 타입 오류 메세지를 출력한다.(아래는 오류 메세지)

```
Property '3' is missing in type '{ [x: string]: string; 0: string; 1: string; 2: string; }' but required in type '{ 0: string; 1: string; 2: string; 3: string; }'.
```

> 이처럼 실제로 mapped type을 정의함으로서 타입시스템을 실제로 어떻게 사용하는지, 어떠한 목적으로 사용할 수 있는지에 대해서 조금이나마 알 수 있는 코드인 것 같다.

#### 이넘의 양방향 바인딩에 대해서 잠깐 살펴보자.

> 유틸함수 파트에서 했던 내용과 중복되는 내용도 있다.

```ts
const PRIORITY_NAME_MAP: { [key in Priority]: string } = {
  [Priority.High]: '높음',
  [Priority.Medium]: '중간',
  [Priority.Low]: '낮음',
  [Priority[0]]: '높음', // *
};

// Priority의 키값 출력
console.log(Object.keys(Priority)); // ["0", "1", "2", "High", "Medium", "Low"]
```

위 코드는 처음 보면 약간 특이하다고 생각할 수 있는 부분이다. `[Priority[0]]` 이런 식으로 작성했음에도 아무런 타입 오류가 나타나지 않는다.

이넘에 문자열로 초기화를 시켜주지 않으면 `양방향 바인딩`이 된다. 즉 Priority.High = 0, Priority[0] = 'High' 로서 표현할 수 있다. 또한 이넘 Priority의 키값을 출력해보면 `["0", "1", "2", "High", "Medium", "Low"]` 와 같다. 'High' 역시 이넘 Priority의 키값으로서 나타내어진다. 그렇기 때문에 위 코드에서 처럼 `[Priority[0]]: '높음'` 이렇게 표현한 것은 결국 `['High'] : '높음'` 과 동일한 표현이고 이는 정의한 타입에서 위배되지않기 때문에 타입 오류를 나타내지 않는 것이다.

### Discriminated Unions의 사용

> 해석하자면 구별되어지는 유니온 타입을 말한다. 어떻게 유니온 타입을 통해서 타입을 구별할지를 나타내는 방법이라고 볼 수 있다. 코드로 보면 사실 어렵지 않은데 적재적소에 내가 스스로 사용할 수 있는가가 중요하다고 생각한다.

```ts
interface ActionNewTodo {
  type: 'new';
  title: string;
}

interface ActionDeleteTodo {
  type: 'delete';
  id: number;
}

type Action = ActionNewTodo | ActionDeleteTodo;
```

각각의 타입 안에는 `type`이라는 문자열 속성을 통해서 각각의 타입을 구분할 수 있게 하는 타입 시스템을 만드는 것을 `Discriminated Unions` 이라고 말할 수 있고, 실질적으로 `Discriminated Unions` 이라고 하는 것은 여기서 유니온 타입 `Action`을 말한다. 또한 이 타입 통해서 궁극적으로 하려고 하는 것은 type narrowing이라고 하는 타입의 범위를 좁혀서 타입을 보호(type guarding)하는 하나의 방식이라고 볼 수 있다. 아래는 실제로 활용하는 코드이다.

```ts
function setAppState(action: Action, state: AppState) {
  switch (action.type) {
    case 'new': {
      //...
      console.log(action.title); // 1)
      return;
    }
    case 'delete': {
      //...
      console.log(action.id); // 2)
      return;
    }
    default: {
      return state;
    }
  }
}
```

해당 코드에서 1)에서의 action의 타입이 무엇인지 2)에서의 action의 타입이 무엇인지를 안다면 위에서 말한 type narrowing에 대한 의미를 이해했다고 말할 수 있을 것이다.

1. action: ActionNewTodo
2. action: ActionDeleteTodo

위 코드에서는 따로 각각 case마다 타입을 정의해주지 않았지만 자동적으로, 알아서,타입스크립트가 타입 추론을 하는 과정이 이루어졌다. 이러한 코드가 `discriminated unions을 활용한 것`이라고 할 수 있을 것이다.
å
