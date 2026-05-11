const btnSearch = document.getElementById('btnSearch');
const btnClear = document.getElementById('btnClear');

function searchCondition() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const resultDiv = document.getElementById('resultsContainer');
    resultDiv.innerHTML = '';

    fetch('travel_recommendation_api.json')
        .then(response => response.json())
        .then(data => {
            // Logic for Country search
            const country = data.countries.find(item => item.name.toLowerCase() === input);
            if (country) {
                country.cities.forEach(city => {
                    displayResult(city);
                });
            } 
            // Logic for Temple/Beach search
            else if (data[input]) {
                data[input].forEach(item => {
                    displayResult(item);
                });
            } else {
                resultDiv.innerHTML = 'Keyword not found. Please try "beach", "temple", or a country name.';
            }
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

function displayResult(item) {
    const resultDiv = document.getElementById('resultsContainer');
    resultDiv.innerHTML += `
        <div class="result-card">
            <img src="${item.imageUrl}" alt="${item.name}">
            <h2>${item.name}</h2>
            <p>${item.description}</p>
            <button>Visit</button>
        </div>
    `;
}

btnSearch.addEventListener('click', searchCondition);
function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.getElementById('resultsContainer').innerHTML = '';
}

btnClear.addEventListener('click', clearSearch);