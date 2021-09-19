import { TodoState, Priority } from './type';

/*
✅ TODO Properties
- id
- title
- description
- start-date
- end-date
- status
- priority
*/

export default class Todo {
  static nextId: number = 1;
  constructor(
    private title: string,
    private description: string,
    private startDate: Date,
    private endDate: Date,
    private status: TodoState,
    private priority: Priority,
    private _id: number = Todo.nextId
  ) {
    Todo.nextId++;
  }

  get id() {
    return this._id;
  }
}
