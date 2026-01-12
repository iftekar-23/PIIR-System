import { Link } from 'react-router';
import { 
    FaFacebookF, 
    FaTwitter, 
    FaLinkedinIn, 
    FaInstagram, 
    FaPhone, 
    FaEnvelope, 
    FaMapMarkerAlt
} from 'react-icons/fa';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    const footerLinks = {
        platform: [
            { name: 'Home', path: '/' },
            { name: 'Browse Issues', path: '/issues' },
            { name: 'About Us', path: '/about' },
            { name: 'Contact', path: '/contact' }
        ],
        services: [
            { name: 'Login', path: '/login' },
            { name: 'Register', path: '/register' },
            { name: 'Dashboard', path: '/dashboard' }
        ]
    };

    const socialLinks = [
        { name: 'Facebook', icon: FaFacebookF, url: 'https://facebook.com' },
        { name: 'Twitter', icon: FaTwitter, url: 'https://twitter.com' },
        { name: 'LinkedIn', icon: FaLinkedinIn, url: 'https://linkedin.com' },
        { name: 'Instagram', icon: FaInstagram, url: 'https://instagram.com' }
    ];

    const contactInfo = [
        { icon: FaPhone, label: 'Phone', value: '+880-1700-000000', link: 'tel:+8801700000000' },
        { icon: FaEnvelope, label: 'Email', value: 'info@piir.com', link: 'mailto:info@piir.com' },
        { icon: FaMapMarkerAlt, label: 'Address', value: 'Dhaka, Bangladesh', link: 'https://maps.google.com/?q=Dhaka,Bangladesh' }
    ];

    return (
        <div className="w-full bg-gray-900 text-gray-300">
            <footer className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    
                    {/* Company Info */}
                    <div className="lg:col-span-1">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                                <span className="text-white font-bold">P</span>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold text-white">PIIR System</h3>
                                <p className="text-xs text-gray-400">Public Issue Reporting</p>
                            </div>
                        </div>
                        <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                            Empowering citizens to report and track community issues for a better tomorrow.
                        </p>
                        
                        {/* Contact Info */}
                        <div className="space-y-2">
                            {contactInfo.map((contact, index) => (
                                <a
                                    key={index}
                                    href={contact.link}
                                    target={contact.link.startsWith('http') ? '_blank' : '_self'}
                                    rel={contact.link.startsWith('http') ? 'noopener noreferrer' : ''}
                                    className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
                                >
                                    <contact.icon className="text-xs" />
                                    <span>{contact.value}</span>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Platform Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Platform</h4>
                        <ul className="space-y-2">
                            {footerLinks.platform.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Services Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Access</h4>
                        <ul className="space-y-2">
                            {footerLinks.services.map((link, index) => (
                                <li key={index}>
                                    <Link
                                        to={link.path}
                                        className="text-sm text-gray-400 hover:text-white transition-colors"
                                    >
                                        {link.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Social Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Follow Us</h4>
                        <div className="flex gap-3">
                            {socialLinks.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-8 h-8 bg-gray-800 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-gray-700 transition-all"
                                    title={social.name}
                                >
                                    <social.icon className="text-sm" />
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-sm text-gray-400">
                        © {currentYear} PIIR System. All rights reserved.
                    </p>
                    <div className="flex gap-6 text-sm">
                        <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
                            Privacy Policy
                        </Link>
                        <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
                            Terms of Service
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Footer;