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

export class CommandPrintTodos extends Command {
  constructor() {
    super('pa', 'Print All : 모든 할 일 출력하기');
  }

  async run(todos: Todos): Promise<void> {
    const table = generateTable(todos);
    console.log(table.toString());

    await inputText('아무 키나 누르시오:');
  }
}

export class CommandPrintTodo extends Command {
  constructor() {
    super('ps', 'Print Specific : 특정 할 일 출력하기');
  }
  async run(todos: Todos): Promise<void> {
    const id = await inputText('찾을 할 일 ID를 입력하기:');
    console.clear();

    const todo = todos.filter(todo => todo.id === Number(id));
    if (todo.length === 0) console.log('찾고자하는 할 일이 존재하지 않습니다.');
    else {
      const table = generateTable(todo);
      console.log(table.toString());
    }

    await inputText('아무 키나 누르시오:');
  }
}

export class CommandAddTodo extends Command {
  constructor() {
    super('at', 'Add Todo : 할 일 추가하기');
  }

  async run(todos: Todos): Promise<void> {
    const title = await inputText('타이틀 입력하기 : ');
    console.clear();
    const description = await inputText('상세내용 입력하기 : ');
    console.clear();
    const startDateString = await inputText('시작날짜 입력하기 (enter:오늘/2021년5월5일:2021-05-05) : ');
    console.clear();
    const startDate = getDate(startDateString);
    const endDateString = await inputText('종료날짜 입력하기 (enter:내일/2021년5월5일:2021-05-05) : ');
    console.clear();
    const endDate = getDate(endDateString, true);
    const priorityString = await inputText('우선순위 입력하기 (상|중(enter)|하) : ');
    console.clear();
    const priority = Priority[convertPriorityString(priorityString)];
    console.clear();

    const todo = new Todo(title, description, startDate, endDate, priority);
    todos.push(todo);

    await inputText('아무 키나 누르시오');
  }
}

export class CommandDelete extends Command {
  constructor() {
    super('del', 'Delelt Todo : 할 일 삭제하기');
  }

  async run(todos: Todos) {
    const id = await inputText('삭제할 할 일의 ID 선택하기 (enter:모두삭제) : ');
    console.clear();

    if (id) {
      const _todos = todos.filter(todo => todo.id !== Number(id));
      _todos.length === todos.length
        ? console.log('삭제할 할 일이 존재하지 않습니다.')
        : console.log('삭제하였습니다.');
      console.log(_todos);
      todos = _todos;
    } else {
      console.log('jeje');
      todos = [];
    }

    await inputText('아무 키나 누르시오');
  }
}
