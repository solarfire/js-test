var _data;
const _dataFile = 'db.json';

/**
Initalise page.
*/
function init() {
  _data = _loadJson(_dataFile);
  _renderLevelSelect();
  _renderPriceFilter();
  const potions = _data.potions;
  const potionTemplate = `

      ${potions.map(potion =>
              `<section class="sectionPotion">
                  <img src='images/${potion.id}.png'/>
                  <header><span class="name">${potion.name}</header>
                  <p>Price <span class="price">${potion.price}</span>
                  <p>Level <span class="level ">${potion.required_level}</span>
                  <p><span class="tags">${potion.tags}</span>
              </section>`
       ).join('')}`;

  document.getElementById("potion-list").innerHTML = potionTemplate;
}


function _loadJson(_file) {
  var _json;
  var xmlHttpRequest = new XMLHttpRequest();
  xmlHttpRequest.overrideMimeType("application/json");
  xmlHttpRequest.open('GET', _file, false);
  xmlHttpRequest.onreadystatechange = function() {
    if (xmlHttpRequest.readyState == 4 && xmlHttpRequest.status == "200") {
      _json = JSON.parse(xmlHttpRequest.responseText);
    }
  };
  xmlHttpRequest.send(null);
  return _json;
}

/**
Initialise the Level Select filter using the levels from the dataset.
*/
function _renderLevelSelect() {
  var levels = new Array();
  for (var i = 0; i < _data.potions.length; i++) {
    var level = _data.potions[i].required_level;
    if (!levels.includes(level)) {
      levels.push(level);
    }
  }

  var select = document.getElementById('level');
  for (var i = 0; i < levels.length; i++) {
    var opt = document.createElement('option');
    opt.value = levels[i];
    opt.innerHTML = levels[i];
    select.appendChild(opt);
  }
}

/**
Initialise the Price filter using the min and max prices from the dataset.
*/
function _renderPriceFilter() {
  var min = _data.potions[0].price;
  var max = _data.potions[0].price;
  for (var i = 1; i < _data.potions.length; i++) {
    var price = _data.potions[i].price;
    if (price < min) {
      min = price;
    }
    if (price > max) {
      max = price;
    }
  }

  document.getElementById('priceFrom').setAttribute('min', min);
  document.getElementById('priceFrom').setAttribute('max', max);
  document.getElementById('priceFrom').value = min;
  document.getElementById('priceTo').setAttribute('min', min);
  document.getElementById('priceTo').setAttribute('max', max);
  document.getElementById('priceTo').value = max;
}


/**
Search and filter by name.
FIXME this compares the whole innerText.  As name is first,  it will work.  But not efficient.
*/
function sortByName() {

  var list = document.querySelector('#potion-list');
  var sortDirection = Number(document.getElementById('sortNameDirection').value);
  document.getElementById('sortNameDirection').value = sortDirection * -1;
  [...list.children]
  .sort((a, b) => a.innerText > b.innerText ? sortDirection : sortDirection * -1)
    .map(node => list.appendChild(node));

}
/**
Search and filter by Name
*/
function searchName() {
  _searchText(document.getElementById('searchName').value, 'name');
}

/**
Search and filter by Tags
*/
function searchTags() {
  _searchText(document.getElementById('searchTags').value, 'tags');
}

/**
Generic Text search.
@param searchValue search string.
@param element class
*/
function _searchText(searchValue, elementClass) {
  var filter, div, nodes;
  filter = searchValue.toUpperCase();
  div = document.getElementById("potion-list");
  nodes = div.getElementsByClassName(elementClass);
  for (i = 0; i < nodes.length; i++) {
    if (nodes[i].innerText.toUpperCase().indexOf(filter) > -1) {
      nodes[i].parentNode.parentNode.style.display = "";
    } else {
      nodes[i].parentNode.parentNode.style.display = "none";
    }
  }
}

/**
Search and filter by Price.
*/
function searchPrice() {
  var from, to, ul, li, a;
  from = document.getElementById('priceFrom');
  to = document.getElementById('priceTo');
  if (from.validity.valid && from.validity.valid) {
    ul = document.getElementById("potion-list");
    li = ul.getElementsByClassName('price');
    for (var i = 0; i < li.length; i++) {
      a = Number(li[i].textContent);
      if (a >= from.value && a <= to.value) {
        li[i].parentNode.parentNode.style.display = "";
      } else {
        li[i].parentNode.parentNode.style.display = "none";
      }
    }
  }
}

/**
Search and filter by Level.
*/
function searchLevel() {

  var selected = document.getElementById('level').value;
  var from, to, ul, li, a, i;
  ul = document.getElementById("potion-list");
  li = ul.getElementsByClassName('level');
  if (selected === "") {
    for (i = 0; i < li.length; i++) {
      li[i].parentNode.parentNode.style.display = "";
    }
  } else {
    for (i = 0; i < li.length; i++) {
      a = li[i].textContent;
      if (a == selected) {
        li[i].parentNode.parentNode.style.display = "";
      } else {
        li[i].parentNode.parentNode.style.display = "none";
      }
    }
  }
}
