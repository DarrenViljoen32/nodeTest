import express from 'express'
import {config} from 'dotenv'
import cors from 'cors'
import productsRouter from './routes/products.js'
import usersRouter from './routes/users.js'
import bcrypt from 'bcrypt'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
config();

const PORT = process.env.PORT
const app = express();

app.use(cors())
app.use(express.json())
app.use(express.static('../frontend/src/views/ProductsView.vue'))
app.use(express.static('../frontend/src/views/ItemView.vue'))
// app.use(cookieParser())



// const authenticate = (req,res,next) =>{
//     let {cookie} = req.headers
//     let tokenInHeader = cookie && cookie.split('=')[1]
//     if(tokenInHeader===null) res.sendStatus(401)
//     jwt.verify(tokenInHeader,process.env.SECRET_KEY,(err,user)=>{
//     if(err) return res.sendStatus(403)
//     req.user = user
//     next()
// })
// }

app.use('/users',usersRouter)
app.use('/products',productsRouter)

app.post('/login',(req,res)=>{
    res.json({
        token:token,
        msg:'You have logged in'
    })
})
app.post('/users',(req,res)=>{
    const {firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile} = req.body
    bcrypt.hash(password,10, async (err,hash)=>{
        if(err) throw err
        await addUser(username,hash)
        res.send(await addUser(username,hash))
    })
    res.send({
       msg: "You have registered successfully"
    })
})
const auth = async (req,res,next) => {  //middleware (req,res,next())
    const {password,username} = req.body
    const hashedPassword = await checkUser(username )
    bcrypt.compare(password,hashedPassword, (err,result)=>{
        if(err) throw err
        if(result === true){
            const {username} = req.body
        const token = jwt.sign({username:username},
        process.env.SECRET_KEY,{expiresIn:'1h'})
        res.cookie('jwt',token,{httpOnly:false}) //true only backend user can access on frontend--- if it is set to true than only the backend user can set the
        res.send({
            token:token, //first one is the token ,second one is the value of the token
            msg:'You have logged in!!! YAY!'
        })
        next()
        }else{
            res.send({msg:'The username or password is incorrect'})
        }
    })
    }
    app.post('/login',auth, (req,res)=>{
        res.send({
            msg:'You have logged in!!! YAY!'
        })
    })


// app.post('/users',(req,res)=>{
//     const {emailAdd,userPass} = req.body
//     bcrypt.hash(userPass,10, async (err,hash)=>{
//         if(err) throw err
//         await addUser(emailAdd,hash)
//     })
//     res.send({
//        msg: "You have registered successfully"
//     })
// })


// const auth = async (req,res,next) => {  //middleware (req,res,next())
//     const {password,username} = req.body
//     const hashedPassword = await checkUser(username )
//     bcrypt.compare(password,hashedPassword, (err,result)=>{
//         if(err) throw err
//         if(result === true){
//             const {username} = req.body
//         const token = jwt.sign({username:username},
//         process.env.SECRET_KEY,{expiresIn:'1h'})
//         //res.cookie('jwt',token,{httpOnly:false}) //true only backend user can access on frontend--- if it is set to true than only the backend user can set the
//         res.send({
//             token:token, //first one is the token ,second one is the value of the token
//             msg:'You have logged in!!! YAY!'
//         })
//         next()
//         }else{
//             res.send({msg:'The username or password is incorrect'})
//         }
//     })
// }

app.listen(PORT, ()=>{
    console.log('http://localhost:'+ PORT);
})