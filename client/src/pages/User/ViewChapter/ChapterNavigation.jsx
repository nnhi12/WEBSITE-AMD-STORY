// src/components/User/ChapterNavigation.jsx
import React from 'react';

const ChapterNavigation = ({ previousId, nextId, toggleDropdown, isDropdownOpen, chapters, navigateToChapter }) => {
  return (
    <div className="chapter-select-buttons">
      <button
        className={`chapter-btn ${previousId ? '' : 'chapter-btn-disabled'}`}
        onClick={() => previousId && navigateToChapter(previousId)}
        disabled={!previousId}
      >
        Chương trước
      </button>

      <div className="u-view-dropdown">
        <button className="chapter-btn chapter-btn-secondary" onClick={toggleDropdown}>
          Danh sách chương
        </button>
        {isDropdownOpen && (
          <div className="u-view-dropdown-menu">
            <ul>
              {chapters.map((chap) => (
                <li key={chap._id}>
                  <button onClick={() => navigateToChapter(chap._id)}>
                    {chap.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <button
        className={`chapter-btn ${nextId ? '' : 'chapter-btn-disabled'}`}
        onClick={() => nextId && navigateToChapter(nextId)}
        disabled={!nextId}
      >
        Chương tiếp
      </button>
    </div>
  );
};

export default ChapterNavigation;
