
import { getBaseUrl } from "./baseUrl";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { ApiDataOders, OrderData, OrderDetails, RealisationData } from "@/interfaces/AdminInterface";
import { Filters } from "@/interfaces/Filters"; // Importation de l'interface Filters

// Service pour récupérer les réalisations
export const getAllRealisations = async (
    token: string | null,
    filters: Filters
): Promise<ApiResponse<RealisationData>> => {
    try {
        // Construction de l'URL avec les paramètres de filtre
        const url = new URL(`${getBaseUrl()}/getAllRealisations`);
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

        const result: ApiResponse<RealisationData> = await response.json();
        return result;

    } catch (error: any) {
        console.error('Erreur dans la récupération des données:', error.message);
        return {
            statusCode: 500,
            statusMessage: error.message,
            data: {
                data: [],
                current_page: 1,
                last_page: 1,
                total: 0,
                links: [],
                first_page_url: "",
                last_page_url: "",
                next_page_url: null,
                prev_page_url: null,
                path: "",
                per_page: 0,
                from: 0,
                to: 0
            }
        };
    }
};

// Service pour récupérer les commandes avec des filtres
export const getAllorders = async (
    token: string | null,
    filters: Filters
): Promise<ApiResponse<OrderData>> => {
    try {
        // Construction de l'URL avec les paramètres de filtre
        const url = new URL(`${getBaseUrl()}/getAllorders`);
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

        const result: ApiResponse<OrderData> = await response.json();
        return result;

    } catch (error: any) {
        console.error('Erreur dans la récupération des données:', error.message);
        return {
            statusCode: 500,
            statusMessage: error.message,
            data: {
                data: [],
                current_page: 1,
                last_page: 1,
                total: 0,
                links: [],
                first_page_url: "",
                last_page_url: "",
                next_page_url: null,
                prev_page_url: null,
                path: "",
                per_page: 0,
                from: 0,
                to: 0
            }
        };
    }
};


// Service pour récupérer les détails des commandes
export const getdetailCommandes = async (token: string | null, id: number): Promise<ApiResponse<ApiDataOders>> => {
    try {
        // Appel de l'API avec le token et l'ID de la commande
        const response = await fetch(`${getBaseUrl()}/getdetailCommandes/${id}/${token}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Ajout du token JWT
                'Content-Type': 'application/json'   // Type de contenu JSON
            }
        });

        // Vérification de la réponse de l'API
        if (!response.ok) {
            throw new Error('Échec de la récupération des données.');
        }

        // Récupération des données au format JSON
        const result: ApiResponse<ApiDataOders> = await response.json();
        // console.log(result)
        return result;

    } catch (error: any) {
        console.error('Erreur dans la récupération des données:', error.message);
        return {
            statusCode: 500,
            statusMessage: error.message,
            data: {
                data: [] // Retourne un tableau vide en cas d'erreur
            }
        }
    }
};





