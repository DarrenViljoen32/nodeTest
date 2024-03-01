import mysql from 'mysql2'
import {config} from 'dotenv'
config()

const pool = mysql.createPool({
    host:process.env.HOST,
    user:process.env.USER,
    password:process.env.PASSWORD,
    database:process.env.DATABASE
}).promise()

const getProduct = async()=>{
    const [result] = await pool.query(`
        SELECT *
        FROM products
    `)
    return result
}
const getSingle = async(prodID) =>{
    const [result] = await pool.query(`
    SELECT *
    FROM products
    WHERE prodID = ?
    `,[prodID])
    return result
}

// to delete an item
const deleteItem = async(prodID) => {
    const [result] = await pool.query(`
        DELETE FROM products WHERE (prodID) = (?)
    `,[prodID])
    return result
}

const addProduct = async(prodName,amount,Category,prodUrl) => {
    const [item] = await pool.query(`
    INSERT INTO products (prodName,amount,Category,prodUrl) VALUES (?,?,?,?)
    `,[prodName,amount,Category,prodUrl])
    return getProduct(item)
}

const editProduct = async(prodName,amount,Category,prodID)=>{
    const [item] = await pool.query(`
        UPDATE products
        SET prodName=?, amount=?, Category=?
        WHERE (prodID=?)
    `,[prodName,amount,Category,prodID])
    return item
}

//users
const getUsers = async()=>{
    const[result] = await pool.query(`
    SELECT * FROM
    users
    `)
    return result
}

const getSingleUser = async(userID) =>{
    const [result] = await pool.query(`
    SELECT *
    FROM users
    WHERE userID = ?
    `,[userID])
    return result
}
const deleteUser = async(userID) => { // pool helps connect to the database
    const [result] = await pool.query(` 
        DELETE FROM users WHERE (userID) = (?)
    `,[userID])
    return result
}

const addUser = async(firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile) => {
    const [user] = await pool.query(`
    INSERT INTO users (firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile) VALUES (?,?,?,?,?,?,?,?)
    `,[firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile])
    return getUsers(user)
}

const checkUser = async (emailAdd) =>{
    const [[{password}]] = await pool.query(`
    SELECT password FROM users WHERE emailAdd = ?
    `,[emailAdd])//prepared statement
    return password
}

const editUser = async(firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile,userID)=>{
    const [user] = await pool.query(`
        UPDATE users
        SET firstName=?, lastName=?, userAge=?, Gender=?,userRole=?, emailAdd=?, userPass=?, userProfile=?
        WHERE (userID=?)
    `,[firstName, lastName, userAge, Gender, userRole, emailAdd, userPass, userProfile, userID])
    return user
}
export {getUsers,getSingleUser,deleteUser,addUser,editUser,checkUser}
export {getProduct,deleteItem,getSingle,addProduct,editProduct}