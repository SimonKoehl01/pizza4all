data = null;
window.onload = function fetch() {
  //Create XHR object
  var xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:5000/menu/side_item/Dessert", true);
  xhr.onload = function() {
    if(this.status == "200") {
      data = JSON.parse(this.responseText);
      parseHTML(data);
    }
  };
  xhr.onerror = function() {
    console.log("Something went wrong...");
  }
  xhr.send();
  var cart = JSON.parse(sessionStorage.getItem("cart"));
  parseCartHTML(cart);
}

function parseHTML(menuData) {
  const menu = document.getElementById("menuContent");
  for (var i = 0; i < menuData.length; i++) {
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
    //menu description
    const menuDescription = document.createElement("div");
    menuDescription.classList.add("menuDescription");
    const menuDescriptionTextIcon = document.createElement("p");
    if(menuData[i].name==='Ice-Cream' ) {
      menuDescriptionTextIcon.textContent = "🍦";
    }
    else {
      menuDescriptionTextIcon.textContent = "🍰";
    }
    //orderButton
    const cartButton = document.createElement("button");
    cartButton.classList.add("cartButton");
    cartButton.id = menuData[i].id;
    cartButton.innerHTML = "🛒";
    cartButton.onclick = addToCart;
    menuDescription.appendChild(menuDescriptionTextIcon);
    menuItem.appendChild(menuDescription);
    menuItemContainer.appendChild(menuItem);
    menuItemContainer.appendChild(cartButton);
    menu.appendChild(menuItemContainer);
  }
}
