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
        res.json({ accounts: response });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching accounts' });
    }
});

app.get("/login", async (req, res)=> {
    //get username of account
    const username = req.body.username;
    const password = req.body.password;

    //find account using this username
    const account = await accountModel.findOne({username: username, password:password})

    //respond
    if (!account) {
        return res.status(400).json({ message: "Invalid username or password" });
    }

    // Đăng nhập thành công, trả về thông tin tài khoản
    res.json({ account: account });
}
) 

app.post("/register", async (req, res)=> {
    //get the sent in data
    const username = req.body.username
    const password = req.body.password

    // create a user
    const account = await accountModel.create({
        username: username,
        password: password,
        role: 'user',
        status: true,
    });

    res.json({account: account})
}
) 

app.listen(3001, () => {
    console.log('Success!');
})