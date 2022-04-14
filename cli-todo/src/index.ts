import {
  Command,
  CommandPrintTodos,
  CommandPrintTodo,
  CommandAddTodo,
  CommandDelete,
  CommandEditTodo,
} from './command';
import { inputText } from './input';
import Todo from './todo';
import { AppState, Priority, Action } from './type';

const commands: Command[] = [
  new CommandPrintTodos(),
  new CommandPrintTodo(),
  new CommandAddTodo(),
  new CommandEditTodo(),
  new CommandDelete(),
];

async function main() {
  let state: AppState = {
    todos: [
      new Todo(
        'sample test1',
        'This is sample test1',
        '2022-03-19',
        '2022-03-20',
        Priority.High
      ),
    ],
  };

  while (true) {
    console.clear();
    commands.forEach((command) => console.log(command.toString()));

    const text = await inputText('원하는 명령을 입력하세요 : ');
    console.clear();

    const command = commands.find((command) => command.key === text);
    if (command) {
      const action = await command.run(state);
      if (action) {
        state = setAppState(action, state) as AppState;
      }
    }
  }
}

function setAppState(action: Action, state: AppState): AppState {
  switch (action.type) {
    case 'new': {
      const { title, description, startDate, endDate, priority } = action;

      return {
        // ...state,
        todos: [
          ...state.todos,
          new Todo(title, description, startDate, endDate, priority),
        ],
      };
    }
    case 'delete': {
      if (action.range === 'one') {
        return {
          // ...state,
          todos: state.todos.filter((todo) => todo.id !== action.id),
        };
      }
      return {
        // ...state,
        todos: [],
      };
    }
    case 'edit': {
      // 🙏 개선 필요
      // → class에서 멤버변수들 모두 private 접근제한자를 사용했기 때문에, setter를 이용해야만 수정이 가능해졌다.
      // → 이 때문에 immutable한 방식으로 수정하는 방식(객체 병합 by spread operator)으로는 계속해서 에러가 발생하였다.
      //   제대로된 병합이 이뤄어지지 않았다. ex) _title 인데 title 이라는 속성이 추가되었다.
      // → 그래서 데이터를 받아와서 mutable한 방식으로 수정하게 구현하였다.
      // Q. immutable한 방식으로 구현하는 방법은 없을까? 고민중...

      const todo = state.todos.filter((todo) => todo.id === action.id)[0];

      const { title, description, startDate, endDate, priority, status } =
        action.data;

      if (title) todo.title = title;
      if (description) todo.description = description;
      if (startDate) todo.startDate = startDate;
      if (endDate) todo.endDate = endDate;
      if (priority) todo.priority = priority;
      if (status) todo.status = status;

      return state;
    }

    default: {
      return state;
    }
  }
}

main();
