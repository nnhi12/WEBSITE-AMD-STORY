import React from 'react';
import Book from './book';
import { Link } from 'react-router-dom';

const books = [
  { src: "https://lumiere-a.akamaihd.net/v1/images/p_pinocchio_19879_d6304938.jpeg?region=0%2C0%2C540%2C810", title: "Chú bé người gỗ Pinocchio", url: "/storyinfo", chapters: ["Chapter 10", "Chapter 9"]},
  { src: "https://bizweb.dktcdn.net/thumb/1024x1024/100/363/455/products/truyencogrimm01.jpg?v=1705552095000", title: "Truyện cổ Grimm", url: "/storyinfo" ,chapters: ["Chapter 20", "Chapter 19"]},
  { src: "https://product.hstatic.net/1000328521/product/365chuyenkemoingay_master.jpg", title: "365 Chuyện kể mỗi ngày", url: "/storyinfo" ,chapters: ["Chapter 11", "Chapter 10"]},
  { src: "https://bizweb.dktcdn.net/100/418/570/products/6ca60e45-05d0-4f3a-961e-e429dff9d1e5.jpg?v=1619243417400", title: "Cô bé Lọ Lem" , url: "/storyinfo", chapters: ["Chapter 2", "Chapter 1"]},
  { src: "https://static2.vieon.vn/vieplay-image/poster_v4/2022/10/07/t71ygbtr_660x946-nangtienca.png", title: "Nàng tiên cá", url: "/storyinfo", chapters: ["Chapter 8", "Chapter 7"]},
  { src: "https://bizweb.dktcdn.net/100/370/339/products/chiec-la-cuoi-cung-bia1.jpg?v=1587616385653", title: "Chiếc lá cuối cùng", url: "/storyinfo", chapters: ["Chapter 5", "Chapter 4"]},
  { src: "https://cdn0.fahasa.com/media/catalog/product/c/a/cam_nang_cong_chua_toc_may___bi_kip_can_dam_va_sang_tao_1_2018_10_16_16_50_08.jpg", title: "Cẩm nang công chúa Tóc Mây", url: "/storyinfo", chapters: ["Chapter 1", "Chapter 0"] },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdPCiAHs7NHWJF7uJBeewOEjA9wt2gCVQ0Zw&s", title: "Tấm Cám", url: "/storyinfo", chapters: ["Chapter 5", "Chapter 4"] },
  { src: "https://product.hstatic.net/200000122283/product/untitled-5_18_14_d53dfa39e2564c1ea3be9af4e6d3916a_grande.jpg", title: "Nàng Bạch Tuyết và 7 chú lùn", url: "/storyinfo", chapters: ["Chapter 5", "Chapter 4"] },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTNV_IWQneyc97UOzx8THL0-AfPvzZ3q5FUyQ&s", title: "Chuyện về các nàng Công chúa", url: "/storyinfo", chapters: ["Chapter 5", "Chapter 4"] },
  { src: "https://cdn0.fahasa.com/media/catalog/product/9/7/9780448450520.jpg", title: "Who is Walt Disney?", url: "/storyinfo" },
  { src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ16SRTQ2KEre6lFqI2g7PBxccT-jDjiOn7Qg&s", title: "Aladdin", url: "/storyinfo" },
];

const ListReading = ({ showChapters }) => (
  <div className="container my-5">
    <div className="row row-cols-4">
      {books.map((book, index) => (
        <Book key = {index} data = {book} showChapters={showChapters}/>
      ))}
    </div>
  </div>
);

export default ListReading;
