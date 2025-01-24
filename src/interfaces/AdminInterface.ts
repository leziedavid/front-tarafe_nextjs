import { Realisation } from "./HomeInterface";

// Interface représentant les données des commandes
export interface RealisationData {
    current_page: number;
    data: Realisation[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
export interface OrderData {
    current_page: number;
    data: Order[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

// Interface représentant une commande
export interface Order {
    id_orders: number;
    transaction_id: string;
    total: number;
    date_orders: string;
    heurs_orders: string;
    couleur_orders: string | null;
    taille_orders: string | null;
    pointures_orders: string | null;
    Mode_paiement: string;
    adresse_paiement: string | null;
    contact_paiement: string;
    email_orders: string;
    nomUsers_orders: string;
    status_orders: number;
    storesId_orders: number;
    user_id: number;
    notes_orders: string | null;
    personnalise: number;
    created_at: string;
    updated_at: string | null;
}

// Interface représentant un lien de pagination
export interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}


export interface OrderDetails {
    id_orders: number;
    transaction_id: string;
    total: number;
    date_orders: string;
    heurs_orders: string;
    couleur_orders: string | null;
    taille_orders: string | null;
    pointures_orders: string | null;
    Mode_paiement: string;
    adresse_paiement: string | null;
    contact_paiement: string;
    email_orders: string;
    nomUsers_orders: string;
    status_orders: number;
    storesId_orders: number;
    user_id: number;
    notes_orders: string | null;
    personnalise: number;
    created_at: string;
    updated_at: string | null;
    id_achats: number;
    codeAchat: string;
    orderId: number;
    id_reali: number;
    dimensionAchats: string;
    taillesParamsAchats: string | null;
    pointuresParamsAchats: string | null;
    couleursAchats: string;
    NomPrenomAchats: string;
    EntrepriseAchats: string;
    numeroAchats: string;
    emailAchats: string;
    FileAchats: string;
    PositionsFiles: string;
    imgLogosAchats: string;
    policeAchats: string;
    texteAchats: string;
    isMails: number;
    modelfiles: string | null;
    typesmodeel: number;
    devisAchat: string | null;
    typesdevis: number;
    factures: string;
    typesfactures: number;
    objetmodels: string | null;
    objetdevis: string | null;
    objetfactures: string;
    remarques: string;
    id_realisations: number;
    code_realisation: string;
    libelle_realisations: string;
    descript_real: string;
    images_realisations: string;
    statut_realisations: string;
    isActive: number;
    users_realisations: number;
    position: number;
}


export interface ApiDataOders {
    data: OrderDetails;
}


// Interface représentant chaque option de réalisation (catégorie)
export interface OptionRéalisation {
    id_option_reaalisation: number;
    stateOption_reaalisation: number;
    libelleOption_reaalisation: string;
    created_at: string; // Date de création au format string
    updated_at: string | null; // Date de mise à jour (peut être null)
}

// Interface représentant la réponse de l'API pour récupérer les catégories
export interface ApiDataCategories {
    data: OptionRéalisation[];
}
// Interface représentant la réponse de l'API pour récupérer les catégories associées à une réalisation
export interface ApiDataCategoriesByRealisation {
    data: {
        id_op_realisation: number;               // ID unique de l'option de réalisation
        idrealis_op_realisation: number;          // ID de la relation avec la réalisation
        idoption_realis_op_realisation: number;   // ID de l'option associée
        created_at: string | null;                // Date de création (peut être null)
        updated_at: string | null;                // Date de mise à jour (peut être null)
    }[];
}

export interface ImageData {
    id_img_realisations: number;
    realisations_id: number;
    codeId: string;
    filles_img_realisations: string | null;
    one_img_realisations: string | null;
    created_at: string;
    updated_at: string | null;
}


export interface Transaction {
    id: number;  // Identifiant unique de la transaction
    date: string; // Date de la transaction au format string (par exemple "2024-04-12")
    libelle: string; // Description ou libellé de la transaction
    sortie_caisse: string; // Montant sorti de la caisse
    sortie_banque: string; // Montant sorti de la banque
    entree_caisse: string; // Montant entré dans la caisse
    entree_banque: string; // Montant entré dans la banque
    type_operation: string; // Type d'opération (par exemple "NSP")
    details: string | null; // Détails supplémentaires, ou null s'il n'y en a pas
    created_at: string; // Date de création de la transaction
    updated_at: string | null; // Date de mise à jour de la transaction, ou null si jamais mise à jour
}

export interface TransactionData {
    current_page: number;
    data: Transaction[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

