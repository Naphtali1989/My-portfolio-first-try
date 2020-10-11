'use strict';

var gNames = [
    { name: 'Blood Elf female', faction: 'Horde' },
    { name: 'Dark Iron Dwarf female', faction: 'Alliance' },
    { name: 'Dreanei female', faction: 'Alliance' },
    { name: 'Dwarf female', faction: 'Alliance' },
    { name: 'Gnome female', faction: 'Alliance' },
    { name: 'Goblin female', faction: 'Horde' },
    { name: 'Highmountain Tauren female', faction: 'Horde' },
    { name: 'Human female', faction: 'Alliance' },
    { name: 'Kul Tiran female', faction: 'Alliance' },
    { name: 'Lightforged Dreanei female', faction: 'Alliance' },
    { name: 'Maghar Orc female', faction: 'Horde' },
    { name: 'Mecha-Gnome female', faction: 'Alliance' },
    { name: 'Nightborn female', faction: 'Horde' },
    { name: 'Orc female', faction: 'Horde' },
    { name: 'Panda female', faction: 'Neutral' },
    { name: 'Tauren female', faction: 'Horde' },
    { name: 'Troll female', faction: 'Horde' },
    { name: 'Undead female', faction: 'Horde' },
    { name: 'Void Elf female', faction: 'Alliance' },
    { name: 'Vulpera female', faction: 'Horde' },
    { name: 'Worgen female', faction: 'Alliance' },
    { name: 'Zandalary Troll female', faction: 'Horde' },
    { name: 'Blood Elf male', faction: 'Horde' },
    { name: 'Dark Iron Dwarf male', faction: 'Alliance' },
    { name: 'Dreanei male', faction: 'Alliance' },
    { name: 'Dwarf male', faction: 'Alliance' },
    { name: 'Gnome male', faction: 'Alliance' },
    { name: 'Goblin male', faction: 'Horde' },
    { name: 'Highmountain Tauren male', faction: 'Horde' },
    { name: 'Human male', faction: 'Alliance' },
    { name: 'Kul Tiran male', faction: 'Alliance' },
    { name: 'Lightforged Dreanei male', faction: 'Alliance' },
    { name: 'Maghar Orc male', faction: 'Horde' },
    { name: 'Mecha-Gnome male', faction: 'Alliance' },
    { name: 'Nightborn male', faction: 'Horde' },
    { name: 'Orc male', faction: 'Horde' },
    { name: 'Panda male', faction: 'Neutral' },
    { name: 'Tauren male', faction: 'Horde' },
    { name: 'Troll male', faction: 'Horde' },
    { name: 'Undead male', faction: 'Horde' },
    { name: 'Void Elf male', faction: 'Alliance' },
    { name: 'Vulpera male', faction: 'Horde' },
    { name: 'Worgen male', faction: 'Alliance' },
    { name: 'Zandalary Troll male', faction: 'Horde' },

]

var gPrices = [100, 150, 200, 250, 300];

function init() {
    createPrices(gNames, gPrices);
    createClassName(gNames);
    renderLines(gNames);
}

function renderLines(names) {
    var strHTML = '';
    for (var i = 0; i < names.length; i++) {
        strHTML += `<tr class="row row-${names[i].className}">
                    <td class="cell">
                        <div onclick="toggleLike(this, '.row-${names[i].className} .inner-cell')" class="check checkbox"></div>
                    </td>
                    <td class="cell race">
                        <div class="inner-cell ${names[i].className}"></div>
                    </td>
                    <td class="cell name">${names[i].name} <span class="${names[i].faction.toLowerCase()}">${names[i].faction}</span>
                    </td>
                    <td class="cell power ${names[i].className}-power">
                        <button onclick="addItem(this, '.${names[i].className}-power span', '.row-${names[i].className} .price span', ${names[i].price})" 
                        class="plus">+</button> 
                        Items: <span>0</span>
                        <button onclick="subtractItem(this, '.${names[i].className}-power span', '.row-${names[i].className} .price span', ${names[i].price})" 
                        class="minus">-</button>
                        <button onclick="zeroItems('.${names[i].className}-power span', '.row-${names[i].className} .price span', ${names[i].price})" 
                        class="zero">X</button>
                    </td>
                    <td class="cell price"><span>${names[i].price}</span> <img class="coins" src="imgs/coins.svg">
                    </td>
                    </tr>`;
    }

    var elTable = document.querySelector('.t-content');
    elTable.innerHTML = strHTML;
}

function createPrices(names, prices) {
    for (var i = 0; i < names.length; i++) {
        var randPrice = prices[getRandomInt(0, prices.length)];
        names[i].price = randPrice;
    }
}

function createClassName(names) {
    for (var i = 0; i < names.length; i++) {
        var className = names[i].name.toLowerCase();
        className = className.replaceAll(' ', '-');
        names[i].className = className;
    }
}

function toggleLike(el, iconClassName) {
    el.classList.toggle('liked');
    var elIcon = document.querySelector(iconClassName);
    elIcon.classList.toggle('animated');
    setTimeout(function() {
        elIcon.classList.toggle('animated');
    }, 1000);

}

function zeroItems(tdClassName, priceClassName, price) {
    var elSpan = document.querySelector(tdClassName);
    var currAmount = elSpan.innerText;
    if (currAmount == 0) return;

    var elPriceSpan = document.querySelector(priceClassName);

    elPriceSpan.innerText = price;
    elSpan.innerText = 0;
}

function addItem(el, tdClassName, priceClassName, price) {
    var elSpan = document.querySelector(tdClassName);
    var currAmount = elSpan.innerText;

    var elPriceSpan = document.querySelector(priceClassName);
    var currPrice = parseInt(elPriceSpan.innerText);

    elSpan.innerText = parseInt(currAmount) + 1;
    elPriceSpan.innerText = parseInt(currPrice) + parseInt(price);
}

function subtractItem(el, tdClassName, priceClassName, price) {
    var elSpan = document.querySelector(tdClassName);
    var currAmount = elSpan.innerText;
    if (currAmount == 0) return;

    var elPriceSpan = document.querySelector(priceClassName);
    var currPrice = elPriceSpan.innerText

    elPriceSpan.innerText = parseInt(currPrice) - price;
    elSpan.innerText = parseInt(currAmount) - 1;
}

function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min);
}