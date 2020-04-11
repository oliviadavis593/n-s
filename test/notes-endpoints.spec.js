const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe('Notes Endpoints', function() {
    let db

    before('make knex instance', () => {
        db = knex({
            client: 'pg',
            connection: process.env.TEST_DB_URL,
        })
        app.set('db', db)
    })

    after('disconnect from db', () => db.destroy())

    before('clean the table', () => db('noteful_notes').truncate())

    context('Given there are notes in the database', () => {
        const testNotes = [
            {
                id: 1, 
                note_name: 'First note name',
                content: 'First content',
                modified: '2020-04-11T16:20:35.468Z',
                folder_id: 1
            },
            {
                id: 2, 
                note_name: 'Second note name',
                content: 'Second content',
                modified: '2020-04-11T16:20:35.468Z',
                folder_id: 2
            },
            {
                id: 3, 
                note_name: 'Third note name',
                content: 'Third content',
                modified: '2020-04-11T16:20:35.468Z',
                folder_id: 3
            }
        ];

        beforeEach('insert notes', () => {
            return db
                .into('noteful_notes')
                .insert(testNotes)
        })

        it.skip('GET /notes responds with 200 and all of the notes', () => {
            return supertest(app)
                .get('/notes')
                .expect(200)
        })
    })
})