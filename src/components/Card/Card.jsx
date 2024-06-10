import "./Card.css";

const Card = () => {
    return (
        <div>
            <div className="card-title">
                <h1>Discover the Full Potential of CoinApp</h1>
                <p>
                    14-day money-back guarantee. Cancel anytime for any reason. <br />{" "}
                    Explore CoinStats without limitations and you’ll never want to go
                    back.
                </p>
            </div>
            <div className="Card-p">
                <div className="card">
                    <div className="card2">
                        <h6>CURRENT PLAN</h6>
                        <h2>Basic</h2>
                        <h4>Free</h4>
                        <button>Select</button>
                        <p>
                            ✓  10 Portfolios <br />
                            ✓ 20,000 Transactions <br />✓ 40 Daily sync count per Portfolio
                            <br />✓  Basic Support (Under 72 hours)
                        </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card2">
                        <h6>PREMIUM PLAN</h6>
                        <h2>Premium</h2>
                        <h4>$13.99
                            /month</h4>
                        <button>Start Free Trial</button>
                        <p>
                            ✓  100 Portfolios <br />
                            ✓ 1,00,000 Transactions <br />✓ 200 Daily sync count per Portfolio
                            <br />✓ Priority Support (Under 24 hours)
                        </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card2">
                        <h6>DEGEN PLAN</h6>
                        <h2>Degen</h2>
                        <h4>$49.99/month</h4>
                        <button>Select Plan</button>
                        <p>
                            ✓  500 Portfolios <br />
                            ✓ 10,00,000 Transactions <br />✓ Daily sync count per Portfolio
                            <br />✓  VIP Support
                            (Under 1 hour)
                        </p>
                    </div>
                </div>
                <div className="card">
                    <div className="card2">
                        <h6>TEAM PLAN</h6>
                        <h2>Team</h2>
                        <h4>Get CoinStats tailored to your needs.</h4>
                        <button>Contact Us</button>
                        <p>
                            ✓
                            VIP Support <br />
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
