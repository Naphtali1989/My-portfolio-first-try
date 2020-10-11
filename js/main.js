'use strict';

console.log('Starting up');

function initPortPage() {
    renderPortItem();
}

function renderPortItem() {
    var items = getPortItems();
    var currCount = 0;
    var strHTML = items.map(function(item) {
        return `<div class="col-md-4 col-sm-6 portfolio-item">
                    <a class="portfolio-link" data-toggle="modal" href="#portfolioModal${++currCount}">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content">
                                <i class="fa fa-plus fa-3x"></i>
                            </div>
                        </div>
                        <img class="img-fluid" src="img/portfolio/0${currCount}-thumbnail.jpg" alt="">
                    </a>
                    <div class="portfolio-caption">
                        <h4>${item.title}</h4>
                        <p class="text-muted">${item.desc}</p>
                    </div>
                </div>`;
    })
    var elPortItems = document.querySelector('.row1');
    elPortItems.innerHTML = strHTML.join('');
}