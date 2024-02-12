const asideAPI = '27e03b329cc3446ab9cf92cd1939e2b2';
const query= 'sport'; 
const Link = `https://newsapi.org/v2/everything?q=${query}&domains=bbc.co.uk&apiKey=${asideAPI}`;

const asideContainer = document.querySelector('.aside-news');

async function fetchAsideData() {
    try {
        const response = await axios.get(Link);
        console.log(response.data.articles);

        asideContainer.innerHTML = response.data.articles
        .filter((article) => article.urlToImage)
            .map((article) => {
                return `<div class="aside-card">
                    <img src="${article.urlToImage}" alt="" />
                    <a href="${article.url}" target="_blank">
                    <h1 class="card-title">${article.title}</h1>
                  </a>
                </div>`;
            })
            .join("");
    } catch (error) {
        console.error("Data could not be loaded:", error.message);
    }
}

fetchAsideData();


import axios from "axios";


