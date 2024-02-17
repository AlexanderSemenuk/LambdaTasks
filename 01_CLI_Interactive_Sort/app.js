/* 
- Sort the words alphabetically. Done
- Display the numbers in ascending order. Done
- Display the numbers in descending order.
- Display the words in ascending order based on the number of letters in each word. Done
- Show only unique words. Done
- Show only the unique values from the entire set of words and numbers entered by the user. Done*/

const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

let words = [];
function askForWords() {
  rl.question('Hello. Enter 10 words or digits dividing them in spaces: ', input => { 
    words = input.split(' ');
    if (words.length === 10) {
      askForSortingChoice();
    } else {
      console.log("Please enter exactly 10 words or digits.");
      askForWords();
    }
  });
}

function askForSortingChoice() {
  rl.question('How would you like to sort values? ', choice => {
    if (choice.toLowerCase() === 'exit') {
      console.log("Goodbye");
      rl.close();
    } else {
      sortingChoices(choice);
    }
  });
}

function numberAscending(words) {
  let filteredNumbers = words.filter(item => !isNaN(parseFloat(item)) && isFinite(item));
  let n = filteredNumbers.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (filteredNumbers[j] > filteredNumbers[j + 1]) {
        let temp = filteredNumbers[j];
        filteredNumbers[j] = filteredNumbers[j + 1];
        filteredNumbers[j + 1] = temp;
      }
   } 
  }
  return filteredNumbers; 
}

function numberDescending(words) {
  let filteredNumbers = words.filter(item => !isNaN(parseFloat(item)) && isFinite(item));
  let n = filteredNumbers.length;
  for (let i = 0; i < n - 1; i++) {
    let maxIndex = i;
    for (let j = i + 1; j < n; j++) {
        if (filteredNumbers[j] > filteredNumbers[maxIndex]) {
            maxIndex = j;
        }
    }
    let temp = filteredNumbers[maxIndex];
    filteredNumbers[maxIndex] = filteredNumbers[i];
    filteredNumbers[i] = temp;
  }
  return filteredNumbers;
}
function sortingChoices(choice,) {
  switch (choice) {
    case '1': {
      words = words.filter(item => typeof item === 'string' && isNaN(parseInt(item)));
      console.log(words.sort((a, b) => a.toLowerCase().localeCompare(b.toLowerCase())));
      break;
    }
    case '2': {
      console.log(uniqueWords(words));
      break;
    }
    case '3': {
      console.log(wordsByLength(words));
      break;
    }
    case '4': {
      console.log(uniqueValues(words));
    }
    case '5': {
      console.log(numberAscending(words));
    }
    case '6': {
      console.log(numberDescending(words));
    }

    default: {
      console.log("Invalid choice. Try again.");
      askForSortingChoice(); 
    }
  }
}

function wordsByLength(words) {
  let filteredWords = words.filter(item => typeof item === 'string' && isNaN(parseInt(item)));

  for (let i = 0; i < filteredWords.length - 1; i++) {
      for (let j = i + 1; j < filteredWords.length; j++) {
          if (filteredWords[i].length > filteredWords[j].length) {
              let tmp = filteredWords[i];
              filteredWords[i] = filteredWords[j];
              filteredWords[j] = tmp;
          }
      }
  }
  return filteredWords;
}


function uniqueWords(words) {
  let filteredWords = filteredWords = words.filter(item => typeof item === 'string' && isNaN(parseInt(item)));;
  let counts = {};
  for (let word of words) {
    counts[word] = (counts[word] || 0) + 1;
  }
  filteredWords = words.filter(word => counts[word] === 1);
  return filteredWords;
}

function uniqueValues(words) {
  let unique = {};
  let uniqueArr = [];

  for (let item of words) {
    if (!unique[item]) {
      unique[item] = true;
      uniqueArr.push(item);
    }
  }
  return uniqueArr;
}

askForWords();
