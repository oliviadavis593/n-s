const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe.only('Notes Endpoints', function() {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    const tableCleanup = () => db.raw('TRUNCATE noteful_notes, noteful_folders RESTART IDENTITY CASCADE');
    
    after('disconnect from db', () => db.destroy())

    before('clean the table', tableCleanup);

    afterEach('clean the table', tableCleanup);

    context('Given there are notes in the database', () => {
        const testNotes = [
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
        ];

        beforeEach('insert notes', () => {
            return db 
                .into('noteful_notes')
                .insert(testNotes)
        })

        it('GET /notes responds with 200 and all of the notes', () => {
            return supertest(app)
                .get('/notes')
                .expect(200)
        })
    })
})