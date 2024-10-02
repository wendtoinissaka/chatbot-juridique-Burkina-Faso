// import { useState } from 'react';
// import axios from 'axios';

// const LawsPage: React.FC = () => {
//   const [codeType, setCodeType] = useState<string>('');
//   const [articleNumber, setArticleNumber] = useState<string>('');
//   const [lawContent, setLawContent] = useState<string | null>(null);

//   const handleSearch = async () => {
//     if (!codeType || !articleNumber) return;
  
//     try {
//       const apiUrl = `${process.env.API_BASE_URL}/laws`;
//       console.log('API URL:', apiUrl); // Pour vérifier l'URL construite

//       const response = await axios.get<string>(`${process.env.API_BASE_URL}/laws`, {
//         params: { code: codeType, number: articleNumber },
//       });
//       console.log('Response:', response.data); // Ajoutez ceci
//       setLawContent(response.data);
//     } catch (error) {
//       console.error('Erreur lors de la recherche de la loi :', error);
//       setLawContent(null);
//     }
//   };
  

//   return (
//     <div>
//       <h1>Recherche d'Articles de Loi</h1>
//       <select onChange={(e) => setCodeType(e.target.value)} value={codeType}>
//         <option value="">Sélectionner le type de code</option>
//         <option value="civil">Code Civil</option>
//         <option value="penal">Code Pénal</option>
//         <option value="travail">Code du Travail</option>
//       </select>
//       <input
//         type="text"
//         placeholder="Numéro de l'article"
//         value={articleNumber}
//         onChange={(e) => setArticleNumber(e.target.value)}
//       />
//       <button onClick={handleSearch}>Valider</button>

//       {lawContent && (
//         <div>
//           <h2>Contenu de l'article</h2>
//           <p>{lawContent}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default LawsPage;
