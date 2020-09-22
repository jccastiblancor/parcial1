url_burgers =
  "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json";

const content = document.getElementById("content");
const amount = document.getElementById("amount");
const title = document.getElementById("title");

const burguers = document.getElementById("burguers");
const tacos = document.getElementById("tacos");
const salads = document.getElementById("salads");
const desserts = document.getElementById("desserts");
const drinks = document.getElementById("drinks");
const shoppingCart = document.getElementById("cart");
const drop = document.getElementById("drop");

var json;
var cart = [];
var total = 0;
const tableHeaders = ["Item", "Qty.", "Description", "Unit Price", "Ammount"];

/*
Shopping cart methods
*/
const renderAmount = () => {
  amount.innerHTML = ` ${total} <p> items</p>`;
  if (total === 0) {
    amount.innerHTML = "";
  }
};

const addToCart = (name, price, description) => {
  var new_item = true;
  cart.forEach((item) => {
    if (item.name === name) {
      new_item = false;
      item.qty += 1;
    }
  });
  if (new_item) {
    cart.push({ name, price, description, qty: 1 });
  }
  total += 1;
  renderAmount();
};

const deleteOrder = () => {
  cart = [];
};

const renderRow = (row, data) => {
  tableData = document.createElement("TD");
  text = document.createTextNode(data);
  tableData.appendChild(text);
  row.appendChild(tableData);
};

const cancel = () => {
  console.log("cancel");
};

const confirm = () => {
  console.log(cart);
};

const renderOrderOptions = (tp) => {
  var optionsDiv = document.createElement("DIV");
  optionsDiv.classList.add("row");

  var optionsDiv1 = document.createElement("DIV");
  optionsDiv1.classList.add("col-6");
  var btnDiv = document.createElement("DIV");
  btnDiv.classList.add("col-6");
  btnDiv.classList.add("float-right");

  var optionsP = document.createElement("P");
  optionsP.appendChild(document.createTextNode(`Total $${tp.toFixed(2)}`));
  optionsP.classList.add("bold");

  var btn1 = document.createElement("BUTTON");
  btn1.addEventListener("click", function () {
    cancel();
  });
  btn1.appendChild(document.createTextNode("Cancel"));
  btn1.classList.add("btn");
  btn1.classList.add("btn-danger");
  btn1.setAttribute("data-toggle", "modal");
  btn1.setAttribute("data-target", "#delete_modal");

  var btn2 = document.createElement("BUTTON");
  btn2.addEventListener("click", function () {
    confirm();
  });
  btn2.appendChild(document.createTextNode("Confirm Order"));
  btn2.classList.add("btn");
  btn2.classList.add("btn-success");

  btnDiv.appendChild(btn1);
  btnDiv.appendChild(btn2);
  optionsDiv1.appendChild(optionsP);
  optionsDiv.appendChild(optionsDiv1);
  optionsDiv.appendChild(btnDiv);

  content.appendChild(optionsDiv);
};

const renderOrder = () => {
  title.innerHTML = "Order Detail";
  content.innerHTML = "";

  var table = document.createElement("TABLE");
  table.classList.add("table");
  table.classList.add("table-striped");
  var tableHead = document.createElement("THEAD");
  var tableRow = document.createElement("TR");

  // Table Header
  tableHeaders.map((header) => {
    var tableHeader = document.createElement("TH");
    var text = document.createTextNode(`${header}`);
    tableHeader.appendChild(text);
    tableRow.appendChild(tableHeader);
  });
  tableHead.appendChild(tableRow);

  // Table body
  var tableBody = document.createElement("TBODY");
  var totalPrice = 0;
  cart.map(({ qty, description, price }, index) => {
    tableRow = document.createElement("TR");

    renderRow(tableRow, `${index}`);
    renderRow(tableRow, `${qty}`);
    renderRow(tableRow, `${description}`);
    renderRow(tableRow, `${price}`);
    renderRow(tableRow, `${price * qty}`);

    tableBody.appendChild(tableRow);
    totalPrice += price * qty;
  });

  table.appendChild(tableBody);
  table.appendChild(tableHead);
  content.appendChild(table);

  renderOrderOptions(totalPrice);
};

/*
Menu methods
*/
const renderContent = (num) => {
  renderCards(num);
  renderTitle(num);
};

const renderTitle = (num) => {
  title.innerHTML = json[num].name;
};

const renderCards = (num) => {
  content.innerHTML = "";

  json[num].products.map(({ image, name, description, price }) => {
    var div = document.createElement("DIV");
    div.classList.add("card");
    div.classList.add("col-12");
    div.classList.add("col-md-3");
    var img = document.createElement("IMG");
    img.classList.add("card-img-top");
    img.setAttribute("src", `${image}`);
    img.setAttribute("alt", "card image");

    var div2 = document.createElement("DIV");
    div2.classList.add("card-body");

    var div3 = document.createElement("DIV");
    div3.classList.add("card-content");
    var h5 = document.createElement("H5");
    h5.classList.add("card-title");
    h5.appendChild(document.createTextNode(`${name}`));
    var p = document.createElement("P");
    p.classList.add("card-text");
    p.appendChild(document.createTextNode(`${description}`));
    var p2 = document.createElement("P");
    p2.classList.add("card-text");
    p2.classList.add("bold");
    p2.appendChild(document.createTextNode(`${price}`));

    var btn = document.createElement("BUTTON");
    btn.addEventListener("click", function () {
      addToCart(name, price, description);
    });
    btn.appendChild(document.createTextNode("Add to cart"));
    btn.classList.add("btn");
    btn.classList.add("btn-dark");

    div.appendChild(img);
    div3.appendChild(h5);
    div3.appendChild(p);
    div3.appendChild(p2);
    div2.appendChild(div3);
    div2.appendChild(btn);
    div.appendChild(div2);
    content.appendChild(div);
  });
};

/*
Back end connection
*/
fetch(url_burgers)
  .then((resp) => resp.json())
  .then((data) => {
    json = data;

    renderContent(0);
    renderAmount();

    burguers.addEventListener("click", function () {
      renderContent(0);
    });
    tacos.addEventListener("click", function () {
      renderContent(1);
    });
    salads.addEventListener("click", function () {
      renderContent(2);
    });
    desserts.addEventListener("click", function () {
      renderContent(3);
    });
    drinks.addEventListener("click", function () {
      renderContent(4);
    });

    shoppingCart.addEventListener("click", function () {
      renderOrder();
    });
    drop.addEventListener("click", function () {
      total = 0;
      deleteOrder();
      renderAmount();
      renderContent(0);
    });
  });
