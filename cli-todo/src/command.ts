import Table from 'cli-table';
import { Todos } from './type';
import { inputText } from './input';
import { generateTable } from './util';

export abstract class Command {
  constructor(private _key: string, private description: string) {}

  get key() {
    return this._key;
  }

  toString(): string {
    return `${this.key} : ${this.description}`;
  }

  // command run method
  abstract run(todos: Todos): Promise<void>;
}

// print all
export class CommandPrintTodos extends Command {
  constructor() {
    super('pa', 'Print All : 모든 할 일 출력하기');
  }

  async run(todos: Todos): Promise<void> {
    const table = generateTable(todos);
    console.log(table.toString());

    await inputText('아무 키나 누르시오: ');
  }
}

// print todo one
export class CommandPrintTodo extends Command {
  constructor() {
    super('ps', 'Print Specific : 특정 할 일 출력하기');
  }
  async run(todos: Todos): Promise<void> {
    const id = await inputText('찾을 할 일 ID를 입력하기: ');
    console.clear();

    const todo = todos.filter(todo => todo.id === Number(id));
    if (todo.length === 0) console.log('찾고자하는 항목이 존재하지 않습니다.');
    else {
      const table = generateTable(todo);
      console.log(table.toString());
    }

    await inputText('아무 키나 누르시오: ');
  }
}
