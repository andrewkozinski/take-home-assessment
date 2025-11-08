"use client";

import { useEffect, useState } from "react";
import { fetchTrendingMovies, TimeFrame } from "@/lib/movies";
import { Movie } from "@/types/movie";
import Image from "next/image";
import TrendingMoviesList from "./trending-movies-list";
import { Switch } from "@/components/ui/switch";

//This component is a wrapper for TrendingMoviesList,
//Displays the list and has a toggle between day and week for trending movies
export default function TrendingMoviesContainer() {
    const [timeFrame, setTimeFrame] = useState<TimeFrame>(TimeFrame.WEEK);

    return (
        <div>

            {/* Div containing all the trending movie logic */}
            <div className="flex flex-col items-center space-y-4">
                <div className="max-w-4xl mx-auto"> {/*Limit width */}
                    <TrendingMoviesList timeFrame={timeFrame} />
                </div>
                <div className="flex items-center">
                    <label className="mr-2">Day</label>
                    <Switch
                        checked={timeFrame === TimeFrame.WEEK}
                        onCheckedChange={(checked) => {
                            setTimeFrame(checked ? TimeFrame.WEEK : TimeFrame.DAY);
                        }}
                    />
                    <label className="ml-2">Week</label>
                </div>
                
            </div>
            
        </div>
    );
}