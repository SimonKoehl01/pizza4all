window.onload = function() {
  var orderConfirmation = JSON.parse(sessionStorage.getItem("ResponseText"));
  var contentView = document.getElementById("contentContainer");
  var h2 = document.createElement("h2");
  h2.textContent = "Thank you for ordering at Pizza4All!";

  contentView.appendChild(h2);
  var info = document.createElement("p");
  info.classList.add("info");
  info.textContent = "Your order is being processed. For status updates and cancellation please use your order id: " + orderConfirmation.orderId;
  if(orderConfirmation.text != " ") {
    info.textContent = info.textContent + ". \n\n" + orderConfirmation.text;
  }
  contentView.appendChild(info);
  sessionStorage.clear();
}
