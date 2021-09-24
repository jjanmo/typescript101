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
    private _title: string,
    private _description: string,
    private _startDate: Date,
    private _endDate: Date,
    private _priority: Priority,
    private _status: TodoState = 'Todo',
    private _id: number = Todo.nextId
  ) {
    Todo.nextId++;
  }

  // getter
  get id() {
    return this._id;
  }
  get title() {
    return this._title;
  }
  get description() {
    return this._description;
  }
  get startDate() {
    return this._startDate;
  }
  get endDate() {
    return this._endDate;
  }
  get status() {
    return this._status;
  }
  get priority() {
    return this._priority;
  }
}
