import { useEffect, useState, useRef } from 'react';
import toast from 'react-hot-toast';
import { postApi } from '../api';
import type { Post } from '../types';
import Loader from '../components/Loader';
import PostCard from '../components/PostCard';
import EmptyState from '../components/EmptyState';
import Pagination from '../components/Pagination';

const HomePage = () => {
  const [allPosts, setAllPosts] = useState<Post[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Load all posts initially
  useEffect(() => {
    const loadPosts = async () => {
      try {
        setLoading(true);
        // Fetch all posts without pagination for client-side search
        const response = await postApi.list({ page: 1, limit: 1000, search: '' });
        setAllPosts(response.data);
        setFilteredPosts(response.data);
        setPages(Math.ceil(response.data.length / 6));
      } catch (error) {
        console.error(error);
        toast.error('Failed to load posts');
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  // Real-time search as user types
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    debounceTimer.current = setTimeout(() => {
      if (!search.trim()) {
        setFilteredPosts(allPosts);
        setPages(Math.ceil(allPosts.length / 6));
        setPage(1);
      } else {
        const searchTerm = search.toLowerCase().trim();
        const words = searchTerm.split(/\s+/).filter((w) => w.length > 0);

        const matched = allPosts.filter((post) => {
          const title = post.title.toLowerCase();
          const username = post.username.toLowerCase();
          const content = post.content.toLowerCase();

          // Check if any word matches anywhere in title, author, or content
          return words.some(
            (word) =>
              title.includes(word) ||
              username.includes(word) ||
              content.includes(word)
          );
        });

        setFilteredPosts(matched);
        setPages(Math.ceil(matched.length / 6));
        setPage(1);
      }
    }, 300); // 300ms debounce

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [search, allPosts]);

  // Pagination
  const paginatedPosts = filteredPosts.slice((page - 1) * 6, page * 6);

  const handleClearSearch = () => {
    setSearch('');
  };

  return (
    <section className="page">
      <div className="page__header">
        <div className="page__title-section">
          <h1>Latest Posts</h1>
          <p className="page__subtitle">Discover stories, ideas, and perspectives</p>
        </div>
        <div className="page__search">
          <div className="search-bar__input-wrapper">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.35-4.35"></path>
            </svg>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search posts..."
              className="search-input"
            />
            {search && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="clear-button"
                aria-label="Clear search"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>

      {loading && <Loader />}

      {!loading && paginatedPosts.length === 0 && (
        <EmptyState title={search ? "No posts found matching your search." : "No posts found. Create one!"} />
      )}

      {!loading && paginatedPosts.length > 0 && (
        <>
          <div className="post-grid">
            {paginatedPosts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
          <Pagination page={page} pages={pages} onPageChange={setPage} />
        </>
      )}
    </section>
  );
};

export default HomePage;

