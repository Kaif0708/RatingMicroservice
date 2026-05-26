import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { Hotel, MapPin, Loader2, Info } from 'lucide-react';

const HotelList = () => {
    const [hotels, setHotels] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchHotels = async () => {
            try {
                const response = await api.get('/hotels');
                setHotels(response.data);
            } catch (err) {
                console.error("API Error, using fallback data:", err);
                setHotels([
                    { id: "h1", name: "Ritz-Carlton", location: "New York", about: "Luxury stay in the heart of NYC." },
                    { id: "h2", name: "Taj Mahal Palace", location: "Mumbai", about: "Iconic luxury heritage hotel." },
                    { id: "h3", name: "The Savoy", location: "London", about: "World-famous hotel on the Strand." }
                ]);
                setError("Note: Displaying mock data because backend is unreachable.");
            } finally {
                setLoading(false);
            }
        };

        fetchHotels();
    }, []);

    if (loading) {
        return (
            <div style={styles.center}>
                <Loader2 size={48} className="animate-spin" color="var(--primary)" />
            </div>
        );
    }

    return (
        <div className="container">
            <header style={styles.header}>
                <h2 style={styles.title}>Explore Hotels</h2>
                {error && <p style={styles.error}>{error}</p>}
            </header>

            <div style={styles.grid}>
                {hotels.map((hotel, i) => (
                    <motion.div
                        key={hotel.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: i * 0.1 }}
                        className="glass-card"
                        style={styles.card}
                    >
                        <div style={styles.iconWrapper}>
                            <Hotel size={32} color="var(--primary)" />
                        </div>
                        <h3 style={styles.hotelName}>{hotel.name}</h3>
                        <p style={styles.location}>
                            <MapPin size={14} /> {hotel.location}
                        </p>
                        <p style={styles.about}>{hotel.about}</p>
                        
                        <div style={styles.footer}>
                            <button style={styles.btnInfo}>
                                <Info size={16} /> Details
                            </button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
};

const styles = {
    center: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
    },
    header: {
        marginBottom: '2rem',
    },
    title: {
        fontSize: '2rem',
        fontWeight: '700',
    },
    error: {
        color: 'var(--accent)',
        fontSize: '0.9rem',
        marginTop: '0.5rem',
    },
    grid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: '1.5rem',
    },
    card: {
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
    },
    iconWrapper: {
        width: '60px',
        height: '60px',
        borderRadius: '12px',
        background: 'rgba(99, 102, 241, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '0.5rem',
    },
    hotelName: {
        fontSize: '1.25rem',
        fontWeight: '700',
    },
    location: {
        display: 'flex',
        alignItems: 'center',
        gap: '4px',
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
    },
    about: {
        fontSize: '0.9rem',
        lineHeight: '1.6',
        color: 'var(--text-main)',
        opacity: 0.9,
    },
    footer: {
        marginTop: 'auto',
        paddingTop: '1rem',
        borderTop: '1px solid var(--border)',
    },
    btnInfo: {
        background: 'transparent',
        color: 'var(--primary)',
        border: '1px solid var(--primary)',
        padding: '0.5rem 1rem',
        fontSize: '0.85rem',
        display: 'flex',
        alignItems: 'center',
        gap: '6px',
        width: '100%',
        justifyContent: 'center',
        fontWeight: '600',
    }
};

export default HotelList;
