'use strict';

console.log('Starting up');

function initPortPage() {
    renderPortItem();
}

function renderPortItem() {
    var items = getPortItems();
    var currCount = 0;
    var strHTML = items.map(function(item) {
        return `<div class="col-md-4 col-sm-6 portfolio-item item${++currCount}">
                    <a class="portfolio-link" data-toggle="modal" onclick="renderPortModal('${currCount}')" href="#portfolioModal">
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

function renderPortModal(num) {
    var strHTML = `
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <div class="modal-body">
                            <!-- Project Details Go Here -->
                                <h2>Project Name</h2>
                                <p class="item-intro text-muted">Lorem ipsum dolor sit amet consectetur.</p>
                                <img class="img-fluid d-block mx-auto" src="img/portfolio/0${num}-full.jpg" alt="">
                                <p>Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate,
                                maiores repudiandae, nostrum, reiciendis facere nemo!</p>
                                <ul class="list-inline">
                                    <li>Date: January 2017</li>
                                    <li>Client: Threads</li>
                                    <li>Category: Illustration</li>
                                </ul>
                                <button class="btn btn-primary" data-dismiss="modal" type="button">
                    <i class="fa fa-times"></i>
                    Close Project</button>
                            </div>
                        </div>
                    </div>
                </div>`
    var elModal = document.querySelector('.modal-container');
    console.log('elmodal is:', elModal)
    elModal.innerHTML = strHTML;
}