import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const Statistics = () => {
    const [stats, setStats] = useState({
        totalIssues: 0,
        resolvedIssues: 0,
        activeUsers: 0,
        responseTime: 0
    });

    useEffect(() => {
        // Animate numbers counting up
        const animateNumbers = () => {
            const finalStats = {
                totalIssues: 2547,
                resolvedIssues: 1823,
                activeUsers: 15420,
                responseTime: 24
            };

            const duration = 2000;
            const steps = 60;
            const stepDuration = duration / steps;

            let currentStep = 0;
            const interval = setInterval(() => {
                currentStep++;
                const progress = currentStep / steps;
                
                setStats({
                    totalIssues: Math.floor(finalStats.totalIssues * progress),
                    resolvedIssues: Math.floor(finalStats.resolvedIssues * progress),
                    activeUsers: Math.floor(finalStats.activeUsers * progress),
                    responseTime: Math.floor(finalStats.responseTime * progress)
                });

                if (currentStep >= steps) {
                    clearInterval(interval);
                    setStats(finalStats);
                }
            }, stepDuration);
        };

        const timer = setTimeout(animateNumbers, 500);
        return () => clearTimeout(timer);
    }, []);

    const statItems = [
        {
            number: stats.totalIssues,
            label: "Total Issues Reported",
            icon: "📊",
            color: "from-blue-500 to-blue-600"
        },
        {
            number: stats.resolvedIssues,
            label: "Issues Resolved",
            icon: "✅",
            color: "from-green-500 to-green-600"
        },
        {
            number: stats.activeUsers,
            label: "Active Citizens",
            icon: "👥",
            color: "from-purple-500 to-purple-600"
        },
        {
            number: stats.responseTime,
            label: "Avg Response Time (hrs)",
            icon: "⚡",
            color: "from-orange-500 to-orange-600"
        }
    ];

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0">
                <div className="absolute top-0 left-0 w-96 h-96 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob"></div>
                <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-blob animation-delay-2000"></div>
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
                        <span className="px-4 py-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 rounded-full text-sm font-semibold">
                            📈 Our Impact
                        </span>
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 text-transparent bg-clip-text mb-4">
                        Making a Real Difference
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        See how our platform is transforming communities across the nation
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {statItems.map((item, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            whileHover={{ y: -10, scale: 1.05 }}
                            className="bg-white rounded-3xl p-8 shadow-xl hover:shadow-2xl transition-all duration-300 border border-gray-100"
                        >
                            <motion.div
                                initial={{ scale: 0 }}
                                whileInView={{ scale: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                                viewport={{ once: true }}
                                className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${item.color} flex items-center justify-center text-2xl mb-6 mx-auto`}
                            >
                                {item.icon}
                            </motion.div>
                            
                            <motion.div
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                                viewport={{ once: true }}
                                className="text-center"
                            >
                                <h3 className="text-4xl font-bold text-gray-800 mb-2">
                                    {item.number.toLocaleString()}
                                    {index === 3 && <span className="text-2xl">h</span>}
                                </h3>
                                <p className="text-gray-600 font-medium">{item.label}</p>
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
                        Join thousands of citizens making their communities better
                    </p>
                    <motion.button
                        whileHover={{ scale: 1.05, y: -2 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                    >
                        Start Reporting Issues
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
};

export default Statistics;