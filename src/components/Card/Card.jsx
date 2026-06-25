const Card = () => {
    return (
        <div>
            <div className="flex flex-col justify-center items-center mt-10">
                <h1 className="text-[30px] md:text-[40px] font-semibold text-center mb-5 text-gold md:border-b-[3px] md:border-gold rounded-lg p-[5px] mx-1">Discover the Full Potential of CoinApp</h1>
                <p className="text-center text-[15px] md:text-[16px] text-gray-300 px-5">
                    14-day money-back guarantee. Cancel anytime for any reason. <br />{" "}
                    Explore CoinStats without limitations and you’ll never want to go
                    back.
                </p>
            </div>
            <div className="m-5 md:m-[100px] flex flex-col lg:flex-row justify-center items-center gap-6">
                <div className="w-[300px] h-[400px] rounded-[20px] transition-all duration-300 hover:shadow-[0_0_30px_1px_rgba(235,220,13,0.3)] mb-5 lg:mb-0 cursor-pointer" style={{ backgroundImage: "linear-gradient(163deg, #e5ec17 0%, #dbdadf 100%)" }}>
                    <div className="flex flex-col justify-center items-center w-[300px] h-[400px] bg-[#1a1a1a] rounded-[20px] transition-all duration-200 hover:scale-[0.98] leading-[42px]">
                        <h6 className="text-[10px] tracking-widest text-gray-400 font-bold uppercase mt-4">CURRENT PLAN</h6>
                        <h2 className="text-2xl font-bold text-gold">Basic</h2>
                        <h4 className="text-xl font-bold text-white">Free</h4>
                        <button className="text-[14px] mr-[2px] border-none bg-gold text-black py-2.5 px-[30px] rounded-xl cursor-pointer my-5 hover:text-red-600 transition-colors duration-200 font-semibold">Select</button>
                        <p className="leading-[30px] text-start text-sm text-gray-300 pb-4">
                            ✓  10 Portfolios <br />
                            ✓ 20,000 Transactions <br />✓ 40 Daily sync count per Portfolio
                            <br />✓  Basic Support (Under 72 hours)
                        </p>
                    </div>
                </div>
                <div className="w-[300px] h-[400px] rounded-[20px] transition-all duration-300 hover:shadow-[0_0_30px_1px_rgba(235,220,13,0.3)] mb-5 lg:mb-0 cursor-pointer" style={{ backgroundImage: "linear-gradient(163deg, #e5ec17 0%, #dbdadf 100%)" }}>
                    <div className="flex flex-col justify-center items-center w-[300px] h-[400px] bg-[#1a1a1a] rounded-[20px] transition-all duration-200 hover:scale-[0.98] leading-[42px]">
                        <h6 className="text-[10px] tracking-widest text-gray-400 font-bold uppercase mt-4">PREMIUM PLAN</h6>
                        <h2 className="text-2xl font-bold text-gold">Premium</h2>
                        <h4 className="text-xl font-bold text-white">$13.99/month</h4>
                        <button className="text-[14px] mr-[2px] border-none bg-gold text-black py-2.5 px-[30px] rounded-xl cursor-pointer my-5 hover:text-red-600 transition-colors duration-200 font-semibold">Start Free Trial</button>
                        <p className="leading-[30px] text-start text-sm text-gray-300 pb-4">
                            ✓  100 Portfolios <br />
                            ✓ 1,00,000 Transactions <br />✓ 200 Daily sync count per Portfolio
                            <br />✓ Priority Support (Under 24 hours)
                        </p>
                    </div>
                </div>
                <div className="w-[300px] h-[400px] rounded-[20px] transition-all duration-300 hover:shadow-[0_0_30px_1px_rgba(235,220,13,0.3)] mb-5 lg:mb-0 cursor-pointer" style={{ backgroundImage: "linear-gradient(163deg, #e5ec17 0%, #dbdadf 100%)" }}>
                    <div className="flex flex-col justify-center items-center w-[300px] h-[400px] bg-[#1a1a1a] rounded-[20px] transition-all duration-200 hover:scale-[0.98] leading-[42px]">
                        <h6 className="text-[10px] tracking-widest text-gray-400 font-bold uppercase mt-4">DEGEN PLAN</h6>
                        <h2 className="text-2xl font-bold text-gold">Degen</h2>
                        <h4 className="text-xl font-bold text-white">$49.99/month</h4>
                        <button className="text-[14px] mr-[2px] border-none bg-gold text-black py-2.5 px-[30px] rounded-xl cursor-pointer my-5 hover:text-red-600 transition-colors duration-200 font-semibold">Select Plan</button>
                        <p className="leading-[30px] text-start text-sm text-gray-300 pb-4">
                            ✓  500 Portfolios <br />
                            ✓ 10,00,000 Transactions <br />✓ Daily sync count per Portfolio
                            <br />✓  VIP Support (Under 1 hour)
                        </p>
                    </div>
                </div>
                <div className="w-[300px] h-[400px] rounded-[20px] transition-all duration-300 hover:shadow-[0_0_30px_1px_rgba(235,220,13,0.3)] mb-5 lg:mb-0 cursor-pointer" style={{ backgroundImage: "linear-gradient(163deg, #e5ec17 0%, #dbdadf 100%)" }}>
                    <div className="flex flex-col justify-center items-center w-[300px] h-[400px] bg-[#1a1a1a] rounded-[20px] transition-all duration-200 hover:scale-[0.98] leading-[42px]">
                        <h6 className="text-[10px] tracking-widest text-gray-400 font-bold uppercase mt-4">TEAM PLAN</h6>
                        <h2 className="text-2xl font-bold text-gold">Team</h2>
                        <h4 className="text-sm font-bold text-white text-center px-4 leading-normal">Get CoinStats tailored to your needs.</h4>
                        <button className="text-[14px] mr-[2px] border-none bg-gold text-black py-2.5 px-[30px] rounded-xl cursor-pointer my-5 hover:text-red-600 transition-colors duration-200 font-semibold">Contact Us</button>
                        <p className="leading-[30px] text-start text-sm text-gray-300 pb-4">
                            ✓ VIP Support <br />
                            ✓ Seats For Communities <br />✓Personalized Features
                            <br />✓ Priority Support (Under 24 hours)
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;
