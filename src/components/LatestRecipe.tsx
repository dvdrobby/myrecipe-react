export default function LatestRecipes() {
    return (
        <a href="details.html" className="card">
            <div className="flex rounded-[20px] p-[14px] gap-[14px] bg-white shadow-[0_12px_30px_0_#D6D6D640] transition-all duration-300 hover:shadow-[0_10px_20px_0_#2d952480]">
                <div className="flex shrink-0 w-[100px] h-20 rounded-[20px] overflow-hidden bg-[#D9D9D9]">
                    <img
                        src="/assets/images/thumbnails/thumbnail-2.png"
                        className="w-full h-full object-cover"
                        alt="thumbnail"
                    />
                </div>
                <div className="flex flex-col w-full">
                    <div className="flex items-center justify-between">
                        <h3 className="font-bold text-lg leading-[24px]">
                            Burger Tebal Makin Hot
                        </h3>
                        <div className="flex shrink-0 items-center w-fit rounded-full py-1 px-2 bg-[#2d9524] shadow-[0_6px_10px_0_#2d952480]">
                            <img
                                src="/assets/images/icons/Star 1.svg"
                                className="w-4 h-4"
                                alt="star"
                            />
                            <span className="font-semibold text-xs leading-[18px] text-black">
                                4.8
                            </span>
                        </div>
                    </div>
                    <p className="text-sm leading-[21px] text-[#848486]">
                        by Shayna Alqowy
                    </p>
                </div>
            </div>
        </a>
    );
}