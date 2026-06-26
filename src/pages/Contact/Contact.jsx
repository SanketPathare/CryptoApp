import { motion } from "framer-motion";
import { HiMail, HiUser, HiTag, HiChat } from "react-icons/hi";
import { toast } from "react-toastify";

const inputFields = [
  { icon: HiUser, placeholder: "Name", type: "text" },
  { icon: HiMail, placeholder: "Email", type: "email" },
  { icon: HiTag, placeholder: "Subject", type: "text" },
];

const Contact = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    const messages = JSON.parse(localStorage.getItem("crypto-messages") || "[]");
    messages.push({ ...data, date: new Date().toISOString() });
    localStorage.setItem("crypto-messages", JSON.stringify(messages));
    toast.success("Message sent! We'll get back to you soon.");
    e.target.reset();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="min-h-[80vh] flex items-center justify-center px-5 pt-28 pb-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="glass-hover rounded-3xl p-8 md:p-10 w-full max-w-lg border-gold/10"
      >
        <div className="text-center mb-8">
          <h1 className="font-display text-3xl md:text-4xl font-bold text-gradient-brand mb-2">
            Contact Us
          </h1>
          <p className="text-text-secondary text-sm">
            Have a question? We&apos;d love to hear from you.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {inputFields.map(({ icon: Icon, placeholder, type }) => (
            <div
              key={placeholder}
              className="glass rounded-xl p-3 flex items-center gap-3 focus-within:border-gold/50 transition-colors duration-300"
            >
              <Icon className="w-5 h-5 text-text-secondary flex-shrink-0" />
              <input
                required
                type={type}
                name={placeholder.toLowerCase()}
                placeholder={placeholder}
                className="flex-1 bg-transparent text-sm text-text-primary outline-none border-none placeholder-text-secondary"
              />
            </div>
          ))}

          <div className="glass rounded-xl p-3 flex items-start gap-3 focus-within:border-gold/50 transition-colors duration-300">
            <HiChat className="w-5 h-5 text-text-secondary flex-shrink-0 mt-1" />
            <textarea
              required
              name="message"
              placeholder="Message"
              rows={4}
              className="flex-1 bg-transparent text-sm text-text-primary outline-none border-none placeholder-text-secondary resize-none"
            />
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="w-full py-3.5 rounded-xl bg-gold text-black font-semibold text-sm hover:bg-gold-dark transition-colors cursor-pointer"
          >
            Send Message
          </motion.button>
        </form>
      </motion.div>
    </motion.div>
  );
};

export default Contact;
