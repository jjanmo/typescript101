/*
Type guard : 타입가드는 특정 스코프 안에서 타입을 보장하는 런타임 체크 표현식을 말한다. 
쉽게 특정 표현식을 통해서 런타임에서 알아서 타입을 설정된다고 생각하면 된다.

이에 해당하는 몇가지 예시를 살펴본다.
*/

// discriminated union
interface Language {
  type: 1;
  name: string;
  structure: string;
}

interface Country {
  type: 2;
  name: string;
  location: string;
}

function print1(value: Language | Country) {
  // 1)
  // if (value.type === 1) {
  //   console.log(`${value.name} & ${value.structure}`); // value -> type Language
  // } else {
  //   console.log(`${value.name} & ${value.location}`); // value -> type Country
  // }

  // 2)
  switch (value.type) {
    case 1: {
      console.log(`${value.name} & ${value.structure}`);
      break;
    }
    case 2: {
      console.log(`${value.name} & ${value.location}`);
      break;
    }
  }
}

// 포함된 속성 검사 : discriminated union 없이 사용하는 방법
function print2(value: Language | Country) {
  if ('structure' in value) {
    console.log(`${value.name} & ${value.structure}`);
  } else {
    console.log(`${value.name} & ${value.location}`);
  }
}
