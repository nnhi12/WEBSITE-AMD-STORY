const express = require('express');
const connectDB = require('./utils/connect.js');
const cors = require('cors');
const multer = require("multer");
const storyModel = require('./models/Story.js')

const accountModel = require('./models/Account.js');
const { redirect } = require('react-router-dom');
const userModel = require('./models/User.js');
const categoryModel = require('./models/Category.js');
const chapterModel = require('./models/Chapter.js');
const commentModel = require('./models/Comment.js');
const readingchapterModel = require('./models/Readingchapter.js');


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

        // Kiểm tra xem email đã tồn tại chưa
        const existingEmail = await userModel.findOne({ email });
        if (existingEmail) {
            return res.status(400).json({ message: "Email already exists. Please use a different email." });
        }

        // Nếu username và email chưa tồn tại, tiến hành tạo tài khoản và user mới
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
        const { minChapters, maxChapters } = req.query;

        // Xây dựng bộ lọc
        const filter = {};
        if (minChapters) filter.chapterCount = { $gte: parseInt(minChapters) };
        if (maxChapters) filter.chapterCount = { ...filter.chapterCount, $lte: parseInt(maxChapters) };

        // Tính số lượng chapters
        const stories = await storyModel.aggregate([
            {
                $lookup: {
                    from: 'chapters', // Collection chứa chapters
                    localField: 'chapters', // Liên kết giữa story và chapter
                    foreignField: '_id',
                    as: 'chapterDetails'
                }
            },
            {
                $addFields: {
                    chapterCount: { $size: '$chapterDetails' } // Thêm trường chapterCount
                }
            },
            {
                $match: filter // Lọc theo chapterCount
            }
        ]);

        // Chuyển đổi Buffer hình ảnh sang Base64
        const modifiedStories = stories.map(story => ({
            ...story,
            image: story.image ? story.image.toString('base64') : null, // Chuyển đổi hình ảnh
        }));

        res.json(modifiedStories);
    } catch (error) {
        console.error('Error fetching stories:', error);
        res.status(500).send('Error fetching stories');
    }
});


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

