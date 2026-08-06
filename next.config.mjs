/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // Admin can paste any image URL in the dashboard, so allow all https hosts.
    remotePatterns: [
      { protocol: 'https', hostname: '**' },
    ],
  },
};

export default nextConfig;
