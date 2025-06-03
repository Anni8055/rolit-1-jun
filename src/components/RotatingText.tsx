import React, { useState, useEffect } from "react";

const locations = ["Mumbai", "Delhi", "Bangalore", "Hyderabad", "Chennai", "Kolkata", "Jaipur", "Pune"]; // Famous Indian cities
const categories = ["Beauty", "Fashion", "Tech", "Fitness", "Food", "Travel", "Lifestyle", "Gaming", "Education", "Finance", "Entertainment", "Health"]; // Expanded categories

const RotatingText = () => {
  const [locationIndex, setLocationIndex] = useState(0);
  const [categoryIndex, setCategoryIndex] = useState(0);
  const [fadeLoc, setFadeLoc] = useState(true);
  const [fadeCat, setFadeCat] = useState(true);

  useEffect(() => {
    // Category rotation - faster interval (every 4 seconds)
    const categoryInterval = setInterval(() => {
      setFadeCat(false);
      setTimeout(() => {
        setCategoryIndex((prevIndex) => (prevIndex + 1) % categories.length);
        setFadeCat(true);
      }, 500);
    }, 4000);
    
    // Location rotation - slower interval (every 6 seconds)
    const locationInterval = setInterval(() => {
      setFadeLoc(false);
      setTimeout(() => {
        setLocationIndex((prevIndex) => (prevIndex + 1) % locations.length);
        setFadeLoc(true);
      }, 500);
    }, 6000);

    return () => {
      clearInterval(categoryInterval);
      clearInterval(locationInterval);
    };
  }, []);

  return (
    <div className="flex flex-col justify-center items-center py-16 md:py-24 text-center">
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
        Find <span className={`bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-600 transition-opacity duration-500 ${fadeCat ? 'opacity-100' : 'opacity-0'}`}>{categories[categoryIndex]}</span> influencers
      </h1>
      <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground mt-2">
        in <span className={`bg-clip-text text-transparent bg-gradient-to-r from-primary-600 to-blue-600 transition-opacity duration-500 ${fadeLoc ? 'opacity-100' : 'opacity-0'}`}>{locations[locationIndex]}</span>
      </h1>
      <p className="mt-8 text-lg text-gray-600 dark:text-gray-300 max-w-2xl">
        Our AI-powered platform helps you discover and connect with the perfect influencers for your brand, anywhere in India.
      </p>
    </div>
  );
};

export default RotatingText; 