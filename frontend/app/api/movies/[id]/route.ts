export async function GET(request: Request, { params }: { params: { id?: string } }) {
  const body = await params;//throws an error without awaiting params first
  const id = body.id;


  if (!id) {
    return new Response(JSON.stringify({ error: 'Missing id' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  console.log(`Fetching movie with ID: ${id}`);
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 seconds timeout
  try {
    //Fetch using the .env variable for the API URL
    const res = await fetch(`${process.env.API_URL}/movie/${id}`, {
      signal: controller.signal
    });

    const movie = await res.json();
    clearTimeout(timeoutId);
    //Handle error if response not ok
    if (!res.ok) {
      return new Response(JSON.stringify({ error: res.statusText }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify(movie), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  }//end try
  catch (error) {
    clearTimeout(timeoutId);
    console.error("Error fetching trending movies: ", error);

    const isTimeout = (error as Error).name === 'AbortError';
    const message = isTimeout ? "Request timed out" : (error as Error).message;

    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });

  }//end catch error
  
}