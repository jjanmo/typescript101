import { inputText } from './input';

async function init() {
  while (true) {
    console.clear();
    const text = await inputText('원하는 명령을 입력하세요 : ');
    console.log('text : ', text);
  }
}

init();
