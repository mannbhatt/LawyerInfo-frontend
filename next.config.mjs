/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["cdn.pixabay.com"], // ✅ Allow Pixabay images
    remotePatterns:[
      {
        hostname:'utfs.io'
      }
    ]
  },
};



export default nextConfig;
