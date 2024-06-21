import { useEffect, useState } from 'react'
import cls from '@/styles/header.module.css';
import { availableCurrencys } from '@/lib/utils';

interface CurrencyDropdownProps {
    chooseCurrency: (currencyNew: string) => void;
}

export const CurrencyDropdown = ({chooseCurrency}: CurrencyDropdownProps) => {
    const [isCurrencyOpen, setCurrencyOpen] = useState(false);
    const [currentCurrency, setCurrentCurrency] = useState('USD');
    const onOpenDropdown = () => {
        setCurrencyOpen(!isCurrencyOpen); 
    }
    const changeCurrency = (currencyNew: string) => {
        chooseCurrency(currencyNew);
        setCurrentCurrency(currencyNew);
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
            <button onClick={onOpenDropdown} className={cls['dropdown-trigger']}>{currentCurrency}</button>
            {isCurrencyOpen && <div className={cls['dropdown-menu']}>
                {availableCurrencys?.map((curr: string) => (
                    <button 
                    onClick={() => changeCurrency(curr)} 
                    key={curr} 
                    className={cls['dropdown-item']}>
                        {curr}
                    </button>
                ))}
            </div>}
        </div>
    )
}
