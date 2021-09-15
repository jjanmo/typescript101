# What I Learned this project

> 해당 프로젝트를 진행하면서 배운 내용을 간략하게 정리한다.

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
  nodemon --watch src --exec 'ts-node' build/index.js

  # src/**/* : src 하위 모두라는 의미로 사용 가능

  nodemon --watch '*.ts' --exec 'ts-node' build/index.js

  # 모든 ts파일을 관찰하는 부분만 바뀐 명령어
```

  <br />

### tsc vs ts-node

- tsc : 타입스크립트를 자바스크립트로 변환 해주는 역할(transpile)

- ts-node : 타입스크립트를 수정 후 실행할 때마다 매번 자바스크립트로 바꾼 후 실행시켜주는 번거로움을 없애기 위해서 ts-node를 사용한다. ts-node는 메모리상에서 타입스크립트를 transpile하여 자바스크립트를 바로 실행할 수 있게 도와준다.
