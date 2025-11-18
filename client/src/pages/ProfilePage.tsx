import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { postApi } from '../api';
import type { Post } from '../types';
import PostCard from '../components/PostCard';
import Loader from '../components/Loader';
import EmptyState from '../components/EmptyState';

const ProfilePage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);

  const loadPosts = async () => {
    try {
      setLoading(true);
      const data = await postApi.mine();
      setPosts(data);
    } catch (error) {
      toast.error('Failed to load your posts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPosts();
  }, []);

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm('Delete this post?');
    if (!confirmed) return;
    try {
      await postApi.remove(id);
      toast.success('Post deleted');
      loadPosts();
    } catch (error) {
      toast.error('Failed to delete');
    }
  };

  return (
    <section className="page">
      <div className="page__header">
        <h1>My Posts</h1>
        <Link to="/posts/new" className="button">
          New Post
        </Link>
      </div>
      {loading && <Loader />}
      {!loading && posts.length === 0 && (
        <EmptyState title="You have not published anything yet." action={<Link to="/posts/new">Create your first post</Link>} />
      )}
      <div className="post-grid">
        {posts.map((post) => (
          <PostCard
            key={post._id}
            post={post}
            actions={
              <>
                <Link to={`/posts/${post._id}/edit`} className="button secondary">
                  Edit
                </Link>
                <button type="button" className="button danger" onClick={() => handleDelete(post._id)}>
                  Delete
                </button>
              </>
            }
          />
        ))}
      </div>
    </section>
  );
};

export default ProfilePage;

