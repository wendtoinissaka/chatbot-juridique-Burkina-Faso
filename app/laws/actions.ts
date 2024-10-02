'use server'

import axios from 'axios'
import { z } from 'zod'

interface LawResult {
  type: string
  article_num?: string // Ajouter le numéro de l'article
  lawContent?: string
  errorMessage?: string
}
// Schéma pour valider les données du formulaire
const lawSchema = z.object({
  codeType: z.string().nonempty(),
  articleNumber: z.string().nonempty(),
})

// Fonction pour appeler l'API Flask et récupérer le contenu de l'article
export async function fetchLaw(formData: FormData): Promise<LawResult | undefined> {
  try {
    const codeType = formData.get('codeType')?.toString()
    const articleNumber = formData.get('articleNumber')?.toString()

    // Valider les données reçues
    const parsedData = lawSchema.safeParse({ codeType, articleNumber })

    if (!parsedData.success) {
      return {
        type: 'error',
        errorMessage: "Les informations saisies sont invalides.",
      }
    }

    // URL de l'API
    const apiUrl = `${process.env.API_BASE_URL}/laws`

    // Appel à l'API
    const response = await axios.get<{ article_num: string; texte: string }>(apiUrl, {
      params: { code: codeType, number: articleNumber },
    })

    return {
      type: 'success',
      article_num: response.data.article_num, // Ajout du numéro de l'article
      lawContent: response.data.texte,         // Ajustement pour récupérer le texte
    }
  } catch (error) {
    console.error('Erreur lors de la recherche de la loi :', error)
    return {
      type: 'error',
      errorMessage: "L'article n'a pas été trouvé.",
    }
  }
}