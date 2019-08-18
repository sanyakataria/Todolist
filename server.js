const express = require('express')
const app = express()
const path = require('path')
const session = require('express-session')
const passport = require('./passport')
const {users,todolist} = require('./db')
app.set('view engine', 'hbs')

app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use(session({
    secret: "somesecretstring"  // secret is used to encode cookies
}))
app.use(passport.initialize())
app.use(passport.session())

app.use('/',express.static(path.join(__dirname,"public")))

app.use('/', require('./routes/route'))

app.listen(9999, () => console.log("server started at http://localhost:9999"))