
export interface Data {
    categories: Category[];
    sliders: Slider[];
    products: Product[];
    productsHomes: Product[];
    reglages: Reglage[];
    Publicites: Publicite[];
    politique: Politique[];
    realisations: Realisation[];  // Ajout de la section "realisations"
    blogs: Blog[];  // Ajout de la section "blogs"
    partenaires: Partenaires[];  // Ajout de la section "partenaires"
}

// Définition d'une interface qui représente l'objet contenant les données de la réalisation
export interface RealisationData {
    data: Realisation[];  // La clé 'data' contient le tableau des réalisations
}
export interface DataAllProduct {
    realisations: RealisationData[]; // Ajout de la section "partenaires"
    options: OptionRealisation[];  // Ajout de la section "partenaires"
    reglages: Reglage[];

}

export interface Category {
    id_categories_produits: number;
    libelle_categories_produits: string;
    slug_categories_produits: string;
    logos_categories_produits: string | null;
    logos_size: string | null;
    state_categories_produits: number;
    created_at: string;
    updated_at: string | null;
}

export interface Slider {
    id_sliders: number;
    name_sliders: string;
    slidersUrl: string;
    status: number;
    created_at: string;
    updated_at: string;
}

export interface Product {
    id_products: number;
    code_products: string;
    id_boutique: string;
    userId: number;
    name_product: string;
    slug: string;
    description: string;
    description_courte: string | null;
    imageUrl: string;
    image_size: string | null;
    width: number | null;
    height: number | null;
    price: number;
    Sale_price: number;
    status_products: number;
    reference: string | null;
    stoks: number;
    QteStock: number;
    commentQteStock: string | null;
    etatStock: string;
    vente_individuele: number;
    Poids: number;
    longueur: number;
    largeur: number;
    hauteur: number;
    Parametre: number;
    Optionsdecommande: number;
    Optionsproduits: number;
    Occasion: string;
    classe_livraison: string;
    delais_traitement: string;
    couleur: string | null;
    pointure: string | null;
    taille: string | null;
    commission: string | null;
    pourcentage_commission: number | null;
    prix_commission: number | null;
    created_at: string;
    updated_at: string | null;
    id_categories_produits: number;
    produitsId: number;
    categoriesId: number;
    sous_categoriesId: number | null;
    sous_sous_categoriesId: number | null;
    produitsCodes: string;
    libelle_categories_produits: string;
    slug_categories_produits: string;
    logos_categories_produits: string | null;
    logos_size: string | null;
    state_categories_produits: number;
}

export interface Reglage {
    id_reglages: number;
    entreprise_reglages: string;
    description_reglages: string;
    desc_reglagesImg1: string;
    desc_reglagesImg2: string;
    desc_footer: string;
    texte_personnalisation: string;
    logoSite_reglages: string;
    logo_footer: string;
    images1_reglages: string;
    images2_reglages: string;
    images3_reglages: string;
    active: number;
    titre_banner1: string;
    texte_banner1: string;
    titre_banner2: string | null;
    texte_banner2: string | null;
    localisation_reglages: string;
    email_reglages: string;
    phone1_reglages: string;
    phone2_reglages: string | null;
    ouverture_reglages: string;
    lienFacebbook_reglages: string;
    liensYoutub_reglages: string;
    lienLikedin_reglages: string;
    lienInstagram_reglages: string;
    libelle_section: string;
    description_section: string;
    addby_partenaires: number;
    texteHeader1: string;
    texteHeader2: string;
    couleur1: string;
    couleur2: string;
    couleur3: string;
    couleur4: string;
    nb_views_site: number;
    nb_views_fb: number;
    nb_views_insta : number;
    created_at: string;
    updated_at: string;
}

export interface Publicite {
    id_publicite: number;
    typesCard1: number;
    typesCard2: number;
    files_publicite1: string;
    files_publicite2: string;
    libelle_publicite1: string;
    libelle_publicite2: string;
    link1: string;
    link2: string;
    class1: string;
    class2: string;
    created_at: string;
    updated_at: string;
}

export interface Politique {
    id_politique: number;
    libelle_politique: string;
    description_politique: string;
    files_politique: string;
    created_at: string;
    updated_at: string | null;
}

// Ajout de l'interface Realisation
export interface Realisation {
    id_realisations: number;
    code_realisation: string;
    libelle_realisations: string;
    descript_real: string;
    images_realisations: string;
    statut_realisations: string;
    isActive: number;
    users_realisations: number;
    position: number;
    created_at: string;
    updated_at: string | null;
    // bq*N25QsxYnrw@7
}

// Ajout de l'interface Blog
export interface Blog {
    id_blog: number;
    title: string;
    description: string;
    content: string;
    imageUrl: string;
    created_at: string;
    updated_at: string | null;
}

// Ajout de l'interface Partenaire
export interface Partenaires {
    id_partenaires: number;
    libelle_partenaires: string;
    Path_partenaires: string;
    status_partenaires: number;
    created_at: string;
    updated_at: string | null;
}

export interface OptionRealisation {
    id_option_reaalisation: number;
    stateOption_reaalisation: number;
    libelleOption_reaalisation: string;
    created_at: string; // Utilisé comme chaîne de caractères pour représenter une date
    updated_at: string | null; // Peut être une chaîne de caractères ou null
}


// Interface pour la structure de pagination des réalisations
export interface PaginationLinks {
    url: string | null;
    label: string;
    active: boolean;
}

// Interface pour la réponse de l'API
export interface ApiAllDataResponse {
    realisations: {
        current_page: number;
        data: Realisation[];  // Liste des réalisations
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: PaginationLinks[];
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
    reglages: Reglage[];
    OptionRealisation: OptionRealisation[];
}


export interface Images {
    id_img_realisations: number;
    realisations_id: number;
    codeId: string;
    filles_img_realisations: string;
    one_img_realisations: string | null;
    created_at: string;
    updated_at: string | null;
}

export interface DetailRealisation {
    images: Images[];
    id: string;
    realisations: Realisation[];
    reglages: Reglage[];
}

// Définir l'interface pour l'image dans la galerie
export interface GallerieImage {
    id_gallerie_images: string; // Identifiant de l'image
    files_gallerie_images: string; // Chemin du fichier d'image
    libelle_gallerie_images: string | null; // Libellé de l'image (peut être nul)
    created_at: string; // Date de création de l'image
    updated_at: string | null; // Date de mise à jour de l'image (peut être nul)
    }

// Définir l'interface pour la réponse complète avec pagination
export interface GallerieImagesResponse {

    data: {
        current_page: number;
        data: GallerieImage[];  // Liste des réalisations
        first_page_url: string;
        from: number;
        last_page: number;
        last_page_url: string;
        links: PaginationLinks[];
        next_page_url: string | null;
        path: string;
        per_page: number;
        prev_page_url: string | null;
        to: number;
        total: number;
    };
    reglages: Reglage[];
}

export interface ApiData {
    reglages: Reglage[];
    equipes: Equipe[];
}

export interface Equipe {
    id_equipe: number;
    nomPren_equipe: string;
    fonction_equipe: string;
    email_equipe: string;
    photo_equipe: string;
}
