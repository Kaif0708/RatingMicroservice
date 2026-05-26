import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Shield, Zap } from 'lucide-react';

const Home = () => {
    return (
        <div className="container">
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                style={styles.hero}
            >
                <h1 style={styles.title} className="gradient-text">
                    Next Generation <br /> Hotel Rating System
                </h1>
                <p style={styles.subtitle}>
                    A robust microservices architecture for managing users, hotels, and authentic guest ratings.
                </p>
                <div style={styles.btnGroup}>
                    <Link to="/users" className="btn-primary" style={styles.btn}>
                        Get Started <ArrowRight size={18} />
                    </Link>
                    <Link to="/hotels" style={styles.btnSecondary}>
                        Explore Hotels
                    </Link>
                </div>
            </motion.div>

            <div style={styles.features}>
                {[
                    { icon: <Zap color="#6366f1" />, title: "Blazing Fast", desc: "Built with Spring Boot and React for peak performance." },
                    { icon: <Shield color="#22c55e" />, title: "Secure", desc: "Integrated with Okta OAuth2 for enterprise-grade security." },
                    { icon: <Star color="#f59e0b" />, title: "Scalable", desc: "Microservices design ensures independent scaling of services." }
                ].map((f, i) => (
                    <motion.div 
                        key={i}
                        className="glass-card"
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        viewport={{ once: true }}
                        style={styles.featureCard}
                    >
                        <div style={styles.iconWrapper}>{f.icon}</div>
                        <h3>{f.title}</h3>
                        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{f.desc}</p>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    hero: {
        textAlign: 'center',
        marginTop: '4rem',
        marginBottom: '6rem',
    },
    title: {
        fontSize: '4.5rem',
        fontWeight: '800',
        lineHeight: '1.1',
        marginBottom: '1.5rem',
    },
    subtitle: {
        fontSize: '1.25rem',
        color: 'var(--text-muted)',
        maxWidth: '600px',
        margin: '0 auto 2.5rem',
    },
    btnGroup: {
        display: 'flex',
        justifyContent: 'center',
        gap: '1rem',
    },
    btn: {
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '12px',
        textDecoration: 'none',
    },
    btnSecondary: {
        padding: '0.75rem 1.5rem',
        border: '1px solid var(--border)',
        borderRadius: '12px',
        color: 'white',
        fontWeight: '600',
        transition: 'all 0.3s ease',
    },
    features: {
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '2rem',
        marginBottom: '4rem',
    },
    featureCard: {
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
    },
    iconWrapper: {
        width: '40px',
        height: '40px',
        borderRadius: '10px',
        background: 'rgba(255,255,255,0.05)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }
};

export default Home;
