import React, { Component } from 'react';
import './book.css';
import { Link } from 'react-router-dom';

class Book extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isContextMenuOpen: false,
      contextMenuPosition: { x: 0, y: 0 },
    };
  }

  handleContextMenu = (event) => {
    event.preventDefault(); // Prevent default right-click menu
    this.setState({
      isContextMenuOpen: true,
      contextMenuPosition: { x: event.pageX, y: event.pageY },
    });
  };

  handleOptionClick = (option) => {
    const { data } = this.props;
    if (option === 'follow') {
      // Handle follow action
      console.log(`Follow story: ${data.name}`);
    } else if (option === 'addToList') {
      // Handle add to reading list action
      console.log(`Add to reading list: ${data.name}`);
    }
    this.setState({ isContextMenuOpen: false }); // Close menu after selection
  };

  handleClickOutside = () => {
    this.setState({ isContextMenuOpen: false });
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
                  to={{
                    pathname: '/viewchapter',
                    state: { chapterName: chapter, bookTitle: data.name },
                  }}
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
