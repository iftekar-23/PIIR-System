import { Outlet } from 'react-router';
import Navbar from '../pages/Shared/Navbar';
import Footer from '../pages/Shared/Footer';
import { motion } from 'framer-motion';

const RootLayout = () => {
    return (
        <div>
            <Navbar></Navbar>
            <div className='max-w-7xl mx-auto'>
                <motion.main
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Outlet></Outlet>
                </motion.main>
            </div>
            <Footer></Footer>
        </div>
    );
};

export default RootLayout;