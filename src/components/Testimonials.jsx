import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const Testimonials = () => {
    const [currentTestimonial, setCurrentTestimonial] = useState(0);

    const testimonials = [
        {
            name: "Sarah Ahmed",
            role: "Community Leader",
            location: "Dhaka",
            image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
            content: "PIIR System has revolutionized how we address community issues. The response time has improved dramatically, and we can track progress in real-time.",
            rating: 5,
            issue: "Road Infrastructure"
        },
        {
            name: "Mohammad Rahman",
            role: "Local Business Owner",
            location: "Chittagong",
            image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
            content: "Thanks to this platform, the drainage issue in our area was resolved within 48 hours. The transparency and efficiency are remarkable.",
            rating: 5,
            issue: "Water Management"
        },
        {
            name: "Fatima Khan",
            role: "Teacher",
            location: "Sylhet",
            image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
            content: "As an educator, I appreciate how this system empowers citizens to take action. It's user-friendly and incredibly effective.",
            rating: 5,
            issue: "Public Safety"
        },
        {
            name: "Dr. Karim Hassan",
            role: "Healthcare Professional",
            location: "Rajshahi",
            image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            content: "The health and sanitation reports through PIIR have helped us identify and address public health concerns proactively.",
            rating: 5,
            issue: "Public Health"
        }
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTestimonial((prev) => (prev + 1) % testimonials.length);
        }, 5000);

        return () => clearInterval(interval);
    }, [testimonials.length]);

    const renderStars = (rating) => {
        return Array.from({ length: 5 }, (_, i) => (
            <motion.span
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.2, delay: i * 0.1 }}
                className={`text-xl ${i < rating ? 'text-yellow-400' : 'text-gray-300'}`}
            >
                ⭐
            </motion.span>
        ));
    };

    return (
        <section className="py-20 bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-4000"></div>
            </div>

            <div className="max-w-7xl mx-auto px-6 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <motion.div
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="inline-block mb-4"
                    >
                        <span className="px-4 py-2 bg-gradient-to-r from-yellow-100 to-orange-100 text-orange-700 rounded-full text-sm font-semibold">
                            💬 Testimonials
                        </span>
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 text-transparent bg-clip-text mb-4">
                        What Citizens Say
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Real stories from real people who have experienced positive change
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    {/* Main Testimonial */}
                    <motion.div
                        key={currentTestimonial}
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50 }}
                        transition={{ duration: 0.6 }}
                        className="bg-white rounded-3xl p-8 shadow-2xl border border-gray-100"
                    >
                        <div className="flex items-center gap-4 mb-6">
                            <motion.img
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ duration: 0.5 }}
                                src={testimonials[currentTestimonial].image}
                                alt={testimonials[currentTestimonial].name}
                                className="w-16 h-16 rounded-full object-cover border-4 border-blue-100"
                            />
                            <div>
                                <motion.h3
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.2 }}
                                    className="text-xl font-bold text-gray-800"
                                >
                                    {testimonials[currentTestimonial].name}
                                </motion.h3>
                                <motion.p
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    className="text-gray-600"
                                >
                                    {testimonials[currentTestimonial].role} • {testimonials[currentTestimonial].location}
                                </motion.p>
                            </div>
                        </div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="flex gap-1 mb-4"
                        >
                            {renderStars(testimonials[currentTestimonial].rating)}
                        </motion.div>

                        <motion.blockquote
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="text-lg text-gray-700 leading-relaxed mb-4 italic"
                        >
                            "{testimonials[currentTestimonial].content}"
                        </motion.blockquote>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className="inline-block px-3 py-1 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold"
                        >
                            Issue: {testimonials[currentTestimonial].issue}
                        </motion.div>
                    </motion.div>

                    {/* Testimonial Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        {testimonials.map((testimonial, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 }}
                                viewport={{ once: true }}
                                whileHover={{ y: -5, scale: 1.02 }}
                                onClick={() => setCurrentTestimonial(index)}
                                className={`bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border-2 ${
                                    currentTestimonial === index 
                                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-purple-50' 
                                        : 'border-gray-100 hover:border-blue-200'
                                }`}
                            >
                                <div className="flex items-center gap-3 mb-3">
                                    <img
                                        src={testimonial.image}
                                        alt={testimonial.name}
                                        className="w-10 h-10 rounded-full object-cover"
                                    />
                                    <div>
                                        <h4 className="font-semibold text-gray-800 text-sm">
                                            {testimonial.name}
                                        </h4>
                                        <p className="text-xs text-gray-600">
                                            {testimonial.location}
                                        </p>
                                    </div>
                                </div>
                                
                                <div className="flex gap-1 mb-2">
                                    {Array.from({ length: 5 }, (_, i) => (
                                        <span
                                            key={i}
                                            className={`text-sm ${i < testimonial.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                                        >
                                            ⭐
                                        </span>
                                    ))}
                                </div>
                                
                                <p className="text-sm text-gray-600 line-clamp-3">
                                    {testimonial.content}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>

                {/* Navigation Dots */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="flex justify-center gap-3 mt-12"
                >
                    {testimonials.map((_, index) => (
                        <motion.button
                            key={index}
                            onClick={() => setCurrentTestimonial(index)}
                            whileHover={{ scale: 1.2 }}
                            whileTap={{ scale: 0.9 }}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${
                                currentTestimonial === index 
                                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 w-8' 
                                    : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                        />
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default Testimonials;