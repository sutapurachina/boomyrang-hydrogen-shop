import { useEffect, useState } from "react";
import cls from '@/styles/header.module.css';
import { type ILocaleData } from "@/lib/utils";
import { useMatches } from "@remix-run/react";

export const LanguageDropdown = (localization: any) => {
  const availableLanguages = localization?.localization.localization.availableLanguages;
  const [isLanguageOpen, setLanguageOpen] = useState(false);
  const [root] = useMatches();
  const selectedLocale = (root.data as ILocaleData).selectedLocale;
  const onOpenDropdown = () => {
    setLanguageOpen(!isLanguageOpen); 
  }
  
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (!event.target) return;
      const target = event.target as HTMLElement;
      const dropdown = document.getElementById("dropdown-id");
      if (dropdown && !dropdown.contains(target)) {
        setLanguageOpen(false);
      }
    };

    window.addEventListener('click', handleOutsideClick);
    return () => window.removeEventListener('click', handleOutsideClick);
  }, []);

  return (
    <div id='dropdown-id' className={cls['dropdown-languages']}>
        <button onClick={onOpenDropdown} className={cls['dropdown-trigger']}>
        {selectedLocale ? selectedLocale.language : 'EN' }
        </button>
        {isLanguageOpen && <ul className={cls['dropdown-menu']}>
        {availableLanguages?.map((language: {isoCode: string}) => (
            <a href={`/${language.isoCode}`} className={cls['dropdown-item']} key={language.isoCode}>
                {language.isoCode}
            </a>
        ))}
        </ul>}
    </div>
  )
}
