import inquirer from "inquirer";
import * as fs from 'fs/promises';
import {uploadFile, generateLink} from './src/uploadFile';
import {createTinyLink} from './src/createLink';


importPicture();



async function importPicture() {
  try {
  let picture = await inquirer.prompt([
        {
    name: 'Path',
    type : 'input',
    message : "Drag and drop your image to terminal and press Enter for upload:",
    validate(Path) {
      if (Path.length > 555) {
        return 'Too many chars in path.';
      }
      return true;
    },
  },
])

  if (typeof picture.Path === 'string') {
    const picturePath = await renamePicture(picture.Path);

    const driveFileId = await uploadFile(picturePath);
    if (typeof driveFileId === 'string') {
      const longLink = await generateLink(driveFileId);
      if (typeof longLink === 'string') {
      sortLink(longLink)
      }
    }
  }
}
  catch(error) {
    if (error instanceof Error) {
        console.log(error)
    }
  };
}


async function renamePicture(picturePath: string) {
  console.log(picturePath)
  const renameQuery = await inquirer.prompt([
    {
      name: 'answer',
      type : 'list',
      message : "Would you like to rename the image?",
      choices : [
        'Yes',
        'No'
      ]
    }
  ])
  let newPicturePath;
  if ((renameQuery.answer) === 'Yes') {
  let newFileName = await  inquirer.prompt([
    {
      name: 'answer',
      type : 'input',
      message : "Enter new filename (WITHOUT extensions aka .jpg .img etc.)",
    },
  ])
  
    newPicturePath = ((picturePath.split('\\')).slice(0, -1)).join('\\') + '\\' + newFileName.answer + '.' + ((picturePath.split('.')).at(-1));
    await fs.rename(picturePath, newPicturePath)
  return newPicturePath;
  } else {

    return picturePath
  };
}

async function sortLink(longLink: string) {
  const shorteningQuery = await inquirer.prompt([
    {
      name: 'answer',
      type : 'list',
      message : "Would you like to shortening link?",
      choices : [
        'Yes',
        'No'
      ]
    }
  ])
  if ((shorteningQuery.answer) === 'Yes') {
    const sortLink = await createTinyLink(longLink);
    console.log(sortLink);
  }
}