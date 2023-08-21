import { useState, useEffect } from "react";

const App = () => {
	/* TODO: 4 tane state'i baska nasil kullanbilirdik ? */
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
					setLoading(false);
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
		<div className='container relative flex ring-2 ring-offset-gray-100 ring-opacity-25 ring-offset-[20px] ring-gray-400 z-10 items-center justify-center flex-col gap-4 p-4 xl:p-0 bg-white rounded-xl text-sm xl:max-h-[700px] h-full xl:after:absolute xl:after:bottom-4 shadow-md xl:after:left-1/2 xl:after:w-40 xl:after:h-2.5 xl:after:bg-gray-300 after:rounded-full xl:after:transform xl:after:-translate-x-1/2'>
			{error && (
				<div className='font-medium'>
					<button onClick={() => setQuery("")} className='hover:underline'>
						{error}
					</button>
				</div>
			)}
			<div className='flex items-center !fixed top-0 transition gap-4 py-5 xl:py-2.5 xl:fixed xl:top-10 bg-white px-4 rounded-full xl:ring-2 xl:ring-offset-gray-100 xl:ring-opacity-25 xl:ring-offset-4 xl:ring-gray-400'>
				{/* TODO: Component şeklinde ayır ve props kullan ! */}
				<input
					value={query}
					onChange={(event) => {
						setQuery(event.target.value);
					}}
					placeholder='Arama yapınız.'
					className='outline-none border rounded-lg border-gray-300 px-2.5 focus:ring-2 ring-gray-200/80 h-8'
				/>

				{/* TODO: Component şeklinde ayır ve props kullan! */}
				<button
					onClick={() => setQuery("")}
					className='px-3 py-1 hover:bg-lime-100 text-lime-600 font-medium rounded-lg hover:ring-1 focus-within:ring-2 ring-lime-300 ring-offset-2 transition'>
					Sıfırla
				</button>
			</div>
			{loading ? (
				<div className='animate-spin'>
					<img width='48' height='48' src='https://img.icons8.com/emoji/48/000000/cyclone.png' alt='cyclone' />
				</div>
			) : (
				characters.length > 0 && (
					<div className='grid grid-cols-2 md:grid-cols-5 gap-4 pt-16 md:pt-'>
						{characters.map(({ id, name, image }) => (
							<div
								key={id}
								className='border border-dashed text-center border-gray-200 p-2 justify-center gap-2 flex-col items-center flex'>
								<img className='w-20 h-20' src={image} alt={name} />
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
