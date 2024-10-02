export async function GET() {
  try {
    const res = await fetch(`${process.env.API_BASE_URL}/notifications`)
    
    // Vérifie si la réponse est correcte
    if (!res.ok) {
      return new Response(JSON.stringify({ message: 'Failed to fetch notifications' }), {
        status: res.status,
        headers: { 'Content-Type': 'application/json' },
      })
    }

    const notifications = await res.json()

    return new Response(JSON.stringify(notifications), {
      headers: { 'Content-Type': 'application/json' },
    })
  } catch (error) {
    // En cas d'erreur, renvoie une réponse avec un statut 500
    return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}


// export async function GET() {
//     const res = await fetch(`${process.env.API_BASE_URL}/notifications`) //('http://localhost:5000/notifications') // Met l'URL correcte de ton backend Flask
//     const notifications = await res.json()
  
//     return new Response(JSON.stringify(notifications), {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//   }
  