//comment
app.post('/stories/:storyId/chapters/:chapterId/comments', async (req, res) => {
    try {
        const { content, accountId } = req.body;

        // Find the user by accountId
        const user = await userModel.findOne({ account: accountId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Find the chapter by chapterId
        const chapter = await chapterModel.findById(req.params.chapterId);
        if (!chapter) {
            return res.status(404).send('Chapter not found');
        }

        // Create and save the new comment
        const newComment = await new commentModel({
            message: content,
            created_at: new Date(),
        }).save();

        // Update user by pushing the new comment's ID into their comments array
        await userModel.findByIdAndUpdate(user._id, { $push: { comments: newComment._id } });

        // Add the new comment's ID to the chapter's comments array and save
        await chapterModel.findByIdAndUpdate(
            chapter._id,
            { $push: { comments: newComment._id } },
            { new: true }  // Option to return the updated document
        );

        res.status(200).json({ message: 'Comment added successfully', comment: newComment });
    } catch (err) {
        console.error('Error adding comment:', err);
        res.status(500).send('Server error');
    }
});

app.get('/stories/:storyId/chapters/:chapterId/comments', async (req, res) => {
    try {
        // Find the chapter by chapterId and populate the comments field
        const chapter = await chapterModel.findById(req.params.chapterId).populate('comments');

        if (!chapter) {
            return res.status(404).send('Chapter not found');
        }

        const comments = chapter.comments;
        const commentsWithUserInfo = await Promise.all(comments.map(async (comment) => {
            const user = await userModel.findOne({ comments: comment._id }); // Tìm người dùng theo userId trong bình luận
            if (user) {
                // Convert image Buffer to base64 (nếu có hình ảnh)
                const imageBase64 = user.image ? `data:image/jpeg;base64,${user.image.toString('base64')}` : null;

                return {
                    content: comment.content,
                    message: comment.message,
                    created_at: comment.created_at,
                    user: {
                        username: user.fullname, // Lấy username
                        image: imageBase64,      // Lấy hình ảnh (nếu có)
                    }
                };
            } else {
                return {
                    content: comment.content,
                    message: comment.message,
                    created_at: comment.created_at,
                    user: {
                        username: 'Unknown',
                        image: null
                    }
                };
            }
        }));

        res.status(200).json({ comments: commentsWithUserInfo });
    } catch (err) {
        console.error('Error fetching comments:', err);
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

        // Kiểm tra tài khoản tồn tại
        const account = await accountModel.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        // Tìm user và populate các truyện đọc cùng chapters
        const user = await userModel.findOne({ account: accountId }).populate({
            path: 'story_following',
            populate: { path: 'chapters', select: 'name' } // Lấy tên chapter
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Chuẩn bị dữ liệu để gửi về frontend
        const readStories = user.story_following.map(story => ({
            ...story.toObject(),
            image: story.image ? story.image.toString('base64') : null, // Convert ảnh sang base64
            chapters: story.chapters.map(chapter => ({
                id: chapter._id,
                name: chapter.name
            }))
        }));

        res.json(readStories);
    } catch (err) {
        console.error('Error fetching followed stories:', err.message);
        res.status(500).send(`Server error: ${err.message}`);
    }
});

app.get('/users/:accountId/readingstories', async (req, res) => {
    try {
        const accountId = req.params.accountId;

        // Kiểm tra tài khoản tồn tại
        const account = await accountModel.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        // Tìm user và populate các truyện đọc cùng chapters
        const user = await userModel.findOne({ account: accountId }).populate({
            path: 'story_reading',
            populate: { path: 'chapters', select: 'name' } // Lấy tên chapter
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Chuẩn bị dữ liệu để gửi về frontend
        const readStories = user.story_reading.map(story => ({
            ...story.toObject(),
            image: story.image ? story.image.toString('base64') : null, // Convert ảnh sang base64
            chapters: story.chapters.map(chapter => ({
                id: chapter._id,
                name: chapter.name
            }))
        }));

        res.json(readStories);
    } catch (err) {
        console.error('Error fetching followed stories:', err.message);
        res.status(500).send(`Server error: ${err.message}`);
    }
});


app.post('/add-to-reading-list', async (req, res) => {
    const { accountId, storyId } = req.body;
    const user = await userModel.findOne({ account: accountId });
    const story = await storyModel.findById(storyId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    try {

        if (user.story_reading.includes(storyId)) {
            return res.status(400).json({ message: "Story already in reading list." });
        }
        // Find the user and update the reading list
        await userModel.findByIdAndUpdate(user._id, { $push: { story_reading: storyId } });
        if (story.user_reading.includes(user._id)) {
            return res.status(400).json({ message: "User already in reading list." });
        }
        // Find the user and update the reading list
        await storyModel.findByIdAndUpdate(storyId, { $push: { user_reading: user._id } });
        if (user) {
            res.status(200).json({ message: 'Story added to reading list successfully.', user });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }



    } catch (error) {
        res.status(500).json({ message: 'Error adding story to reading list.', error });
    }
});

app.post('/add-to-follow-list', async (req, res) => {
    const { accountId, storyId } = req.body;
    const user = await userModel.findOne({ account: accountId });
    const story = await storyModel.findById(storyId);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    try {
        if (user.story_following.includes(storyId)) {
            return res.status(400).json({ message: "Story already in reading list." });
        }
        // Find the user and update the reading list
        await userModel.findByIdAndUpdate(user._id, { $push: { story_following: storyId } });

        if (story.user_follow.includes(user._id)) {
            return res.status(400).json({ message: "User already in reading list." });
        }
        // Find the user and update the following list
        await storyModel.findByIdAndUpdate(storyId, { $push: { user_follow: user._id } });

        if (user) {
            res.status(200).json({ message: 'Story added to reading list successfully.', user });
        } else {
            res.status(404).json({ message: 'User not found.' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Error adding story to reading list.', error });
    }
});

//xóa khỏi danh sách
app.post('/remove-from-follow-list', async (req, res) => {
    const { accountId, storyId } = req.body;
    const user = await userModel.findOne({ account: accountId });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    try {
        // Find the user and remove the story from the following list
        await userModel.findByIdAndUpdate(user._id, { $pull: { story_following: storyId } });
        await storyModel.findByIdAndUpdate(storyId, { $pull: { user_follow: user._id } });

        res.status(200).json({ message: 'Story removed from following list successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing story from following list.', error });
    }
});

app.post('/remove-from-reading-list', async (req, res) => {
    const { accountId, storyId } = req.body;
    const user = await userModel.findOne({ account: accountId });
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    try {
        // Xóa truyện khỏi danh sách đọc của người dùng
        await userModel.findByIdAndUpdate(user._id, { $pull: { story_reading: storyId } });
        // Xóa người dùng khỏi danh sách đọc của truyện
        await storyModel.findByIdAndUpdate(storyId, { $pull: { user_reading: user._id } });
        // Xóa các bản ghi trong readingchapter có story_id tương ứng
        await readingchapterModel.deleteMany({ story_id: storyId });

        res.status(200).json({ message: 'Story removed from reading list and related records in readingchapter deleted successfully.' });
    } catch (error) {
        res.status(500).json({ message: 'Error removing story from reading list.', error });
    }
});


app.post("/reset-password", async (req, res) => {
    const { email, newPassword } = req.body;

    try {
        // Kiểm tra xem email có tồn tại trong User không
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email không tồn tại" });
        }

        // Kiểm tra tài khoản tương ứng
        const account = await accountModel.findOne({ _id: user.account });
        if (!account) {
            return res.status(404).json({ message: "Tài khoản không tồn tại cho email này" });
        }

        // Cập nhật mật khẩu mới cho tài khoản
        account.password = newPassword; // Cập nhật mật khẩu mới mà không mã hóa
        await account.save();

        res.status(200).json({ message: "Mật khẩu đã được thay đổi thành công!" });
    } catch (error) {
        console.error("Lỗi khi thay đổi mật khẩu:", error);
        res.status(500).json({ message: "Lỗi trong quá trình thay đổi mật khẩu. Vui lòng thử lại." });
    }
});

//xử lý button đọc truyện
//first
app.get('/stories/:storyId/first', async (req, res) => {
    try {
        const story = await storyModel.findById(req.params.storyId).populate('chapters');

        if (!story) {
            return res.status(404).send('Story not found');
        }

        if (!story.chapters || story.chapters.length === 0) {
            return res.status(404).send('No chapters found for this story');
        }

        // Ensure chapters are populated correctly
        const firstChapter = story.chapters[0];
        if (!firstChapter) {
            return res.status(404).send('First chapter not found');
        }

        res.json(firstChapter);
    } catch (err) {
        console.error('Error fetching first chapter:', err);
        res.status(500).send('Server error');
    }
});


app.get('/stories/:storyId/latest', async (req, res) => {
    try {
        const story = await storyModel.findById(req.params.storyId).populate('chapters');
        if (!story || story.chapters.length === 0) {
            return res.status(404).send('No chapters found');
        }
        const latestChapter = story.chapters[story.chapters.length - 1]; // Lấy chương cuối
        res.json(latestChapter);
    } catch (err) {
        console.error('Error fetching latest chapter:', err);
        res.status(500).send('Server error');
    }
});


///đánh dấu chapter đang đọc
app.get('/users/:accountId/stories/:storyId/reading-chapter', async (req, res) => {
    try {
        const { accountId, storyId } = req.params;
        const account = await accountModel.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        const user = await userModel.findOne({ account: accountId });
        const record = await readingchapterModel.findOne({ user_id: user._id, story_id: storyId }).populate('chapter_id');
        if (!record) {
            return res.json({ chapter: null, count_row: 0 }); // No reading progress
        }
        res.json({ chapter: record.chapter_id, count_row: record.count_row }); // Current reading progress
    } catch (err) {
        console.error('Error fetching reading chapter:', err);
        res.status(500).send('Server error');
    }
});

app.put('/users/:accountId/stories/:storyId/reading-chapter', async (req, res) => {
    try {
        const { accountId, storyId } = req.params;
        const { chapterId, countRow } = req.body;

        // Kiểm tra xem tài khoản có tồn tại không
        const account = await accountModel.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        // Tìm người dùng từ tài khoản
        const user = await userModel.findOne({ account: accountId });

        // Kiểm tra xem storyId có trong danh sách story_reading của người dùng không
        if (!user.story_reading.includes(storyId)) {
            return res.status(400).json({ message: "Story is not in the reading list" });
        }

        // Cập nhật hoặc thêm mới record trong readingchapterModel
        const record = await readingchapterModel.findOneAndUpdate(
            { user_id: user._id, story_id: storyId },
            { chapter_id: chapterId, count_row: countRow },
            { new: true, upsert: true } // Cập nhật hoặc chèn nếu không tồn tại
        );

        res.json({ message: 'Reading progress updated successfully', record });
    } catch (err) {
        console.error('Error updating reading chapter:', err);
        res.status(500).send('Server error');
    }
});

////thanh tiến trình chưa done
app.get('/users/:accountId/get-reading-progress', async (req, res) => {
    const { accountId } = req.params;
    try {
        // Tìm tài khoản
        const account = await accountModel.findById(accountId);
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }

        // Tìm người dùng liên kết với tài khoản
        const user = await userModel.findOne({ account: accountId });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Lấy tất cả reading data của người dùng
        const readingDataList = await readingchapterModel.find({ user_id: user._id }).sort({ updated_at: -1 });

        if (!readingDataList || readingDataList.length === 0) {
            return res.status(404).json({ message: 'No reading data found for this user' });
        }

        const progressList = [];

        for (const readingData of readingDataList) {
            const currentChapterId = readingData.chapter_id[0];
            const storyId = readingData.story_id[0];

            // Lấy thông tin truyện
            const story = await storyModel.findById(storyId).populate('chapters');
            if (!story) continue; // Bỏ qua nếu không tìm thấy truyện

            const totalChapters = story.chapters.length;
            const currentChapterIndex = story.chapters.findIndex(chapter => chapter._id.toString() === currentChapterId.toString());

            // Tính tiến trình
            const progress = ((currentChapterIndex + 1) / totalChapters) * 100;

            progressList.push({
                storyId: story._id,
                storyTitle: story.title,
                progress: progress.toFixed(2),
            });
        }

        // Trả về danh sách tiến trình
        res.json(progressList);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error calculating reading progress' });
    }
});

app.put('/chapters/:chapterId/increment-view', async (req, res) => {
    const { chapterId } = req.params;
    try {
        // Find the chapter and increment the view count
        const chapter = await chapterModel.findById(chapterId);
        if (!chapter) {
            return res.status(404).json({ message: 'Chương không tồn tại' });
        }
        chapter.view += 1; // Increment the view count
        await chapter.save(); // Save the changes to the database

        // Find the story from the chapter
        const story = await storyModel.findOne({ chapters: chapterId });
        if (!story) {
            return res.status(404).json({ message: 'Truyện không tồn tại' });
        }
        const totalViews = await chapterModel.aggregate([
            { $match: { _id: { $in: story.chapters } } },
            { $group: { _id: null, totalViews: { $sum: '$view' } } }
        ]);
        story.view = totalViews[0]?.totalViews || 0;
        story.updated_at = new Date(); // Update the timestamp

        await story.save(); // Save the changes to the story

        res.status(200).json({ message: 'Số lượt xem của chapter và story đã được cập nhật', chapter, story });
    } catch (error) {
        console.error('Lỗi khi cập nhật số lượt xem:', error);
        res.status(500).json({ message: 'Lỗi server', error: error.message });
    }
});


//dang ky vip
app.post('/update-status', async (req, res) => {
    const accountId = req.body.accountId; // Lấy ID tài khoản từ body request
    
    try {
        // Tìm tài khoản theo ID
        const account = await accountModel.findById(accountId);

        if (!account) {
            return res.status(404).json({ message: 'Tài khoản không tồn tại.' });
        }

        const oldStatus = account.status;
        // Cập nhật status
        const updatedStatus = !account.status; // Đổi trạng thái
        account.status = updatedStatus;

        // Lưu thay đổi
        await account.save();

        return res.status(200).json({
            message: `Trạng thái tài khoản đã được cập nhật thành công.`,
            newStatus: updatedStatus
        });
    } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi cập nhật trạng thái.' });
    }
});


app.get('/account-status', async (req, res) => {
    const accountId = req.query.accountId; // Lấy ID tài khoản từ query params
    
    try {
        // Tìm tài khoản theo ID
        const account = await accountModel.findById(accountId);

        if (!account) {
            return res.status(404).json({ message: 'Tài khoản không tồn tại.' });
        }

        return res.status(200).json({
            status: account.status
        });
    } catch (error) {
        console.error('Lỗi khi lấy trạng thái:', error);
        res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy trạng thái tài khoản.' });
    }
});


app.listen(3001, () => {
    console.log('Success!');
})