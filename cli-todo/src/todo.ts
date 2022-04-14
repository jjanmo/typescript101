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
    private _startDate: string,
    private _endDate: string,
    private _priority: Priority,
    private _status: TodoState = 'Todo',
    private _id: number = Todo.nextId
  ) {
    Todo.nextId++;
  }

  get id() {
    return this._id;
  }

  get title() {
    return this._title;
  }
  set title(value: string) {
    this._title = value;
  }

  get description() {
    return this._description;
  }
  set description(value: string) {
    this._description = value;
  }

  get startDate() {
    return this._startDate;
  }
  set startDate(value: string) {
    this._startDate = value;
  }

  get endDate() {
    return this._endDate;
  }
  set endDate(value: string) {
    this._endDate = value;
  }

  get status() {
    return this._status;
  }
  set status(value: TodoState) {
    this._status = value;
  }

  get priority() {
    return this._priority;
  }
  set priority(value: Priority) {
    this._priority = value;
  }
}
