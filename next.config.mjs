/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['tarafe.tarafe.com'], // Ajouter ton domaine ici
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '**',
            },
            {
                protocol: 'http',
                hostname: 'localhost',
                port: '8090',
                pathname: '/api/v1/storage/**', // Assure-toi que ce chemin est correct pour tes images
            },
        ],
    },
};

export default nextConfig;
