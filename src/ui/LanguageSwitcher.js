'use client'
const languages = [
  { code: "en", label: "EN" },
  { code: "fr", label: "FR" },
  { code: "es", label: "ES" },
  { code: "de", label: "DE" },
  { code: "pt", label: "PT" },
  { code: "ar", label: "AR" },
];

export default function LanguageSwitcher() {

  const changeLanguage = (lang) => {
    const select = document.querySelector(".goog-te-combo");
    if (!select) return;

    select.value = lang;
    select.dispatchEvent(new Event("change"));
  };

  return (
    <div className="relative group cursor-pointer text-white text-sm">
      <div className="flex items-center gap-1">
        🌍 <span>Select</span>
      </div>

      <div className="absolute right-0 mt-2 hidden group-hover:block bg-white text-black rounded-xl shadow-xl overflow-hidden min-w-[90px] z-50">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => changeLanguage(lang.code)}
            className="block w-full px-3 py-2 text-left hover:bg-gray-100 text-sm"
          >
            {lang.label}
          </button>
        ))}
      </div>
    </div>
  );
}
