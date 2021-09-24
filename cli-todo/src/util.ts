import Table from 'cli-table';
import { Todos } from './type';

// enum 객체에 해당하는 하는 값인지를 확인하는 유틸함수
// -> 자세한 설명은 wil.md에서... 😎
export const checkIsValidEnumValue = (enumObject: any, value: number | string): boolean => {
  return Object.keys(enumObject)
    .filter(key => isNaN(Number(key)))
    .some(key => enumObject[key] === value);
};

export const parseDate = (date: Date): string => {
  return date.toISOString().substring(0, 10);
};

export const generateTable = (todos: Todos): Table => {
  const table = new Table({ head: ['ID', 'Title', 'Description', 'Priority', 'Status', 'Start', 'End'] });

  todos.forEach(todo => {
    const row = [
      todo.id,
      todo.title,
      todo.description,
      todo.priority,
      todo.status,
      parseDate(todo.startDate),
      parseDate(todo.endDate),
    ];
    table.push(row);
  });

  return table;
};

// 기본 날짜 구하기
export const getDate = (dateString: string, isEnd: boolean = false) => {
  if (dateString) {
    return new Date(dateString);
  } else {
    const now = new Date();
    const tomorrow = new Date(now.setDate(now.getDate() + 1));

    return isEnd ? tomorrow : now;
  }
};

// 이넘키값으로 변환하기
export const convertPriorityString = (string: string) => {
  switch (string) {
    case '상': {
      return 'High';
    }
    case '중': {
      return 'Medium';
    }
    case '하': {
      return 'Low';
    }
    default: {
      return 'Medium';
    }
  }
};
