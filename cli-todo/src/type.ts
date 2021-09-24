import Todo from './todo';

export type TodoState = 'Todo' | 'Doing' | 'Done';

export enum Priority {
  High = '상',
  Medium = '중',
  Low = '하',
}

export type Todos = Todo[];
