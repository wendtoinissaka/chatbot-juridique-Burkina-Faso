'use server'

import axios from 'axios'
import { z } from 'zod'

// Interface pour le résultat de l'inscription
interface SignupResult {
  status?: string
  errorMessage?: string
}

// Schéma pour valider les données du formulaire
const signupSchema = z.object({
  email: z.string().email().optional(),   // L'email est optionnel mais doit être valide s'il est fourni
  numero: z.string().min(8).optional(),   // Le numéro est aussi optionnel, mais doit avoir un minimum de 8 caractères
})

// Fonction pour appeler l'API Flask et inscrire un utilisateur
export async function signupNotification(formData: FormData): Promise<SignupResult> {
  try {
    const email = formData.get('email')?.toString()
    const numero = formData.get('numero')?.toString()

    // Valider les données reçues
    const parsedData = signupSchema.safeParse({ email, numero })

    if (!parsedData.success) {
      return {
        errorMessage: "Les informations saisies sont invalides.",
      }
    }

    // Vérifier que l'un des deux champs est rempli
    if (!email && !numero) {
      return {
        errorMessage: "Au moins un des champs (email ou numéro) est requis.",
      }
    }

    // URL de l'API
    const apiUrl = `${process.env.API_BASE_URL}/notification_signup`

    // Appel à l'API (requête POST)
    const response = await axios.post(apiUrl, {
      email: parsedData.data.email,
      numero: parsedData.data.numero,
    })

    return {
      status: response.data.status,
    }
  } catch (error) {
    console.error('Erreur lors de l\'inscription :', error)
    return {
      errorMessage: "Erreur de connexion. Veuillez réessayer.",
    }
  }
}





//  // app/notification/route.ts

// export async function GET() {
//   try {
//     const res = await fetch(`${process.env.API_BASE_URL}/notifications`);
    
//     if (!res.ok) {
//       return new Response(JSON.stringify({ message: 'Failed to fetch notifications' }), {
//         status: res.status,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     const notifications = await res.json();

//     return new Response(JSON.stringify(notifications), {
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }

// export async function POST(req: Request) {
//   try {
//     const data = await req.json();
//     const { email, numero } = data; // Assurez-vous que ce sont les bons champs

//     // Logique d'inscription (par exemple, appel à votre API)
//     const res = await fetch(`${process.env.API_BASE_URL}/notification_signup`, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({ email, numero }),
//     });

//     if (!res.ok) {
//       return new Response(JSON.stringify({ message: 'Failed to sign up for notifications' }), {
//         status: res.status,
//         headers: { 'Content-Type': 'application/json' },
//       });
//     }

//     return new Response(JSON.stringify({ message: 'Inscription réussie' }), {
//       status: 200,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   } catch (error) {
//     return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     });
//   }
// }


// export async function GET() {
//   try {
//     const res = await fetch(`${process.env.API_BASE_URL}/notifications`)
    
//     // Vérifie si la réponse est correcte
//     if (!res.ok) {
//       return new Response(JSON.stringify({ message: 'Failed to fetch notifications' }), {
//         status: res.status,
//         headers: { 'Content-Type': 'application/json' },
//       })
//     }

//     const notifications = await res.json()

//     return new Response(JSON.stringify(notifications), {
//       headers: { 'Content-Type': 'application/json' },
//     })
//   } catch (error) {
//     // En cas d'erreur, renvoie une réponse avec un statut 500
//     return new Response(JSON.stringify({ message: 'Internal Server Error' }), {
//       status: 500,
//       headers: { 'Content-Type': 'application/json' },
//     })
//   }
// }





// export async function GET() {
//     const res = await fetch(`${process.env.API_BASE_URL}/notifications`) //('http://localhost:5000/notifications') // Met l'URL correcte de ton backend Flask
//     const notifications = await res.json()
  
//     return new Response(JSON.stringify(notifications), {
//       headers: {
//         'Content-Type': 'application/json',
//       },
//     })
//   }
  