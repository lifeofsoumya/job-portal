/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'lh3.googleusercontent.com', // for user dp
            port: '',
          },
          {
            protocol: 'https',
            hostname: 'pog1urzayxc6utws.public.blob.vercel-storage.com', // for image uploding
            port: '',
          }
        ],
      },
};

export default nextConfig;
