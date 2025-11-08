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

    //Fetch using the .env variable for the API URL
    const res = await fetch(`${process.env.API_URL}/trending/movie/${day_or_week}`);
    const movies = await res.json();
    //Handle error if movies not found
    if (!res.ok) {
        return new Response(JSON.stringify({ error: res.statusText }), {
            status: res.status,
            headers: { 'Content-Type': 'application/json' },
        });
    }

    return new Response(JSON.stringify(movies), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
    });
}