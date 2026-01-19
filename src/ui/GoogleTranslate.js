'use client'
import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    if (window.google?.translate) return;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        { pageLanguage: 'en' },
        'google_translate_element'
      );
    };

    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

    const hideInterval = setInterval(() => {
      const banner = document.querySelector('.goog-te-banner-frame');
      const iframe = document.querySelector('iframe.goog-te-banner-frame');
      if (banner) banner.style.display = 'none';
      if (iframe) iframe.style.display = 'none';
      document.body.style.top = '0px';
    }, 500);

    return () => clearInterval(hideInterval);
  }, []);

  return (
    <div
      id="google_translate_element"
      className="translate-box"
      suppressHydrationWarning
    />
  );
}

// 'use client'
// import { useEffect } from "react";

// export default function GoogleTranslate() {
//   const googleTranslateElementInit = () => {
//     new window.google.translate.TranslateElement(
//       { pageLanguage: 'en' },
//       'google_translate_element'
//     );
//   };

//   useEffect(() => {
//     const script = document.createElement("script");
//     script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
//     document.body.appendChild(script);

//     window.googleTranslateElementInit = googleTranslateElementInit;
//   }, []);

//   return <div id="google_translate_element"></div>;
// }
