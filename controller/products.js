import {getProduct,addProduct,deleteItem,editProduct,getSingle} from '../models/database.js'
 
export default {
    getProds : async(req,res)=>{
        res.send(await getProduct())
    },
    getItem :async(req,res)=>{
        res.send(await getSingle(+req.params.id))
    }, 
    getPost : async(req,res)=>{
        const {prodName,amount,Category,prodUrl} = req.body //creating 1 variable for name and age
        const post = await addProduct(prodName,amount,Category,prodUrl)
        res.send(await getProduct())
    }, 
    rmvPost : async(req,res)=>{
        res.send(await deleteItem(+req.params.id))
    },
    
    getPatch : async (req,res)=>{
        const [item] = await getSingle(+req.params.id)
        let {prodName,amount,Category} = req.body   
        prodName ? prodName = prodName: {prodName} = item
        amount ? amount = amount: {amount} = item        
        Category ? Category = Category: {Category} = item
        await editProduct(prodName,amount,Category, +req.params.id)
        res.json(await getProduct())
    },
 
}
