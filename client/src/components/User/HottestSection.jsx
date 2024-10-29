import React from 'react';
import './HottestSection.css';
import { Link } from 'react-router-dom';

const hottestBooks = [
  { title: "Cô bé Lọ Lem", views: 456523, src: "https://bizweb.dktcdn.net/100/418/570/products/6ca60e45-05d0-4f3a-961e-e429dff9d1e5.jpg?v=1619243417400" },
  { title: "Người đẹp và quái vật", views: 213565, src: "https://ss-images.saostar.vn/wp700/2017/10/17/1679549/39-1479188426566.jpg" },
  { title: "Cô bé quàng khăn đỏ", views: 133565, src: "https://pos.nvncdn.com/fd5775-40602/ps/20200130_X23bSWF2KOurfaHESDuocRMT.jpg" },
  { title: "Tấm Cám", views: 123565, src: "https://book.sachgiai.com/uploads/book/truyen-co-tich-tam-cam/truyen-co-tich-tam-cam.jpg" },
  { title: "Peter Pan", views: 33565, src: "https://kenh14cdn.com/thumb_w/600/A3YmnWqkHeph7OwGyu6TwbX57tgTw/Image/2014/08/0h/1-43543.jpg" },
];

const HottestSection = () => {
  return (
    <div className="hottest-section">
      <h2 className="hottest-title">HOTTEST!!!</h2>
      {hottestBooks.map((book, index) => (
        <div className="hottest-book-item" key={index}>
          <Link to="/storyinfo">
            <img src={book.src} alt={book.title} className="hot-book-image" />
          </Link>
          <div className="hottest-book-info">
            <Link to="/storyinfo" className="hot-book-title">
              {book.title}
            </Link>
            <div className="hottest-book-views">{book.views}</div>
          </div>
        </div>
      ))}
      <Link to="/tophot" className="see-more-btn">See more</Link>
    </div>
  );
};

export default HottestSection;
