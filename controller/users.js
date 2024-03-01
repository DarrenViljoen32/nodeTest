import {getUsers,getSingleUser,addUser,deleteUser,editUser} from '../models/database.js'

export default {
    getAllUsers : async(req,res)=>{
        res.send(await getUsers())
    },
    getUser :async(req,res)=>{
        res.send(await getSingleUser(+req.params.id))
    },
    getPost : async(req,res)=>{
        const {firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile} = req.body 
        const post = await addUser(firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile)
        res.send(await getUsers())
    },  

    // getPost : async(req,res)=>{
    //     const {prodName,amount,Category,prodUrl} = req.body
    //     const post = await addProduct(prodName,amount,Category,prodUrl)
    //     res.send(await getProduct())
    // },

    rmvPostUser : async(req,res)=>{
        res.send(await deleteUser(+req.params.id))
    },

    getPatchUser : async (req,res)=>{
        const [user] = await getSingleUser(+req.params.id)
        let {firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile} = req.body   
        firstName ? firstName = firstName: {firstName} = user
        lastName ? lastName = lastName: {lastName} = user
        userAge ? userAge = userAge: {userAge} = user
        Gender ? Gender = Gender: {Gender} = user
        userRole ? userRole = userRole: {userRole} = user
        emailAdd ? emailAdd = emailAdd: {emailAdd} = user
        userPass ? userPass = userPass: {userPass} = user
        userProfile ? userProfile = userProfile: {userProfile} = user
        await editUser(firstName,lastName,userAge,Gender,userRole,emailAdd,userPass,userProfile, +req.params.id)
        res.json(await getUsers())
    },
}