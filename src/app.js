require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const helmet = require('helmet')
const { NODE_ENV } = require('./config') 
const winston = require('winston')
const NotesService = require('./notes-service')
const FoldersService = require('./folders-service')

const app = express()

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

//setup winston (logs all failures)
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
        new winston.transports.File({ filename: 'info.log' })
    ]
})

if (NODE_ENV !== 'production') {
    logger.add(new winston.transports.Console({
        format: winston.format.simple()
    }))
}

app.use(morgan(morganOption))
app.use(helmet())
app.use(cors())

app.get('/notes', (req, res, next) => {
    const knexInstance = req.app.get('db')
    NotesService.getAllNotes(knexInstance)
        .then(notes => {
            res.json(notes)
        })
        .catch(next)
})

app.get('/folders', (req, res, next) => {
    const knexInstance = req.app.get('db')
    FoldersService.getAllFolders(knexInstance)
        .then(folders => {
            res.json(folders)
        })
        .catch(next)
})

app.get('/folders/:folder_id', (req, res, next) => {
    const knexInstance = req.app.get('db')
    FoldersService.getById(knexInstance, req.params.folder_id)
        .then(folder => {
            if (!folder) {
                return res.status(404).json({
                    error: { message: `Folder Not Found` }
                })
            }
            res.json(folder)
        })
        .catch(next)
})

app.get('/', (req, res) => {
    res.send('Hello, world!')
})

app.use((error, req, res, next) => {
    let response

    if (NODE_ENV === 'production') {
        response = { error: { message: 'server error '}}
    } else {
        console.error(error)
        response = { error }
    }
    res.status(500).json(response)
})

module.exports = app; 