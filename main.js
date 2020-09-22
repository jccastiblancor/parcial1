url_burgers =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

var cardscontent = document.getElementById("cards");
var amount = document.getElementById("amount");
var json;
var cart = [];
var total = 0;

const resume = () => {
  console.log("resumen");
};

const renderAmount = () => {
  amount.innerHTML = `<p>${total}</p>`;
};

const addToCart = (name, price) => {
  cart.push(name, price);
  total += 1;
  renderAmount();
};

const renderCards = (num) => {
  cardscontent.innerHTML = "";
  console.log(num);
  const max_cards = 4;
  var count = 0;
  json[num].products.map((item) => {
    if (count < 4) {
      cardscontent.innerHTML += `
        <div class="card" style="width: 18rem;"> 
          <img class="card-img-top" src="${item.image}" alt="Card image cap" />
          <div class="card-body">
            <div class="card-content">
              <h5 class="card-title">${item.name}</h5>
              <p class="card-text">${item.description}</p>
              <p class="card-text card-bold">$ ${item.price}</p>
            </div>
            <button onclick="addToCart('${item.name}', ${item.price})" type="button" class="btn btn-dark">Add to car</button>
          </div>
        </div>`;
    }

    count += 1;
  });
};

fetch(url_burgers)
  .then((resp) => resp.json())
  .then((data) => {
    json = data;

    renderCards(0);
    renderAmount();
  });
