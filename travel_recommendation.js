async function fetchDestinations() {
    const response = await fetch('travel_recommendation_api.json');
    const data = await response.json();
    return data;
}

function searchDestinations() {
    const searchInput = document.getElementById('destination').value.toLowerCase();
    const searchResultsOverlay = document.getElementById('search-results-overlay');
    const searchResults = document.getElementById('search-results');

    fetchDestinations().then(data => {
        const allItems = [...data.countries, ...data.temples, ...data.beaches];
        const filteredResults = [];

        

        allItems.forEach(category => {
            if (category.cities) {
                category.cities.forEach(city => {
                    if (city.name.toLowerCase().includes(searchInput)) {
                        filteredResults.push({
                            name: city.name,
                            imageUrl: city.imageUrl,
                            description: city.description
                        });
                    }
                });
            } else {
                if (category.name.toLowerCase().includes(searchInput)) {
                    filteredResults.push({
                        name: category.name,
                        imageUrl: category.imageUrl,
                        description: category.description
                    });
                }
            }
        });

        // Clear previous results
        searchResults.innerHTML = '';

        // Display results
        if (filteredResults.length > 0) {
            filteredResults.forEach(item => {
                const resultItem = document.createElement('div');
                resultItem.classList.add('result-item');
                resultItem.innerHTML = `
                    <img src="${item.imageUrl}" alt="${item.name}">
                    <div class="footer_container">
                        <h4>${item.name}</h4>
                        <p>${item.description}</p>
                        <a href="#" class="btn">Learn More</a>
                    </div>
                `;
                searchResults.appendChild(resultItem);
            });
            searchResultsOverlay.style.display = 'block';
        } else {
            searchResults.innerHTML = '<p>No destinations found</p>';
            searchResultsOverlay.style.display = 'block';
        }
    });
}



const keywords = {
  beaches: ['beach', 'beaches'],
  temples: ['temple', 'temples'],
  countries: ['country', 'countries']
};

searchButton.addEventListener('click', () => {
  const searchTerm = destination.value.toLowerCase();

  let foundKeywords = [];
  for (const keyword in keywords) {
    if (keywords[keyword].includes(searchTerm)) {
      foundKeywords.push(keyword);
    }
  }

  searchResults.innerHTML = `<h2>Search Results for "${searchTerm}":</h2>`;
  if (foundKeywords.length > 0) {
    searchResults.innerHTML += `<ul>`;
    for (const keyword of foundKeywords) {
      searchResults.innerHTML += `<li>${keyword}</li>`;
    }
    searchResults.innerHTML += `</ul>`;
  } else {
    searchResults.innerHTML += `<p>No results found.</p>`;
  }
});

function resetSearch() {
    document.getElementById('destination').value = '';
    document.getElementById('search-results').innerHTML = '';
    document.getElementById('search-results-overlay').style.display = 'none';
}

const options = { timeZone: 'Australia/Sydney', hour12: true, hour: 'numeric', minute: 'numeric', second: 'numeric' };
const sydneyTime = new Date().toLocaleTimeString('en-US', options);
console.log("Current time in Sydney:", sydneyTime);