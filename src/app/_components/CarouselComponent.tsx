// components/CarouselComponent.tsx
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Avatar from "react-avatar";
import Skeleton from "react-loading-skeleton";  // Utilisation de react-loading-skeleton

interface CarouselItemType {
    image: string;
    config: {
        point?: boolean;
    };
    content?: string[];
}

interface CarouselComponentProps {
    CARROUSSEL_BANNER: CarouselItemType[];
}

const CarouselComponent: React.FC<CarouselComponentProps> = ({ CARROUSSEL_BANNER }) => {
    return (
        <div className="relative w-full max-w-7xl mx-auto rounded-xl md:rounded-3xl">
            <Carousel className="relative w-full max-w-7xl mx-auto rounded-xl md:rounded-3xl">
                <CarouselContent>
                    {CARROUSSEL_BANNER.map((item, index) => (
                        <CarouselItem key={index}>
                            <div className="relative">
                                <Avatar
                                    className="w-full h-[14rem] md:h-[40rem] object-cover rounded-xl md:rounded-3xl"
                                    src={item.image}
                                    alt="@radix-vue"
                                    size="140%" // Vous pouvez définir la taille à 100% pour l'ajuster à son conteneur
                                    round="10px" // Définir un rayon de bordure pour l'avatar
                                >
                                    <Skeleton className="w-full h-[14rem] md:h-[40rem] object-cover rounded-xl md:rounded-3xl" />
                                </Avatar>
                                <div className="absolute top-0 left-0 w-full h-full">
                                    <div className="font-title text-xs md:text-4xl">

                                        {item.config.point && (
                                            <>
                                                <div className="absolute top-[1rem] left-[1rem] md:top-[9.4rem] md:left-24 z-30 bg-primary shadow-lg rounded-full p-2 md:p-4" />
                                                <div className="absolute top-[1rem] left-[2.5rem] md:top-[9.4rem] md:left-[8.5rem] z-30 bg-[#242078] shadow-lg p-2 rounded-full md:p-4" />
                                                <div className="absolute top-[1rem] left-[4rem] md:top-[9.4rem] md:left-[11.2rem] z-30 bg-[#242078] shadow-lg p-2 rounded-full md:p-4" />
                                            </>
                                        )}

                                        {item.content?.[0] && (
                                            <div className="absolute top-[3rem] md:top-[12rem] left-[1rem] md:left-[6rem] z-30 bg-primary shadow-lg shadow-black/20 text-white uppercase font-bold pt-3 pb-2 px-2">
                                                {item.content[0]}
                                            </div>
                                        )}
                                        {item.content?.[1] && (
                                            <div className="absolute top-[5rem] md:top-[15.4rem] left-[1rem] md:left-[6rem] z-20 bg-primary shadow-lg shadow-black/20 text-white uppercase font-bold pt-3 pb-2 px-2">
                                                {item.content[1]}
                                            </div>
                                        )}
                                        {item.content?.[2] && (
                                            <div className="absolute top-[7rem] md:top-[18.7rem] left-[1rem] md:left-[6rem] z-10 bg-primary shadow-lg shadow-black/20 text-white uppercase font-bold pt-3 pb-2 px-2">
                                                {item.content[2]}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </CarouselItem>
                    ))}
                </CarouselContent>

                <CarouselPrevious className="border-4 border-black hidden md:flex" />
                <CarouselNext className="border-4 border-black hidden md:flex" />
            </Carousel>
        </div>
    );
};

export default CarouselComponent;
