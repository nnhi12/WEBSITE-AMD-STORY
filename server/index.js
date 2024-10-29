const express = require('express');
const connectDB = require('./utils/connect.js');
const cors = require('cors');
const testModel = require('./models/Test.js')

const accountModel = require('./models/Account.js');
const { redirect } = require('react-router-dom');

const app = express();
app.use(express.json());
app.use(cors());

connectDB();

// app.get('/', async (req, res) => {
//     const id = req.body.id;
//     try {
//         const response = await testModel.find();
//         res.json({ response });
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching accounts' });
//     }
// });

app.get('/', async (req, res) => {
    const id = req.body.id;
    try {
        const response = await accountModel.find();
        res.json({ Account: response });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching accounts' });
    }
});

app.post("/login", async (req, res)=> {
    const {username, password} = await accountModel.findOne({username: username})
    .then(account => {
        if (user) {
            if(user.password === password) {
                res.json("Success!")
            } else {
                res.json("Password is incorrect")
            }
        } else {
            res.json("User does not exist")
        }
    })
}
) 
app.listen(3001, () => {
    console.log('Success!');
})