import { useState, useEffect } from 'react';

const useSystemTheme = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const prefersDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    setIsDarkMode(prefersDarkMode);

    // Function to handle theme change
    const handleChange = (event) => {
      setIsDarkMode(event.matches);
    };

    // Listen for changes in system theme preference
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    darkModeQuery.addEventListener('change', handleChange);

    // Clean up listener on component unmount
    return () => {
      darkModeQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return isDarkMode;
};

export default useSystemTheme;
