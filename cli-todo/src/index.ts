console.log('hello world!!');

class User {
  constructor(public id: number) {}

  toStringId() {
    return `${this.id}`;
  }
}

const user = new User(123123);
console.log(user.toStringId());
