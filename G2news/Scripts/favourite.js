function toggleFavourite(event) {
    if (event.target.matches('.fav-icon')) {
        const favIcon = event.target;
        const card = favIcon.closest('.news-card');
        const cardTitle = card.querySelector('.card-title').textContent;
        const cardId = card.dataset.cardId;

        let favouritesData = JSON.parse(localStorage.getItem('favourites')) || [];

        const existingIndex = favouritesData.findIndex(data => data.title === cardTitle);
        
        if (existingIndex !== -1) {
            // if an article with same title exists in LS, remove it! 
            favouritesData.splice(existingIndex, 1);
            favIcon.classList.remove("fa-solid");
            favIcon.classList.add("fa-regular");
        } else {
            // If it does not exist in LS, add it!
            const cardData = {
                id: cardId,
                title: cardTitle,
                imageUrl: card.querySelector('.news-img') ? card.querySelector('.news-img').src : '', 
                description: card.querySelector('.card-desc') ? card.querySelector('.card-desc').textContent : ''
            };
            favouritesData.push(cardData);
            favIcon.classList.remove("fa-regular");
            favIcon.classList.add("fa-solid");
        }

        localStorage.setItem('favourites', JSON.stringify(favouritesData));
        updateFavoriteIcons();
    }
}

export function updateFavoriteIcons() {
    const favButtons = document.querySelectorAll('.fav-icon');
    const favouritesData = JSON.parse(localStorage.getItem('favourites')) || [];

    favButtons.forEach(button => {
        const cardTitle = button.closest('.news-card').querySelector('.card-title').textContent;
        const isFavourite = favouritesData.some(data => data.title === cardTitle);
        if (isFavourite) {
            button.classList.add('fa-solid');
            button.classList.remove('fa-regular');
        } else {
            button.classList.remove('fa-solid');
            button.classList.add('fa-regular');
        }
    });
}

function displayFavourites() {
    const favouritesContainer = document.querySelector('.favourites-card-container');
    const favouritesData = JSON.parse(localStorage.getItem('favourites')) || [];
    
    if (favouritesContainer) {
        favouritesContainer.innerHTML = '';

        favouritesData.forEach(cardData => {
            const cardHtml = `
                <div class="news-card" data-card-id="${cardData.id}">
                    <img src="${cardData.imageUrl}" alt="" class="news-img" />
                    <h1 class="card-title">${cardData.title}</h1>
                    <p class="card-desc">${cardData.description}</p>
                    <button class="fav-btn"> <i class="fa-regular fa-bookmark fav-icon"></i></button>
                </div>`;
            favouritesContainer.insertAdjacentHTML('beforeend', cardHtml);
        });
    }
}

document.addEventListener("DOMContentLoaded", function () {
    document.addEventListener("click", toggleFavourite);
    displayFavourites();
    updateFavoriteIcons();
});
