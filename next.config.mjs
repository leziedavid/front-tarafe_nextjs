/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['tarafe.tarafe.com'], // Ajouter ton domaine ici
        remotePatterns: [
            {
                protocol: 'http',
                hostname: 'localhost',
                pathname: '**', // Remarque: tu peux utiliser ** pour autoriser tous les sous-dossiers
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
