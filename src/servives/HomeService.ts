
import { ApiAllDataResponse, GallerieImagesResponse, Data, DataAllProduct, Realisation, DetailRealisation,ApiData } from "@/interfaces/HomeInterface";
import { getBaseUrl } from "./baseUrl";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { Filters } from "@/interfaces/Filters";

// Fonction pour récupérer toutes les données de la page d'accueil
export const getAllHomeData = async (token: string | null): Promise<Data | { error: string }> => {
    try {
        const response = await fetch(`${getBaseUrl()}/homepage-data`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Ajout du token JWT
                'Content-Type': 'application/json'   // Type de contenu JSON
            }
        });

        if (!response.ok) {
            // Si la réponse est invalide, retourne une erreur sous forme d'objet
            throw new Error('Échec de la récupération des données.');
        }

        const responseData: ApiResponse = await response.json();
        return responseData.data; // Retourne les données

    } catch (error: any) {
        console.error('Erreur dans la récupération des données:', error.message);
        return { error: error.message };  // On retourne l'erreur pour un traitement ultérieur
    }
};

// Service pour récupérer les réalisations
export const getAllRealisations = async (token: string | null, page: number, selectedCategory: number): Promise<ApiResponse<ApiAllDataResponse>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/realisations/status/${selectedCategory}?page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Ajout du token JWT
                'Content-Type': 'application/json'   // Type de contenu JSON
            }
        });

        if (!response.ok) {
            throw new Error('Échec de la récupération des données.');
        }

        const result: ApiResponse<ApiAllDataResponse> = await response.json();
        return result;

    } catch (error: any) {
        console.error('Erreur dans la récupération des données:', error.message);
        return {
            statusCode: 500,
            statusMessage: error.message,
            data: {
                realisations: {
                    data: [], current_page: 1, last_page: 1, total: 0, links: [],
                    first_page_url: "",
                    from: 0,
                    last_page_url: "",
                    next_page_url: null,
                    path: "",
                    per_page: 0,
                    prev_page_url: null,
                    to: 0
                },
                reglages: [],
                OptionRealisation: []
            }
        };
    }
};

// page apropos

export const getreglages = async (token: string | null): Promise<ApiResponse<ApiData>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/reglages`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Ajout du token JWT
                'Content-Type': 'application/json'   // Type de contenu JSON
            }
        });

        if (!response.ok) {
            throw new Error('Échec de la récupération des données.');
        }

        const result: ApiResponse<ApiData> = await response.json();
        return result;

    } catch (error: any) {
        console.error('Erreur dans la récupération des données:', error.message);
        return {
            statusCode: 500,
            statusMessage: error.message,
            data: {
                reglages: [],
                equipes: []
            }
        };
    }
};

// Service pour récupérer les réalisations
export const getAllImagesGallery1 = async (token: string | null, page: number): Promise<ApiResponse<GallerieImagesResponse>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/gallerie-images?page=${page}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Ajout du token JWT
                'Content-Type': 'application/json'   // Type de contenu JSON
            }
        });

        if (!response.ok) {
            throw new Error('Échec de la récupération des données.');
        }

        const result: ApiResponse<GallerieImagesResponse> = await response.json();
        return result;

    } catch (error: any) {
        console.error('Erreur dans la récupération des données:', error.message);
        return {
            statusCode: 500,
            statusMessage: error.message,
            data: {
                data: {
                    data: [], current_page: 1, last_page: 1, total: 0, links: [],
                    first_page_url: "",
                    from: 0,
                    last_page_url: "",
                    next_page_url: null,
                    path: "",
                    per_page: 0,
                    prev_page_url: null,
                    to: 0
                },
                reglages: [],
            }
        }
    };
}

// Service pour récupérer les commandes avec des filtres
export const getAllImagesGallery = async (
    token: string | null,
    filters: Filters
): Promise<ApiResponse<GallerieImagesResponse>> => {
    try {
        // Construction de l'URL avec les paramètres de filtre
        const url = new URL(`${getBaseUrl()}/gallerie-images`);
        url.searchParams.append('page', filters.page.toString());
        url.searchParams.append('limit', filters.limit.toString());

        if (filters.search) {
            url.searchParams.append('search', filters.search);
        }

        const response = await fetch(url.toString(), {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Ajout du token JWT
                'Content-Type': 'application/json'   // Type de contenu JSON
            }
        });

        if (!response.ok) {
            throw new Error('Échec de la récupération des données.');
        }

        const result: ApiResponse<GallerieImagesResponse> = await response.json();
        return result;

    } catch (error: any) {
        console.error('Erreur dans la récupération des données:', error.message);
        return {
            statusCode: 500,
            statusMessage: error.message,
            data: {
                data: {
                    data: [], current_page: 1, last_page: 1, total: 0, links: [],
                    first_page_url: "",
                    from: 0,
                    last_page_url: "",
                    next_page_url: null,
                    path: "",
                    per_page: 0,
                    prev_page_url: null,
                    to: 0
                },
                reglages: [],
            }
        };
    }
};


// Ajoutez un paramètre `token` pour le passer à la fonction
export const getRealisationsByLaballe = async (token: string | null, labelle: string): Promise<ApiResponse<DetailRealisation>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/realisation/libelle/${labelle}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('Échec de la récupération des données.');
        }

        const result: ApiResponse<DetailRealisation> = await response.json();
        return result;

    } catch (error: any) {
        console.error('Erreur dans la récupération des données:', error.message);

        // Retourne une structure par défaut pour éviter l'erreur
        return {
            statusCode: 500,
            statusMessage: error.message,
            data: {
                images: [],  // Type explicitement défini comme Image[]
                id: '',
                realisations: [],  // Type défini comme Realisation[]
                reglages: []  // Type défini comme Reglage[]
            }
        };
    }
};





