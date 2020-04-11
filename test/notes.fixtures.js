
function makeNotesArray() {
    return [
        {
            id: 1,
            note_name: '1st note test name',
            content: 'First test content', 
            modified: '2020-04-11T16:20:35.468Z',
            folder_id: 1
        },
        {
            id: 2, 
            note_name: '2nd note test name',
            content: 'Second test content',
            modified: '2020-04-11T16:20:35.468Z',
            folder_id: 2
        },
        {
            id: 3, 
            note_name: '3rd note test name',
            content: 'Third test content',
            modified: '2020-04-11T16:20:35.468Z',
            folder_id: 3
        }
    ]
}
 
module.exports = {
    makeNotesArray
}