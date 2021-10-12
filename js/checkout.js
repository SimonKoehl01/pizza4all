window.onload = function() {
  var cart = JSON.parse(sessionStorage.getItem("cart"));
  parseCheckoutListHTML(cart);
}
function parseCheckoutListHTML(menuData) {

  const menu = document.getElementById("contentContainer");
  const contentList = document.getElementById("contentList");
  contentList.classList.add("contentListDiv");
  while(menu.lastChild) {
    menu.removeChild(menu.firstChild);
  }
  while(contentList.lastChild) {
    contentList.removeChild(contentList.firstChild);
  }
  var totalPrice = 0;
  var multipliers = [];
  for(var i = 0; i < menuData.length; i++) {
    multipliers.push(1);
  }
  for(var i = 0; i < menuData.length; i++) {
    //menuItemDiv
    const menuItemDiv = document.createElement("div");
    menuItemDiv.classList.add("menuItemDiv");
    //menuItemContainer
    const menuItemContainer = document.createElement("div");
    menuItemContainer.classList.add("checkOutListContainer");
    //menuItem
    const menuItem = document.createElement("div");
    menuItem.classList.add("menuItem");
    //menuItemHead
    const menuItemHead = document.createElement("div");
    menuItemHead.classList.add("menuItemHead");
    //menuText
    const menuText = document.createElement("p");
    menuText.classList.add("menuText");
    menuText.textContent = menuData[i].name;
    const menuTextPrice = document.createElement("p");
    menuTextPrice.classList.add("menuText");
    menuTextPrice.textContent = menuData[i].price + " €";
    menuItemHead.appendChild(menuText);
    menuItemHead.appendChild(menuTextPrice);
    menuItem.appendChild(menuItemHead);
    //Quantity
    const quantityButton = document.createElement("input");
    quantityButton.type = "number";
    quantityButton.min = "1";
    quantityButton.value = "1";
    quantityButton.id = i + ";" + menuData[i].menu_id;
    quantityButton.classList.add("quantityButton");
    quantityButton.addEventListener('change', function(e) {
      totalPrice = 0;
      multipliers[e.srcElement.id.split(";")[0]] = e.srcElement.value;
      for(var j = 0; j < menuData.length; j++) {
        totalPrice += parseInt(multipliers[j]) * menuData[j].price;
      }
      total.innerHTML = "Total: " + Number(totalPrice).toFixed(2);
    });
    //removeButton
    const removeButton = document.createElement("button");
    removeButton.classList.add("cartButton");
    removeButton.id = i;
    removeButton.innerHTML = "❌";
    menuItemContainer.appendChild(menuItem);
    menuItemContainer.appendChild(quantityButton);
    menuItemDiv.appendChild(menuItemContainer);
    menuItemDiv.appendChild(removeButton);
    contentList.appendChild(menuItemDiv);
    menu.appendChild(contentList);
    removeButton.onclick = e => {
      var cart = JSON.parse(sessionStorage.getItem("cart"));
      cart.splice(e.srcElement.id, 1);
      sessionStorage.setItem("cart", JSON.stringify(cart));
      parseCheckoutListHTML(cart);
    };
  }
  menu.appendChild(contentList);
  const totalDiv = document.createElement("div");
  totalDiv.classList.add("totalDiv");
  const total = document.createElement("p");
  for(var j = 0; j < menuData.length; j++) {
    totalPrice += parseInt(multipliers[j]) * menuData[j].price;
  }
  total.innerHTML = "Total: " + Number(totalPrice).toFixed(2);
  totalDiv.appendChild(total);
  menu.appendChild(totalDiv);
}
function postOrder(form) {
  var c = new Customer(form);
  console.log(c);
  var quantities = document.getElementsByClassName("quantityButton");
  var orderItems = [];
  for(var i = 0; i < quantities.length; i++) {
    orderItems.push(new OrderItem(quantities[i].id.split(";")[1], quantities[i].value));
  }
  var discountCode = form[form.length-1];
  var order = new Order(c, orderItems);
  if(discountCode != "") {
    order.setDiscountCode(discountCode);
  }
  console.log(order);
  var result = document.querySelector('.result');
  // Creating a XHR object
  let xhr = new XMLHttpRequest();
  let url = "https://13.80.175.39:5000/order";
  // open a connection
  xhr.open("POST", url, true);
  // Set the request header i.e. which type of content you are sending
  xhr.setRequestHeader("Content-Type", "application/json");
  // Create a state change callback
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {

      // Print received data from server
      sessionStorage.clear();
      sessionStorage.setItem("ResponseText", this.responseText);
      window.location.replace("success.html");
    }
    else if (xhr.readyState === 4 && xhr.status === 400) {
      alert(JSON.parse(this.responseText).result);
    }
  };
  // Sending data with the request
  xhr.send(JSON.stringify(order))
}
class Order {
  constructor(customer, orderItems) {
    this.customer_info = customer;
    this.order_items = orderItems;
    this.discount = -1;
  }
  setDiscountCode(discountCode) {
    this.discountCode = discountCode;
  }
}
class OrderItem {
  constructor(menu_item_id, quantity) {
    this.menu_item = menu_item_id;
    this.quantity = quantity;
  }
}
class Customer {
  constructor(form) {
    this.c_first_name = form[0].value;
    this.c_last_name = form[3].value;
    this.c_email = form[1].value;
    this.c_phone = form[4].value;
    this.c_street = form[2].value;
    this.c_zip_code = form[5].value;
  }
}
