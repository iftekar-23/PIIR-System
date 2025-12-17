import { motion } from "framer-motion";

const Footer = () => {
  return (
    <motion.footer 
      className="py-10 text-center text-gray-600 border-t mt-10"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      data-aos="fade-up"
    >
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.3 }}
      >
        © {new Date().getFullYear()} CityFix — All Rights Reserved.
      </motion.p>
    </motion.footer>
  );
};

export default Footer;
