import { motion } from 'framer-motion';
import { useNavigate } from 'react-router';

const Categories = () => {
    const navigate = useNavigate();

    const categories = [
        {
            icon: "🏗️",
            title: "Infrastructure",
            description: "Roads, bridges, buildings, and public structures",
            count: "847 issues",
            color: "from-blue-500 to-blue-600",
            bgColor: "from-blue-50 to-blue-100"
        },
        {
            icon: "🌱",
            title: "Environment",
            description: "Pollution, waste management, and green spaces",
            count: "623 issues",
            color: "from-green-500 to-green-600",
            bgColor: "from-green-50 to-green-100"
        },
        {
            icon: "⚡",
            title: "Utilities",
            description: "Electricity, water, gas, and internet services",
            count: "492 issues",
            color: "from-yellow-500 to-orange-500",
            bgColor: "from-yellow-50 to-orange-100"
        },
        {
            icon: "🛡️",
            title: "Safety & Security",
            description: "Public safety, emergency services, and security",
            count: "356 issues",
            color: "from-red-500 to-red-600",
            bgColor: "from-red-50 to-red-100"
        },
        {
            icon: "🚗",
            title: "Transportation",
            description: "Traffic, public transport, and road safety",
            count: "289 issues",
            color: "from-purple-500 to-purple-600",
            bgColor: "from-purple-50 to-purple-100"
        },
        {
            icon: "🏥",
            title: "Public Health",
            description: "Healthcare, sanitation, and health services",
            count: "234 issues",
            color: "from-pink-500 to-pink-600",
            bgColor: "from-pink-50 to-pink-100"
        }
    ];

    const handleCategoryClick = (category) => {
        navigate(`/issues?category=${category.title}`);
    };

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0">
                <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
                <div className="absolute bottom-10 left-10 w-72 h-72 bg-gradient-to-r from-pink-100 to-red-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
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
                        <span className="px-4 py-2 bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 rounded-full text-sm font-semibold">
                            📂 Issue Categories
                        </span>
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 text-transparent bg-clip-text mb-4">
                        Report Any Issue
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Choose from our comprehensive categories to report and track community issues
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categories.map((category, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            onClick={() => handleCategoryClick(category)}
                            className={`bg-gradient-to-br ${category.bgColor} rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-white/50 cursor-pointer group`}
                        >
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                                viewport={{ once: true }}
                                className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300"
                            >
                                {category.icon}
                            </motion.div>
                            
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                viewport={{ once: true }}
                                className="text-2xl font-bold text-gray-800 mb-3"
                            >
                                {category.title}
                            </motion.h3>
                            
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                                viewport={{ once: true }}
                                className="text-gray-600 mb-4 leading-relaxed"
                            >
                                {category.description}
                            </motion.p>
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                                viewport={{ once: true }}
                                className="flex items-center justify-between"
                            >
                                <span className="text-sm font-semibold text-gray-700">
                                    {category.count}
                                </span>
                                <motion.div
                                    whileHover={{ x: 5 }}
                                    className={`w-10 h-10 rounded-full bg-gradient-to-r ${category.color} flex items-center justify-center text-white shadow-lg`}
                                >
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                    </svg>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                    viewport={{ once: true }}
                    className="text-center mt-16"
                >
                    <p className="text-lg text-gray-600 mb-8">
                        Can't find your issue category? We're here to help with any community concern.
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => navigate('/issues')}
                        className="px-8 py-4 bg-gradient-to-r from-gray-800 to-gray-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        View All Issues
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Categories;