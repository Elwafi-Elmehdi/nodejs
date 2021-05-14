const fs = require('fs')


const getNotes = function (){
 return "Your Notes..."
}

const addNote = function (title,body) {
 var notes = loadNotes()
 notes.push({
  title: title,
  body:body
 })
 saveNote(notes)

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