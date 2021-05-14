const fs = require('fs')


const getNotes = function (){
 const notes = loadNotes()
 console.log(notes)
}

const addNote = function (title,body) {

 var notes = loadNotes()
 notes
 const duplicatednotes = notes.filter(function (note) {
  return note.title === title
 })
 console.log(duplicatednotes.length)
 if (duplicatednotes.length === 0) {
  notes.push({
   title: title,
   body:body
  })
  saveNote(notes)
  console.log('Note Added')
 } else {
  console.log('Note title taken')
 }

}

const saveNote = function (notes) {

 const dataJSON = JSON.stringify(notes)
 fs.writeFileSync('notes.json',dataJSON)

}

const loadNotes = function () {

 try {
  const dataBuffer = fs.readFileSync('notes.json');
  const dataJSON = dataBuffer.toString()
  return JSON.parse(dataJSON)
 }
 catch (e) {
  return []
 }

}


module.exports = {
 getNotes:getNotes,
 addNote:addNote
}