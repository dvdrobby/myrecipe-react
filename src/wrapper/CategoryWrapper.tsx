import { Swiper, SwiperSlide } from "swiper/react";
import { useEffect, useState } from "react";
import { Category } from "../types/Types";
import axios from "axios";
import { apiUrl, header } from "../utils/Utils";
import CategoryCard from "../components/CategoryCard";

export default function CategoryWrapper() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        axios.get(`${apiUrl}/categories`, {
            headers: {
                "X-API-Key": `${header}`
            }
        })
            .then(response => {
                setCategories(response.data.data);
                setLoading(false);
            })
            .catch(error => {
                setError(error);
                setLoading(false);
            })

    }, []);

    if (loading) {
        return <p>Loading...</p>
    }

    if (error) {
        return <p>Error loading data: {error}</p>
    }

    return (
        <section id="Categories" className="mt-[30px]">
            <div className="flex items-center justify-between px-5">
                <h2 className="font-bold">By Categories</h2>
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
                        categories.map(category => (
                            <SwiperSlide key={category.id} className="!w-fit pb-[30px]">
                                <CategoryCard category={category} />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>
        </section>

    );
}