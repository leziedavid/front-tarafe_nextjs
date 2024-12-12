// src/components/ModeToggle.tsx
"use client";

import React, { useState, useEffect } from 'react';

const ModeToggle: React.FC = () => {
    const [isDarkMode, setIsDarkMode] = useState(false);

    // Check the initial theme preference from localStorage or the system
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setIsDarkMode(savedTheme === "dark");
        } else {
            setIsDarkMode(window.matchMedia('(prefers-color-scheme: dark)').matches);
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDarkMode ? "dark" : "light";
        setIsDarkMode(!isDarkMode);
        localStorage.setItem("theme", newTheme);

        // Apply the theme to the document body
        document.body.classList.toggle("dark", newTheme === "dark");
    };

    return (
        <button
            onClick={toggleTheme}
            className="h-10 w-10 flex items-center justify-center rounded-full bg-muted text-white"
        >
            {isDarkMode ? (
                <span role="img" aria-label="moon">🌙</span>
            ) : (
                <span role="img" aria-label="sun">🌞</span>
            )}
        </button>
    );
};

export default ModeToggle;
