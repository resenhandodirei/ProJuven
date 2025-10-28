import { useState } from 'react';
import Navbar from '@/components/navbar';
import Footer from '@/components/footer';
import TailwindJS from '@/components/tailwindjs';

export default function SearchPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<string[]>([]); 

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const fakeResults = [
      'Usuário: João - Psicossocial',
      'Usuário: Ana - Defensor',
      'Usuário: Carla - Servidor',
    ].filter((item) => item.toLowerCase().includes(query.toLowerCase()));
    setResults(fakeResults);
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-4">
        <h1 className="text-2xl font-semibold text-center mb-6">Buscar Usuários</h1>

        <form onSubmit={handleSearch} className="flex flex-col items-center gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Digite o nome ou perfil..."
            className="w-full max-w-md px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
          >
            Buscar
          </button>
        </form>

        <div className="mt-6 max-w-md mx-auto">
          {results.length > 0 ? (
            <ul className="bg-white rounded shadow divide-y">
              {results.map((item, idx) => (
                <li key={idx} className="p-3 hover:bg-gray-50">
                  {item}
                </li>
              ))}
            </ul>
          ) : (
            query && <p className="text-center text-gray-500">Nenhum resultado encontrado.</p>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
