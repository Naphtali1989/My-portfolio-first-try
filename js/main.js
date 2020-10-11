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
                    <a class="portfolio-link" data-toggle="modal" onclick="renderPortModal('${item.id}')" href="#portfolioModal">
                        <div class="portfolio-hover">
                            <div class="portfolio-hover-content">
                                <i class="fa fa-plus fa-3x"></i>
                            </div>
                        </div>
                        <img class="img-fluid" style="max-height: 135px;" src="img/portfolio/${item.imgUrl}-thumbnail.jpg" alt="">
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

function renderPortModal(id) {
    var item = getPortItemById(id);
    var strHTML = `
                <div class="row">
                    <div class="col-lg-8 mx-auto">
                        <div class="modal-body">
                            <!-- Project Details Go Here -->
                                <h2>${item.title}</h2>
                                <p class="item-intro text-muted">${item.desc}</p>
                                <img class="img-fluid d-block mx-auto" src="img/portfolio/${item.imgUrl}-full.jpg" alt="">
                                <p>${item.fullDesc}</p>
                                <ul class="list-inline">
                                    <li>Date: september 2020</li>
                                    <li>link: <a href="${item.url}">${item.name}</a></li>
                                    <li>Category: ${item.category}</li>
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

function renderContactModal() {
    var strHTML = `<form>
                    <div class="form-group">
                    <label for="userEmail">Email address</label>
                    <input type="email" class="form-control" id="userEmail" placeholder="name@example.com">
                    </div>
                    
                    <div class="form-group"> 
                    <label for="subejctText">Subject:</label>
                    <textarea class="form-control subject" id="subejctText" rows="1"></textarea>
                    <label for="bodyText">What would you like to tall me?</label>
                    <textarea class="form-control body" id="bodyText" rows="10"></textarea>
                    </div>

                    <button type="button" class="btn btn-primary" onclick="openContactMail()">Submit</button>

                </form>`
    var elContactModal = document.querySelector('#contact');
    console.log('the el contact modal', elContactModal)
    elContactModal.innerHTML = strHTML;
    openCanvas();
}

function openContactMail() {
    var elSubject = document.querySelector('.subject')
    var elBody = document.querySelector('.body')
    window.open(`https://mail.google.com/mail/?view=cm&fs=1&to=naphtali.r.89@gmail.com&su=${elSubject.value}&body=${elBody.value}`);
}