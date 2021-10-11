function addToCart(e) {
  var cart = JSON.parse(sessionStorage.getItem("cart"));
  var requestedObject = data[parseInt(e.srcElement.id)-1];
  if(cart == null) {
    cart = [requestedObject];
  }
  else if(cart.filter(function(e) { return e.name === requestedObject.name; }).length == 0){
    cart.push(requestedObject);
    console.log(cart);
  }
  parseCartHTML(cart);
  sessionStorage.setItem("cart", JSON.stringify(cart));
}
function checkOut() {
    window.location.replace("http://localhost/html/order.html");
}

function parseCartHTML(menuData) {
  if(menuData != null) {
    var cartDiv = document.getElementById("cartDiv");
    while (cartDiv.lastElementChild) {
      cartDiv.removeChild(cartDiv.lastElementChild);
    }
    for(var i = 0; i < menuData.length; i++) {
      //menuItemContainer
      const menuItemContainer = document.createElement("div");
      menuItemContainer.classList.add("menuItemContainer");
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
      cartDiv.appendChild(menuItem)
      menuItemContainer.appendChild(menuItem);
      cartDiv.appendChild(menuItemContainer);
    }
  }

  //🍺
  //☕
  //🧃
}
