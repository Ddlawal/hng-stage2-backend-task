import path from 'path'
import express, { urlencoded } from 'express'
import cors from 'cors'
import { errorMiddleware } from './middleware/errorHandler'
import { config } from 'dotenv'
import exphbs from 'express-handlebars'
import { sendEmail } from './helper'

config({ path: path.join(__dirname, '../.env') })

const app = express()

const port = process.env.PORT || 5000

app.use(cors())
app.use(urlencoded({ extended: false }))

app.use(express.json())
app.use(express.static(path.join(__dirname, '../public')))

app.engine(
    'hbs',
    exphbs({
        defaultLayout: 'main',
        extname: '.hbs',
    }),
)
app.set('view engine', 'hbs')

app.use(errorMiddleware)

// routes
app.get('/', (req, res) => {
    res.render('home')
})

app.post('/contactMe', async (req, res) => {
    try {
        await sendEmail(req.body)
        res.send('Email sent! Thanks for contacting me')
    } catch (error) {
        res.status(404).send(error.message)
    }
})

app.listen(port, async () => {
    console.log(`Listening on port: ${port}`)
})
