const pg = require('pg');
const pool = new pg.Pool();

function insertUser(user) {
    return new Promise(function(resolve,reject){
        pool.connect((err,client,release)=>{
            client.query("INSERT INTO users (email, password, role) VALUES ($1, $2, $3) RETURNING *", [user.email, user.passwordEncripted, "user"])
                .then(function(succes){
                    resolve(succes);
                }) .catch(function(err){
                    reject(err)
                }).finally(release)
            } 
        )
    
    })
} 

function getUserByEmail(email) {
    return new Promise(function(resolve,reject){
         pool.connect((err,client,release)=>{
            client.query("SELECT * FROM users WHERE email = $1", [email])
            .then(function(result){
                resolve(result.rows);
            }).catch((err)=>{
                reject(err);
            }).finally(release)
        })
    })
} 

function getUserItems(user_id) {
    return new Promise(function(resolve,reject){
         pool.connect((err,client,release)=>{
            client.query("SELECT * FROM files WHERE user_id = $1", [user_id])
            .then(function(result){
                resolve(result.rows);
            }).catch((err)=>{
                reject(err);
            }).finally(release)
        })
    })
} 

module.exports = {
    getUserByEmail: getUserByEmail,
    insertUser: insertUser,
    getUserItems: getUserItems
} 
