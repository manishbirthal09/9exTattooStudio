import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Plus, Pencil, Trash2 } from 'lucide-react';
import api from '../api/axios.js';
import ConfirmDialog from '../components/ConfirmDialog.jsx';

export default function Blogs() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/blogs?all=true');
      setBlogs(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/blogs/${deleteTarget._id}`);
      setDeleteTarget(null);
      load();
    } catch (err) {
      console.error(err);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-semibold text-ink">Blogs</h1>
          <p className="text-sm text-ink/50 mt-1">Articles shown on the site blog</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={() => navigate('/blogs/new')}>
          <Plus size={16} /> New Blog
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-ink/50">Loading...</p>
      ) : blogs.length === 0 ? (
        <p className="text-sm text-ink/50">No blogs yet. Write your first post.</p>
      ) : (
        <div className="bg-white border border-ink/10 divide-y divide-ink/10">
          {blogs.map((b) => (
            <div key={b._id} className="flex items-center gap-4 p-4">
              <img src={b.coverImage.url} alt="" className="h-14 w-14 object-cover shrink-0" />
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-ink truncate">{b.title}</p>
                <p className="text-xs text-ink/40 mt-0.5">/{b.slug}</p>
              </div>
              <span
                className={`text-[10px] px-2 py-0.5 uppercase tracking-wide shrink-0 ${
                  b.published ? 'bg-green-500/10 text-green-700' : 'bg-ink/10 text-ink/50'
                }`}
              >
                {b.published ? 'Published' : 'Draft'}
              </span>
              <button
                className="btn-outline !py-1 !px-2 text-xs flex items-center gap-1 shrink-0"
                onClick={() => navigate(`/blogs/edit/${b._id}`)}
              >
                <Pencil size={12} /> Edit
              </button>
              <button className="btn-danger flex items-center gap-1 shrink-0" onClick={() => setDeleteTarget(b)}>
                <Trash2 size={12} /> Delete
              </button>
            </div>
          ))}
        </div>
      )}

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message={`Delete "${deleteTarget?.title}"? This also removes the cover image from Cloudinary.`}
      />
    </div>
  );
}
