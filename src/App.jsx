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
        console.error(error);
      }

      setLoading(false);
    };

    fetchData();
  }, [query]);

  return (
    <div className="container pt-5 flex items-center justify-center flex-col gap-5 bg-white rounded-xl p-5 text-sm max-h-[550px] h-full">
      <div className="flex items-center gap-2">
        <input
          value={query}
          onChange={(event) => {
            setQuery(event.target.value);
          }}
          placeholder="Arama yapın."
          className="outline-none border border-gray-300 px-2 py-0.5"
        />
        <button
          onClick={() => (query.length > 2 ? setQuery("") : console.log("-clicked-"))}
          className="hover:underline">
          Sıfırla
        </button>
      </div>
      {error && <div>{error}</div>}
      {loading ? (
        <div>loading</div>
      ) : (
        characters.length > 0 && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-5">
            {characters.map(({ id, name, image }) => (
              <div key={id} className="text-sm truncate text-start">
                {name}
                <img className="w-20 h-20" src={image} alt={name} />
              </div>
            ))}
          </div>
        )
      )}
    </div>
  );
};

export default App;
