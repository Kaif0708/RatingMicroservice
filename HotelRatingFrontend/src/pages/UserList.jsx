import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import api from '../api/axios';
import { User, Mail, ChevronRight, Loader2 } from 'lucide-react';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await api.get('/users');
                setUsers(response.data);
            } catch (err) {
                console.error("API Error, using fallback data:", err);
                // Fallback mock data for demonstration
                setUsers([
                    { userId: "1", name: "Kaif Khan", email: "kaif@example.com", about: "Developer and traveler." },
                    { userId: "2", name: "John Doe", email: "john@example.com", about: "Loves luxury hotels." },
                    { userId: "3", name: "Alice Smith", email: "alice@example.com", about: "Always looking for budget stays." }
                ]);
                setError("Note: Displaying mock data because backend is unreachable.");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
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
                <h2 style={styles.title}>All Users</h2>
                {error && <p style={styles.error}>{error}</p>}
            </header>

            <div style={styles.grid}>
                {users.map((user, i) => (
                    <motion.div
                        key={user.userId}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                    >
                        <Link to={`/users/${user.userId}`} className="glass-card" style={styles.card}>
                            <div style={styles.avatar}>
                                <User size={24} color="var(--primary)" />
                            </div>
                            <div style={styles.info}>
                                <h3 style={styles.userName}>{user.name}</h3>
                                <p style={styles.userEmail}>
                                    <Mail size={14} style={{ marginRight: '4px' }} /> {user.email}
                                </p>
                                <p style={styles.about}>{user.about}</p>
                            </div>
                            <ChevronRight size={20} color="var(--text-muted)" />
                        </Link>
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
        gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
        gap: '1.5rem',
    },
    card: {
        display: 'flex',
        alignItems: 'center',
        gap: '1.5rem',
        textDecoration: 'none',
        color: 'inherit',
    },
    avatar: {
        width: '50px',
        height: '50px',
        borderRadius: '50%',
        background: 'rgba(99, 102, 241, 0.1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
    },
    info: {
        flex: 1,
    },
    userName: {
        fontSize: '1.1rem',
        fontWeight: '600',
        marginBottom: '4px',
    },
    userEmail: {
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        display: 'flex',
        alignItems: 'center',
        marginBottom: '8px',
    },
    about: {
        fontSize: '0.9rem',
        color: 'var(--text-main)',
        opacity: 0.8,
        display: '-webkit-box',
        WebkitLineClamp: '2',
        WebkitBoxOrient: 'vertical',
        overflow: 'hidden',
    }
};

export default UserList;
