import { useState } from 'react';
import { Link } from 'react-router-dom';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import type { Post } from '../types';

dayjs.extend(relativeTime);

interface Props {
  post: Post;
  actions?: React.ReactNode;
}

const PostCard = ({ post, actions }: Props) => {
  const [showFullContent, setShowFullContent] = useState(false);
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const shouldShowViewMore = post.content.length > 150;
  const displayContent = showFullContent ? post.content : post.content.slice(0, 150);

  return (
    <article className="instagram-post">
      {/* Header */}
      <div className="instagram-post__header">
        <div className="instagram-post__user">
          <div className="instagram-post__avatar">
            {getInitials(post.username)}
          </div>
          <Link to={`/posts/${post._id}`} className="instagram-post__username">
            {post.username}
          </Link>
        </div>
        {actions && (
          <div className="instagram-post__menu">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="6" cy="12" r="1.5"></circle>
              <circle cx="18" cy="12" r="1.5"></circle>
            </svg>
          </div>
        )}
      </div>

      {/* Image */}
      <Link to={`/posts/${post._id}`} className="instagram-post__image-wrapper">
        {post.imageURL ? (
          <img src={post.imageURL} alt={post.title} className="instagram-post__image" loading="lazy" />
        ) : (
          <div className="instagram-post__image-placeholder">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
              <circle cx="8.5" cy="8.5" r="1.5"></circle>
              <polyline points="21 15 16 10 5 21"></polyline>
            </svg>
          </div>
        )}
      </Link>

      {/* Content */}
      <div className="instagram-post__content">
        <div className="instagram-post__caption">
          <Link to={`/posts/${post._id}`} className="instagram-post__caption-username">
            {post.username}
          </Link>
          <span className="instagram-post__caption-text">{post.title}</span>
        </div>

        <div className="instagram-post__description">
          <span className="instagram-post__description-text">{displayContent}</span>
          {!showFullContent && shouldShowViewMore && '...'}
        </div>

        {shouldShowViewMore && (
          <button
            type="button"
            onClick={() => setShowFullContent(!showFullContent)}
            className="instagram-post__view-more-btn"
          >
            {showFullContent ? 'Show less' : 'View more'}
          </button>
        )}

        <div className="instagram-post__time">
          {dayjs(post.createdAt).fromNow()}
        </div>

        {actions && (
          <div className="instagram-post__edit-actions">
            {actions}
          </div>
        )}
      </div>
    </article>
  );
};

export default PostCard;

