import { NextResponse, NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  // Creating a URL instance from the request.url
  try{

  const url = request.nextUrl;

  // Accessing query parameters
  const page = url.searchParams.get('page');
  const perPage = url.searchParams.get('perPage');
  const sort = url.searchParams.get('sort');

  // Logging query parameters
  console.log('Page:', page);
  console.log('PerPage:', perPage);
  const apiUrl = `https://suitmedia-backend.suitdev.com/api/ideas?page[number]=${page}&page[size]=${perPage}&append[]=small_image&append[]=medium_image&sort=${sort}`;

  // Fetch data using the constructed URL
  const response = await fetch(apiUrl, {
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json",
    },
  });

  const data = await response.json();
  return NextResponse.json(data);
  }catch(error){
    console.error("Error fetching data:", error.message);
    return NextResponse.json({ error: error.message });
  }
    
}