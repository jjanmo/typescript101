import {
  Command,
  CommandPrintTodos,
  CommandPrintTodo,
  CommandAddTodo,
  CommandDelete,
} from './command';
import { inputText } from './input';
import Todo from './todo';
import { AppState, Priority, Action } from './type';

const commands: Command[] = [
  new CommandPrintTodos(),
  new CommandPrintTodo(),
  new CommandAddTodo(),
  new CommandDelete(),
];

async function main() {
  let state: AppState = {
    todos: [
      new Todo(
        'sample test1',
        'This is sample test1',
        new Date('2021-09-19'),
        new Date('2021-09-20'),
        Priority.High
      ),
    ],
  };

  while (true) {
    console.clear();
    commands.forEach((command) => console.log(command.toString()));

    console.log();
    const text = await inputText('원하는 명령을 입력하세요 : ');
    console.clear();

    const command = commands.find((command) => command.key === text);
    if (command) {
      const action = await command.run(state);
      if (action) {
        state = setAppState(action, state);
      }
    }
  }
}

function setAppState(action: Action, state: AppState) {
  switch (action.type) {
    case 'new': {
      const { title, description, startDate, endDate, priority } = action;

      return {
        ...state,
        todos: [
          ...state.todos,
          new Todo(title, description, startDate, endDate, priority),
        ],
      };
    }
  }
}

main();
