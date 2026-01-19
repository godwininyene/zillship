
"use client"; 

import { useEffect } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';

export default function AOSProvider({ children }) {
  useEffect(() => {
    AOS.init({
      duration: 800, // Customize your settings
      once: false, // Animation repeats every time you scroll up/down
    });
    // Optional: Refresh AOS when content changes dynamically
    // AOS.refresh(); 
  }, []);

  return <>{children}</>;
}
