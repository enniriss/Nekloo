import CardInfo from "../../Basic/CardInfo";
import { useState, useEffect } from 'react';
import Navigation from '../../Basic/Navigation';

export default function SuppositionReadAll() {
    const token = localStorage.getItem('token');
    const [error, setError] = useState(null); 
    const [message, setMessage] = useState(null); 
    console.log('token', token);

    const [suppositions, setSuppositions] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

    const fetchSuppositions = async () => {
        try {
            const response = await fetch(`https://nekloo-api.onrender.com/supposition/readall`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` }
            });

            const data = await response.json();
            console.log('data', data.data);
            setSuppositions(data.data);

        } catch (error) {
            console.error('Error fetching suppositions:', error);
        }
    };

    const deleteSupposition = async (user_id, supposition_id) => {
        try {
            const response = await fetch(`https://nekloo-api.onrender.com/user/${user_id}/supposition/delete/${supposition_id}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', "Authorization": `Bearer ${token}` }
            });

            const data = await response.json();
            setMessage('Supposition supprimée avec succès.');
            // Recharger les suppositions après suppression
            fetchSuppositions();
        } catch (error) {
            setError('Erreur lors de la suppression de la supposition.');
        }
    };

    // Aplatir toutes les suppositions pour le carrousel
    const allSuppositions = suppositions.flatMap(user =>
        user.suppositions?.map(sup => ({
            ...sup,
            userPseudo: user.user_info?.pseudo || 'Utilisateur inconnu',
            userId: user.user_info?.id,
        })) || []
    );

    // Grouper par 3 pour desktop, 1 pour mobile
    const itemsPerSlide = isMobile ? 1 : 3;

    // Créer des groupes selon le nombre d'éléments par slide
    const groupedSuppositions = [];
    for (let i = 0; i < allSuppositions.length; i += itemsPerSlide) {
        groupedSuppositions.push(allSuppositions.slice(i, i + itemsPerSlide));
    }

    // Gérer le redimensionnement de l'écran
    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth < 768;
            if (mobile !== isMobile) {
                setIsMobile(mobile);
                setCurrentIndex(0); // Reset à la première slide lors du changement
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [isMobile]);

    useEffect(() => {
        fetchSuppositions();
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prev) => (prev + 1) % groupedSuppositions.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + groupedSuppositions.length) % groupedSuppositions.length);
    };

    const goToSlide = (index) => {
        setCurrentIndex(index);
    };

    if (allSuppositions.length === 0) {
        return (
            <div>
                <div className="header-container">
                    <a href="/parameters" className="back-link" id="back">&lt;</a>
                    <h1 className="title">Toutes les suppositions</h1>
                </div>
                <div className="d-flex justify-content-center align-items-center" style={{ height: '300px' }}>
                    <p>Chargement des suppositions...</p>
                </div>
                <Navigation />
            </div>
        );
    }

    return (
        <div>
            <div className="header-container">
                <a href="/parameters" className="back-link" id="back">&lt;</a>
                <h1 className="title">Toutes les suppositions</h1>
            </div>

            {/* Messages d'état */}
            {message && (
                <div className="alert alert-success text-center">
                    {message}
                </div>
            )}
            {error && (
                <div className="alert alert-danger text-center">
                    {error}
                </div>
            )}

            {/* Carrousel */}
            <div className="carousel-container">
                <div className="carousel-wrapper">
                    {/* Bouton précédent */}
                    <button
                        className="carousel-btn carousel-btn-prev"
                        onClick={prevSlide}
                        disabled={groupedSuppositions.length <= 1}
                    >
                        &#8249;
                    </button>

                    {/* Contenu du carrousel */}
                    <div className="carousel-content">
                        {groupedSuppositions[currentIndex]?.map((supposition) => (
                            <CardInfo
                                key={supposition.id}
                                title={supposition.name}
                                activity={supposition.activity}
                                author={`auteur : ${supposition.userPseudo}`}
                                href={`/test/${supposition.userId}/${supposition.id}`}
                                delete={() => deleteSupposition(supposition.userId, supposition.id)}
                            />
                        ))}
                    </div>

                    {/* Bouton suivant */}
                    <button
                        className="carousel-btn carousel-btn-next"
                        onClick={nextSlide}
                        disabled={groupedSuppositions.length <= 1}
                    >
                        &#8250;
                    </button>
                </div>

                {/* Indicateurs de pagination */}
                {groupedSuppositions.length > 1 && (
                    <div className="carousel-indicators">
                        {groupedSuppositions.map((_, index) => (
                            <button
                                key={index}
                                className={`indicator ${index === currentIndex ? 'active' : ''}`}
                                onClick={() => goToSlide(index)}
                            />
                        ))}
                    </div>
                )}

                {/* Compteur */}
                <div className="carousel-counter">
                    {currentIndex + 1} / {groupedSuppositions.length}
                    {!isMobile && (
                        <span className="items-info">
                            {" "}({groupedSuppositions[currentIndex]?.length || 0} éléments)
                        </span>
                    )}
                </div>
            </div>

            <Navigation />

            <style jsx>{`
                .header-container {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    position: relative;
                    padding: 20px;
                }

                .back-link {
                    position: absolute;
                    left: 20px;
                    font-size: 50px;
                    text-decoration: none;
                    color: inherit;
                }

                .title {
                    margin: 0;
                    text-align: center;
                }

                .carousel-container {
                    max-width: 1000px;
                    margin: 20px auto;
                    padding: 0 20px;
                }

                .carousel-wrapper {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    margin-bottom: 20px;
                }

                .carousel-content {
                    flex: 1;
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    justify-items: center;
                    min-height: 200px;
                }

                .carousel-btn {
                    background: #BB261F;
                    color: white;
                    border: none;
                    border-radius: 50%;
                    width: 50px;
                    height: 50px;
                    font-size: 24px;
                    font-weight: bold;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: all 0.3s ease;
                    flex-shrink: 0;
                }

                .carousel-btn:hover:not(:disabled) {
                    background: #AF342E;
                    transform: scale(1.1);
                }

                .carousel-btn:disabled {
                    background: #ccc;
                    cursor: not-allowed;
                    transform: none;
                }

                .carousel-indicators {
                    display: flex;
                    justify-content: center;
                    gap: 8px;
                    margin-bottom: 10px;
                }

                .indicator {
                    width: 12px;
                    height: 12px;
                    border-radius: 50%;
                    border: none;
                    background: #ccc;
                    cursor: pointer;
                    transition: background 0.3s ease;
                }

                .indicator.active {
                    background: #BB261F;
                }

                .indicator:hover {
                    background: #AF342E;
                }

                .carousel-counter {
                    text-align: center;
                    color: #666;
                    font-size: 14px;
                }

                .items-info {
                    color: #999;
                    font-size: 12px;
                }

                .alert {
                    padding: 10px;
                    margin: 10px 20px;
                    border-radius: 5px;
                }

                .alert-success {
                    background-color: #d4edda;
                    color: #155724;
                    border: 1px solid #c3e6cb;
                }

                .alert-danger {
                    background-color: #f8d7da;
                    color: #721c24;
                    border: 1px solid #f5c6cb;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .carousel-content {
                        grid-template-columns: 1fr;
                    }
                    
                    .carousel-wrapper {
                        gap: 10px;
                    }
                    
                    .carousel-btn {
                        width: 40px;
                        height: 40px;
                        font-size: 20px;
                    }
                    
                    .back-link {
                        font-size: 40px;
                        left: 10px;
                    }
                    
                    .carousel-container {
                        padding: 0 10px;
                    }
                }
            `}</style>
        </div>
    );
}