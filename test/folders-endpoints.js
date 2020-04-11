const { expect } = require('chai')
const knex = require('knex')
const app = require('../src/app')

describe('Folders Endpoints', function() {
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

    context('Given there are folders in the database', () => {
        const testFolders = [
            {
                id: 1, 
                folder_name: 'First folder name'
            },
            {
                id: 2, 
                folder_name: 'Second folder name'
            },
            {
                id: 3, 
                folder_name: 'Third folder name'
            }
        ];

        beforeEach('insert folders', () => {
            return db 
                .into('noteful_folders')
                .insert(testFolders)
        })

        it('GET /folders responds with 200 and all of the folders', () => {
            return supertest(app)
                .get('folders')
                .expect(200)
        })
    })
})