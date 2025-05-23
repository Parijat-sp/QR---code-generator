/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
  {
    message: "Enter the URL",
    type:"input",
    name:"URL",
  }
    
  ])
  .then((answers) => {
    const url = answers.URL;
    var qr_svg = qr.image(url, { type: 'png' });
    qr_svg.pipe(fs.createWriteStream('qr-image.png'));
 
    fs.writeFile("url.txt",url, 'utf8', (err) => {
        if (err) {
          console.error('Error writing file:', err);
        } else {
          console.log('File has been written successfully!');
        }
      });
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.log("Prompt couldn't be rendered in the current environment")
    } else {
      console.log("Something else went wrong", error);
    }
  });
