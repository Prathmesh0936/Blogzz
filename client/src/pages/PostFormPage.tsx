import { useEffect, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import { postApi } from '../api';
import type { PostPayload } from '../types';
import { validatePost } from '../utils/validators';

interface Props {
  mode: 'create' | 'edit';
}

const PostFormPage = ({ mode }: Props) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [form, setForm] = useState<PostPayload>({
    title: '',
    imageURL: '',
    content: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (mode === 'edit' && id) {
      postApi
        .detail(id)
        .then((data) =>
          setForm({
            title: data.title,
            imageURL: data.imageURL || '',
            content: data.content,
          })
        )
        .catch(() => toast.error('Unable to load post'));
    }
  }, [id, mode]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const payload: PostPayload = {
      title: form.title.trim(),
      content: form.content.trim(),
      imageURL: form.imageURL?.trim() || undefined,
    };
    const validationErrors = validatePost(payload);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      setLoading(true);
      if (mode === 'create') {
        await postApi.create(payload);
        toast.success('Post created');
      } else if (id) {
        await postApi.update(id, payload);
        toast.success('Post updated');
      }
      navigate('/');
    } catch (error: any) {
      const message = error?.response?.data?.message || 'Failed to save post';
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="page">
      <h1>{mode === 'create' ? 'Create Post' : 'Edit Post'}</h1>
      <form className="card form" onSubmit={handleSubmit}>
        <label>
          Title
          <input name="title" value={form.title} onChange={handleChange} />
          {errors.title && <span className="error">{errors.title}</span>}
        </label>
        <label>
          Image URL
          <input name="imageURL" value={form.imageURL} onChange={handleChange} />
          {errors.imageURL && <span className="error">{errors.imageURL}</span>}
        </label>
        <label>
          Content
          <textarea name="content" value={form.content} onChange={handleChange} rows={8} />
          {errors.content && <span className="error">{errors.content}</span>}
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Post'}
        </button>
      </form>
    </section>
  );
};

export default PostFormPage;

