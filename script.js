document.addEventListener('DOMContentLoaded', () => {
    const API_URL = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json';
    const tableBody = document.querySelector('#currency-table tbody');

    const popularCurrencies = ['USD', 'EUR', 'GBP', 'CHF', 'JPY', 'CAD', 'AUD', 'CNY', 'PLN', 'RUB'];

    async function fetchCurrencyRates() {
        try {
            const response = await fetch(API_URL);
            const data = await response.json();
            updateTable(data);
        } catch (error) {
            console.error('Помилка завантаження курсу валют:', error);
        }
    }

    function updateTable(data) {
        tableBody.innerHTML = '';
        data
            .filter(item => popularCurrencies.includes(item.cc))
            .forEach(item => {
                const row = document.createElement('tr');
                const currencyCell = document.createElement('td');
                currencyCell.textContent = item.txt;
                const rateCell = document.createElement('td');
                rateCell.textContent = item.rate.toFixed(2);
                row.appendChild(currencyCell);
                row.appendChild(rateCell);
                tableBody.appendChild(row);
            });
    }

    fetchCurrencyRates();
    setInterval(fetchCurrencyRates, 60000);
});
