import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import api from '../api/axios.js';
import Modal from '../components/Modal.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';

const CATEGORIES = [ 'color-tattoo',
  'Realistic',
  'Hyper Realistic',
  'Custom Design',
  'Destiny Tattoo',
  'Full Sleeve',
  'Mandala',
  'Religious',
  'Couple',
  'Cover-Up',
  'Other',];

const emptyForm = { title: '', category: 'other', tags: '', featured: false, order: 0 };

export default function Portfolio() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/portfolio');
      setItems(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const openAdd = () => {
    setEditing(null);
    setForm(emptyForm);
    setImageFile(null);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      title: item.title,
      category: item.category,
      tags: item.tags?.join(', ') || '',
      featured: item.featured,
      order: item.order,
    });
    setImageFile(null);
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!editing && !imageFile) {
      setError('Please select an image');
      return;
    }

    const fd = new FormData();
    fd.append('title', form.title);
    fd.append('category', form.category);
    fd.append('tags', form.tags);
    fd.append('featured', form.featured);
    fd.append('order', form.order);
    if (imageFile) fd.append('image', imageFile);

    setSaving(true);
    try {
      if (editing) {
        await api.put(`/portfolio/${editing._id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/portfolio', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/portfolio/${deleteTarget._id}`);
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
          <h1 className="text-2xl font-semibold text-ink">Portfolio</h1>
          <p className="text-sm text-ink/50 mt-1">Gallery images shown on the site</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={openAdd}>
          <Plus size={16} /> Add Piece
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-ink/50">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-ink/50">No portfolio items yet. Add your first piece.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white border border-ink/10 overflow-hidden group">
              <div className="aspect-square bg-ink/5 relative">
                <img src={item.image.url} alt={item.title} className="w-full h-full object-cover" />
                {item.featured && (
                  <span className="absolute top-2 left-2 bg-brass-bright text-ink text-[10px] px-2 py-0.5 flex items-center gap-1">
                    <Star size={10} fill="currentColor" /> Featured
                  </span>
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-ink truncate">{item.title}</p>
                <p className="text-xs text-ink/40 uppercase tracking-wide mt-0.5">{item.category}</p>
                <div className="flex gap-2 mt-3">
                  <button className="btn-outline !py-1 !px-2 text-xs flex items-center gap-1" onClick={() => openEdit(item)}>
                    <Pencil size={12} /> Edit
                  </button>
                  <button className="btn-danger flex items-center gap-1" onClick={() => setDeleteTarget(item)}>
                    <Trash2 size={12} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Piece' : 'Add Piece'}>
        <form onSubmit={handleSubmit} className="space-y-4">
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
            <label className="label-field">Category</label>
            <select
              className="input-field"
              value={form.category}
              onChange={(e) => setForm({ ...form, category: e.target.value })}
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="label-field">Tags (comma separated)</label>
            <input
              className="input-field"
              value={form.tags}
              onChange={(e) => setForm({ ...form, tags: e.target.value })}
              placeholder="numerology, blackwork"
            />
          </div>

          <div>
            <label className="label-field">
              Image {editing && '(leave empty to keep current)'}
            </label>
            <input
              type="file"
              accept="image/*"
              className="input-field"
              onChange={(e) => setImageFile(e.target.files[0])}
            />
            {editing && !imageFile && (
              <img src={editing.image.url} alt="" className="mt-2 h-20 w-20 object-cover border border-ink/10" />
            )}
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-ink/70">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
              />
              Show on homepage slider
            </label>
            <div className="flex items-center gap-2">
              <label className="text-sm text-ink/70">Order</label>
              <input
                type="number"
                className="input-field !w-20"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
              />
            </div>
          </div>

          {error && <p className="text-xs text-blood">{error}</p>}

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" className="btn-outline" onClick={() => setModalOpen(false)}>
              Cancel
            </button>
            <button type="submit" className="btn-primary" disabled={saving}>
              {saving ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message={`Delete "${deleteTarget?.title}"? This also removes the image from Cloudinary.`}
      />
    </div>
  );
}
