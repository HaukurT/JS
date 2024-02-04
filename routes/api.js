import express from 'express';
import { connectDb } from '../utils/connectdb.js';

export const apiRouter = express.Router();

apiRouter.post('/login', async (req, res) => {
    const db = await connectDb();
    const email = String(req.body.email);
    const password = String(req.body.password);

    const findUserQuery = `
        SELECT * FROM users 
        WHERE email = '${email}' AND password ='${password}'`;

    let user;
    try {
        const [ result ] = await db.query(findUserQuery);
        user = result[0];
    } catch(err){
         console.log(err)
    }

    if(!user){
        res.send("Login fejlede din bitch");
        return;
    }
    
    res.send("Login lykkedes mf") 
})

apiRouter.post('/signup', async (req, res) => {
    const db = await connectDb();
    const email = String(req.body.email);
    const password = String(req.body.password);

    if(password.length < 8){
        res.send('Dit password er for kort ligesom din tisesenmand')
        return;
    }

    const findEmailQuery = `
    SELECT * FROM users 
    WHERE email='${email}'`;
    let user;
    try {
        const [results] = await db.query(findEmailQuery)
        user = results[0]
    } catch (err){ 
        console.log(err)
    }

    if(user){
        res.send("wagwan der er allerede en bruger der her den der email")
        return;
    }
    
    const insertUserQuery = `INSERT INTO users (email, password) VALUES ( '${email}', '${password}');`
    try {
        await db.query(insertUserQuery);
    } catch(err){
        console.log(err)
    }

    db.end();
    res.redirect('/')
});



/*
-- LOGIN: --
X Få fat i user email og password
X find user email og password matcher
hvis !userFound, login fejlede

hvis userFound, password passer til user email = login! :)
    - 

const email = asdsad
const password = basdasda

const user = SELECT * FROM user WHERE password = ${password} AND email = ${email}

if(!user){
    send besked
    return
}

login


*/
