# Typescript101

> **빠르게** 타입스크립트에 대해서 알아보자!

> 도움을 받은, 도움을 받을 예정인 링크

-   [TypeScript Deep Dive KR](https://radlohead.gitbook.io/typescript-deep-dive/)
-   [TypeScript-Handbook 한글 문서](https://typescript-kr.github.io/)
-   [TypeScript 공식사이트](https://www.typescriptlang.org/)
-   [`타입스크립트 시작하기` 강의](https://www.inflearn.com/course/%ED%83%80%EC%9E%85%EC%8A%A4%ED%81%AC%EB%A6%BD%ED%8A%B8-%EC%8B%9C%EC%9E%91%ED%95%98%EA%B8%B0#)

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

## 타입스크립트 파일 실행 방법

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
