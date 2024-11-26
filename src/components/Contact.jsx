import { useLanguage } from "../contexts/LanguageContext";

const Contact = () => {
  const { text } = useLanguage();

  return (
    <section id="contact" className="py-16 bg-gray-100">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-8">{text.contact.title}</h2>
        <p className="text-center mb-4">{text.contact.description}</p>
        <form className="max-w-lg mx-auto">
          <input
            type="text"
            placeholder="Your Name"
            className="w-full p-2 mb-4 border rounded"
          />
          <input
            type="email"
            placeholder="Your Email"
            className="w-full p-2 mb-4 border rounded"
          />
          <textarea
            placeholder="Your Message"
            className="w-full p-2 mb-4 border rounded"
            rows="4"
          ></textarea>
          <button className="w-full p-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Send
          </button>
        </form>
      </div>
    </section>
  );
};

export default Contact;