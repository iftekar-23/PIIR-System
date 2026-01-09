import { motion } from 'framer-motion';

const Services = () => {
    const services = [
        {
            icon: "🏗️",
            title: "Infrastructure Reporting",
            description: "Report road damages, bridge issues, and public infrastructure problems with detailed documentation and photo evidence.",
            features: ["Photo Upload", "GPS Location", "Priority Levels", "Real-time Updates"]
        },
        {
            icon: "🌱",
            title: "Environmental Issues",
            description: "Address environmental concerns including pollution, waste management, and green space maintenance.",
            features: ["Pollution Tracking", "Waste Reports", "Air Quality", "Green Initiatives"]
        },
        {
            icon: "⚡",
            title: "Utility Services",
            description: "Report electricity, water, gas, and internet connectivity issues in your area for quick resolution.",
            features: ["Power Outages", "Water Supply", "Gas Leaks", "Internet Issues"]
        },
        {
            icon: "🛡️",
            title: "Safety & Security",
            description: "Report safety hazards, security concerns, and emergency situations to ensure community well-being.",
            features: ["Emergency Reports", "Safety Hazards", "Security Issues", "24/7 Monitoring"]
        },
        {
            icon: "🚗",
            title: "Transportation",
            description: "Address traffic issues, public transport problems, and road safety concerns in your community.",
            features: ["Traffic Management", "Public Transport", "Road Safety", "Parking Issues"]
        },
        {
            icon: "🏥",
            title: "Public Health",
            description: "Report health-related issues, sanitation problems, and public health concerns for community wellness.",
            features: ["Health Hazards", "Sanitation", "Medical Access", "Health Campaigns"]
        }
    ];

    return (
        <section className="py-20 bg-white relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-r from-blue-100 to-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob"></div>
                <div className="absolute bottom-20 right-10 w-72 h-72 bg-gradient-to-r from-green-100 to-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-blob animation-delay-2000"></div>
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
                        <span className="px-4 py-2 bg-gradient-to-r from-green-100 to-blue-100 text-green-700 rounded-full text-sm font-semibold">
                            🛠️ Our Services
                        </span>
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 text-transparent bg-clip-text mb-4">
                        Comprehensive Issue Management
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        From infrastructure to environment, we cover all aspects of community well-being
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {services.map((service, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10, scale: 1.02 }}
                            className="bg-gradient-to-br from-white to-gray-50 rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100 group"
                        >
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                whileInView={{ scale: 1, rotate: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                                viewport={{ once: true }}
                                className="text-5xl mb-6 group-hover:scale-110 transition-transform duration-300"
                            >
                                {service.icon}
                            </motion.div>
                            
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                viewport={{ once: true }}
                                className="text-2xl font-bold text-gray-800 mb-4"
                            >
                                {service.title}
                            </motion.h3>
                            
                            <motion.p
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                                viewport={{ once: true }}
                                className="text-gray-600 mb-6 leading-relaxed"
                            >
                                {service.description}
                            </motion.p>
                            
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                                viewport={{ once: true }}
                                className="space-y-2"
                            >
                                {service.features.map((feature, featureIndex) => (
                                    <motion.div
                                        key={featureIndex}
                                        initial={{ opacity: 0, x: -10 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.3, delay: index * 0.1 + 0.6 + featureIndex * 0.1 }}
                                        viewport={{ once: true }}
                                        className="flex items-center gap-2 text-sm text-gray-600"
                                    >
                                        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                                        {feature}
                                    </motion.div>
                                ))}
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
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Explore All Services
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Services;