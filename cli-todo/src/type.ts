import Todo from './todo';

export type TodoState = 'Todo' | 'Doing' | 'Done';

export enum Priority {
  High,
  Medium,
  Low,
}

export type Todos = Todo[];
