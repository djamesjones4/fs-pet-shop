'use strict'
// with Tom
const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.JSON');
let args = process.argv;
let subCommand = args[2];

//checks to see if the terminal command has "read" as the third part of it ($node pets.js read)

if (!subCommand) {
    console.error("Usage: node pets.js [read | create | update | destroy]");
    process.exit(1);
}

fs.readFile(petsPath, 'utf8', (err, petsData) => {
    let parsedPets = JSON.parse(petsData);
    if (subCommand === 'read') {
        if (args.length === 3) {
            console.log(parsedPets);
        }
        //checks to see if args[3] exists, then checks to make sure args[3] is greater than 0, then checks to see if args[3] is less than the length of petsData
        else if (args[3] && (args[3] >= 0) && (args[3] < parsedPets.length)) {
            console.log(parsedPets[args[3]]);
        }
    } else if (subCommand === 'create') {

        let age = parseInt(process.argv[3])
        // console.log(age);
        let kind = process.argv[4]
        // console.log(kind);
        let name = process.argv[5]
        // console.log(name);
        let petsObj = {
            age: age,
            kind: kind,
            name: name
        }
        // console.log('petsObj', petsObj);
        if (age === undefined || kind === undefined || name === undefined) {
            console.error('Usage: node pets.js create AGE KIND NAME')
            process.exit(1)
        } else {
            parsedPets.push(petsObj)
            // console.log('pets object', petsObj);
            // console.log('parsed Pets:' + JSON.stringify(parsedPets));
            console.log(petsObj);
            let strData = JSON.stringify(parsedPets)
            fs.writeFile(petsPath, strData, (err) => {
                if (err) {
                    throw err;
                }
            })
        }

    } else {
        console.error('Usage: node pets.js create AGE KIND NAME');
        process.exit(1)
    }

})
