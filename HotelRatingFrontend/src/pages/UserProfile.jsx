import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import api from '../api/axios';
import { User, Mail, Star, Loader2, ArrowLeft, MessageSquare } from 'lucide-react';

const UserProfile = () => {
    const { userId } = useParams();
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/users/${userId}`);
                setUserData(response.data);
            } catch (err) {
                console.error("Error fetching user data, using mock:", err);
                // Mock data for demo
                setUserData({
                    userId,
                    name: "User " + userId,
                    email: "user" + userId + "@example.com",
                    about: "An enthusiastic traveler and reviewer.",
                    ratings: [
                        { ratingId: "r1", hotelId: "h1", rating: 5, feedback: "Excellent service and stay!", hotel: { name: "Ritz-Carlton" } },
                        { ratingId: "r2", hotelId: "h2", rating: 4, feedback: "Great heritage experience.", hotel: { name: "Taj Mahal Palace" } }
                    ]
                });
                setError("Note: Displaying mock data.");
            } finally {
                setLoading(false);
            }
        };

        fetchUserData();
    }, [userId]);

    if (loading) {
        return (
            <div style={styles.center}>
                <Loader2 size={48} className="animate-spin" color="var(--primary)" />
            </div>
        );
    }

    return (
        <div className="container">
            <Link to="/users" style={styles.backLink}>
                <ArrowLeft size={16} /> Back to Users
            </Link>

            <div style={styles.profileHeader}>
                <div style={styles.profileAvatar}>
                    <User size={48} color="var(--primary)" />
                </div>
                <div>
                    <h1 style={styles.userName}>{userData.name}</h1>
                    <p style={styles.userEmail}><Mail size={16} /> {userData.email}</p>
                </div>
            </div>

            <div style={styles.contentGrid}>
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="glass-card"
                    style={styles.aboutCard}
                >
                    <h3>About</h3>
                    <p style={styles.aboutText}>{userData.about}</p>
                </motion.div>

                <div style={styles.ratingsSection}>
                    <h3 style={{ marginBottom: '1.5rem' }}>Recent Ratings</h3>
                    {userData.ratings && userData.ratings.length > 0 ? (
                        <div style={styles.ratingsList}>
                            {userData.ratings.map((rating, i) => (
                                <motion.div
                                    key={rating.ratingId}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: i * 0.1 }}
                                    className="glass-card"
                                    style={styles.ratingCard}
                                >
                                    <div style={styles.ratingTop}>
                                        <h4 style={styles.hotelName}>{rating.hotel?.name || 'Hotel ' + rating.hotelId}</h4>
                                        <div style={styles.stars}>
                                            {[...Array(5)].map((_, idx) => (
                                                <Star 
                                                    key={idx} 
                                                    size={14} 
                                                    fill={idx < rating.rating ? "var(--accent)" : "none"} 
                                                    color={idx < rating.rating ? "var(--accent)" : "var(--text-muted)"}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    <p style={styles.feedback}>
                                        <MessageSquare size={14} style={{ marginRight: '8px', opacity: 0.6 }} />
                                        {rating.feedback}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    ) : (
                        <div className="glass-card" style={styles.empty}>
                            <p>No ratings yet by this user.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

const styles = {
    center: {
        display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh'
    },
    backLink: {
        display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '2rem', fontSize: '0.9rem'
    },
    profileHeader: {
        display: 'flex', alignItems: 'center', gap: '1.5rem', marginBottom: '3rem'
    },
    profileAvatar: {
        width: '100px', height: '100px', borderRadius: '50%', background: 'rgba(99, 102, 241, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center'
    },
    userName: {
        fontSize: '2.5rem', fontWeight: '800', marginBottom: '4px'
    },
    userEmail: {
        display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', fontSize: '1rem'
    },
    contentGrid: {
        display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem'
    },
    aboutCard: {
        height: 'fit-content'
    },
    aboutText: {
        marginTop: '1rem', color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: '1.6'
    },
    ratingsSection: {},
    ratingsList: {
        display: 'flex', flexDirection: 'column', gap: '1rem'
    },
    ratingCard: {
        padding: '1.25rem'
    },
    ratingTop: {
        display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'
    },
    hotelName: {
        fontSize: '1.1rem', fontWeight: '600'
    },
    stars: {
        display: 'flex', gap: '2px'
    },
    feedback: {
        fontSize: '0.9rem', color: 'var(--text-main)', opacity: 0.9, display: 'flex', alignItems: 'flex-start'
    },
    empty: {
        textAlign: 'center', padding: '3rem', color: 'var(--text-muted)'
    }
};

export default UserProfile;
