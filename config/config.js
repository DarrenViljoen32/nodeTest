import mysql from 'mysql2'
import {config} from 'dotenv'

// const pool = mysql.createPool({
//     host:process.env.HOST,
//     user:process.env.USER,
//     password:process.env.PASSWORD,
//     database:process.env.DATABASE
// }).promise()

export {pool}