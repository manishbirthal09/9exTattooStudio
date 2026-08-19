// import { useEffect, useState } from 'react';
// import { Plus, Pencil, Trash2, Video as VideoIcon } from 'lucide-react';
// import api from '../api/axios.js';
// import Modal from '../components/Modal.jsx';
// import ConfirmDialog from '../components/ConfirmDialog.jsx';

// const emptyForm = { clientName: '', caption: '', published: true, order: 0 };

// export default function Testimonials() {
//   const [items, setItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [modalOpen, setModalOpen] = useState(false);
//   const [editing, setEditing] = useState(null);
//   const [form, setForm] = useState(emptyForm);
//   const [videoFile, setVideoFile] = useState(null);
//   const [thumbFile, setThumbFile] = useState(null);
//   const [saving, setSaving] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState(null);
//   const [deleting, setDeleting] = useState(false);
//   const [error, setError] = useState('');

//   const load = async () => {
//     setLoading(true);
//     try {
//       const { data } = await api.get('/testimonials?all=true');
//       setItems(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     load();
//   }, []);

//   const openAdd = () => {
//     setEditing(null);
//     setForm(emptyForm);
//     setVideoFile(null);
//     setThumbFile(null);
//     setError('');
//     setModalOpen(true);
//   };

//   const openEdit = (item) => {
//     setEditing(item);
//     setForm({
//       clientName: item.clientName,
//       caption: item.caption || '',
//       published: item.published,
//       order: item.order,
//     });
//     setVideoFile(null);
//     setThumbFile(null);
//     setError('');
//     setModalOpen(true);
//   };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setError('');

  //   if (!editing && !videoFile) {
  //     setError('Please select a video');
  //     return;
  //   }

  //   const fd = new FormData();
  //   fd.append('clientName', form.clientName);
  //   fd.append('caption', form.caption);
  //   fd.append('published', form.published);
  //   fd.append('order', form.order);
  //   if (videoFile) fd.append('video', videoFile);
  //   if (thumbFile) fd.append('thumbnail', thumbFile);

  //   setSaving(true);
  //   try {
  //     if (editing) {
  //       await api.put(`/testimonials/${editing._id}`, fd, {
  //         headers: { 'Content-Type': 'multipart/form-data' },
  //       });
  //     } else {
  //       await api.post('/testimonials', fd, {
  //         headers: { 'Content-Type': 'multipart/form-data' },
  //       });
  //     }
  //     setModalOpen(false);
  //     load();
  //   } catch (err) {
  //     setError(err.response?.data?.message || 'Something went wrong. Large videos take time — please wait and retry if it timed out.');
  //   } finally {
  //     setSaving(false);
  //   }
  // };
  import React, { useEffect, useState } from 'react';
import { Plus, Pencil, Trash2, Video as VideoIcon } from 'lucide-react';
import api from '../api/axios.js';
import Modal from '../components/Modal.jsx';
import ConfirmDialog from '../components/ConfirmDialog.jsx';

const emptyForm = { clientName: '', caption: '', published: true, order: 0 };

