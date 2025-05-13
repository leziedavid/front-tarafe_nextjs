
import { getBaseUrl } from "./baseUrl";
import { ApiResponse } from "@/interfaces/ApiResponse";
import {
    AllOptionsResponse, ApiDataCategories, ApiDataCategoriesByRealisation,
    ApiDataOders, CategorieTransaction, NewsletterResponse, OrderData, OrderDetails,
    RealisationData, TransactionData, GalleryCategoryResponse,
    TransactionTotalsResponse, TransactionDataGraphe,
    CategoryAssignment,
    GalleryCategory
} from "@/interfaces/AdminInterface";
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
            message: error.message,
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
            message: error.message,
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
        const response = await fetch(`${getBaseUrl()}/getdetailCommandes/${id}`, {
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
            message: error.message,
            data: []
        }
    }
};


// Service pour récupérer les catégories
export const getCategoriesById = async (token: string | null, id: number): Promise<ApiDataCategoriesByRealisation> => {
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
    } catch (error: any) {
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
    } catch (error: any) {
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
            message: error.message,
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
            message: error.message,
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
            message: error.message,
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
            message: error.message,
            data: null,  // On renvoie null ou un objet vide en cas d'erreur
        };
    }
};

export const addGallery = async (token: string | null, formData: FormData): Promise<ApiResponse<any>> => {  // Utilisation de ApiResponse<any> ici
    try {

        const response = await fetch(`${getBaseUrl()}/savegallerie-images`, {
            method: 'POST',
            body: formData,
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });

        if (!response.ok) {
            throw new Error('Échec de la création de l\'image');
        }

        const result: ApiResponse<any> = await response.json();  // On attend une réponse de type ApiResponse<any>
        return result;
    } catch (error: any) {
        console.error('Erreur lors de l\'enregistrement de l\'image:', error.message);
        return {
            statusCode: 500,
            message: error.message,
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
            message: error.message,
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
    selectedCategorie: string | null,
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
        if (selectedCategorie) { url.searchParams.append('selectedCategorie', selectedCategorie); }

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
            message: error.message,
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

export const getAllImagesById = async (token: string | null, id: number): Promise<ApiResponse<ImageData[]>> => {
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
            message: 'Erreur interne',
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
            message: error.message,
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

export const DownloadFiles = async (
    token: string | null,
    filters: Filters,
    category: string | null,
    payment: string | null,
    selectedYears: string | null
): Promise<ApiResponse<any>> => {
    try {
        // Construction de l'URL avec les paramètres de filtre
        const url = new URL(`${getBaseUrl()}/export-transactions`); // Assurez-vous que l'API retourne les totaux via cette route
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

        const result: ApiResponse<any> = await response.json();
        return result;

    } catch (error: any) {
        console.error('Erreur dans la récupération des données:', error.message);
        return {
            statusCode: 500,
            message: error.message,
            data: {}
        };
    }
}

// Service pour récupérer les commandes avec des filtres
export const geAllCategorie = async (
    token: string | null,
    filters: Filters
): Promise<ApiResponse<AllOptionsResponse>> => {
    try {
        // Construction de l'URL avec les paramètres de filtre
        const url = new URL(`${getBaseUrl()}/all-options-realisation`);
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

        const result: ApiResponse<AllOptionsResponse> = await response.json();
        return result;

    } catch (error: any) {
        console.error('Erreur dans la récupération des données:', error.message);
        return {
            statusCode: 500,
            message: error.message,
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

// Fonction pour ajouter ou mettre à jour une catégorie
export const saveCategory = async (token: string | null, categoryNames: string[], categoryId?: number): Promise<ApiResponse<any>> => {
    try {
        const url = categoryId
            ? `${getBaseUrl()}/update-category/${categoryId}`  // Route pour la mise à jour
            : `${getBaseUrl()}/add-category`;  // Route pour l'ajout

        // Préparation du corps de la requête
        const body = JSON.stringify({ categories: categoryNames });

        const response = await fetch(url, {
            method: categoryId ? 'PUT' : 'POST',  // Utiliser PUT si un ID est passé, sinon POST
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: body,
        });

        if (!response.ok) {
            throw new Error('Échec de l\'ajout ou de la mise à jour de la catégorie');
        }

        const result: ApiResponse<any> = await response.json();
        return result;

    } catch (error: any) {
        console.error('Erreur lors de la soumission des catégories:', error.message);
        return {
            statusCode: 500,
            message: error.message,
            data: null,
        };
    }
};

export const geAllMessages = async (
    token: string | null,
    filters: Filters
): Promise<ApiResponse<NewsletterResponse>> => {
    try {
        // Construction de l'URL avec les paramètres de filtre
        const url = new URL(`${getBaseUrl()}/geAllMessages`);
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

        const result: ApiResponse<NewsletterResponse> = await response.json();
        return result;

    } catch (error: any) {
        console.error('Erreur dans la récupération des données:', error.message);
        return {
            statusCode: 500,
            message: error.message,
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


// Service pour récupérer les catégories de transactions en ordre décroissant
export const fetchCategorieTransaction = async (token: string | null): Promise<ApiResponse<CategorieTransaction[]>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/getCategorieTransaction`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Échec de la récupération des catégories de transactions.');
        }

        const result: ApiResponse<CategorieTransaction[]> = await response.json();
        return result;
    } catch (error: any) {
        console.error('Erreur dans getCategorieTransaction:', error.message);
        return {
            statusCode: 500,
            message: error.message,
            data: [],
        };
    }
};

// Service pour CRUD les catégories de transactions
export const fetchAllCategorieTransaction = async (token: string | null): Promise<ApiResponse<CategorieTransaction[]>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/getCategorieTransaction`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error('Échec de la récupération des catégories de transactions.');
        }

        const result: ApiResponse<CategorieTransaction[]> = await response.json();
        return result;
    } catch (error: any) {
        console.error('Erreur dans getCategorieTransaction:', error.message);
        return {
            statusCode: 500,
            message: error.message,
            data: [],
        };
    }
};


export const createCategoryTransaction = async (token: string, data: any) => {
    try {
        const response = await fetch(`${getBaseUrl()}/createCategorieTransaction`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Erreur lors de la création de la catégorie');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const updateCategoryTransaction = async (token: string, id: number, data: any) => {
    try {
        const response = await fetch(`${getBaseUrl()}/updatecategoriesTransaction/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Erreur lors de la mise à jour de la catégorie');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteCategoryTransaction = async (token: string, id: number) => {
    try {
        const response = await fetch(`${getBaseUrl()}/deletecategoriesTransaction/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Erreur lors de la suppression de la catégorie');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

// FIN

// Service pour récupérer les commandes avec des filtres
export const getTransactionDataGraphe = async (
    token: string | null,
    filters: Filters,
    category: string | null,
    payment: string | null,
    selectedYears: string | null,
    selectedCategorie: string | null,
): Promise<ApiResponse<TransactionDataGraphe>> => {
    try {
        // Construction de l'URL avec les paramètres de filtre
        const url = new URL(`${getBaseUrl()}/transactions/graphs`);
        url.searchParams.append('page', filters.page.toString());
        url.searchParams.append('limit', filters.limit.toString());
        if (filters.search) { url.searchParams.append('search', filters.search); }
        if (category) { url.searchParams.append('category', category); }
        if (payment) { url.searchParams.append('payment', payment); }
        if (selectedYears) { url.searchParams.append('selectedYears', selectedYears); }
        if (selectedCategorie) { url.searchParams.append('selectedCategorie', selectedCategorie); }

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

        const result: ApiResponse<TransactionDataGraphe> = await response.json();
        return result;

    } catch (error: any) {
        console.error('Erreur dans la récupération des données:', error.message);
        return {
            statusCode: 500,
            message: error.message,
            data: {
                BarGraphByDate: [],
                BarGraphByTypeOperation: [],
                BarGraphByCategorieTransactions: [],
                PieGraphByDate: [],
                PieGraphByTypeOperation: [],
                PieGraphByCategorieTransactions: [],
            }
        };
    }

};


// Service pour récupérer toutes les catégories de la galerie (sans pagination)
export const fetchGalleryCategory = async (token: string | null): Promise<ApiResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/categories-gallery`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des catégories de la galerie.");
        }

        const result: ApiResponse<any> = await response.json();
        return result;
    } catch (error: any) {
        console.error("Erreur dans gallery Category :", error.message);
        return {
            statusCode: 500,
            message: error.message,
            data: {
                data: []
            }
        };
    }
};

export const fetchAllGalleryCategory = async (token: string | null): Promise<ApiResponse<GalleryCategory[]>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/categories-gallery`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la récupération des catégories de la galerie.");
        }

        const result: ApiResponse<any> = await response.json();
        return result;
    } catch (error: any) {
        console.error("Erreur dans gallery Category :", error.message);
        return {
            statusCode: 500,
            message: error.message,
            data: []
        };
    }
};

export const createGalleryCategory = async (token: string, data: any) => {
    try {
        const response = await fetch(`${getBaseUrl()}/createCategorieTransaction`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Erreur lors de la création de la catégorie');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const updateGalleryCategory = async (token: string, id: number, data: any) => {
    try {
        const response = await fetch(`${getBaseUrl()}/updatecategoriesTransaction/${id}`, {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });
        if (!response.ok) throw new Error('Erreur lors de la mise à jour de la catégorie');
        return await response.json();
    } catch (error) {
        throw error;
    }
};

export const deleteGalleryCategory = async (token: string, id: number) => {
    try {
        const response = await fetch(`${getBaseUrl()}/deletecategoriesTransaction/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`,
            },
        });
        if (!response.ok) throw new Error('Erreur lors de la suppression de la catégorie');
        return await response.json();
    } catch (error) {
        throw error;
    }
};


export const updateImageCategories = async (token: string | null, categoryAssignments: CategoryAssignment[]): Promise<ApiResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/associateImages`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ assignments: categoryAssignments }),
        });

        if (!response.ok) {
            throw new Error("Erreur lors de la mise à jour des catégories d'images.");
        }

        const result: ApiResponse<any> = await response.json();
        return result;

    } catch (error: any) {
        console.error('Erreur dans updateImageCategories:', error.message);
        return {
            statusCode: 500,
            message: error.message,
            data: null
        };
    }
};



export const submitTransaction = async ( token: string | null,data: any ): Promise<ApiResponse<any>> => {
    try {
        const response = await fetch(`${getBaseUrl()}/save-transactions`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`, },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Échec de la création de la transaction.');
        }

        const result: ApiResponse<any> = await response.json();
        return result;
    } catch (error: any) {
        console.error('Erreur lors de l\'enregistrement de la transaction:', error.message);
        return {
            statusCode: 500,
            message: error.message,
            data: null,
        };
    }
};
