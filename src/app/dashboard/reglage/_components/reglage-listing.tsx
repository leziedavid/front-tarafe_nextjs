'use client';


import { useState, useEffect, useTransition } from 'react';
import { Toaster } from "@/components/ui/sonner";
import { toast } from "sonner"
import { ApiResponse } from "@/interfaces/ApiResponse";
import { Filters } from '@/interfaces/Filters'; // Importation de l'interface Filters
import useAuth from '@/servives/useAuth';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Equipe, GallerieImage, GallerieImagesResponse, Realisation } from '@/interfaces/HomeInterface';
import { Skeleton } from '@/components/ui/skeleton';
import { getAllImagesGallery, getPub, getreglages } from '@/servives/HomeService';
import { getBaseUrlImg } from '@/servives/baseUrl';
import { Check, Edit, Eye, Minus, Trash, Settings, Home  } from 'lucide-react';
import ImagePreviewDialog from '@/components/Dialog/ImagePreviewDialog';
import ImageUploadDialog from '@/components/Dialog/ImageUploadDialog';


import dynamic from "next/dynamic";
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
const QuillEditor = dynamic(() => import("@/components/ui/QuillEditor"), { ssr: false });

type ReglageListingPage = {
  isDialogOpen: boolean;
  onDialogOpenChange: (open: boolean) => void; // Prop pour gérer l'ouverture du dialog
};

type CardId = 'home' | 'apropos' | 'settings' | 'publicitaire' | 'equipe'; // Définir un type littéral pour les id de cartes

