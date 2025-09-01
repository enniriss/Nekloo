// import { useState, useEffect } from 'react';

// export default function Carrousel({ children, groupedSuppositions }) {
//         const [currentIndex, setCurrentIndex] = useState(0);

    
//     const nextSlide = () => {
//         setCurrentIndex((prev) => (prev + 1) % groupedSuppositions.length);
//     };

//     const prevSlide = () => {
//         setCurrentIndex((prev) => (prev - 1 + groupedSuppositions.length) % groupedSuppositions.length);
//     };

//     const goToSlide = (index) => {
//         setCurrentIndex(index);
//     };
//     return (
//         <div className="carousel-container">
//             <div className="carousel-wrapper">
//                 {/* Bouton précédent */}
//                 <button
//                     className="carousel-btn carousel-btn-prev"
//                     onClick={prevSlide}
//                     disabled={allSuppositions.length <= 1}
//                 >
//                     &#8249;
//                 </button>

//                 {/* Contenu du carrousel */}
//                     {children}

//                 {/* Bouton suivant */}
//                 <button
//                     className="carousel-btn carousel-btn-next"
//                     onClick={nextSlide}
//                     disabled={allSuppositions.length <= 1}
//                 >
//                     &#8250;
//                 </button>
//             </div>

//             {/* Compteur */}
//             <div className="carousel-counter">
//                 {currentIndex + 1} / {groupedSuppositions.length}
//                 {!isMobile && (
//                     <span className="items-info">
//                         {" "}({groupedSuppositions[currentIndex]?.length || 0} éléments)
//                     </span>
//                 )}
//             </div>
//             <style jsx>{`
//                 .header-container {
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     position: relative;
//                     padding: 20px;
//                 }

//                 .back-link {
//                     position: absolute;
//                     left: 20px;
//                     font-size: 50px;
//                     text-decoration: none;
//                     color: inherit;
//                 }

//                 .title {
//                     margin: 0;
//                     text-align: center;
//                 }

//                 .carousel-container {
//                     max-width: 1000px;
//                     margin: 20px auto;
//                     padding: 0 20px;
//                 }

//                 .carousel-wrapper {
//                     display: flex;
//                     align-items: center;
//                     gap: 20px;
//                     margin-bottom: 20px;
//                 }

//                 .carousel-content {
//                     flex: 1;
//                     display: grid;
//                     grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//                     gap: 20px;
//                     justify-items: center;
//                     min-height: 200px;
//                 }

//                 .carousel-btn {
//                     background: #BB261F;
//                     color: white;
//                     border: none;
//                     border-radius: 50%;
//                     width: 50px;
//                     height: 50px;
//                     font-size: 24px;
//                     font-weight: bold;
//                     cursor: pointer;
//                     display: flex;
//                     align-items: center;
//                     justify-content: center;
//                     transition: all 0.3s ease;
//                     flex-shrink: 0;
//                 }

//                 .carousel-btn:hover:not(:disabled) {
//                     background: #AF342E;
//                     transform: scale(1.1);
//                 }

//                 .carousel-btn:disabled {
//                     background: #ccc;
//                     cursor: not-allowed;
//                     transform: none;
//                 }

//                 .items-info {
//                     color: #999;
//                     font-size: 12px;
//                 }

//                 .carousel-indicators {
//                     display: flex;
//                     justify-content: center;
//                     gap: 8px;
//                     margin-bottom: 10px;
//                 }

//                 .indicator {
//                     width: 12px;
//                     height: 12px;
//                     border-radius: 50%;
//                     border: none;
//                     background: #ccc;
//                     cursor: pointer;
//                     transition: background 0.3s ease;
//                 }

//                 .indicator.active {
//                     background: #007bff;
//                 }

//                 .indicator:hover {
//                     background: #0056b3;
//                 }

//                 .carousel-counter {
//                     text-align: center;
//                     color: #666;
//                     font-size: 14px;
//                 }

//                 /* Responsive */
//                 @media (max-width: 768px) {
//                     .carousel-content {
//                         grid-template-columns: 1fr;
//                     }
                    
//                     .carousel-wrapper {
//                         gap: 10px;
//                     }
                    
//                     .carousel-btn {
//                         width: 40px;
//                         height: 40px;
//                         font-size: 20px;
//                     }
                    
//                     .back-link {
//                         font-size: 40px;
//                         left: 10px;
//                     }
                    
//                     .carousel-container {
//                         padding: 0 10px;
//                     }
//                 }
//             `}</style>
//         </div>

//     )
// }