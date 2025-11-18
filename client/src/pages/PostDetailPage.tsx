import { useEffect, useState } from 'react';
import { useNavigate, useParams, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import dayjs from 'dayjs';
import { postApi } from '../api';
import type { Post } from '../types';
import Loader from '../components/Loader';
import { authStore } from '../store/authStore';

const PostDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = authStore();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!id) return;
    const fetchPost = async () => {
      try {
        setLoading(true);
        const data = await postApi.detail(id);
        setPost(data);
      } catch (error) {
        toast.error('Failed to load post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
  }, [id]);

  const handleDelete = async () => {
    if (!id) return;
    const confirmed = window.confirm('Delete this post?');
    if (!confirmed) return;
    try {
      await postApi.remove(id);
      toast.success('Post deleted');
      navigate('/');
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  if (loading) return <Loader />;
  if (!post) return <p className="page">Post not found.</p>;

  const isOwner = user && user.id === post.owner;

  return (
    <section className="page post-detail">
      <Link to="/">← Back to feed</Link>
      <h1>{post.title}</h1>
      <p className="post-card__meta">
        by {post.username} • {dayjs(post.createdAt).format('DD MMM YYYY')}
      </p>
      {post.imageURL && <img src={post.imageURL} alt={post.title} className="post-detail__image" />}
      <p>{post.content}</p>

      {isOwner && (
        <div className="post-card__actions">
          <Link to={`/posts/${post._id}/edit`} className="button secondary">
            Edit
          </Link>
          <button type="button" className="button danger" onClick={handleDelete}>
            Delete
          </button>
        </div>
      )}
    </section>
  );
};

export default PostDetailPage;

