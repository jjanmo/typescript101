import { Command, CommandPrintTodos } from './command';
import { inputText } from './input';
import Todo from './todo';
import { Priority, Todos } from './type';

const commands: Command[] = [new CommandPrintTodos()];

async function init() {
  const todos: Todos = [
    new Todo('sample test1', 'This is sample test1', new Date(), new Date('2021-09-20'), 'Todo', Priority.High),
    new Todo('sample test2', 'This is sample test2', new Date(), new Date('2021-09-21'), 'Todo', Priority.Medium),
    new Todo('sample test3', 'This is sample test3', new Date(), new Date('2021-09-22'), 'Todo', Priority.Low),
  ];

  while (true) {
    console.clear();
    commands.forEach(command => console.log(command.toString()));

    console.log();
    const text = await inputText('원하는 명령을 입력하세요 : ');
    console.log('text : ', text);

    const command = commands.find(command => command.key === text);
    if (command) {
      await command.run(todos);
    }
  }
}

init();
