'use client'
import { useEffect } from "react";

export default function GoogleTranslateLoader() {
  useEffect(() => {
    if (window.googleTranslateInitialized) return;
    window.googleTranslateInitialized = true;

    window.googleTranslateElementInit = () => {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <>
      {/* hidden container */}
      <div id="google_translate_element" style={{ display: "none" }} />

      {/* hide Google UI junk */}
      {/* <style jsx global>{`
        .goog-logo-link, 
        .goog-te-gadget span {
          display: none !important;
        }
        .goog-te-gadget {
          font-size: 0px;
        }
        body {
          top: 0 !important;
        }
      `}</style> */}
    </>
  );
}
