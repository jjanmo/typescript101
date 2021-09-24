// 실제 활용 예제

export {};

enum Fruit {
  Apple,
  Banana,
  Orange,
  PineApple, // 추가하면 아래에서 에러를 발생한다
}

// 이넘의 요소 각각에 해당하는 가격을 객체로 아래처럼 관리한다고 하자.
// → 이넘이 추가되는 경우 해당 이넘의 가격 역시 추가해줘야는데, 이 부분에 있어서 빼먹는 경우가 있다
// → 이런 경우, mapped type을 이용할 수 있다.

// 1)
const FRUIT_PRICE1: Record<Fruit, number> = {
  [Fruit.Apple]: 3000,
  [Fruit.Banana]: 2000,
  [Fruit.Orange]: 5000,
  [Fruit.PineApple]: 10000,
};

// 2)
const FRUIT_PRICE2: { [key in Fruit]: number } = {
  [Fruit.Apple]: 3000,
  [Fruit.Banana]: 2000,
  [Fruit.Orange]: 5000,
  [Fruit.PineApple]: 10000,
};

// → Record 가 결국 {[key in Fruit]: number} 과 같은 것
