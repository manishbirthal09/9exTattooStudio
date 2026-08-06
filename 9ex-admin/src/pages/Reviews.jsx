import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Star } from 'lucide-react';
import api from '../api/axios.js';
import Modal from '../components/Modal.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';

const emptyForm = { name: '', location: '', quote: '', rating: 5, type: 'Google Review', approved: true, order: 0 };

export default function Reviews() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/reviews?all=true');
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
    setError('');
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      name: item.name,
      location: item.location || '',
      quote: item.quote,
      rating: item.rating,
      type: item.type,
      approved: item.approved,
      order: item.order,
    });
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);
    try {
      if (editing) {
        await api.put(`/reviews/${editing._id}`, form);
      } else {
        await api.post('/reviews', form);
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
      await api.delete(`/reviews/${deleteTarget._id}`);
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
          <h1 className="text-2xl font-semibold text-ink">Reviews</h1>
          <p className="text-sm text-ink/50 mt-1">Client reviews shown on the site</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={openAdd}>
          <Plus size={16} /> Add Review
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-ink/50">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-ink/50">No reviews yet.</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((r) => (
            <div key={r._id} className="bg-white border border-ink/10 p-5">
              <div className="flex items-center justify-between mb-2">
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={13} fill={i < r.rating ? '#C9A84C' : 'none'} stroke="#C9A84C" />
                  ))}
                </div>
                <span
                  className={`text-[10px] px-2 py-0.5 uppercase tracking-wide ${
                    r.approved ? 'bg-green-500/10 text-green-700' : 'bg-ink/10 text-ink/50'
                  }`}
                >
                  {r.approved ? 'Live' : 'Hidden'}
                </span>
              </div>
              <p className="text-sm text-ink/75 leading-relaxed line-clamp-3">&ldquo;{r.quote}&rdquo;</p>
              <p className="mt-3 text-sm font-medium text-ink">{r.name}</p>
              <p className="text-xs text-ink/40">{r.location} · {r.type}</p>

              <div className="flex gap-2 mt-4">
                <button className="btn-outline !py-1 !px-2 text-xs flex items-center gap-1" onClick={() => openEdit(r)}>
                  <Pencil size={12} /> Edit
                </button>
                <button className="btn-danger flex items-center gap-1" onClick={() => setDeleteTarget(r)}>
                  <Trash2 size={12} /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Review' : 'Add Review'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-field">Name</label>
              <input className="input-field" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </div>
            <div>
              <label className="label-field">Location</label>
              <input className="input-field" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            </div>
          </div>

          <div>
            <label className="label-field">Quote</label>
            <textarea
              className="input-field"
              rows={4}
              required
              value={form.quote}
              onChange={(e) => setForm({ ...form, quote: e.target.value })}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label-field">Rating</label>
              <select className="input-field" value={form.rating} onChange={(e) => setForm({ ...form, rating: e.target.value })}>
                {[5, 4, 3, 2, 1].map((n) => (
                  <option key={n} value={n}>{n} stars</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label-field">Type</label>
              <input className="input-field" value={form.type} onChange={(e) => setForm({ ...form, type: e.target.value })} />
            </div>
          </div>

          <label className="flex items-center gap-2 text-sm text-ink/70">
            <input type="checkbox" checked={form.approved} onChange={(e) => setForm({ ...form, approved: e.target.checked })} />
            Approved (visible on site)
          </label>

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
        message={`Delete review from "${deleteTarget?.name}"?`}
      />
    </div>
  );
}
