import { Skeleton } from "@/components/ui/skeleton";

export function SkeletonDemo() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
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
        </div>
    );
}

export default SkeletonDemo;
