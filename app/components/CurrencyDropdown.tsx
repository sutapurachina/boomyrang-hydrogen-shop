import { useEffect, useState } from 'react'
import cls from '@/styles/header.module.css';
import { type ILocaleData, availableCurrencys, currencyLocale } from '@/lib/utils';
import { useMatches } from '@remix-run/react';

interface CurrencyDropdownProps {
    chooseCurrency: (currencyNew: string) => void;
}

export const CurrencyDropdown = ({chooseCurrency}: CurrencyDropdownProps) => {
    const [root] = useMatches();
     const selectedLanguage = (root.data as ILocaleData).selectedLocale.language;
    const [isCurrencyOpen, setCurrencyOpen] = useState(false);
    const [currentCurrency, setCurrentCurrency] = useState('——');
    const onOpenDropdown = () => {
        setCurrencyOpen(!isCurrencyOpen); 
    }
    const changeCurrency = (currencyNew: string) => {
        setCurrentCurrency(currencyNew);
        if (currencyNew === "——") currencyNew = 'USD';
        chooseCurrency(currencyNew);
        setCurrencyOpen(false);
    }
    
    useEffect(() => {
        const handleOutsideClick = (event: MouseEvent) => {
          if (!event.target) return;
          const target = event.target as HTMLElement;
          const dropdown = document.getElementById("currency-id");
          if (dropdown && !dropdown.contains(target)) {
            setCurrencyOpen(false);
          }
        };
    
        window.addEventListener('click', handleOutsideClick);
        return () => window.removeEventListener('click', handleOutsideClick);
      }, []);
    return (
        <div id='currency-id' className={cls['dropdown-languages']}>
            <button id={cls['trigger-id']} onClick={onOpenDropdown} className={cls['dropdown-trigger']}>{currentCurrency}</button>
            {isCurrencyOpen && (
            <div className={cls['dropdown-menu']}>
                {availableCurrencys?.map((curr: string) => (
                    <button 
                    onClick={() => changeCurrency(curr)} 
                    key={curr} 
                    className={cls['dropdown-item']}>
                        {curr}
                    </button>
                ))}
            </div>
            )}
            <span className={cls.cardText}>{currencyLocale[selectedLanguage]}</span>
        </div>
    )
}
