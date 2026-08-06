import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../api/axios.js';

const emptyForm = {
  title: '',
  excerpt: '',
  content: '',
  author: 'Shashikant Shelar',
  published: true,
  tags: '',
};

export default function BlogEditor() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();

  const [form, setForm] = useState(emptyForm);
  const [coverFile, setCoverFile] = useState(null);
  const [existingCover, setExistingCover] = useState(null);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!isEdit) return;
    (async () => {
      try {
        const { data } = await api.get(`/blogs/id/${id}`);
        setForm({
          title: data.title,
          excerpt: data.excerpt || '',
          content: data.content,
          author: data.author,
          published: data.published,
          tags: data.tags?.join(', ') || '',
        });
        setExistingCover(data.coverImage.url);
      } catch (err) {
        setError('Could not load blog');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, isEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!isEdit && !coverFile) {
      setError('Please select a cover image');
      return;
    }

    const fd = new FormData();
    Object.entries(form).forEach(([key, val]) => fd.append(key, val));
    if (coverFile) fd.append('coverImage', coverFile);

    setSaving(true);
    try {
      if (isEdit) {
        await api.put(`/blogs/${id}`, fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      } else {
        await api.post('/blogs', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      }
      navigate('/blogs');
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p className="text-sm text-ink/50">Loading...</p>;

  return (
    <div className="max-w-3xl">
      <h1 className="text-2xl font-semibold text-ink mb-6">{isEdit ? 'Edit Blog' : 'New Blog'}</h1>

      <form onSubmit={handleSubmit} className="space-y-5 bg-white border border-ink/10 p-6">
        <div>
          <label className="label-field">Title</label>
          <input
            className="input-field"
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
          />
        </div>

        <div>
          <label className="label-field">Excerpt (short summary, shown in blog list)</label>
          <textarea
            className="input-field"
            rows={2}
            maxLength={300}
            value={form.excerpt}
            onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
          />
        </div>

        <div>
          <label className="label-field">Content</label>
          <textarea
            className="input-field font-mono"
            rows={14}
            required
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            placeholder="Write in plain text, Markdown, or paste HTML — whatever your frontend blog page expects."
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="label-field">Author</label>
            <input
              className="input-field"
              value={form.author}
              onChange={(e) => setForm({ ...form, author: e.target.value })}
            />
          </div>
          <div>
            <label className="label-field">Tags (comma separated)</label>
            <input
              className="input-field"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="label-field">Cover Image {isEdit && '(leave empty to keep current)'}</label>
          <input type="file" accept="image/*" className="input-field" onChange={(e) => setCoverFile(e.target.files[0])} />
          {existingCover && !coverFile && (
            <img src={existingCover} alt="" className="mt-2 h-24 w-24 object-cover border border-ink/10" />
          )}
        </div>

        <label className="flex items-center gap-2 text-sm text-ink/70">
          <input
            type="checkbox"
            checked={form.published}
            onChange={(e) => setForm({ ...form, published: e.target.checked })}
          />
          Published (visible on site)
        </label>

        {error && <p className="text-xs text-blood">{error}</p>}

        <div className="flex justify-end gap-3 pt-2">
          <button type="button" className="btn-outline" onClick={() => navigate('/blogs')}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
