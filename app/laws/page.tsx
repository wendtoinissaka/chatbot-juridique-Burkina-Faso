'use client'

import { useState } from 'react'
import Link from 'next/link' // Importer Link
import { fetchLaw } from './actions'
import { IconSearch, IconDownload } from '@/components/ui/icons' // Importer les nouvelles icônes
import { FooterText } from '@/components/footer'

const LawsPage: React.FC = () => {
  const [codeType, setCodeType] = useState<string>('')
  const [articleNumber, setArticleNumber] = useState<string>('')
  const [lawContent, setLawContent] = useState<string | null>(null)
  const [lawMessage, setLawMessage] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async () => {
    if (!codeType || !articleNumber) {
      setError("Veuillez sélectionner un type de code et entrer un numéro d'article.")
      return
    }

    setError(null)

    try {
      const formData = new FormData()
      formData.append('codeType', codeType)
      formData.append('articleNumber', articleNumber)

      const result = await fetchLaw(formData)

      if (result?.type === 'success' && result.lawContent) {
        setLawContent(result.lawContent)

        switch (codeType) {
          case 'civil':
            setLawMessage(`Article ${articleNumber} du CODE CIVIL DE 1804 (VERSION 2024)`);
            break;
          case 'famille':
            setLawMessage(`Article ${articleNumber} du CODE DES PERSONNES ET DE LA FAMILLE`);
            break;
          case 'penale':
            setLawMessage(`Article ${articleNumber} de la LOI N°040-2019/AN portant CODE DE PROCEDURE PENALE`);
            break;
          case 'travail':
            setLawMessage(`Article ${articleNumber} de la Loi 28-2008/AN du 13 mai 2008 portant code du travail au Burkina Faso`);
            break;
          default:
            setLawMessage(null);
        }
      } else {
        setError(result?.errorMessage || "Erreur inconnue.")
      }
    } catch (err) {
      setLawContent(null)
      setError("Erreur lors de la recherche de la loi.")
    }
  }

  const resetResults = () => {
    setLawContent(null)
    setLawMessage(null)
    setError(null)
  }

  return (
    <>
      <div className="p-4">
        {/* Section de recherche d'articles */}
        <div className="max-w-md mx-auto mb-8 bg-gray-800 p-4 rounded shadow"> {/* Fond et ombre pour la section recherche */}
          <h1 className="text-2xl font-bold mb-4 text-center">Recherche d'Articles de Loi</h1>
  
          {/* Formulaire de recherche */}
          <div className="mb-4">
            <select
              className="border rounded p-2 w-full"
              onChange={(e) => {
                setCodeType(e.target.value);
                resetResults();
              }}
              value={codeType}
            >
              <option value="">Sélectionner le type de code</option>
              <option value="civil">Code Civil</option>
              <option value="famille">Code Famille</option>
              <option value="penale">Code Pénal</option>
              <option value="travail">Code du Travail</option>
            </select>
          </div>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Numéro de l'article"
              className="border rounded p-2 w-full"
              value={articleNumber}
              onChange={(e) => {
                setArticleNumber(e.target.value);
                resetResults();
              }}
            />
          </div>
          <button
            onClick={handleSearch}
            className="bg-blue-500 text-white rounded p-2 w-full hover:bg-blue-600 flex justify-center items-center gap-2"
          >
            <IconSearch />
            Rechercher
          </button>
  
          {/* Affichage des résultats de la recherche */}
          {error && <p className="text-red-500 mt-4">{error}</p>}
  
          {lawContent && (
            <div className="mt-4 p-4 border rounded">
              {lawMessage && (
                <p className="font-bold mb-2 text-white px-2 bg-blue-600">{lawMessage}</p>
              )}
              <p className="mt-2">{lawContent}</p>
            </div>
          )}
  
          {/* Lien pour revenir à la page d'accueil */}
          <Link href="/" className="mt-4 block bg-gray-500 text-white rounded p-2 text-center hover:bg-gray-600">
            Retour au Chatbot
          </Link>
        </div>
  
        {/* Section de téléchargement */}
        <div className="w-full mt-8 bg-gray-900 p-4 rounded shadow"> {/* Fond et ombre pour la section téléchargement */}
          <h1 className="text-2xl font-bold mb-4 text-center text-white">Télécharger des fichiers de lois</h1>
  
          {/* Liste des fichiers à télécharger avec Flexbox */}
          <div className="flex flex-wrap justify-around"> {/* Utiliser flex-wrap pour le wrap des éléments */}
            {[
              { name: "Code Civil - Version 2024 (PDF)", link: "download/code_civil.pdf" },
              { name: "Code de la Famille - Burkina Faso", link: "download/CODE DES PERSONNES ET DE LA FAMILLE-1.pdf" },
              { name: "Code de la Constitution - Burkina Faso", link: "download/CONSTITUTION_BF_CONSOLIDEE_2015.pdf" },
              { name: "Code Pénal - Burkina Faso", link: "download/LOI_040_2019_PROCEDURE_PENALE.pdf" },
              { name: "Code du Travail - Burkina Faso", link: "download/code_du_travail.pdf" }
            ].map((file) => (
              <div key={file.name} className="p-4 my-5 border rounded bg-gray-700 hover:bg-gray-600 transition mb-2 w-full md:w-48">
                <span className="text-white text-center">{file.name}</span> {/* Centrer le texte */}
                <a
                  href={file.link}
                  download
                  className="text-blue-400 hover:underline flex flex-col items-center mt-2" 
                >
                  <IconDownload /> {/* Icône de téléchargement */}
                  Télécharger
                </a>
              </div>
            ))}
          </div>
        </div>
      </div>
      <FooterText className="py-8" />
    </>
  );
  
  
}

export default LawsPage;
