import { Swiper, SwiperSlide } from "swiper/react";
import RecipeCard from "../components/RecipeCard";
import { useEffect, useState } from "react";
import { Recipe } from "../types/Types";
import axios from "axios";
import { apiUrl, header } from "../utils/Utils";

export default function FeaturedRecipesWrapper() {
    const [recipes, setRecipes] = useState<Recipe[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`${apiUrl}/recipes`, {
            headers: {
                "X-API-Key": `${header}`
            }
        })
            .then(response => {
                setRecipes(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error loading data: {error}</p>
    }

    return (
        <section id="MadeByPeople">
            <div className="flex items-center justify-between px-5">
                <h2 className="font-bold">Made by People</h2>
                <a
                    href="#"
                    className="font-semibold text-sm leading-[21px] text-[#2d9524]"
                >
                    Explore All
                </a>
            </div>
            <div className="swiper w-full mt-3">
                <Swiper
                    className="w-full mt-3"
                    direction="horizontal"
                    spaceBetween={16}
                    slidesPerView="auto"
                    slidesOffsetBefore={20}
                    slidesOffsetAfter={20}
                >
                    {
                        recipes.length > 0 ?
                            (recipes.map(recipe => (
                                <SwiperSlide key={recipe.id} className="!w-fit">
                                    <RecipeCard recipe={recipe} />
                                </SwiperSlide>
                            ))) : (null)
                    }

                </Swiper>
            </div>
        </section>
    );
}
