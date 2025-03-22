import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";

import { apiUrl, header } from "../utils/Utils";
import { useParams } from "react-router-dom";
import axios from "axios";
import RecipeCard from "../components/RecipeCard";
import { Category } from "../types/Types";

export default function CategoryFeaturedRecipesWrapper() {
    const { slug } = useParams<{ slug: string }>();
    const [category, setCategory] = useState<Category | null>();
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)
    const url = `category/${slug}`;

    useEffect(() => {
        axios.get(`${apiUrl}/${url}`, {
            headers: {
                "X-API-Key": `${header}`
            }
        })
            .then(response => {
                setCategory(response.data.data);
                setLoading(false);
            })
            .catch(err => {
                setError(`Error loading data: ${err}`);
                setLoading(false);
            })
    }, [url]);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error Loading data.</p>
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
                        category != null && category.recipes.length > 0 ?
                            (category.recipes.map(recipe => (
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