export default function Testimonials() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [videoFile, setVideoFile] = useState(null);
  const [thumbFile, setThumbFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState('');

  const load = async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/testimonials?all=true');
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
    setVideoFile(null);
    setThumbFile(null);
    setError('');
    setModalOpen(true);
  };

  const openEdit = (item) => {
    setEditing(item);
    setForm({
      clientName: item.clientName,
      caption: item.caption || '',
      published: item.published,
      order: item.order,
    });
    setVideoFile(null);
    setThumbFile(null);
    setError('');
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!editing && !videoFile) {
      setError('Please select a video');
      return;
    }

    const fd = new FormData();
    fd.append('clientName', form.clientName);
    fd.append('caption', form.caption);
    fd.append('published', form.published);
    fd.append('order', form.order);
    if (videoFile) fd.append('video', videoFile);
    if (thumbFile) fd.append('thumbnail', thumbFile);

    setSaving(true);
    try {
      if (editing) {
        await api.put(`/testimonials/${editing._id}`, fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      } else {
        await api.post('/testimonials', fd, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
      }
      setModalOpen(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Large videos take time — please wait and retry if it timed out.');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/testimonials/${deleteTarget._id}`);
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
          <h1 className="text-2xl font-semibold text-ink">Video Testimonials</h1>
          <p className="text-sm text-ink/50 mt-1">Client video reviews shown on the site</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={openAdd}>
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-ink/50">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-ink/50">No video testimonials yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white border border-ink/10 overflow-hidden">
              <div className="aspect-video bg-ink/5 flex items-center justify-center relative">
                {item.thumbnail?.url ? (
                  <img src={item.thumbnail.url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <VideoIcon className="text-ink/20" size={28} />
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-ink truncate">{item.clientName}</p>
                <p className="text-xs text-ink/40 mt-0.5 truncate">{item.caption}</p>
                <span
                  className={`inline-block mt-2 text-[10px] px-2 py-0.5 uppercase tracking-wide ${
                    item.published ? 'bg-green-500/10 text-green-700' : 'bg-ink/10 text-ink/50'
                  }`}
                >
                  {item.published ? 'Published' : 'Hidden'}
                </span>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-field">Client Name</label>
            <input
              className="input-field"
              required
              value={form.clientName}
              onChange={(e) => setForm({ ...form, clientName: e.target.value })}
            />
          </div>

          <div>
            <label className="label-field">Caption</label>
            <input
              className="input-field"
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
              placeholder="What the testimonial is about"
            />
          </div>

          <div>
            <label className="label-field">Video {editing && '(leave empty to keep current)'}</label>
            <input type="file" accept="video/*" className="input-field" onChange={(e) => setVideoFile(e.target.files[0])} />
            <p className="text-[11px] text-ink/40 mt-1">Keep videos short/compressed</p>
          </div>

          <div>
            <label className="label-field">Thumbnail image (optional)</label>
            <input type="file" accept="image/*" className="input-field" onChange={(e) => setThumbFile(e.target.files[0])} />
            {editing?.thumbnail?.url && !thumbFile && (
              <img src={editing.thumbnail.url} alt="" className="mt-2 h-16 w-16 object-cover border border-ink/10" />
            )}
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-ink/70">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              Published
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
              {saving ? 'Uploading...' : 'Save'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message={`Delete testimonial from "${deleteTarget?.clientName}"? This also removes the video from Cloudinary.`}
      />
    </div>
  );
}


  const handleDelete = async () => {
    setDeleting(true);
    try {
      await api.delete(`/testimonials/${deleteTarget._id}`);
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
          <h1 className="text-2xl font-semibold text-ink">Video Testimonials</h1>
          <p className="text-sm text-ink/50 mt-1">Client video reviews shown on the site</p>
        </div>
        <button className="btn-primary flex items-center gap-2" onClick={openAdd}>
          <Plus size={16} /> Add Testimonial
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-ink/50">Loading...</p>
      ) : items.length === 0 ? (
        <p className="text-sm text-ink/50">No video testimonials yet.</p>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {items.map((item) => (
            <div key={item._id} className="bg-white border border-ink/10 overflow-hidden">
              <div className="aspect-video bg-ink/5 flex items-center justify-center relative">
                {item.thumbnail?.url ? (
                  <img src={item.thumbnail.url} alt="" className="w-full h-full object-cover" />
                ) : (
                  <VideoIcon className="text-ink/20" size={28} />
                )}
              </div>
              <div className="p-3">
                <p className="text-sm font-medium text-ink truncate">{item.clientName}</p>
                <p className="text-xs text-ink/40 mt-0.5 truncate">{item.caption}</p>
                <span
                  className={`inline-block mt-2 text-[10px] px-2 py-0.5 uppercase tracking-wide ${
                    item.published ? 'bg-green-500/10 text-green-700' : 'bg-ink/10 text-ink/50'
                  }`}
                >
                  {item.published ? 'Published' : 'Hidden'}
                </span>
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

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title={editing ? 'Edit Testimonial' : 'Add Testimonial'}>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="label-field">Client Name</label>
            <input
              className="input-field"
              required
              value={form.clientName}
              onChange={(e) => setForm({ ...form, clientName: e.target.value })}
            />
          </div>

          <div>
            <label className="label-field">Caption</label>
            <input
              className="input-field"
              value={form.caption}
              onChange={(e) => setForm({ ...form, caption: e.target.value })}
              placeholder="What the testimonial is about"
            />
          </div>

          <div>
            <label className="label-field">Video {editing && '(leave empty to keep current)'}</label>
            <input type="file" accept="video/*" className="input-field" onChange={(e) => setVideoFile(e.target.files[0])} />
            <p className="text-[11px] text-ink/40 mt-1">Keep videos short/compressed</p>
          </div>

          <div>
            <label className="label-field">Thumbnail image (optional)</label>
            <input type="file" accept="image/*" className="input-field" onChange={(e) => setThumbFile(e.target.files[0])} />
            {editing?.thumbnail?.url && !thumbFile && (
              <img src={editing.thumbnail.url} alt="" className="mt-2 h-16 w-16 object-cover border border-ink/10" />
            )}
          </div>

          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 text-sm text-ink/70">
              <input
                type="checkbox"
                checked={form.published}
                onChange={(e) => setForm({ ...form, published: e.target.checked })}
              />
              Published
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
              {saving ? 'Uploading...' : 'Save'}
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmDialog
        open={!!deleteTarget}
        onClose={() => setDeleteTarget(null)}
        onConfirm={handleDelete}
        loading={deleting}
        message={`Delete testimonial from "${deleteTarget?.clientName}"? This also removes the video from Cloudinary.`}
      />
    </div>
  );

