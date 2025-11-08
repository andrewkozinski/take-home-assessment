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

  //Fetch using the .env variable for the API URL
  const res = await fetch(`${process.env.API_URL}/movie/${id}`);
  const movie = await res.json();
  //Handle error if movie not found
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
}