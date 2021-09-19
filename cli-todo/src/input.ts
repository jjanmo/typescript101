import readline from 'readline';

const readlineInterface = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const inputText = (msg: string): Promise<string> => {
  return new Promise(res => {
    readlineInterface.question(msg, answer => {
      res(answer);
    });
  });
};
