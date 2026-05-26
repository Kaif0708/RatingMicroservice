import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { User, Hotel, Star, Home as HomeIcon } from 'lucide-react';

const Navbar = () => {
    return (
        <nav style={styles.nav}>
            <div className="container" style={styles.container}>
                <Link to="/" style={styles.logo}>
                    <Star color="#f59e0b" fill="#f59e0b" size={24} />
                    <span style={styles.logoText}>RateMyStay</span>
                </Link>
                <div style={styles.links}>
                    <NavLink to="/" style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
                        <HomeIcon size={18} /> Home
                    </NavLink>
                    <NavLink to="/users" style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
                        <User size={18} /> Users
                    </NavLink>
                    <NavLink to="/hotels" style={({ isActive }) => (isActive ? styles.activeLink : styles.link)}>
                        <Hotel size={18} /> Hotels
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

const styles = {
    nav: {
        height: '70px',
        background: 'rgba(15, 23, 42, 0.8)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        alignItems: 'center',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
    },
    container: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    logo: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        fontSize: '1.25rem',
        fontWeight: '700',
        color: '#fff',
    },
    logoText: {
        letterSpacing: '0.5px',
    },
    links: {
        display: 'flex',
        gap: '2rem',
    },
    link: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#94a3b8',
        fontSize: '0.95rem',
        fontWeight: '500',
        transition: 'color 0.3s ease',
    },
    activeLink: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        color: '#6366f1',
        fontSize: '0.95rem',
        fontWeight: '600',
    }
};

export default Navbar;
