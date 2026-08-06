import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { tattooTypes, budgetRanges, studioLocations } from '../data/siteData.js';
import Button from './Button.jsx';

const initial = {
  name: '',
  mobile: '',
  city: '',
  tattooType: '',
  preferredLocation: '',
  budget: '',
  message: '',
};

const fieldCls =
  'w-full bg-transparent border border-paper-line/25 px-4 py-3 text-sm text-paper placeholder:text-muted focus:border-brass-bright transition-colors';

export default function AppointmentForm({ title = 'Book an Appointment' }) {
  const [form, setForm] = useState(initial);
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    // Wire this up to the studio's CRM / lead endpoint.
    // e.g. fetch('/api/leads', { method: 'POST', body: JSON.stringify(form) })
    console.log('Lead submitted:', form);
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="border border-brass/30 bg-ink-soft p-8 text-center">
        <Check className="mx-auto mb-4 text-brass-bright" size={32} />
        <h3 className="font-display text-2xl mb-2">Request Received</h3>
        <p className="text-sm text-paper/70">
          A 9Ex consultant will call you within one business day to confirm your appointment.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {title && <h3 className="font-display text-2xl mb-2">{title}</h3>}

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="Full Name"
          className={fieldCls}
          value={form.name}
          onChange={(e) => update('name', e.target.value)}
        />
        <input
          required
          type="tel"
          placeholder="Mobile Number"
          className={fieldCls}
          value={form.mobile}
          onChange={(e) => update('mobile', e.target.value)}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <input
          required
          placeholder="City"
          className={fieldCls}
          value={form.city}
          onChange={(e) => update('city', e.target.value)}
        />
        <select
          required
          className={fieldCls}
          value={form.tattooType}
          onChange={(e) => update('tattooType', e.target.value)}
        >
          <option value="" disabled>
            Tattoo Type
          </option>
          {tattooTypes.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <select
          required
          className={fieldCls}
          value={form.preferredLocation}
          onChange={(e) => update('preferredLocation', e.target.value)}
        >
          <option value="" disabled>
            Preferred Studio Location
          </option>
          {studioLocations.map((loc) => (
            <option key={loc.city} value={loc.city}>
              {loc.city}
            </option>
          ))}
        </select>
        <select required className={fieldCls} value={form.budget} onChange={(e) => update('budget', e.target.value)}>
          <option value="" disabled>
            Budget Range
          </option>
          {budgetRanges.map((b) => (
            <option key={b} value={b}>
              {b}
            </option>
          ))}
        </select>
      </div>

      <textarea
        placeholder="Tell us a bit about what you have in mind"
        rows={4}
        className={fieldCls}
        value={form.message}
        onChange={(e) => update('message', e.target.value)}
      />

      <Button variant="primary" type="submit" className="w-full sm:w-auto">
        Submit Request
      </Button>
    </form>
  );
}
