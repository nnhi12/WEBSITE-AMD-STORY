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
  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // Trạng thái mở dropdown

  useEffect(() => {
    axios.get(`http://localhost:3001/stories/${storyId}/chapters/${chapterId}`)
      .then(response => {
        setChapterData(response.data);
      })
      .catch(error => {
        console.error('Error fetching chapter:', error);
      });
  }, [chapterId, storyId]);

  const { chapter, previousId, nextId } = chapterData;

  // Hàm để mở hoặc đóng dropdown và gọi API nếu cần
  const toggleDropdown = () => {
    if (!isDropdownOpen) {
      // Chỉ gọi API nếu dropdown chưa mở
      axios.get(`http://localhost:3001/stories/${storyId}/chapters`)
        .then(response => {
          setChapters(response.data);
          setIsDropdownOpen(true); // Mở dropdown sau khi lấy dữ liệu
        })
        .catch(error => {
          console.error('Error fetching chapters:', error);
        });
    } else {
      // Đóng dropdown nếu nó đang mở
      setIsDropdownOpen(false);
    }
  };

  if (!chapter) {
    return <div>Loading...</div>;
  }

  return (
    <div className="main-chapter-page">
      <Header />
      <Navbar />
      <div className="chapter-content">
        <p className="chapter-post-date">Posted at: {new Date(chapter.created_at).toLocaleString()}</p>
        <h1 className="chapter-title">{chapter.storyName}</h1>
        <h2 className="chapter-now">{chapter.name}</h2>
      </div>
      <div className="chapter-select-buttons">
        <button 
          className="chapter-btn chapter-btn-primary" 
          onClick={() => previousId && navigate(`/stories/${storyId}/chapters/${previousId}`)} 
          disabled={!previousId}
        >
          Chương trước
        </button>
        
        <div className="u-view-dropdown">
          <button 
            className="chapter-btn chapter-btn-secondary" 
            onClick={toggleDropdown} // Gọi hàm mở/đóng dropdown
          >
            Danh sách chương
          </button>
          {isDropdownOpen && (
            <div className="u-view-dropdown-menu">
              <ul>
                {chapters.map(chap => (
                  <li key={chap._id}>
                    <button onClick={() => {
                      navigate(`/stories/${storyId}/chapters/${chap._id}`);
                      setIsDropdownOpen(false); // Đóng dropdown sau khi chọn chương
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
          className="chapter-btn chapter-btn-primary" 
          onClick={() => nextId && navigate(`/stories/${storyId}/chapters/${nextId}`)} 
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
          className="chapter-btn chapter-btn-primary" 
          onClick={() => previousId && navigate(`/stories/${storyId}/chapters/${previousId}`)} 
          disabled={!previousId}
        >
          Chương trước
        </button>
        
        <div className="u-view-dropdown">
          <button 
            className="chapter-btn chapter-btn-secondary" 
            onClick={toggleDropdown} // Gọi hàm mở/đóng dropdown
          >
            Danh sách chương
          </button>
          {isDropdownOpen && (
            <div className="u-view-dropdown-menu">
              <ul>
                {chapters.map(chap => (
                  <li key={chap._id}>
                    <button onClick={() => {
                      navigate(`/stories/${storyId}/chapters/${chap._id}`);
                      setIsDropdownOpen(false); // Đóng dropdown sau khi chọn chương
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
          className="chapter-btn chapter-btn-primary" 
          onClick={() => nextId && navigate(`/stories/${storyId}/chapters/${nextId}`)} 
          disabled={!nextId}
        >
          Chương tiếp
        </button>
      </div>
      <Footer />
    </div>
  );
}

export default ViewChapter;
