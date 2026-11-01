'use client';

import { useEffect, useState } from 'react';

const TOPICS = [
  { value: 'utility-government', label: 'Utility or Government' },
  { value: 'financing', label: 'Financing' },
  { value: 'engineering-supply', label: 'Engineering and Supply' },
  { value: 'media', label: 'Media' },
];

/** Placeholder handler. Replace with a real endpoint. */
async function submit(data: FormData) {
  await new Promise((r) => setTimeout(r, 500));
  if (process.env.NODE_ENV !== 'production') console.info('[contact]', Object.fromEntries(data.entries()));
}

function Field({ label, children, wide }: { label: string; children: React.ReactNode; wide?: boolean }) {
  return (
    <label className={`col-span-12 block ${wide ? '' : 'md:col-span-6'}`}>
      <span className="label text-mute">{label}</span>
      {children}
    </label>
  );
}

export function ContactForm() {
  const [preset, setPreset] = useState(TOPICS[0].value);
  useEffect(() => {
    const topic = new URLSearchParams(window.location.search).get('topic');
    if (topic && TOPICS.some((t) => t.value === topic)) setPreset(topic);
  }, []);
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');

  if (state === 'sent') {
    return (
      <div role="status" className="border-t border-navy pt-10">
        <p className="label text-mute">Received</p>
        <p className="headline mt-6 text-6xl md:text-8xl">Thank you.</p>
        <p className="body mt-6 max-w-md">We will reply to the email you provided.</p>
        <button type="button" onClick={() => setState('idle')} className="link mt-10">
          Send another
        </button>
      </div>
    );
  }

  return (
    <form
      className="grid grid-cols-12 gap-x-6 gap-y-10"
      onSubmit={async (e) => {
        e.preventDefault();
        setState('sending');
        await submit(new FormData(e.currentTarget));
        setState('sent');
      }}
    >
      <Field label="Name">
        <input name="name" required autoComplete="name" className="field" />
      </Field>
      <Field label="Organization">
        <input name="organization" required autoComplete="organization" className="field" />
      </Field>
      <Field label="Role">
        <input name="role" autoComplete="organization-title" className="field" />
      </Field>
      <Field label="Email">
        <input name="email" type="email" required autoComplete="email" className="field" />
      </Field>
      <Field label="Topic" wide>
        <select key={preset} name="topic" defaultValue={preset} className="field appearance-none">
          {TOPICS.map((t) => (
            <option key={t.value} value={t.value}>
              {t.label}
            </option>
          ))}
        </select>
      </Field>
      <Field label="Message" wide>
        <textarea name="message" required rows={5} className="field resize-y" />
      </Field>
      <div className="col-span-12">
        <button type="submit" disabled={state === 'sending'} className="label bg-navy px-8 py-4 text-ground transition-opacity hover:opacity-80 disabled:opacity-50">
          {state === 'sending' ? 'Sending' : 'Submit'}
        </button>
      </div>
    </form>
  );
}
