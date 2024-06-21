import axios from "axios";
export async function getExchangeRates(currency: string) {
    // const url = 'https://www.banki.ru/products/currency/cb/';
    // const array = [];
    // const response = await axios.get(url)

    // const $ = cheerio.load(response.data);
    // const regex = new RegExp(currency);
    // console.log($('tr'));
    
    // $('tr').each((e, i) => {if ($(i).text().match(regex)) {$(i).children().each((e, x) => array.push($(x).html()))} })
    const url = 'https://www.cbr.ru/scripts/XML_daily.asp';

    try {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error('Ошибка при получении курсов валют:', error);
    }
}
