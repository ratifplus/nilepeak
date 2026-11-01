'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Arrow } from './ui';

/** Placeholder submit handler. Replace with a real endpoint when the backend exists. */
async function submitPlaceholder(kind: string, data: FormData) {
  await new Promise((r) => setTimeout(r, 600));
  if (process.env.NODE_ENV !== 'production') console.info(`[${kind}]`, Object.fromEntries(data.entries()));
}

function Confirmation({ title, body, onReset }: { title: string; body: string; onReset: () => void }) {
  return (
    <div className="border border-volt/50 bg-panel p-8 md:p-12" role="status">
      <p className="label flex items-center gap-3 text-volt">
        <span className="h-1.5 w-1.5 rounded-full bg-volt shadow-[0_0_8px_#3AD1FF]" />
        Received
      </p>
      <h3 className="display mt-6 text-5xl">{title}</h3>
      <p className="mt-4 max-w-lg text-mute">{body}</p>
      <button type="button" onClick={onReset} className="btn mt-8">
        Send another <Arrow />
      </button>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="label text-mute">{label}</span>
      {children}
    </label>
  );
}

const TABS = {
  general: { name: 'General', topics: ['General enquiry', 'Feedback', 'Other'] },
  partnerships: { name: 'Partnerships', topics: ['Utility partnership', 'Commercial and industrial', 'Investment', 'Supply chain'] },
  media: { name: 'Media', topics: ['Interview request', 'Press briefing', 'Media kit', 'Other'] },
} as const;
type Tab = keyof typeof TABS;

export function ContactForm() {
  const params = useSearchParams();
  const initial = (params.get('tab') as Tab) in TABS ? (params.get('tab') as Tab) : 'general';
  const [tab, setTab] = useState<Tab>(initial);
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');

  useEffect(() => setTab(initial), [initial]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    const data = new FormData(e.currentTarget);
    data.set('tab', tab);
    await submitPlaceholder('contact', data);
    setState('sent');
  }

  return (
    <div>
      <div role="tablist" aria-label="Enquiry type" className="grid grid-cols-3 border border-rule">
        {(Object.keys(TABS) as Tab[]).map((t) => (
          <button
            key={t}
            role="tab"
            type="button"
            aria-selected={tab === t}
            onClick={() => {
              setTab(t);
              setState('idle');
            }}
            className={`label border-r border-rule px-3 py-4 transition-colors last:border-r-0 ${tab === t ? 'bg-paper text-ink' : 'text-mute hover:text-paper'}`}
          >
            {TABS[t].name}
          </button>
        ))}
      </div>

      <div className="mt-10" role="tabpanel">
        {state === 'sent' ? (
          <Confirmation
            title="Message received"
            body={`Thank you. Our ${TABS[tab].name.toLowerCase()} team will reply to the email you provided.`}
            onReset={() => setState('idle')}
          />
        ) : (
          <form onSubmit={onSubmit} className="grid gap-8 md:grid-cols-2">
            <Field label="Name">
              <input name="name" required autoComplete="name" className="field" />
            </Field>
            <Field label="Organization">
              <input name="organization" autoComplete="organization" className="field" />
            </Field>
            <Field label="Email">
              <input name="email" type="email" required autoComplete="email" className="field" />
            </Field>
            <Field label="Topic">
              <select name="topic" key={tab} className="field appearance-none bg-ink" defaultValue={TABS[tab].topics[0]}>
                {TABS[tab].topics.map((t) => (
                  <option key={t}>{t}</option>
                ))}
              </select>
            </Field>
            <div className="md:col-span-2">
              <Field label="Message">
                <textarea name="message" required rows={5} className="field resize-y" />
              </Field>
            </div>
            <div className="flex flex-wrap items-center justify-between gap-6 md:col-span-2">
              <p className="text-sm text-mute">We reply to qualified enquiries. Please do not send confidential information.</p>
              <button type="submit" disabled={state === 'sending'} className="btn disabled:opacity-50">
                {state === 'sending' ? 'Sending' : 'Send message'} <Arrow />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export function ApplicationForm({ roles }: { roles: { slug: string; title: string }[] }) {
  const params = useSearchParams();
  const [state, setState] = useState<'idle' | 'sending' | 'sent'>('idle');
  const preset = params.get('role') ?? 'general';

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState('sending');
    await submitPlaceholder('application', new FormData(e.currentTarget));
    setState('sent');
  }

  if (state === 'sent') {
    return (
      <Confirmation
        title="Application received"
        body="Thank you for your interest in Nile Peak. We read every application and will be in touch if there is a fit."
        onReset={() => setState('idle')}
      />
    );
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-8 md:grid-cols-2">
      <Field label="Full name">
        <input name="name" required autoComplete="name" className="field" />
      </Field>
      <Field label="Email">
        <input name="email" type="email" required autoComplete="email" className="field" />
      </Field>
      <Field label="Role">
        <select name="role" key={preset} defaultValue={preset} className="field appearance-none bg-ink">
          <option value="general">General application</option>
          {roles.map((r) => (
            <option key={r.slug} value={r.slug}>
              {r.title}
            </option>
          ))}
        </select>
      </Field>
      <Field label="LinkedIn or portfolio">
        <input name="link" type="url" placeholder="https://" className="field" />
      </Field>
      <div className="md:col-span-2">
        <Field label="Why Nile Peak">
          <textarea name="message" required rows={5} className="field resize-y" />
        </Field>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-6 md:col-span-2">
        <p className="text-sm text-mute">CV upload will be available when applications open fully. Share a link for now.</p>
        <button type="submit" disabled={state === 'sending'} className="btn disabled:opacity-50">
          {state === 'sending' ? 'Sending' : 'Submit application'} <Arrow />
        </button>
      </div>
    </form>
  );
}
