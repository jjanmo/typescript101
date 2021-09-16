import { inputText } from './input';

async function init() {
  const text = await inputText('입력 : ');
  console.clear();
}

init();
