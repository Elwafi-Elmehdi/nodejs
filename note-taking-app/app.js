// const fs = require('fs')
// fs.writeFileSync('notes.txt','Hello I am mehdi and this is my first nodejs script')
// fs.appendFileSync('notes.txt',' And I am so exited to learn Node!')

// const validator = require('validator')
// console.log(validator.isEmail('Mehdi@exemple.hehehe'))
// console.log(chalk.green.inverse('Success!'))
// // console.log(process.argv)

// var cmd = process.argv[2]

// if (cmd === 'add') {
//  console.log('Adding a note')
// }
const chalk = require('chalk')
const yargs = require('yargs')
const notes = require('./notes.js')

// Customize yargs version
yargs.version('1.1.0')

// Create add command
yargs.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        },
        body: {
            describe: 'Note Body',
            demandOption: true,
            type: 'string'
        }
    },
    handler: function (argv) {
        notes.addNote(argv.title,argv.body)
    }
})

// Create remove command
yargs.command({
    command: 'remove',
    describe: 'Remove a note',
    builder: {
      title:{
       describe:"Note title",
       demandOption: true,
       type: 'string'
      }
    },
    handler: function (argv) {
       notes.removeNote(argv.title)
    }
})

// Create list command
yargs.command({
    command: 'list',
    describe: 'List your notes',
    handler: function () {
        notes.getNotes();
    }
})

// Create read command
yargs.command({
    command: 'read',
    describe: 'Read a note',
    builder: {
     title: {
      describe:'Note title',
      demandOption: true,
      type: 'string'
     }
    },
    handler: function (argv) {
        notes.findNote(argv.title)
    }
})

yargs.parse()


