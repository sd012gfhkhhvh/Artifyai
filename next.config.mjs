/** @type {import('next').NextConfig} */

const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'res.cloudinary.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'via.placeholder.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'imgs.search.brave.com',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'avatar.vercel.sh',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'picsum.photos',
                port: ''
            },
            {
                protocol: 'https',
                hostname: 'webinarninja.com',
                port: ''
            },
        ]
    }
};

export default nextConfig;
