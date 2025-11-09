"use client";
import { Navbar } from "@/components/ui/navbar";
import { clearFavoriteMovies } from "@/lib/favorites";
import { clearAllCaches } from "@/lib/cache";

export default function SettingsPage() {
    return (
        <div className="flex min-h-screen">
            <main className="flex flex-col min-h-screen w-full">
                <Navbar />
                <div className=" flex justify-center mt-10 flex-col items-center">
                    <h1 className="lg:text-4xl md:text-3xl sm:text-2xl mb-6">Settings</h1>

                    {/* Reset favorites */}                    
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200"
                        onClick={clearFavoriteMovies}
                    >
                        Reset Favorites
                    </button>

                    {/* Clear cache */}
                    <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors duration-200 mt-4"
                        onClick={clearAllCaches}
                    >
                        Clear Cache
                    </button>
                </div>
            </main>
        </div>
    );
}
