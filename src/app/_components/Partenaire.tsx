import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import Skeleton from "react-loading-skeleton";
import { getBaseUrlImg } from "@/servives/baseUrl";

interface Props {
    data: { Path_partenaires: string }[];
}

const PartenaireCarousel: React.FC<Props> = ({ data }) => {
    const isDataEmpty = data.length <= 0;

    return (
        <div className="w-full py-1 md:py-1 lg:py-1">
            {isDataEmpty ? (
                <div className="w-full flex flex-col text-center bg-muted rounded-md p-4 lg:p-14 gap-8 items-center">
                    <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
                    <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
                    <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
                    <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
                    <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
                    <Skeleton className="bg-muted rounded-md aspect-video mb-2" />
                </div>
            ) : (
                <>




                <div className="flex justify-center items-center flex-col mb-6">

                    <div className="pt-3 pb-4 px-2">
                        <h1 className="text-2xl md:text-3xl text-primary font-extrabold font-title uppercase">Ils nous ont fait confiance </h1>
                    </div>


                    <div className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl relative">
                        {/* Carousel encapsule les flèches et les éléments de contenu */}
                        <Carousel opts={{ align: "start" }}>
                            <CarouselContent>
                                {data.map((item, index) => (
                                    <CarouselItem key={index} className="md:basis-1/3 lg:basis-1/4">
                                        <div className="p-1">
                                            <Card>
                                                <CardContent className="flex aspect-square items-center justify-center p-6">
                                                    <img
                                                        src={`${getBaseUrlImg()}/${item.Path_partenaires}`}
                                                        alt={`Logo partenaire ${index + 1}`}
                                                        className="w-full h-auto object-contain"
                                                    />
                                                </CardContent>
                                            </Card>
                                        </div>
                                    </CarouselItem>
                                ))}
                            </CarouselContent>

                            {/* Flèches de navigation à l'intérieur du Carousel */}
                            <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-500 text-white p-2 rounded-full md:w-12 md:h-12 w-8 h-8">
                                <span className="sr-only">Précédent</span>
                            </CarouselPrevious>
                            <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 bg-gray-500 text-white p-2 rounded-full md:w-12 md:h-12 w-8 h-8">
                                <span className="sr-only">Suivant</span>
                            </CarouselNext>
                        </Carousel>
                    </div>
                </div>
                </>


            )}
        </div>
    );
};

export default PartenaireCarousel;
