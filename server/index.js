const express = require('express');
const connectDB = require('./utils/connect.js');
const cors = require('cors');
const multer = require("multer");
const testModel = require('./models/Test.js');
const storyModel = require('./models/Story.js')

const accountModel = require('./models/Account.js');
const { redirect } = require('react-router-dom');
const userModel = require('./models/User.js');
const categoryModel = require('./models/Category.js');
const chapterModel = require('./models/Chapter.js');

const app = express();

app.use(express.json());
app.use(cors());
const upload = multer();

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

app.post("/login", async (req, res) => {
    // Lấy tên đăng nhập và mật khẩu từ yêu cầu
    const { username, password } = req.body;

    try {
        // Tìm tài khoản bằng tên đăng nhập và mật khẩu
        const account = await accountModel.findOne({ username: username, password: password });

        // Nếu không tìm thấy tài khoản, trả về lỗi
        if (!account) {
            return res.status(400).json({ message: "Invalid username or password" });
        }

        // Tìm thông tin người dùng dựa trên ID tài khoản
        const user = await userModel.findOne({ account: account._id });

        // Nếu không tìm thấy người dùng, trả về lỗi (nếu cần)
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Đăng nhập thành công, trả về thông tin tài khoản và người dùng
        res.json({ account: account, user: user });
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ message: "An error occurred during login. Please try again later." });
    }
});


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


app.get("/stories", async (req, res) => {
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

app.get("/searchstory", async (req, res) => {
    const query = req.query.name; // Lấy từ khóa tìm kiếm từ query string

    try {
        // Tìm kiếm các truyện có tên chứa từ khóa tìm kiếm, không phân biệt chữ hoa, chữ thường
        const stories = await storyModel.find({
            name: { $regex: query, $options: 'i' }
        });

        const modifiedStories = stories.map(story => ({
            ...story._doc,
            image: story.image ? story.image.toString('base64') : null,
        }));

        res.json(modifiedStories);
    } catch (error) {
        console.error('Error searching stories:', error);
        res.status(500).send('Error searching stories');
    }
}
);

app.get('/stories/:storyId', async (req, res) => {
    try {
        const story = await storyModel.findById(req.params.storyId);
        if (!story) {
            return res.status(404).send('Story not found');
        }
        const modifiedStory = {
            ...story._doc,
            image: story.image ? story.image.toString('base64') : null,
        };
        res.json(modifiedStory);
    } catch (err) {
        console.error('Error fetching story:', err);
        res.status(500).send('Server error');
    }
});

app.get('/stories/:storyId/chapters', async (req, res) => {
    try {
        const story = await storyModel.findById(req.params.storyId).populate('chapters');
        if (!story) {
            console.error('Story not found:', req.params.storyId);
            return res.status(404).send('Story not found');
        }
        console.log('Found story:', story);
        res.json(story.chapters);
    } catch (err) {
        console.error('Error fetching chapters:', err);
        res.status(500).send('Server error');
    }
});


app.get('/stories/:storyId/chapters/:chapterId', async (req, res) => {
    try {
        // Tìm câu chuyện theo storyId
        const story = await storyModel.findById(req.params.storyId).populate('chapters');
        if (!story) {
            console.error('Story not found:', req.params.storyId);
            return res.status(404).send('Story not found');
        }

        // Kiểm tra nếu chapters là một mảng và tìm chapter
        const chapter = story.chapters.find(chap => chap._id.toString() === req.params.chapterId);
        if (!chapter) {
            console.error('Chapter not found:', req.params.chapterId);
            return res.status(404).send('Chapter not found');
        }

        // Tìm vị trí của chapter trong mảng
        const chapterIndex = story.chapters.findIndex(chap => chap._id.toString() === req.params.chapterId);

        // Lấy chương trước và sau
        const previousChapter = chapterIndex > 0 ? story.chapters[chapterIndex - 1] : null;
        const nextChapter = chapterIndex < story.chapters.length - 1 ? story.chapters[chapterIndex + 1] : null;

        console.log('Found chapter:', chapter);
        res.json({
            chapter,
            previousId: previousChapter ? previousChapter._id : null,
            nextId: nextChapter ? nextChapter._id : null,
        });
    } catch (err) {
        console.error('Error fetching chapter:', err);
        res.status(500).send('Server error');
    }
});


app.get("/userinfo/:accountId", async (req, res) => {
    const accountId = req.params.accountId;
    try {
        const account = await accountModel.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        const user = await userModel.findOne({ account: accountId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({
            username: account.username,
            password: account.password, // Nếu mật khẩu không được mã hóa
            email: user.email,
            age: user.age,
            fullname: user.fullname,
            image: user.image ? user.image.toString('base64') : null, // Trả về hình ảnh ở dạng Base64
        });
    } catch (error) {
        console.error("Error fetching user info:", error);
        res.status(500).json({ message: "An error occurred fetching user info." });
    }
});



app.put("/userinfo/:accountId", upload.single("image"), async (req, res) => {
    const accountId = req.params.accountId;
    const { fullname, email, password, age } = req.body;
    const image = req.file ? req.file.buffer : undefined; // Lưu trực tiếp dưới dạng Buffer

    try {
        const account = await accountModel.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        const user = await userModel.findOneAndUpdate(
            { account: accountId },
            { fullname, email, password, age, image }, // Lưu Buffer vào cơ sở dữ liệu
            { new: true }
        );

        if (user) {
            res.json({
                message: "User information updated successfully",
                data: user,
            });
        } else {
            res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        console.error("Error updating user info:", error);
        res.status(500).json({ message: "An error occurred updating user info." });
    }
});

app.get('/categories', async (req, res) => {
    try {
        const categories = await categoryModel.find({}, 'name'); // Fetch only category names
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching categories' });
    }
});

//chapter



//the loai
app.get('/categories/:categoryId/stories', async (req, res) => {
    try {
        const categoryId = req.params.categoryId;
        const stories = await storyModel.find({ categories: categoryId });
        const modifiedStories = stories.map(story => ({
            ...story._doc,
            image: story.image ? story.image.toString('base64') : null,
        }));

        res.json(modifiedStories);
    } catch (err) {
        console.error('Error fetching stories for category:', err.message);
        res.status(500).send(`Server error: ${err.message}`);
    }
});


//
app.get('/users/:accountId/followingstories', async (req, res) => {
    try {
        const accountId = req.params.accountId;
        const account = await accountModel.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        const user = await userModel.findOne({ account: accountId }).populate('story_following');
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        console.log('User found:', user);
        const followedStories = await storyModel.find({ _id: { $in: user.story_following } });
        console.log('Followed stories found:', followedStories);
        const modifiedStories = followedStories.map(story => ({
            ...story._doc,
            image: story.image ? story.image.toString('base64') : null,
        }));

        res.json(modifiedStories);
    } catch (err) {
        console.error('Error fetching followed stories:', err.message);
        res.status(500).send(`Server error: ${err.message}`);
    }
});


app.listen(3001, () => {
    console.log('Success!');
})