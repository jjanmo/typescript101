import {
  Action,
  ActionDeleteTodo,
  ActionNewTodo,
  AppState,
  Priority,
  PRIORITY_NAME_MAP,
} from './type';
import { inputText } from './input';
import { generateTable, getDate, checkIsValidEnumValue } from './util';

export abstract class Command {
  constructor(private _key: string, private description: string) {}

  get key() {
    return this._key;
  }

  toString(): string {
    return `${this.key} : ${this.description}`;
  }

  // command run method
  abstract run(state: AppState): Promise<void | Action>;
}

export class CommandPrintTodos extends Command {
  constructor() {
    super('pa', 'Print All : 모든 할 일 출력하기');
  }

  async run(state: AppState): Promise<void> {
    const table = generateTable(state.todos);
    console.log(table.toString());

    await inputText('아무 키나 누르시오:');
  }
}

export class CommandPrintTodo extends Command {
  constructor() {
    super('ps', 'Print Specific : 특정 할 일 출력하기');
  }
  async run(state: AppState): Promise<void> {
    const id = await inputText('찾을 할 일 ID를 입력하기:');
    console.clear();

    const todo = state.todos.filter((todo) => todo.id === Number(id));
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
    super('new', 'Add Todo : 할 일 추가하기');
  }

  async run(): Promise<void | ActionNewTodo> {
    let actionNewTodo: ActionNewTodo;
    while (true) {
      const title = await inputText('타이틀 입력하기 : ');
      // console.clear();
      const description = await inputText('상세내용 입력하기 : ');
      // console.clear();
      const startDateString = await inputText(
        '시작날짜 입력하기 (enter:오늘 | 2021년5월5일:2021-05-05) : '
      );
      // console.clear();
      const startDate = startDateString || getDate(startDateString);
      const endDateString = await inputText(
        '종료날짜 입력하기 (enter:내일 | 2021년5월5일:2021-05-05) : '
      );
      // console.clear();
      const endDate = endDateString || getDate(endDateString, true);

      let priorityString = await inputText(
        `우선순위 입력하기(${PRIORITY_NAME_MAP[Priority.High]}:${
          Priority.High
        } | ${PRIORITY_NAME_MAP[Priority.Medium]}:${Priority.Medium}(enter) | ${
          PRIORITY_NAME_MAP[Priority.Low]
        }:${Priority.Low}) : `
      );

      if (priorityString === '') priorityString = '1'; // 우선순위를 enter로 진입시 체크

      if (
        title &&
        description &&
        startDate &&
        endDate && //
        CommandAddTodo.getIsPriority(Number(priorityString))
      ) {
        actionNewTodo = {
          type: 'new',
          title,
          description,
          startDate,
          endDate,
          priority: Number(priorityString),
        };
        return actionNewTodo;
      } else {
        console.log('형식에 맞게 입력해야 합니다.');

        await inputText('아무 키나 누르면 입력을 다시 시작합니다.:');
        console.clear();
      }
    }
  }

  static getIsPriority(priority: number): priority is Priority {
    return checkIsValidEnumValue(Priority, priority);
  }
}

export class CommandDelete extends Command {
  constructor() {
    super('del', 'Delelt Todo : 할 일 삭제하기');
  }

  async run(state: AppState): Promise<void | ActionDeleteTodo> {
    const id = await inputText(
      '삭제할 할 일의 ID 선택하기 (enter:모두 삭제) : '
    );
    console.clear();

    if (id) {
      const todo = state.todos.filter((todo) => todo.id === Number(id));

      if (todo.length === 0) {
        console.log('삭제할 할 일이 존재하지 않습니다.');

        await inputText('아무 키나 누르시오:');
      } else {
        return {
          type: 'delete',
          range: 'one',
          id: Number(id),
        };
      }
    } else {
      return {
        type: 'delete',
        range: 'all',
        id: Number(id),
      };
    }
  }
}
