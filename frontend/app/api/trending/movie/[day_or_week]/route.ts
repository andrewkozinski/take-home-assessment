import { clear } from "console";

export async function GET(request: Request, { params }: { params: { day_or_week: string } }) {
    const body = await params;//throws an error without awaiting params first
    const day_or_week = body.day_or_week;

    if (day_or_week !== 'day' && day_or_week !== 'week') {
        return new Response(JSON.stringify({ error: 'Invalid day_or_week parameter' }), {
            status: 400,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    console.log(`Fetching trending movies for: ${day_or_week}`);

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout

    //Fetch using the .env variable for the API URL

    try {
        const res = await fetch(`${process.env.API_URL}/trending/movie/${day_or_week}`, { signal: controller.signal });
        clearTimeout(timeoutId);

        //Handle error if response not ok
        if (!res.ok) {
            return new Response(JSON.stringify({ error: res.statusText }), {
                status: res.status,
                headers: { 'Content-Type': 'application/json' },
            });
        }

        const movies = await res.json();
        return new Response(JSON.stringify(movies), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });

    } catch (error) {
        clearTimeout(timeoutId);
        console.error("Error fetching trending movies: ", error);

        const isTimeout = (error as Error).name === 'AbortError';
        const message = isTimeout ? "Request timed out" : (error as Error).message;

        return new Response(JSON.stringify({ error: message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });

    }
    
}