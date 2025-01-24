
import { getBaseUrl } from "./baseUrl";
import { ApiResponse } from "@/interfaces/ApiResponse";
import { ApiDataCategories, ApiDataCategoriesByRealisation, ApiDataOders, OrderData, OrderDetails, RealisationData, TransactionData, TransactionTotalsResponse } from "@/interfaces/AdminInterface";
import { Filters } from "@/interfaces/Filters"; // Importation de l'interface Filters

const getCsrfToken = async () => {
    const baseUrl = getBaseUrl();  // Récupère l'URL de base
    const response = await fetch(`${baseUrl}/sanctum/csrf-cookie`, {
        method: 'GET',
        credentials: 'include',  // Assurez-vous que les cookies sont envoyés avec la requête
    });
    if (!response.ok) {
        throw new Error('Échec de la récupération du token CSRF');
    }
    // Vous pouvez retourner la réponse ou extraire le token CSRF des en-têtes
    return response.headers.get('X-CSRF-TOKEN');
};

// Service pour récupérer les réalisations
export const getAllRealisations = async (
    token: string | null,
    filters: Filters
): Promise<ApiResponse<RealisationData>> => {
    try {
        // Construction de l'URL avec les paramètres de filtre
        const url = new URL(`${getBaseUrl()}/realisations`);
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
export const getdetailCommandes = async (token: string | null, id: number): Promise<ApiResponse> => {
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
        const result: ApiResponse = await response.json();
        // console.log(result)
        return result;

    } catch (error: any) {
        console.error('Erreur dans la récupération des données:', error.message);
        return {
            statusCode: 500,
            statusMessage: error.message,
            data: []
        }
    }
};


// Service pour récupérer les catégories
export const getCategoriesById = async (token: string | null, id: number ): Promise<ApiDataCategoriesByRealisation> => {
    try {
        // Appel de l'API pour récupérer les catégories
        const response = await fetch(`${getBaseUrl()}/option-realisation/${id}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Envoi du token pour l'authentification
                'Content-Type': 'application/json',  // En-têtes pour spécifier le type de contenu
            },
        });

        // Vérification si la réponse de l'API est OK
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des catégories.');
        }

        // Récupération des données sous forme JSON
        const result: ApiDataCategoriesByRealisation = await response.json();
        return result; // Retourne les catégories récupérées
    } catch (error : any) {
        console.error('Erreur dans la récupération des catégories:', error.message);
        
        // Retourne une réponse vide en cas d'erreur
        return {
            data: [],
        };
    }
};


// Service pour récupérer les catégories
export const getCategories = async (token: string | null, page: number = 1): Promise<ApiDataCategories> => {
    try {
        // Appel de l'API pour récupérer les catégories
        const response = await fetch(`${getBaseUrl()}/options-realisation`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,  // Envoi du token pour l'authentification
                'Content-Type': 'application/json',  // En-têtes pour spécifier le type de contenu
            },
        });

        // Vérification si la réponse de l'API est OK
        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des catégories.');
        }

        // Récupération des données sous forme JSON
        const result: ApiDataCategories = await response.json();
        return result; // Retourne les catégories récupérées
    } catch (error : any) {
        console.error('Erreur dans la récupération des catégories:', error.message);
        
        // Retourne une réponse vide en cas d'erreur
        return {
            data: [],
        };
    }
};

export const createRealisation = async (token: string | null, formData: FormData): Promise<ApiResponse<any>> => {  // Utilisation de ApiResponse<any> ici
    try {

        const response = await fetch(`${getBaseUrl()}/save-realisations`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Échec de la création du produit.');
        }

        const result: ApiResponse<any> = await response.json();  // On attend une réponse de type ApiResponse<any>
        return result;
    } catch (error: any) {
        console.error('Erreur lors de l\'enregistrement du produit:', error.message);
        return {
            statusCode: 500,
            statusMessage: error.message,
            data: null,  // On renvoie null ou un objet vide en cas d'erreur
        };
    }
};

export const updateRealisations = async (token: string | null, formData: FormData): Promise<ApiResponse<any>> => {  // Utilisation de ApiResponse<any> ici
    try {

        const response = await fetch(`${getBaseUrl()}/update-realisations`, {
            method: 'post',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Échec de la création du produit.');
        }

        const result: ApiResponse<any> = await response.json();  // On attend une réponse de type ApiResponse<any>
        return result;
    } catch (error: any) {
        console.error('Erreur lors de l\'enregistrement du produit:', error.message);
        return {
            statusCode: 500,
            statusMessage: error.message,
            data: null,  // On renvoie null ou un objet vide en cas d'erreur
        };
    }
};


export const addOrders = async (token: string | null, formData: FormData): Promise<ApiResponse<any>> => {  // Utilisation de ApiResponse<any> ici
    try {

        const response = await fetch(`${getBaseUrl()}/addOrders`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Échec de la création de la commande.');
        }

        const result: ApiResponse<any> = await response.json();  // On attend une réponse de type ApiResponse<any>
        return result;
    } catch (error: any) {
        console.error('Erreur lors de l\'enregistrement de la commande:', error.message);
        return {
            statusCode: 500,
            statusMessage: error.message,
            data: null,  // On renvoie null ou un objet vide en cas d'erreur
        };
    }
};


export const addAllImagesForProductt = async (token: string | null, formData: FormData): Promise<ApiResponse<any>> => {  // Utilisation de ApiResponse<any> ici
    try {

        const response = await fetch(`${getBaseUrl()}/saveAllImages`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Échec de la création de la commande.');
        }

        const result: ApiResponse<any> = await response.json();  // On attend une réponse de type ApiResponse<any>
        return result;
    } catch (error: any) {
        console.error('Erreur lors de l\'enregistrement de la commande:', error.message);
        return {
            statusCode: 500,
            statusMessage: error.message,
            data: null,  // On renvoie null ou un objet vide en cas d'erreur
        };
    }
};

export const imports = async (token: string | null, formData: FormData): Promise<ApiResponse<any>> => {  // Utilisation de ApiResponse<any> ici
    try {

        const response = await fetch(`${getBaseUrl()}/transactions/import`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
                // 'Content-Type': 'multipart/form-data', // Important pour les fichiers
            },
        });

        if (!response.ok) {
            throw new Error('Échec de la création des transactions.');
        }

        const result: ApiResponse<any> = await response.json();  // On attend une réponse de type ApiResponse<any>
        return result;
    } catch (error: any) {
        // console.error('Erreur lors de l\'enregistrement de la commande:', error.message);
        return {
            statusCode: 500,
            statusMessage: error.message,
            data: null,  // On renvoie null ou un objet vide en cas d'erreur
        };
    }
};

// Service pour récupérer les commandes avec des filtres
export const getAlltransactions = async (
    token: string | null,
    filters: Filters,
    category: string | null,
    payment: string | null,
    selectedYears: string | null,
): Promise<ApiResponse<TransactionData>> => {
    try {
        // Construction de l'URL avec les paramètres de filtre
        const url = new URL(`${getBaseUrl()}/transactions`);
        url.searchParams.append('page', filters.page.toString());
        url.searchParams.append('limit', filters.limit.toString());
        if (filters.search) { url.searchParams.append('search', filters.search); }
        if (category) { url.searchParams.append('category', category); }
        if (payment) { url.searchParams.append('payment', payment); }
        if (selectedYears) { url.searchParams.append('selectedYears', selectedYears); }

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

        const result: ApiResponse<TransactionData> = await response.json();
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

export const getAllImagesById = async ( token: string | null, id: number): Promise<ApiResponse<ImageData[]>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/realisations/${id}/images`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Erreur lors de la récupération des images.');
        }

        const result: ApiResponse<ImageData[]> = await response.json();
        return result;
    } catch (error: any) {
        console.error('Erreur dans la récupération des images:', error.message);

        // Retourne une réponse par défaut en cas d'erreur
        return {
            statusCode: 500,
            statusMessage: 'Erreur interne',
            data: [],
        };
    }
};


export const getAllTransactionTotals = async (
    token: string | null,
    filters: Filters,
    category: string | null,
    payment: string | null,
    selectedYears: string | null
): Promise<ApiResponse<TransactionTotalsResponse>> => {
    try {
        // Construction de l'URL avec les paramètres de filtre
        const url = new URL(`${getBaseUrl()}/getTransactionTotal`); // Assurez-vous que l'API retourne les totaux via cette route
        url.searchParams.append('page', filters.page.toString());
        url.searchParams.append('limit', filters.limit.toString());
        if (filters.search) { url.searchParams.append('search', filters.search); }
        if (category) { url.searchParams.append('category', category); }
        if (payment) { url.searchParams.append('payment', payment); }
        if (selectedYears) { url.searchParams.append('selectedYears', selectedYears); }

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

        const result: ApiResponse<TransactionTotalsResponse> = await response.json();
        return result;

    } catch (error: any) {
        console.error('Erreur dans la récupération des données:', error.message);
        return {
            statusCode: 500,
            statusMessage: error.message,
            data: {
                totals: {
                    total_sortie_caisse: "0.00",
                    total_sortie_banque: "0.00",
                    total_entree_caisse: "0.00",
                    total_entree_banque: "0.00",
                    total_general: 0
                }
            }
        };
    }
}


