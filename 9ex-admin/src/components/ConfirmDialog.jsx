import React from 'react';
import Modal from './Modal.jsx';

export default function ConfirmDialog({ open, onClose, onConfirm, message, loading }) {
  return (
    <Modal open={open} onClose={onClose} title="Confirm">
      <p className="text-sm text-ink/70">{message}</p>
      <div className="mt-6 flex justify-end gap-3">
        <button className="btn-outline" onClick={onClose}>
          Cancel
        </button>
        <button className="btn-primary !bg-blood hover:!bg-blood/90" onClick={onConfirm} disabled={loading}>
          {loading ? 'Deleting...' : 'Delete'}
        </button>
      </div>
    </Modal>
  );
}
