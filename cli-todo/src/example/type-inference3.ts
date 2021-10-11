export {};

// 인터페이스에서의 타입 추론
interface Appliances {
  name: string;
  price: number;
}

interface Refrigerator extends Appliances {
  doors: number;
}

interface Computer extends Appliances {
  isPortable: boolean;
}

const a1: Appliances = { name: 'code zero', price: 3000000 };
const a2: Refrigerator = { name: 'dios', price: 1500000, doors: 4 };
const a3: Computer = { name: 'mac pro', price: 2000000, isPortable: true };

const arr1 = [a1, a2, a3];
// arr1 은 Appliances[]가 된다.
// → 다른 타입으로 할당 가능한 타입은 제거된다.그래서 Refrigerator, Computer 타입은 Appliances에 할당 가능하기때문에 제거되어 Appliances타입의 배열이 된다.
const arr2 = [a2, a3];
// arr2는 (Refrigerator | Computer)[]이 된다.
// → Refrigerator, Computer 은 서로 할당 가능하지 않기 때문에
