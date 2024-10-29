import React from 'react';
import './ListGenre.css';

const listGenre = [
  { title: "Ngôn Tình"},
  { title: "Kinh Dị"},
  { title: "Phiêu Lưu"},
  { title: "Hành Động"},
  { title: "Trinh Thám"},
  { title: "Giả Tưởng"},
  { title: "Khoa Học Viễn Tưởng"},
  { title: "Tiên Hiệp"},
  { title: "Huyền Huyễn"},
  { title: "Hài Hước"},
  { title: "Dị Giới"},
  { title: "Đoản Văn"},
  { title: "Tâm Lý Tội Phạm"},
];

const ListGenre = () => {
  return (
    <div className="list-genre-section">
      <h2 className="list-genre-title">GENRE</h2>
      {listGenre.map((genre, index) => (
        <div className="list-genre-book-item" key={index}>
          <div className="list-genre-book-info">
            <div className="list-genre-book-title">{genre.title}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListGenre;
