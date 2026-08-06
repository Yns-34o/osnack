'use client';

import dynamic from 'next/dynamic';

/**
 * Client wrapper so the three.js particle field is only loaded in the browser.
 * `next/dynamic` with `ssr: false` is not permitted inside a Server Component,
 * hence this thin client boundary.
 */
const ParticleField = dynamic(
  () => import('./ParticleField').then((m) => m.ParticleField),
  { ssr: false },
);

export function ParticleFieldClient() {
  return <ParticleField />;
}
