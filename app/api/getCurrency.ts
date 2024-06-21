import axios from "axios";
export async function getCurrency(currency: string) {
    const url = 'https://www.cbr-xml-daily.ru/daily_json.js';

    try {
        const response = await axios.get(url);
        const usdCurrency = +response.data.Valute.USD.Value;
        if (currency === 'RUB') return 1 / usdCurrency;
        const currInfo = +response.data.Valute[currency].Value;
        const attitudeCurr = currInfo / usdCurrency;
        return attitudeCurr;
    } catch (error) {
        console.error('Ошибка при получении курсов валют:', error);
    }
}
