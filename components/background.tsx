'use client';

import { useEffect, useState } from 'react';

interface Circle {
    id: number;
    size: number;
    x: number;
    y: number;
    duration: number;
    delay: number;
}

export function AnimatedBackground() { // Proximos pasos -> recibir numero de circulos personalizados, duracion de aparición y delay
    const [circles, setCircles] = useState<Circle[]>([]);

    useEffect(() => {
        // Generar circulos aleatorios
        const generateCircles = () => {
            const newCircles: Circle[] = [];
            const circleCount = 8; // Número de circulos

            for (let i = 0; i < circleCount; i++) {
                newCircles.push({
                    id: i,
                    size: Math.random() * 300 + 150, // Tamaño entre 150-450px
                    x: Math.random() * 100, // Position 0-100%
                    y: Math.random() * 100,
                    duration: Math.random() * 10 + 15, // Duración entre 15-25s
                    delay: Math.random() * 5, // Delay entre 0-5s
                });
            }
            setCircles(newCircles);
        };

        generateCircles();
    }, []);

    return (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
            {circles.map((circle) => (
                <div
                    key={circle.id}
                    className="absolute rounded-full animate-float"
                    style={{
                        width: `${circle.size}px`,
                        height: `${circle.size}px`,
                        left: `${circle.x}%`,
                        top: `${circle.y}%`,
                        background: `radial-gradient(circle, var(--primary) 0%, var(--primary) 30%, transparent 70%)`,
                        opacity: 0.15,
                        animation: `float ${circle.duration}s ease-in-out ${circle.delay}s infinite alternate`,
                        filter: 'blur(60px)',
                    }}
                />
            ))}

            {/* Inyección de css */}
            <style jsx>{`
                @keyframes float {
                    0% {
                        transform: translate(0, 0) scale(1);
                        opacity: 0.12;
                    }
                    50% {
                        opacity: 0.2;
                    }
                    100% {
                        transform: translate(50px, -50px) scale(1.2);
                        opacity: 0.08;
                    }
                }

                .animate-float {
                    will-change: transform, opacity;
                }

                @media (prefers-color-scheme: dark) {
                    .animate-float {
                        opacity: 0.08 !important;
                    }
                }
            `}</style>
        </div>
    );
}
