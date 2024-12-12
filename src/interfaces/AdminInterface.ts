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
    data: OrderDetails[];
}