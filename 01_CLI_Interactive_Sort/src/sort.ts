export function sortWords(words: string[]): string[] {
    return words.slice().sort();
  }
  
export function sortNumbersAscending(numbers: number[]): number[] {
    return numbers.slice().sort((a, b) => a - b);
  }
  
export function sortNumbersDescending(numbers: number[]): number[] {
    return numbers.slice().sort((a, b) => b - a);
}
  
export function sortWordsByLength(words: string[]): string[] {
    return words.slice().sort((a, b) => a.length - b.length);
}
  
export function getUniqueWords(words: string[]): string[] {
    return words.filter((word, index, array) => array.indexOf(word) === array.lastIndexOf(word));
}

  
export function getUniqueValues(values: (string | number)[]): (string | number)[] {
    return values.filter((value, index, array) => array.indexOf(value) === array.lastIndexOf(value));
}