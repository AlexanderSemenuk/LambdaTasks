import inquirer from 'inquirer';
import fs from 'fs/promises';

async function readUserData() {
    const data = await fs.readFile('userDetails.json', { encoding: 'utf8' });
    const jsonData = JSON.parse(data);
    return jsonData;
}

async function writeUserData(userData) {
    const existingData = await readUserData();
    existingData.push(userData);
    await fs.writeFile('userDetails.json', JSON.stringify(existingData, null, 2));   
}

async function askUserInfo() {
    const { userName } = await inquirer.prompt([
        {
            type: 'input',
            name: 'userName',
            message: "Enter the user's name. To proceed without entering a name, press ENTER"
        }
    ]);

    if (!userName) {
        await askToSearchDB();
        return;
    }

    const userDetails = await inquirer.prompt([
        {
            type: 'list',
            name: 'gender',
            message: 'Choose your gender:',
            choices: ['Male', 'Female']
        },
        {
            type: 'input',
            name: 'age',
            message: 'Enter your age:'
        }
    ]);

    const userData = {...userDetails, userName};

    await writeUserData(userData);

    await askUserInfo();
}

async function askToSearchDB() {
    const { searchDB } = await inquirer.prompt([
        {
            type: 'confirm',
            name: 'searchDB',
            message: 'Would you like to search values in DB?',
            default: true
        }
    ]);

    if (searchDB) {
        const data = await readUserData();
        console.log(data);
        const { searchResult } = await inquirer.prompt([
            {
                type: 'input',
                name: 'searchResult',
                message: 'Enter user name you wanna find in DB:'
            }
        ]);

        const foundUser = data.find(user => user.userName.toLowerCase() === searchResult.toLowerCase());

        if (foundUser) {
            console.log('User found:', foundUser);
        }
        else {
            console.log('User not found');
        }
    } else {
        console.log('Goodbye');
    }
}

askUserInfo();