export default function ReglageListingPage({isDialogOpen,onDialogOpenChange}: ReglageListingPage) {

  // const [isLoading, startTransition] = useTransition();
  const token = useAuth();  // Récupérer le token à l'aide du hook
  const [dataImages, setImage] = useState<GallerieImage[]>([]);
  const [equipe, setEquipe] = useState<Equipe[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [search, setSearch] = useState(''); // Recherche
  const [description, setDescription] = useState("");

  // État pour contrôler la visibilité du bloc d'images 1 & 2
  const [isBlockVisible, setIsBlockVisible] = useState(true);
  const [loading, setLoading] = useState(false);  // Pour gérer l'état de la requête
  const [error, setError] = useState<string | null>(null); // Pour gérer les erreurs
  const [imageLink, setImageLink] = useState<string>(''); // Etat pour l'URL de l'image
  const [dialogOpen, setDialogOpen] = useState<boolean>(false); // Etat pour contrôler l'ouverture du Dialog
  // const [activeCard, setActiveCard] = useState<CardId | null>(null); // Le type de activeCard peut être un id de carte ou null
  const [activeCard, setActiveCard] = useState("home"); // Le type de activeCard peut être un id de carte ou null

// Initialisation des états pour chaque champ
const [entrepriseReglages, setEntrepriseReglages] = useState('');
const [descFooter, setDescFooter] = useState('');
const [descApropos, setDescApropos] = useState('');
const [logoSiteReglages, setLogoSiteReglages] = useState('');
const [images1Reglages, setImages1Reglages] = useState('');
const [images2Reglages, setImages2Reglages] = useState('');
const [images3Reglages, setImages3Reglages] = useState('');
const [titreBanner1, setTitreBanner1] = useState('');
const [texteBanner1, setTexteBanner1] = useState('');
const [titreBanner2, setTitreBanner2] = useState('');
const [texteBanner2, setTexteBanner2] = useState('');
const [couleurTexteBanner1, setCouleurTexteBanner1] = useState('');
const [couleurTexteBanner2, setCouleurTexteBanner2] = useState('');
const [textePersonnalisation, settextePersonnalisation] = useState('');
const [libelleSection, setlibelleSection] = useState('');
const [descriptionSection, setdescriptionSection] = useState('');
const [localisation, setLocalisation] = useState('');
const [heureOuverture, setHeureOuverture] = useState('');
const [email, setEmail] = useState('');
const [contact1, setContact1] = useState('');
const [contact2, setContact2] = useState('');
const [facebook, setFacebook] = useState('');
const [youtube, setYoutube] = useState('');
const [linkedin, setLinkedin] = useState('');
const [instagram, setInstagram] = useState('');

const [texteEquipe1, setTexteEquipe1] = useState('');
const [texteEquipe2, setTexteEquipe2] = useState('');

const [idpublicite, setIdpublicite] = useState(0);
const [typesCard1, setTypesCard1] = useState(0);
const [typesCard2, setTypesCard2] = useState(0);
const [filesPublicite1, setfilesPublicite1] = useState('');
const [filesPublicite2, setfilesPublicite2] = useState('');

const [libellePublicite1, setLibellePublicite1] = useState('');
const [libellePublicite2, setLibellePublicite2] = useState('');
const [link1, setLink1] = useState('');
const [link2, setLink2] = useState('');

const [isLoading, setIsLoading] = useState(true);
  // Deux états pour savoir quel bloc est actif (1 ou 2)
  const [isBlock1Active, setIsBlock1Active] = useState(false); // Bloc 1 initialement désactivé
  const [isBlock2Active, setIsBlock2Active] = useState(false); // Bloc 2 initialement désactivé


  const fetchReglages = async () => {

    try {

      const token = localStorage.getItem('token'); // Par exemple, récupère le token JWT.
      const response = await getreglages(token);

      if (response.statusCode === 200 && response.data.reglages.length > 0) {
        const reglages = response.data.reglages[0]; // On prend le premier élément
        // const equipes = response.data.reglages[1]; // On prend le deuxième élément
        setEquipe(response.data.equipes || '');
        // Remplir les champs avec les données récupérées
        setEntrepriseReglages(reglages.entreprise_reglages || '');
        setDescFooter(reglages.desc_footer || '');
        setDescApropos(reglages.description_reglages || '');
        setLogoSiteReglages(reglages.logoSite_reglages || '');
        setImages1Reglages(reglages.images1_reglages || '');
        setImages2Reglages(reglages.images2_reglages || '');
        setImages3Reglages(reglages.images3_reglages || '');

        settextePersonnalisation(reglages.texte_personnalisation || '');
        setlibelleSection(reglages.libelle_section || '');
        setdescriptionSection(reglages.description_section || '');

        setTitreBanner1(reglages.titre_banner1 || '');
        setTexteBanner1(reglages.texte_banner1 || '');
        setTitreBanner2(reglages.titre_banner2 || '');
        setTexteBanner2(reglages.texte_banner2 || '');
        setCouleurTexteBanner1(reglages.couleur1 || '');
        setCouleurTexteBanner2(reglages.couleur2 || '');
        setLocalisation(reglages.localisation_reglages);
        setHeureOuverture(reglages.ouverture_reglages || '');
        setEmail(reglages.email_reglages || '');
        setContact1(reglages.phone1_reglages || '');
        setContact2(reglages.phone2_reglages || '');
        setFacebook(reglages.lienFacebbook_reglages || '');
        setYoutube(reglages.liensYoutub_reglages || '');
        setLinkedin(reglages.lienLikedin_reglages || '');
        setInstagram(reglages.lienInstagram_reglages || '');
        setTexteEquipe1(reglages.texteHeader1 || '');
        setTexteEquipe2(reglages.texteHeader2 || '');
        if (reglages.active == 0) {
          setIsBlock1Active(false);
          setIsBlock2Active(true);
        } else {
          setIsBlock1Active(true);
          setIsBlock2Active(false);
        }
      } else {
        setError('Aucune donnée disponible');
      }
    } catch (err) {
      setError('Erreur de connexion ou de récupération des données');
    } finally {
      setIsLoading(false);
    }
  };

  const getDataPub = async () => {

    try {

      const token = localStorage.getItem('token'); // Par exemple, récupère le token JWT.
      const response = await getPub(token);
      // Puisque response.data est un objet et non un tableau, pas besoin de vérifier la longueur.
      const item = response.data[0]; // Récupère directement l'objet Publicite
      
      // On met à jour les états avec les valeurs de l'objet
      setIdpublicite(item.id_publicite);
      setTypesCard1(item.typesCard1);
      setTypesCard2(item.typesCard2);
      setfilesPublicite1(item.files_publicite1 || '');
      setfilesPublicite2(item.files_publicite2 || '');
      setLibellePublicite1(item.libelle_publicite1 || '');
      setLibellePublicite2(item.libelle_publicite2 || '');
      setLink1(item.link1 || '');
      setLink2(item.link2 || '');
      // Si tu as d'autres variab

    } catch (err) {
      setError('Erreur de connexion ou de récupération des données');
    } finally {
      setIsLoading(false);
    }
  };

useEffect(() => {
  fetchReglages();
  getDataPub();
}, []); // L'appel API se fait une seule fois au chargement de la page.

// Fonction pour mettre à jour les réglages dans la base de données
const updateReglages = async () => {
  try {
    const token = localStorage.getItem('token'); // Par exemple, récupère le token JWT.
    const response = await fetch('/api/reglages', {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        entreprise_reglages: entrepriseReglages,
        desc_footer: descFooter,
        titre_banner1: titreBanner1,
        texte_banner1: texteBanner1,
        titre_banner2: titreBanner2,
        texte_banner2: texteBanner2,
        couleurTexte_banner1: couleurTexteBanner1,
        couleurTexte_banner2: couleurTexteBanner2,
        localisation_reglages: localisation,
        heure_ouverture: heureOuverture,
        email_reglages: email,
        contact1_reglages: contact1,
        contact2_reglages: contact2,
        lienFacebbook_reglages: facebook,
        liensYoutub_reglages: youtube,
        lienLikedin_reglages: linkedin,
        lienInstagram_reglages: instagram,
        isBlock1Active: isBlock1Active,
        isBlock2Active: isBlock2Active,
      }),
    });

    if (!response.ok) {
      throw new Error('Échec de la mise à jour des réglages');
    }

    const result = await response.json();
    alert('Réglages mis à jour avec succès');
  } catch (error) {
    console.error('Erreur lors de la mise à jour:', error);
    alert('Erreur lors de la mise à jour');
  }
};

  const handleMenuClick = (cardId: CardId) => { // Spécifier que cardId est de type CardId
    setActiveCard(cardId);
  };

  const fetchData = async () => { const filters: Filters = {  page: currentPage, limit: 10, search: search || undefined,};

    const result: ApiResponse<GallerieImagesResponse> = await getAllImagesGallery(token, filters);


    if (result.statusCode !== 200) {
      toast.error(result.statusMessage);
    } else {
      setImage(result.data.data.data);
      setTotalPages(result.data.data.last_page); // Met à jour le nombre total de pages
    }
  };

  // Fonction pour changer la page
  const handlePageChange = (page: number) => {
    setCurrentPage(page); // Mettre à jour la page courante

  };

  // Appeler la fonction fetchData à chaque changement de page ou de catégorie
  useEffect(() => {
    fetchData();
  }, [currentPage,search]); // Dépendances mises à jour pour inclure selectedCategory


  const isDataEmpty = !dataImages || dataImages.length <= 0;


  // Fonction pour ouvrir le Dialog avec l'image sélectionnée
  const handleImageClick = (url: string) => {
    setImageLink(url);  // Met l'URL de l'image dans l'état
    setDialogOpen(true); // Ouvre le Dialog
  };

  // Fonction pour fermer le Dialog
  const handleCloseDialog = (open: boolean) => {
    setDialogOpen(open);  // Ferme le Dialog
    setImageLink('');  // Réinitialise l'URL de l'image
  };


  // Fonction pour gérer l'activation du Bloc 1
  const handleBlock1SwitchChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Récupérer l'état du switch via aria-checked
    const checked = (e.target as HTMLButtonElement).getAttribute('aria-checked') === 'true';
    setIsBlock1Active(checked);
    updateBannerStatusInDB(checked ? 1 : 0, 'block1'); // Envoie la valeur 1 (activé) ou 0 (désactivé)
  };

  // Fonction pour gérer l'activation du Bloc 2
  const handleBlock2SwitchChange = (e: React.MouseEvent<HTMLButtonElement>) => {
    // Récupérer l'état du switch via aria-checked
    const checked = (e.target as HTMLButtonElement).getAttribute('aria-checked') === 'true';
    setIsBlock2Active(checked);
    updateBannerStatusInDB(checked ? 2 : 0, 'block2'); // Envoie la valeur 2 (activé) ou 0 (désactivé)
  };

  // Fonction pour mettre à jour l'état du bloc dans la base de données
  const updateBannerStatusInDB = async (blockId: number, blockName: string) => {
    try {
      console.log(`Le bloc ${blockName} a été ${blockId === 0 ? 'désactivé' : 'activé'}`);
      // Ici tu peux appeler une API pour envoyer la donnée au backend (API REST, GraphQL, etc.)
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut', error);
    }
  };

  return (
    <div>

      {isDataEmpty ? (

        <div className="px-2 py-2 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 overflow-auto">
          {/* Carte 1 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          {/* Carte 2 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          {/* Carte 3 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          {/* Carte 4 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          {/* Carte 5 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          {/* Carte 6 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          {/* Carte 7 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>

          {/* Carte 8 */}
          <div className="flex flex-col gap-2">
            <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
            <Skeleton className="h-6 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>

        ) : (

          
          <>
    
        <div className=' bg-white flex h-full gap-4 overflow-x-auto scrollbar-hide'>
          
            {/* Menu de navigation */}
            <div className='w-1/4 flex flex-col items-center justify-center p-4 border border-dashed border-gray-400 rounded-lg hover:border-gray-600 hover:bg-gray-50 transition-colors duration-300'>
              <ul className="space-y-4 w-full">
                <li 
                  className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
                  onClick={() => handleMenuClick('home')}
                >
                  <Edit className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-600">Page d'accueil</span>
                </li>

                {/* <li className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer" onClick={() => handleMenuClick('apropos')} >
                  <Trash className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-600">Page à propos</span>
                </li> */}

                <li className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
                  onClick={() => handleMenuClick('settings')}
                >
                  <Settings className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-600">Section de page</span>
                </li>
                <li 
                  className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
                  onClick={() => handleMenuClick('publicitaire')}
                >
                  <Home className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-600">Publicitaire</span>
                </li>
                <li 
                  className="flex items-center space-x-3 hover:bg-gray-100 p-2 rounded-lg cursor-pointer"
                  onClick={() => handleMenuClick('equipe')}
                >
                  <Home className="h-5 w-5 text-gray-600" />
                  <span className="text-sm text-gray-600">Equipe tarafé</span>
                </li>
              </ul>
            </div>

            {/* Carte dynamique basée sur la sélection */}
            <div className='w-full flex flex-col items-center justify-center p-4 border border-dashed border-gray-400 rounded-lg hover:border-gray-600 hover:bg-gray-50 transition-colors duration-300'>
              
              {activeCard === 'home' && (


                  <div className='space-y-4 w-full'>
                  <div className="flex items-center space-x-4">
                    <img className="w-40 h-30 object-cover" src={`${getBaseUrlImg()}/${logoSiteReglages}`} alt="Image" />
                    <div className="flex-1">
                      <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Titre de la page d'accueil</Label>
                      <Input
                        id="home-title"
                        placeholder="Titre de la page d'accueil"
                        value={entrepriseReglages}
                        onChange={(e) => setEntrepriseReglages(e.target.value)}
                      />
                    </div>
                  </div>

                  <Label htmlFor="home-content" className="block text-sm font-medium text-gray-700">Description sous le footer</Label>
                  <QuillEditor value={descFooter} onChange={(value) => setDescFooter(value)} />

                  <Label htmlFor="home-content" className="block text-sm font-medium text-gray-700">Description page apropos</Label>
                  <QuillEditor value={descApropos} onChange={(value) => setDescApropos(value)}  />

                  {/* Conteneur pour les deux blocs d'images avec Flexbox */}
                  <div className="flex space-x-6">
                    {/* Bloc 1 : Image 1 et Image 2 alignées horizontalement */}
                    <div className="flex space-x-4 flex-1 flex-col items-center">
                      <div className="flex space-x-4"> {/* Conteneur avec espace entre les images */}
                        <div className="flex flex-col items-center">
                          <img className="w-30 h-40 object-cover" src={`${getBaseUrlImg()}/${images1Reglages}`}  alt="tarafé" />
                        </div>
                        <div className="flex flex-col items-center">
                          <img className="w-30 h-40 object-cover" src={`${getBaseUrlImg()}/${images2Reglages}`} alt="tarafé" />
                        </div>
                      </div>

                      {/* Switch pour activer/désactiver le Bloc 1 */}
                      <div className="flex items-center space-x-2 mt-4">
                        <Switch
                          id="block1-switch"
                          aria-checked={isBlock1Active ? 'true' : 'false'}
                          onClick={() => setIsBlock1Active(!isBlock1Active)}
                        />
                        <Label htmlFor="block1-switch" className="mt-2 text-sm font-bold text-center text-gray-800">
                          {isBlock1Active ? 'Bloc 1 Activé' : 'Bloc 1 Désactivé'}
                        </Label>
                      </div>
                    </div>

                    {/* Bloc 2 : Image 3 */}
                    <div className="flex-1 flex flex-col items-center">
                      <img className="w-30 h-40 object-cover" src={`${getBaseUrlImg()}/${images3Reglages}`} alt="tarafé" />
                      {/* Switch pour activer/désactiver le Bloc 2 */}
                      <div className="flex items-center space-x-2 mt-4">
                        <Switch
                          id="block2-switch"
                          aria-checked={isBlock2Active ? 'true' : 'false'}
                          onClick={() => setIsBlock2Active(!isBlock2Active)}
                        />
                        <Label htmlFor="block2-switch" className="mt-2 text-sm font-bold text-center text-gray-800">
                          {isBlock2Active ? 'Bloc 2 Activé' : 'Bloc 2 Désactivé'}
                        </Label>
                      </div>
                    </div>
                  </div>

                  {/* Section pour les bannières, localisation, contacts, réseaux sociaux */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <Label htmlFor="titre-banner1" className="block text-sm font-medium text-gray-700">Titre banner 1</Label>
                        <Input
                          id="titre-banner1"
                          placeholder="Titre banner 1"
                          value={titreBanner1}
                          onChange={(e) => setTitreBanner1(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor="texte-banner1" className="block text-sm font-medium text-gray-700">Texte banner 1</Label>
                        <Input
                          id="texte-banner1"
                          placeholder="Texte banner 1"
                          value={texteBanner1}
                          onChange={(e) => setTexteBanner1(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor="titre-banner2" className="block text-sm font-medium text-gray-700">Titre banner 2</Label>
                        <Input
                          id="titre-banner2"
                          placeholder="Titre banner 2"
                          value={titreBanner2}
                          onChange={(e) => setTitreBanner2(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor="texte-banner2" className="block text-sm font-medium text-gray-700">Texte banner 2</Label>
                        <Input
                          id="texte-banner2"
                          placeholder="Texte banner 2"
                          value={texteBanner2}
                          onChange={(e) => setTexteBanner2(e.target.value)}
                        />
                      </div>
                      
                      <div className="flex flex-col">
                        <Label htmlFor="couleur-texte-banner1" className="block text-sm font-medium text-gray-700">Couleur texte banner 1</Label>
                        <Input
                          id="couleur-texte-banner1"
                          placeholder="Couleur texte banner 1"
                          value={couleurTexteBanner1}
                          onChange={(e) => setCouleurTexteBanner1(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor="couleur-texte-banner2" className="block text-sm font-medium text-gray-700">Couleur texte banner 2</Label>
                        <Input
                          id="couleur-texte-banner2"
                          placeholder="Couleur texte banner 2"
                          value={couleurTexteBanner2}
                          onChange={(e) => setCouleurTexteBanner2(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Section pour la localisation et les contacts */}
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col">
                        <Label htmlFor="localisation" className="block text-sm font-medium text-gray-700">Localisation</Label>
                        <Input
                          id="localisation"
                          placeholder="Localisation"
                          value={localisation}
                          onChange={(e) => setLocalisation(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor="heure-ouverture" className="block text-sm font-medium text-gray-700">Heure d'ouverture</Label>
                        <Input
                          id="heure-ouverture"
                          placeholder="Heure d'ouverture"
                          value={heureOuverture}
                          onChange={(e) => setHeureOuverture(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</Label>
                        <Input
                          id="email"
                          placeholder="Email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor="contact1" className="block text-sm font-medium text-gray-700">Contact 1</Label>
                        <Input
                          id="contact1"
                          placeholder="Contact 1"
                          value={contact1}
                          onChange={(e) => setContact1(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor="contact2" className="block text-sm font-medium text-gray-700">Contact 2</Label>
                        <Input
                          id="contact2"
                          placeholder="Contact 2"
                          value={contact2}
                          onChange={(e) => setContact2(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor="facebook" className="block text-sm font-medium text-gray-700">Facebook</Label>
                        <Input
                          id="facebook"
                          placeholder="Facebook"
                          value={facebook}
                          onChange={(e) => setFacebook(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor="youtube" className="block text-sm font-medium text-gray-700">Youtube</Label>
                        <Input
                          id="youtube"
                          placeholder="Youtube"
                          value={youtube}
                          onChange={(e) => setYoutube(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor="linkedin" className="block text-sm font-medium text-gray-700">LinkedIn</Label>
                        <Input
                          id="linkedin"
                          placeholder="LinkedIn"
                          value={linkedin}
                          onChange={(e) => setLinkedin(e.target.value)}
                        />
                      </div>

                      <div className="flex flex-col">
                        <Label htmlFor="instagram" className="block text-sm font-medium text-gray-700">Instagram</Label>
                        <Input
                          id="instagram"
                          placeholder="Instagram"
                          value={instagram}
                          onChange={(e) => setInstagram(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-4">
                    <Button onClick={updateReglages} className="px-6 py-3 text-white rounded-lg"> Sauvegarder </Button>
                  </div>

                  </div>

                    // <div className='space-y-4 w-full'>

                    //   <div className="flex items-center space-x-4">
                    //     {/* Image à gauche */}
                    //     <img className="w-40 h-30 object-cover" src="/logos2.png" alt="Image" />

                    //     {/* Contenu à droite de l'image */}
                    //     <div className="flex-1">
                    //       <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">
                    //         Titre de la page d'accueil
                    //       </Label>
                    //       <Input id="home-title" placeholder="Titre de la page d'accueil" />
                    //     </div>
                    //   </div>

                    //   <label htmlFor="home-content" className="block text-sm font-medium text-gray-700">Description sous le footer</label>
                    //   <QuillEditor value={description} onChange={setDescription} />

                    //   <div className="space-y-6">
                    //     {/* Conteneur pour les deux blocs d'images avec Flexbox */}
                    //     <div className="flex space-x-6">
                    //       {/* Bloc 1 : Image 1 et Image 2 alignées horizontalement */}
                    //       <div className="flex space-x-4 flex-1 flex-col items-center">

                    //         <div className="flex space-x-4"> {/* Conteneur avec espace entre les images */}

                    //           <div className="flex flex-col items-center">
                    //             <img className="w-30 h-40 object-cover" src="/images.jpg" alt="tarafé" />
                    //           </div>

                    //           <div className="flex flex-col items-center">
                    //             <img className="w-30 h-40 object-cover" src="/images.jpg" alt="tarafé" />
                    //           </div>

                    //         </div>

                    //         {/* Switch pour activer/désactiver le Bloc 1 */}
                    //         <div className="flex items-center space-x-2 mt-4">
                    //           <Switch
                    //             id="block1-switch"
                    //             aria-checked={isBlock1Active ? 'true' : 'false'}
                    //             onClick={handleBlock1SwitchChange}
                    //           />
                    //           <Label htmlFor="block1-switch" className="mt-2 text-sm font-bold text-center text-gray-800">
                    //             {isBlock1Active ? 'Bloc 1 Activé' : 'Bloc 1 Désactivé'}
                    //           </Label>
                    //         </div>
                    //       </div>

                    //       {/* Bloc 2 : Image 3 */}
                    //       <div className="flex-1 flex flex-col items-center">
                    //         <img className="w-30 h-40 object-cover" src="/images.jpg" alt="tarafé" />
                    //         {/* Switch pour activer/désactiver le Bloc 2 */}
                    //         <div className="flex items-center space-x-2 mt-4">
                    //           <Switch id="block2-switch"
                    //             aria-checked={isBlock2Active ? 'true' : 'false'}
                    //             onClick={handleBlock2SwitchChange}/>
                    //           <Label htmlFor="block2-switch" className="mt-2 text-sm font-bold text-center text-gray-800">
                    //             {isBlock2Active ? 'Bloc 2 Activé' : 'Bloc 2 Désactivé'}
                    //           </Label>
                    //         </div>

                    //       </div>

                    //     </div>

                    //     <div className="space-y-6">
                    //       {/* Conteneur principal avec deux lignes */}
                    //       <div className="grid grid-cols-2 gap-6">

                    //         {/* Card 1 */}
                    //         <div className="flex flex-col ">
                    //           <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Titre banner 1  </Label>
                    //           <Input id="home-content-1" placeholder="Titre banner 1 " />
                    //         </div>


                    //         {/* Card 2 */}
                    //         <div className="flex flex-col ">
                    //         <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Texte banner 1 </Label>
                    //           <Input id="home-content-2" placeholder="Titre banner 2" />
                    //         </div>


                    //         {/* Card 3 */}
                    //         <div className="flex flex-col ">
                    //           <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Titre banner 2  </Label>
                    //           <Input id="home-content-3" placeholder="Titre banner 3" />
                    //         </div>


                    //         {/* Card 4 */}
                    //         <div className="flex flex-col ">
                    //           <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Texte banner 2  </Label>
                    //           <Input id="home-content-4" placeholder="Titre banner 4" />
                    //         </div>



                    //         {/* Card 3 */}
                    //           <div className="flex flex-col ">
                    //           <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Couleur texte banner 1  </Label>
                    //           <Input id="home-content-3" placeholder="Couleur texte banner 1" />
                    //         </div>

                    //         {/* Card 3 */}
                    //         <div className="flex flex-col ">
                    //           <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Couleur texte banner 2  </Label>
                    //           <Input id="home-content-3" placeholder="Couleur texte banner 2" />
                    //         </div>

                    //       </div>
                    //     </div>

                    //     <div className="space-y-6">
                    //       {/* Conteneur principal avec deux lignes */}
                    //       <div className="grid grid-cols-2 gap-6">

                    //         <div className="flex flex-col ">
                    //           <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Localisation</Label>
                    //           <Input id="home-content-3" placeholder="Localisation" />
                    //         </div>

                    //         <div className="flex flex-col ">
                    //           <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Heur d'ouverture </Label>
                    //           <Input id="home-content-3" placeholder="Heur d'ouverture" />
                    //         </div>

                    //         <div className="flex flex-col ">
                    //           <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Email </Label>
                    //           <Input id="home-content-3" placeholder="Email" />
                    //         </div>

                    //         <div className="flex flex-col ">
                    //           <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Contact 1 </Label>
                    //           <Input id="home-content-3" placeholder="Contact 1" />
                    //         </div>

                    //         <div className="">
                    //           <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Contact 2 </Label>
                    //           <Input id="home-content-3" placeholder="Contact 2" />
                    //         </div>

                    //         <div className="flex flex-col ">
                    //           <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Facebbook</Label>
                    //           <Input id="home-content-3" placeholder="Facebbook" />
                    //         </div>

                    //         <div className="flex flex-col ">
                    //           <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Youtube</Label>
                    //           <Input id="home-content-3" placeholder="Youtube" />
                    //         </div>

                    //         <div className="flex flex-col ">
                    //           <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Likedin</Label>
                    //           <Input id="home-content-3" placeholder="Likedin" />
                    //         </div>

                    //         <div className="flex flex-col ">
                    //           <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Instagram</Label>
                    //           <Input id="home-content-3" placeholder="Instagram" />
                    //         </div>

                    //       </div>
                    //     </div>


                    //   </div>

                    // </div>

              )}
              
              {/* {activeCard === 'apropos' && (
                <div className='space-y-4 w-full'>
                  <label htmlFor="apropos-title" className="block text-sm font-medium text-gray-700">Titre de la page à propos</label>
                  <Input id="apropos-title" placeholder="Titre de la page à propos" />

                  <label htmlFor="apropos-description" className="block text-sm font-medium text-gray-700">Description</label>
                  <Input id="apropos-description" placeholder="Description de la page à propos" />
                </div>
              )} */}
              
              {activeCard === 'settings' && (

                <div className='space-y-4 w-full'>
                  <Label htmlFor="settings-title" className="block text-sm font-medium text-gray-700">Titre de la section</Label>
                  <QuillEditor value={textePersonnalisation} onChange={(value) => settextePersonnalisation(value)} />

                  <Label htmlFor="settings-title" className="block text-sm font-medium text-gray-700">Titre de la section</Label>
                  <Input  value={libelleSection} onChange={(e) => setlibelleSection(e.target.value)}id="settings-title" placeholder="Titre de la section" />

                  <label htmlFor="settings-options" className="block text-sm font-medium text-gray-700">Options</label>
                  <Input  value={descriptionSection}  onChange={(e) => setdescriptionSection(e.target.value)} id="settings-options" placeholder="Options de la section" />
                </div>

              )}
              
              {activeCard === 'publicitaire' && (
                <div className='space-y-4 w-full'>


                  <div className="flex items-center space-x-4">
                      <img className="w-40 h-30 object-cover" src={`${getBaseUrlImg()}/${filesPublicite1}`} alt="Image" />
                      <div className="flex-1">

                        <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Titre de la page d'accueil</Label>
                        <Input id="home-title" placeholder="Titre de la page d'accueil" value={libellePublicite1} onChange={(e) => setLibellePublicite1(e.target.value)} />

                        <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Titre de la page d'accueil</Label>
                        <Input id="home-title" placeholder="Titre de la page d'accueil" value={link1} onChange={(e) => setLink1(e.target.value)} />

                      </div>
                  </div>

                  <div className="flex items-center space-x-4">
                      <img className="w-40 h-30 object-cover" src={`${getBaseUrlImg()}/${filesPublicite2}`} alt="Image" />
                      <div className="flex-1">

                        <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Titre de la page d'accueil</Label>
                        <Input id="home-title" placeholder="Titre de la page d'accueil" value={libellePublicite2} onChange={(e) => setLibellePublicite2(e.target.value)} />

                        <Label htmlFor="home-title" className="block text-sm font-medium text-gray-700">Titre de la page d'accueil</Label>
                        <Input id="home-title" placeholder="Titre de la page d'accueil" value={link2} onChange={(e) => setLink2(e.target.value)} />

                      </div>
                  </div>
                  
                </div>

              )}

              {activeCard === 'equipe' && (

                <div className='space-y-4 w-full'>

                  <Label htmlFor="equipe-name" className="block text-sm font-medium text-gray-700">Titre</Label>
                  <Input value={texteEquipe1} onChange={(e) => setTexteEquipe1(e.target.value)}  id="equipe-name" placeholder="Nom de l'équipe" />

                  <Label htmlFor="equipe-members" className="block text-sm font-medium text-gray-700">Sous titre</Label>
                  <Input value={texteEquipe2} onChange={(e) => setTexteEquipe2(e.target.value)} id="equipe-members" placeholder="Membres de l'équipe" />

                  <div className="mt-4">
                    <Button onClick={updateReglages} className="px-6 py-3 text-white rounded-lg"> Sauvegarder </Button>
                  </div>


                  <div className="flex space-x-4 flex-1 flex-col items-center">

                        <div className="flex space-x-4"> {/* Conteneur avec espace entre les images */}
                          {equipe.map((item, index) => (
                            <div key={index} className="flex flex-col items-center">
                              <img className="w-30 h-40 object-cover" src={`${getBaseUrlImg()}/${item.photo_equipe}`}  alt="tarafé" /> 
                              <Label htmlFor="equipe-members" className="block text-lg font-bold text-gray-700">{item.nomPren_equipe}</Label>
                              <Label htmlFor="equipe-members" className="block text-lg font-medium text-gray-700">{item.fonction_equipe}</Label>
                            </div>
                          ))}
                        </div>


                  </div>

                </div>
              )}

          </div>

        </div>

        <ImageUploadDialog open={isDialogOpen} onOpenChange={onDialogOpenChange} />
        <ImagePreviewDialog imageUrl={imageLink}  open={dialogOpen}  onOpenChange={handleCloseDialog} />

        </>

      )}

    </div>
  );

}
