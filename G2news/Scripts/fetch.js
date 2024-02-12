import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { updateFavoriteIcons } from './favourite';

let yesterday = new Date().getDate() - 1;
const newAPI = "26873f2efaf240bfab3a9b7a0053b43b";
const container = document.querySelector(".news-card-container");
const searchBar = document.querySelector(".search-input");
let searchBtn = document.querySelector(".search-btn");
const categories = document.querySelectorAll(".content-category");

categories.forEach((category) => {
    category.addEventListener("click", () => {
        console.log(category.textContent);
        const newsCategory = category.textContent;
        console.log(newsCategory);
        fetchData(undefined, newsCategory);
    });
});

async function fetchData(query) {
    try {
        const newsLink = checkFilters(query);
        console.log(newsLink);
        const response = await axios.get(newsLink);
        const articles = response.data.articles;
        
        articles.forEach((article, index) => {
            article.id = uuidv4();
            article.index = index;
        });
        
        console.log(response.data.articles);

        function getFirstSentence(content) {
            const shortedContent = content.trim().substring(0, 190);
            const lastSpaceIndex = shortedContent.lastIndexOf(" ");
            const firstSentence = lastSpaceIndex !== -1 ? shortedContent.substring(0, lastSpaceIndex) : truncatedContent;
            return firstSentence;
          }

        container.innerHTML = articles
        .map((article) => {
            const cardId = `card-${article.id}`;
            if ((article.index + 1) % 3 === 0) {
                return `<div class="news-card third-news-card img" data-card-id="${cardId}">
                <img src="${article.urlToImage}" class="news-img" alt="" />
                        <a href="${article.url}" target="_blank">
                <h1 class="card-title">${article.title}</h1>
                        </a>
                <button class="fav-btn"> <i class="fa-regular fa-bookmark fav-icon"></i></button>
                </div>`;
            } else {
                return `<div class="news-card" data-card-id="${cardId}">
                <img src="${article.urlToImage}" class="news-img" alt="" />
                <h1 class="card-title">${article.title}</h1>
                <p class="card-desc">
                        ${getFirstSentence(article.content.replace(/(<([^>]+)>)/gi, ""))}
                        <a href="${article.url}" target="_blank" class="read-more">Read more..</a>
                        </p>
                <button class="fav-btn"> <i class="fa-regular fa-bookmark fav-icon"></i></button>
                </div>`;
            }
        })
        .join("");
        updateFavoriteIcons()
    } catch (error) {
        console.error("Data could not be loaded:", error.message);
    }
}


searchBtn.addEventListener("click", function (event) {
    event.preventDefault();
    const searchQuery = searchBar.value;
    fetchData(searchQuery);
});

document.addEventListener("DOMContentLoaded", function () {
    searchBtn = document.querySelector(".search-btn"); 
    searchBtn.addEventListener("click", function (event) {
        event.preventDefault();
        const searchQuery = searchBar.value;
        fetchData(searchQuery);
        
    });
});

function checkFilters(query, category) {
    if (!query && !category) {
        const Link = `https://newsapi.org/v2/everything?domains=bbc.co.uk&from=${yesterday}&to=${yesterday}&apiKey=${newAPI}`;
        return Link;
    } else if (!query && category) {
        const Link = `https://newsapi.org/v2/top-headlines/sources?&country=gb&category=${category}&apiKey=${newAPI}`;
        return Link;
    } else {
        const Link = `https://newsapi.org/v2/everything?q=${query}&domains=bbc.co.uk&from=${yesterday}&to=${yesterday}&apiKey=${newAPI}`;
        return Link;
    }
}

export { fetchData };



//get query and category choice

// `https://newsdata.io/api/1/news?apikey=${APIkey}`

// import axios from "axios";

// `<div class="news-card">
//         <img src="${articles.urlToImage}" alt="" />
//         <h1 class="card-title">${articles.title}</h1>
//         <p class="card-desc">
//         ${articles.content}
//         </p>
//         </div>`

//WHAT TO DO

/* 
Make search query = "q={searchQuery}"
Make a country bar? 



*/

//make search query look in object and display objects w same word in title
