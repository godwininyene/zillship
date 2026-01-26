'use client'
import { useEffect } from "react";

export default function GoogleTranslate() {
  useEffect(() => {
    // ✅ Prevent duplicate script
    if (window.googleTranslateInitialized) return;

    window.googleTranslateInitialized = true;

    window.googleTranslateElementInit = () => {
      if (document.getElementById("google_translate_element")?.childNodes.length) {
        return; // already rendered
      }

      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          autoDisplay: false
        },
        "google_translate_element"
      );
    };

    const script = document.createElement("script");
    script.src =
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.body.appendChild(script);

  }, []);

  return <div id="google_translate_element" />;
}