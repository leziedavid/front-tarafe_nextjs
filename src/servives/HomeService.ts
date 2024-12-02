
import { ApiAllDataResponse, Data, DataAllProduct,Realisation,DetailRealisation } from "@/interfaces/HomeInterface";
import { getBaseUrl } from "./baseUrl";
import { ApiResponse } from "@/interfaces/ApiResponse";

// Remplacer 'your_token' par la logique de récupération du token
const token = localStorage.getItem('token') || ''; // Exemple pour récupérer le token du localStorage

// Fonction pour récupérer toutes les données de la page d'accueil
export const getAllHomeData = async (): Promise<Data | { error: string }> => {
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
export const getAllRealisations = async (page: number, selectedCategory: number): Promise<ApiResponse<ApiAllDataResponse>> => {
    try {
        const response =  await fetch(`${getBaseUrl()}/realisations/status/${selectedCategory}?page=${page}`, {
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

// Ajoutez un paramètre `token` pour le passer à la fonction
export const getRealisationsByLaballe = async (labelle: string): Promise<ApiResponse<DetailRealisation>> => {
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





