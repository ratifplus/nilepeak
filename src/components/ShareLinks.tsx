'use client';

import { useState } from 'react';

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const enc = encodeURIComponent;
  const links = [
    { label: 'LinkedIn', href: `https://www.linkedin.com/sharing/share-offsite/?url=${enc(url)}` },
    { label: 'X', href: `https://x.com/intent/post?url=${enc(url)}&text=${enc(title)}` },
    { label: 'Email', href: `mailto:?subject=${enc(title)}&body=${enc(url)}` },
  ];
  return (
    <div>
      <p className="label text-mute">Share</p>
      <ul className="mt-4 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} target="_blank" rel="noreferrer" className="label text-paper/80 hover:text-volt">
              {l.label}
            </a>
          </li>
        ))}
        <li>
          <button
            type="button"
            className="label text-paper/80 hover:text-volt"
            onClick={async () => {
              await navigator.clipboard.writeText(url);
              setCopied(true);
              setTimeout(() => setCopied(false), 1600);
            }}
          >
            {copied ? 'Link copied' : 'Copy link'}
          </button>
        </li>
      </ul>
    </div>
  );
}
