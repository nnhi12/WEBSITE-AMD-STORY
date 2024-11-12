import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './viewchapter.css';
import Header from '../../../layouts/header/User/header.jsx';
import Footer from '../../../layouts/footer/User/footer.jsx';
import Navbar from '../../../components/User/navbar.jsx';

function ViewChapter() {
  const { chapterId, storyId } = useParams();
  const navigate = useNavigate();
  const [chapterData, setChapterData] = useState({ chapter: null, previousId: null, nextId: null });
  const [chapters, setChapters] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [story, setStory] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const [userId, setUserId] = useState(null);
  useEffect(() => {
    const storedUserId = localStorage.getItem("accountId");
    setUserId(storedUserId);
  }, []);

  useEffect(() => {
    axios.get(`http://localhost:3001/stories/${storyId}/chapters/${chapterId}`)
      .then(response => {
        setChapterData(response.data);
      })
      .catch(error => {
        console.error('Error fetching chapter:', error);
      });

    axios.get(`http://localhost:3001/stories/${storyId}/chapters/${chapterId}/comments`)
      .then(response => {
        if (response.data && Array.isArray(response.data.comments)) {
          setComments(response.data.comments);
        } else {
          setComments([]);  // Default to an empty array if no comments are found or data is malformed
        }
      })
      .catch(error => {
        console.error('Error fetching comments:', error);
      });

    axios.get(`http://localhost:3001/stories/${storyId}`)
      .then(response => {
        setStory(response.data);
      })
      .catch(error => {
        console.error('Error fetching story:', error);
      });

  }, [chapterId, storyId]);

  const { chapter, previousId, nextId } = chapterData;

  const toggleDropdown = () => {
    if (!isDropdownOpen) {
      axios.get(`http://localhost:3001/stories/${storyId}/chapters`)
        .then(response => {
          setChapters(response.data);
          setIsDropdownOpen(true);
        })
        .catch(error => {
          console.error('Error fetching chapters:', error);
        });
    } else {
      setIsDropdownOpen(false);
    }
  };

  const handleCommentSubmit = () => {
    axios.post(`http://localhost:3001/stories/${storyId}/chapters/${chapterId}/comments`, {
      content: newComment,
      accountId: userId // Gửi userId trong yêu cầu
    })
      .then(response => {
        setComments([...comments, response.data.comment]);
        setNewComment('');
      })
      .catch(error => {
        console.error('Lỗi khi đăng bình luận:', error);
      });
  };

  const navigateToChapter = (chapterId) => {
    navigate(`/stories/${storyId}/chapters/${chapterId}`);
    window.scrollTo(0, 0); // Scroll to the top of the page
  };

  const getButtonClass = (isDisabled) => {
    return isDisabled ? 'chapter-btn-disabled' : 'chapter-btn-primary';
  };

  if (!chapter) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-chapter-page">
      <Header />
      <Navbar />
      <div className="chapter-content">
        <p className="chapter-post-date">
          {chapter.posted_at ? `Posted at: ${new Date(chapter.posted_at).toLocaleString()}` : "Date not available"}
        </p>
        <h1 className="chapter-title">{story.name}</h1>
        <h2 className="chapter-now">{chapter.name}</h2>
      </div>
      <div className="chapter-select-buttons">
        <button
          className={`chapter-btn ${getButtonClass(!previousId)}`}
          onClick={() => previousId && navigateToChapter(previousId)}
          disabled={!previousId}
        >
          Chương trước
        </button>

        <div className="u-view-dropdown">
          <button
            className="chapter-btn chapter-btn-secondary"
            onClick={toggleDropdown}
          >
            Danh sách chương
          </button>
          {isDropdownOpen && (
            <div className="u-view-dropdown-menu">
              <ul>
                {chapters.map(chap => (
                  <li key={chap._id}>
                    <button onClick={() => {
                      navigateToChapter(chap._id);
                      setIsDropdownOpen(false);
                    }}>
                      {chap.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          className={`chapter-btn ${getButtonClass(!nextId)}`}
          onClick={() => nextId && navigateToChapter(nextId)}
          disabled={!nextId}
        >
          Chương tiếp
        </button>
      </div>
      <div className="chapter-content-text">
        <span>{chapter.content}</span>
      </div>
      <div className="chapter-select-buttons">
        <button
          className={`chapter-btn ${getButtonClass(!previousId)}`}
          onClick={() => previousId && navigateToChapter(previousId)}
          disabled={!previousId}
        >
          Chương trước
        </button>

        <div className="u-view-dropdown">
          <button
            className="chapter-btn chapter-btn-secondary"
            onClick={toggleDropdown}
          >
            Danh sách chương
          </button>
          {isDropdownOpen && (
            <div className="u-view-dropdown-menu">
              <ul>
                {chapters.map(chap => (
                  <li key={chap._id}>
                    <button onClick={() => {
                      navigateToChapter(chap._id);
                      setIsDropdownOpen(false);
                    }}>
                      {chap.name}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <button
          className={`chapter-btn ${getButtonClass(!nextId)}`}
          onClick={() => nextId && navigateToChapter(nextId)}
          disabled={!nextId}
        >
          Chương tiếp
        </button>
      </div>
      <div className="comment-section">
        <h3>Comments</h3>
        <div className="comments-list">
          {comments.map((comment, index) => (
            <div key={index} className="comment">
              <div className="comment-header">
                {comment.user.image && (
                  <img
                    src={comment.user.image}
                    alt="User Avatar"
                    className="comment-user-image"
                  />
                )}
                <strong>{comment.user.username}</strong>
                <span>  {comment.message}</span>
                <span> - {new Date(comment.created_at).toLocaleString()}</span>
              </div>
              <p>{comment.content}</p>
            </div>
          ))}
        </div>
        <div className="comment-input">
          <textarea
            placeholder="Add a comment..."
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button onClick={handleCommentSubmit}>Submit</button>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default ViewChapter;
