const route = require('express').Router()
const users = require('../db').users
const todolist = require('../db').todolist
const passport =require('../passport')

route.get('/login', (req,res) => {
    res.render('login')
})

route.get('/signup', (req, res) => {
    res.render('signup')
})

route.get('/todos', (req, res) => {
    res.render('todos')
})

route.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/todos'
}))


route.post('/signup', (req, res) => {
    users.create ({
        username: req.body.username,
        password: req.body.password,
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email
    }) .then((createduser) => {
        res.redirect('/login')
    })
})

function checkLoggedIn(req, res, next) {
    if (req.user) {
        console.log(req.user);
        console.log("req.user "+req.user.username)
        return next()
    }
    else{
   res.redirect('/login')
  }}
 

route.post('/todostask',checkLoggedIn,(req,res)=>{
    console.log(req.user.username)
    if(req.body.task){
    todolist.create({
        username:req.user.username,
        task:req.body.task
    }).then((task)=>{
        todolist.findAll({
            where:{
                username:req.user.username, 
            }
        }).then((alltask)=>{
            res.json(alltask)
        })
    })
    }
    else
    {
        todolist.findAll({
            where:{
                username:req.user.username, 
            }
        }).then((alltask)=>{
            res.json(alltask)
        })
    }
})

route.post('/striked',checkLoggedIn,(req,res)=>{
    todolist.update(
        {striked:true},
        {where:{
            username:req.user.username,
            task:req.body.task           
        }
    }
    ).then((updated)=>{
        console.log(updated)
        res.json(updated)
    })
})

route.post('/tobedeleted', checkLoggedIn,(req,res) => {
    todolist.destroy({
        where:{
            username:req.user.username,
            task:req.body.task
            }
    }).then(() => {
        res.sendStatus(200)
    })
})

exports = module.exports = route
