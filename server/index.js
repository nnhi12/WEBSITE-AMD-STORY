const express = require('express');
const connectDB = require('./utils/connect.js');
const cors = require('cors');
const testModel = require('./models/Test.js');
const storyModel = require('./models/Story.js')

const accountModel = require('./models/Account.js');
const { redirect } = require('react-router-dom');
const userModel = require('./models/User.js');

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

app.post("/login", async (req, res)=> {
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

app.post("/register", async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // Kiểm tra xem username đã tồn tại chưa
        const existingAccount = await accountModel.findOne({ username });
        if (existingAccount) {
            return res.status(400).json({ message: "Username already exists. Please choose a different username." });
        }

        // Nếu username chưa tồn tại, tiến hành tạo tài khoản và user mới
        const account = await accountModel.create({
            username,
            password,
            role: 'user',
            status: true,
        });

        const user = await userModel.create({
            account: account._id,
            fullname: "",
            email,
        });

        res.json({ account, user });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ message: "An error occurred during registration. Please try again later." });
    }
});


app.get("/stories", async (req, res)=> {
    try {
        const stories = await storyModel.find();

        // Chuyển đổi Buffer hình ảnh sang Base64
        const modifiedStories = stories.map(story => ({
            ...story._doc,
            image: story.image ? story.image.toString('base64') : null,
        }));

        res.json(modifiedStories);
    } catch (error) {
        console.error('Error fetching stories:', error);
        res.status(500).send('Error fetching stories');
    }
}
)

app.get("/searchstory", async (req, res)=> {
    const query = req.query.name; // Lấy từ khóa tìm kiếm từ query string

    try {
        // Tìm kiếm các truyện có tên chứa từ khóa tìm kiếm, không phân biệt chữ hoa, chữ thường
        const stories = await storyModel.find({
            name: { $regex: query, $options: 'i' }
        });

        res.json(stories);
    } catch (error) {
        console.error('Error searching stories:', error);
        res.status(500).send('Error searching stories');
    }
}
) 

app.listen(3001, () => {
    console.log('Success!');
})