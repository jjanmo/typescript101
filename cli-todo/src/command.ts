import { Priority, Todos } from './type';
import { inputText } from './input';
import { generateTable, getDate, convertPriorityString } from './util';
import Todo from './todo';

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

// add todo
export class CommandAddTodo extends Command {
  constructor() {
    super('a', 'Add Todo : 할 일 추가하기');
  }

  async run(todos: Todos): Promise<void> {
    const title = await inputText('타이틀 입력하기: ');
    console.clear();
    const description = await inputText('상세내용 입력하기: ');
    console.clear();
    const startDateString = await inputText('시작날짜 입력하기 (default:오늘/2021년5월5일:2021-05-05): ');
    console.clear();
    const startDate = getDate(startDateString);
    const endDateString = await inputText('종료날짜 입력하기 (default:내일/2021년5월5일:2021-05-05): ');
    console.clear();
    const endDate = getDate(endDateString, true);
    const priorityString = await inputText('우선순위 입력하기 (상|중(default)|하): ');
    console.clear();
    const priority = Priority[convertPriorityString(priorityString)];
    console.clear();

    const todo = new Todo(title, description, startDate, endDate, priority);
    todos.push(todo);

    await inputText('아무 키나 누르시오: ');
  }
}
