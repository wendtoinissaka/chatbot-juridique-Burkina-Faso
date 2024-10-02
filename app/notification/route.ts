export async function GET() {
    const res = await fetch(`${process.env.API_BASE_URL}/notifications`) //('http://localhost:5000/notifications') // Met l'URL correcte de ton backend Flask
    const notifications = await res.json()
  
    return new Response(JSON.stringify(notifications), {
      headers: {
        'Content-Type': 'application/json',
      },
    })
  }
  