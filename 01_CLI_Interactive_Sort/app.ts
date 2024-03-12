import * as readline from 'readline';
import * as utils from './src/sort.js'
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function processData(data: (string | number)[]): void {
    const words = data.filter(value => typeof value === 'string') as string[];
    const numbers = data.filter(value => typeof value === 'number') as number[];
  
    console.log('What operation would you like to perform?');
    console.log('1. Sort words alphabetically');
    console.log('2. Display numbers in ascending order');
    console.log('3. Display numbers in descending order');
    console.log('4. Display words in ascending order based on the number of letters');
    console.log('5. Show only unique words');
    console.log('6. Show only the unique values from the entire set');
    console.log('Type "exit" to quit');
  
    rl.question('Enter your choice: ', (choice) => {
      switch (choice) {
        case '1':
          console.log('Sorted words:', utils.sortWords(words));
          break;
        case '2':
          console.log('Numbers in ascending order:', utils.sortNumbersAscending(numbers));
          break;
        case '3':
          console.log('Numbers in descending order:', utils.sortNumbersDescending(numbers));
          break;
        case '4':
          console.log('Words sorted by length:', utils.sortWordsByLength(words));
          break;
        case '5':
          console.log('Unique words:', utils.getUniqueWords(words));
          break;
        case '6':
          console.log('Unique values:', utils.getUniqueValues(data));
          break;
        case 'exit':
          rl.close();
          return;
        default:
          console.log('Invalid choice');
      }
  
      promptForData();
    });
  }
  
  function promptForData(): void {
    rl.question('Enter words and numbers separated by spaces: ', (input) => {
      const data = input.split(' ').map(value => isNaN(Number(value)) ? value : Number(value));
      processData(data);
    });
  }
  
  promptForData();