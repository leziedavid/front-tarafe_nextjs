/** @type {import('next').NextConfig} */
const nextConfig = {
    // Dans l'environnement de production, on utilise "export" pour un site statique
    // output: process.env.NODE_ENV === 'production' ? 'export' : undefined,

    images: {
        domains: ['ms.cloud.tarafe.com', 'tarafe.com'], // Ajouter ton domaine ici
        // domains: ['tarafe.tarafe.com'], // Ajouter ton domaine ici
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'ms.cloud.tarafe.com',
                pathname: '**',
            },
            {
                protocol: 'https',
                hostname: 'tarafe.com',
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
