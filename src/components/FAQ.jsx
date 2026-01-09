import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(0);

    const faqs = [
        {
            question: "How do I report an issue?",
            answer: "Simply create an account, click on 'Submit Issue', fill out the form with details about your concern, add photos if available, and submit. You'll receive a tracking ID to monitor progress."
        },
        {
            question: "How long does it take to resolve issues?",
            answer: "Resolution time varies by issue type and complexity. Emergency issues are prioritized and typically addressed within 24-48 hours. Non-urgent issues may take 3-7 business days depending on resources and coordination required."
        },
        {
            question: "Can I track the progress of my reported issue?",
            answer: "Yes! Every reported issue gets a unique tracking ID. You can log into your dashboard to see real-time updates, status changes, and communication from relevant authorities handling your case."
        },
        {
            question: "Is there a cost to use PIIR System?",
            answer: "Basic reporting is completely free. We offer a Premium subscription (৳1000) that provides unlimited issue submissions, priority support, and advanced features for power users and community leaders."
        },
        {
            question: "What types of issues can I report?",
            answer: "You can report infrastructure problems, environmental concerns, utility issues, safety hazards, transportation problems, public health matters, and any other community-related concerns that need attention."
        },
        {
            question: "How do I know if my issue is being addressed?",
            answer: "You'll receive email notifications for status updates. Additionally, you can check your dashboard for real-time progress, view assigned staff, and see estimated completion times for your reported issues."
        },
        {
            question: "Can I report issues anonymously?",
            answer: "While we encourage users to create accounts for better tracking and communication, we do accept anonymous reports for sensitive issues. However, follow-up communication may be limited for anonymous submissions."
        },
        {
            question: "What happens after I submit an issue?",
            answer: "Your issue is reviewed by our team, categorized by priority and type, then forwarded to the appropriate local authority or department. You'll receive confirmation and regular updates throughout the resolution process."
        }
    ];

    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? -1 : index);
    };

    return (
        <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute inset-0">
                <div className="absolute top-20 left-20 w-64 h-64 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob"></div>
                <div className="absolute bottom-20 right-20 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-blob animation-delay-2000"></div>
            </div>

            <div className="max-w-4xl mx-auto px-6 relative">
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
                            ❓ FAQ
                        </span>
                    </motion.div>
                    
                    <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 text-transparent bg-clip-text mb-4">
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Find answers to common questions about using PIIR System
                    </p>
                </motion.div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            viewport={{ once: true }}
                            className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden"
                        >
                            <motion.button
                                onClick={() => toggleFAQ(index)}
                                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
                                whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.8)" }}
                            >
                                <h3 className="text-lg font-semibold text-gray-800 pr-4">
                                    {faq.question}
                                </h3>
                                <motion.div
                                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="flex-shrink-0"
                                >
                                    <svg 
                                        className="w-6 h-6 text-gray-500" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M19 9l-7 7-7-7" 
                                        />
                                    </svg>
                                </motion.div>
                            </motion.button>
                            
                            <AnimatePresence>
                                {openIndex === index && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="overflow-hidden"
                                    >
                                        <motion.div
                                            initial={{ y: -10 }}
                                            animate={{ y: 0 }}
                                            exit={{ y: -10 }}
                                            transition={{ duration: 0.3 }}
                                            className="px-8 pb-6 text-gray-600 leading-relaxed"
                                        >
                                            {faq.answer}
                                        </motion.div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
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
                    <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
                        <h3 className="text-2xl font-bold text-gray-800 mb-4">
                            Still have questions?
                        </h3>
                        <p className="text-gray-600 mb-6">
                            Our support team is here to help you with any additional questions or concerns.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                            >
                                Contact Support
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.05, y: -2 }}
                                whileTap={{ scale: 0.95 }}
                                className="px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl font-semibold hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
                            >
                                View Documentation
                            </motion.button>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default FAQ;