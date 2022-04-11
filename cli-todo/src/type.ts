import Todo from './todo';

export type TodoState = 'Todo' | 'Doing' | 'Done';

export enum Priority {
  High,
  Medium,
  Low,
}

export const PRIORITY_NAME_MAP: { [key in Priority]: string } = {
  // mapped type 이용
  [Priority.High]: '높음',
  [Priority.Medium]: '중간',
  [Priority.Low]: '낮음',
};

export interface AppState {
  todos: Todo[];
}

export interface ActionNewTodo {
  type: 'new';
  title: string;
  description: string;
  startDate: Date;
  endDate: Date;
  priority: Priority;
}

export type Action = ActionNewTodo;
