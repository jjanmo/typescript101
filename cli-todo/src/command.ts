import Table from 'cli-table';
import { Todos } from './type';
import { inputText } from './input';
import { parseDate } from './util';

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
    const table = new Table({ head: ['ID', 'Title', 'Description', 'Priority', 'Status', 'Start', 'End'] });

    todos.forEach(todo => {
      const row = [
        todo.id,
        todo.title,
        todo.description,
        todo.priority,
        todo.status,
        parseDate(todo.startDate),
        parseDate(todo.endDate),
      ];
      table.push(row);
    });
    console.log(table.toString());

    await inputText('아무 키나 누르시오: ');
  }
}
