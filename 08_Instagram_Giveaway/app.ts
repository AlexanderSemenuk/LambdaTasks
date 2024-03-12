import * as fs from 'fs';
import * as path from 'path';
import { performance } from 'perf_hooks'; 

const wordsDir = path.join(__dirname, 'words');
const numFiles = 19;

const filePhrases: Set<string>[] = []; 

async function processFiles() {
    const start = performance.now(); 

    const allPhrases = new Set<string>();

    for (let i = 1; i <= numFiles; i++) {
        const filePath = path.join(wordsDir, `out${i}.txt`);
        const phrases = await readFile(filePath);
        const fileSet = new Set(phrases);
        filePhrases.push(fileSet);
        for (const phrase of fileSet) {
            allPhrases.add(phrase);
        }
    }

    const numUniqueUsernames = allPhrases.size;
    console.log(`Number of unique usernames: ${numUniqueUsernames}`);

    const commonUsernames = new Set(Array.from(filePhrases[0]));
    for (let i = 1; i < numFiles; i++) {
        commonUsernames.forEach((phrase) => {
            if (!filePhrases[i].has(phrase)) {
                commonUsernames.delete(phrase);
            }
        });
    }
    console.log(`Number of usernames appearing in all files: ${commonUsernames.size}`);

    const usernamesInAtLeast10Files = new Set<string>();
    for (const phrase of allPhrases) {
        let count = 0;
        for (const fileSet of filePhrases) {
            if (fileSet.has(phrase)) {
                count++;
            }
            if (count >= 10) {
                usernamesInAtLeast10Files.add(phrase);
                break;
            }
        }
    }
    console.log(`Number of usernames appearing in at least 10 files: ${usernamesInAtLeast10Files.size}`);

    const end = performance.now(); 
    const duration = end - start; 
    console.log(`Time taken: ${duration} milliseconds`);
}

function readFile(filePath: string): Promise<string[]> {
    return new Promise((resolve, reject) => {
      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data.split('\n'));
        }
      });
    });
}

processFiles();
