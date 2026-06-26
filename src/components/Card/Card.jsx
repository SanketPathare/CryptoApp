import { motion } from "framer-motion";

const plans = [
  {
    name: "Basic",
    price: "Free",
    badge: null,
    features: [
      "10 Portfolios",
      "20,000 Transactions",
      "40 Daily sync count",
      "Basic Support (72h)",
    ],
  },
  {
    name: "Premium",
    price: "$13.99/mo",
    badge: "Popular",
    featured: true,
    features: [
      "100 Portfolios",
      "1,000,000 Transactions",
      "200 Daily sync count",
      "Priority Support (24h)",
    ],
  },
  {
    name: "Degen",
    price: "$49.99/mo",
    badge: null,
    features: [
      "500 Portfolios",
      "10,000,000 Transactions",
      "Unlimited sync",
      "VIP Support (1h)",
    ],
  },
  {
    name: "Team",
    price: "Custom",
    badge: null,
    features: [
      "VIP Support",
      "Seats For Communities",
      "Personalized Features",
      "Priority Support (24h)",
    ],
  },
];

const Card = () => {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center max-w-2xl mx-auto mb-12 px-5"
      >
        <h2 className="font-display text-3xl md:text-4xl font-bold text-gradient-gold mb-4">
          Discover the Full Potential
        </h2>
        <p className="text-text-secondary text-sm md:text-base leading-relaxed">
          14-day money-back guarantee. Cancel anytime for any reason. Explore
          without limitations and you&apos;ll never want to go back.
        </p>
      </motion.div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto px-5 pb-20">
        {plans.map((plan, index) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`relative rounded-2xl p-6 flex flex-col ${
              plan.featured
                ? "glass-hover border-gold/40 shadow-[0_0_30px_rgba(255,121,63,0.08)]"
                : "glass-card"
            }`}
          >
            {plan.badge && (
              <span className="absolute -top-3 right-4 px-3 py-1 rounded-full bg-gold text-black text-xs font-semibold uppercase tracking-wider">
                {plan.badge}
              </span>
            )}

            <h6 className="text-xs font-medium uppercase tracking-widest text-text-secondary mb-2">
              {plan.name} Plan
            </h6>
            <h3 className="font-display text-2xl font-bold text-text-primary mb-6">
              {plan.price}
            </h3>

            <button
              className={`w-full py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 mb-6 cursor-pointer ${
                plan.featured
                  ? "bg-gold text-black hover:bg-gold-dark shadow-lg shadow-gold/20"
                  : "glass hover:border-gold/30 hover:text-gold text-text-primary"
              }`}
            >
              {plan.name === "Premium"
                ? "Start Free Trial"
                : plan.name === "Team"
                ? "Contact Us"
                : "Select Plan"}
            </button>

            <ul className="space-y-3 mt-auto">
              {plan.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-text-secondary"
                >
                  <span className="text-signal-green mt-0.5 flex-shrink-0">✓</span>
                  {feature}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Card;
