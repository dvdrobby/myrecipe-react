import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { apiUrl, header } from "../utils/Utils";
import { Recipe } from "../types/Types";
import RecipeCardResult from "../components/RecipeCardResult";

export default function SearchDetail() {
    const location = useLocation();
    const [keywordSearch, setKeywordSearch] = useState('');
    const [queryResults, setQueryResults] = useState<Recipe[]>([])
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null)

    const performSearch = async (query: string) => {

        if (!query) {
            setQueryResults([]);
            return
        }

        setLoading(true);
        setError(null);

        try {
            const response = await axios.get(`${apiUrl}/search?keyword=${query}`, {
                headers: {
                    "X-API-Key": `${header}`
                }
            });
            setQueryResults(response.data.data);
        } catch (err) {
            setError(`Error loading data: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const query = event.target.value;
        setKeywordSearch(query);
        performSearch(query);
    }

    const handleClick = () => {
        performSearch(keywordSearch);
    }

    useEffect(() => {
        const query = new URLSearchParams(location.search).get('keyword');
        if (query) {
            setKeywordSearch(query);
            performSearch(query);
        }

    }, [location.search]);

    return (
        <>
            <nav className="flex items-center justify-between px-5 mt-[30px]">
                <a href="/" className="flex shrink-0">
                    <img src="assets/images/logos/logo.svg" alt="logo" />
                </a>
                <a href="#">
                    <div className="flex items-center justify-center w-10 h-10 rounded-full bg-white shadow-[0_10px_20px_0_#D6D6D6AB] transition-all duration-300 hover:shadow-[0_10px_20px_0_#2d952480]">
                        <img
                            src="assets/images/icons/notification.svg"
                            className="w-5 h-5 object-contain"
                            alt="icon"
                        />
                    </div>
                </a>
            </nav>
            <div className="px-5 mt-[30px]">
                <div
                    className="flex items-center rounded-full p-[5px_14px] pr-[5px] gap-[10px] bg-white shadow-[0_12px_30px_0_#D6D6D652] transition-all duration-300 focus-within:ring-1 focus-within:ring-[#2d9524]"
                >
                    <img
                        src="assets/images/icons/note-favorite.svg"
                        className="w-6 h-6"
                        alt="icon"
                    />
                    <input
                        type="text"
                        name="search"
                        id="search"
                        value={keywordSearch}
                        onChange={handleInputChange}
                        className="appearance-none outline-none w-full font-semibold placeholder:font-normal placeholder:text-black"
                        placeholder="Find our best food recipes"
                    />
                    <button onClick={handleClick} className=" flex shrink-0 w-[42px] h-[42px]">
                        <img src="assets/images/icons/search.svg" alt="icon" />
                    </button>
                </div>
            </div>
            <section id="SearchResult" className="px-5 mt-[30px]">
                <div className="flex items-center justify-between">
                    <h2 className="font-bold">Search Results</h2>
                </div>
                <div className="flex flex-col gap-[18px] mt-[18px]">
                    {loading && <p>Loading...</p>}
                    {error && <p>Error loading data.</p>}
                    {
                        queryResults.length > 0 ? (
                            queryResults.map(recipe => (
                                <RecipeCardResult key={recipe.id} recipe={recipe} />
                            ))
                        ) : <p>No record.</p>
                    }

                </div>
            </section>
        </>
    );
}