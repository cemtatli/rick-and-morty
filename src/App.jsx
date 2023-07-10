import { useState, useEffect } from "react";

const App = () => {
  const [characters, setCharacters] = useState([]);
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await fetch(`https://rickandmortyapi.com/api/character?name=${query}`);
        const data = await response.json();
        if (data.error) {
          setError("Karakter bulunamadı");
          setCharacters([]);
        } else {
          setError("");
          setCharacters(data.results);
        }
      } catch (error) {
        console.table(error);
      }

      setLoading(false);
    };

    fetchData();
  }, [query]);

  return (
    <div className="container relative flex ring-2 ring-offset-gray-100 ring-opacity-25 ring-offset-4 ring-gray-400 z-10 items-center justify-center flex-col gap-4 p-4 md:p-0 bg-white rounded-xl text-sm md:max-h-[700px] h-full">
      <div className="flex items-center gap-4 py-5 md:py-2.5 md:fixed md:top-10 bg-white px-5 rounded-full md:ring-2 md:ring-offset-gray-100 md:ring-opacity-25 md:ring-offset-4 md:ring-gray-400">
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          placeholder="Arama yapın."
          className="outline-none border rounded-md border-gray-300 px-2 py-1"
        />
        <button
          onClick={() => setQuery("")}
          className="hover:underline px-3 py-1 hover:bg-blue-100 text-blue-600 font-medium rounded-lg">
          Sıfırla
        </button>
      </div>
      {loading ? (
        <div className="animate-spin">
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/emoji/48/000000/cyclone.png"
            alt="cyclone"
          />
        </div>
      ) : (
        characters.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            {characters.map(({ id, name, image }) => (
              <div
                key={id}
                className="border border-dashed border-gray-200 p-2 justify-center gap-2 flex-col items-center flex">
                <img className="w-20 h-20" src={image} alt={name} />
                {name}
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default App;
