import React, { Component } from 'react';
import Swal from 'sweetalert2';
import './book.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isContextMenuOpen: false,
      contextMenuPosition: { x: 0, y: 0 },
    };
  }

  handleContextMenu = (event) => {
    event.preventDefault(); // Prevent the default right-click menu from showing
    this.setState({
      isContextMenuOpen: true,
      contextMenuPosition: { x: event.pageX, y: event.pageY },
    });
  };

  handleOptionClick = (option) => {
    const { data, userId } = this.props;

    if (option === 'follow') {
      console.log(`Add to following list: ${data.name}`);

      // Check if the user has already followed the story
      axios
        .post('http://localhost:3001/add-to-follow-list', {
          accountId: userId,
          storyId: data._id,
        })
        .then((response) => {
          if (response.data.message) {
            // Display success message
            Swal.fire({
              title: 'Thành công!',
              text: 'Đã thêm vào danh sách theo dõi',
              icon: 'success',
              confirmButtonText: 'Đóng',
            });
          }
        })
        .catch((error) => {
          // If the error is that the story has already been followed
          Swal.fire({
            title: 'Lỗi!',
            text: 'Bạn đã theo dõi truyện này rồi',
            icon: 'error',
            confirmButtonText: 'Đóng',
          });
          console.error('Error adding story to following list:', error);
        });
    } else if (option === 'addToList') {
      console.log(`Add to reading list: ${data.name}`);

      // Check if the user has already added the story to the reading list
      axios
        .post('http://localhost:3001/add-to-reading-list', {
          accountId: userId,
          storyId: data._id,
        })
        .then((response) => {
          if (response.data.message) {
            // Display success message
            Swal.fire({
              title: 'Thành công!',
              text: 'Đã thêm vào danh sách đọc',
              icon: 'success',
              confirmButtonText: 'Đóng',
            });
          }
        })
        .catch((error) => {
          // If the error is that the story has already been added
          Swal.fire({
            title: '',
            text: 'Bạn đã lưu truyện này rồi',
            icon: 'error',
            confirmButtonText: 'Đóng',
          });
          console.error('Error adding story to reading list:', error);
        });
    }

    this.setState({ isContextMenuOpen: false }); // Close menu after selection
  };

  handleClickOutside = (event) => {
    if (!event.target.closest('.custom-context-menu')) {
      this.setState({ isContextMenuOpen: false });
    }
  };

  componentDidMount() {
    document.addEventListener('click', this.handleClickOutside);
  }

  componentWillUnmount() {
    document.removeEventListener('click', this.handleClickOutside);
  }

  render() {
    const { data, showChapters } = this.props;
    const { isContextMenuOpen, contextMenuPosition } = this.state;
    const imageSrc = data.image ? `data:image/jpeg;base64,${data.image}` : '';

    return (
      <div 
        className="col text-center mb-4"
        onContextMenu={this.handleContextMenu} // Attach right-click handler
      >
        <Link to={`/storyinfo/${data._id}`} className="u-text-decoration-none u-text-dark">
          <img src={imageSrc} alt={data.name} className="img-fluid u-book-image" />
          <p className="u-book-title mt-2">{data.name}</p>
        </Link>
        {showChapters && data.chapters && (
          <ul className="fav-chapter-list mt-2">
            {data.chapters.slice(0, 2).map((chapter, index) => (
              <li key={index}>
                <Link
                  to={`/stories/${data._id}/chapters/${chapter}`}
                  className="u-text-decoration-none"
                >
                  {chapter}
                </Link>
              </li>
            ))}
          </ul>
        )}

        {/* Custom Context Menu */}
        {isContextMenuOpen && (
          <div 
            className="custom-context-menu"
            style={{ top: contextMenuPosition.y, left: contextMenuPosition.x }}
          >
            <div onClick={() => this.handleOptionClick('follow')}>Theo dõi</div>
            <div onClick={() => this.handleOptionClick('addToList')}>Thêm vào danh sách đọc</div>
          </div>
        )}
      </div>
    );
  }
}

export default Book;
