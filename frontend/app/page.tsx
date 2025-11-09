"use client";
import Image from "next/image";
import TrendingMoviesContainer from "@/components/ui/trending-movies-container";
import { Navbar } from "@/components/ui/navbar";
import FavoriteMoviesList from "@/components/ui/favorite-movies-list";

export default function Home() {

  return (
    <div className="flex min-h-screen">
      <main className="flex flex-col min-h-screen w-full">
        <Navbar />
        <div className="m-auto">
          <h1 className="lg:text-4xl md:text-3xl sm:text-2xl mb-4">Trending Movies:</h1>
          <TrendingMoviesContainer />
          <h1 className="lg:text-4xl md:text-3xl sm:text-2xl mb-4">Your Favorites:</h1>
          <FavoriteMoviesList />
        </div>
      </main>
    </div>
  );
}
