import FavoriteMoviesList from "@/components/ui/favorite-movies-list";
import { Navbar } from "@/components/ui/navbar";
import { Card } from "@/components/ui/card";

export default function FavoriteMoviesListPage() {
    return (
        <div className="flex min-h-screen">
            <main className="flex flex-col min-h-screen w-full">
                <Navbar />
                <div className="m-auto flex flex-col items-center">
                    <h1 className="lg:text-4xl md:text-3xl sm:text-2xl mb-10">Your Favorites:</h1>
                    <div className="m-auto min-w-[1152px]">
                        <FavoriteMoviesList />
                    </div>
                </div>                
            </main>
            
        </div>
    );
}