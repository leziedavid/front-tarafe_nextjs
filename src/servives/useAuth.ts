"use client";  // Indiquer que ce fichier doit être exécuté côté client

import { useEffect, useState } from 'react';

const useAuth = () => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            // Si on est côté client, récupérer le token
            setToken(localStorage.getItem('token') || '');
        }
    }, []);

    return token;
};

export default useAuth;
