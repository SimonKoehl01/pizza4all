function getOrderStatus(form) {
  var order_id = form[0].value;
  var xhr = new XMLHttpRequest();
  //Get status
  xhr.open("GET", "https://13.80.175.39:5000/order/get_status/" + parseInt(order_id), true);
  xhr.onload = function() {
    if(this.status == "200") {
      data = JSON.parse(this.responseText);
      parseStatusHTML(data);
    }
  };
  xhr.onerror = function() {
    console.log("Something went wrong...");
  }
  xhr.send();
}
function parseStatusHTML(data) {

  var contentContainer = document.getElementById("contentContainer");
  while(contentContainer.lastChild) {
    contentContainer.removeChild(contentContainer.firstChild);
  }
  var statusData = document.createElement("p");
  statusData.textContent = "Status: " + data.status;
  var deliveryTime_data = document.createElement("p");
  deliveryTime_data.textContent = "Delivery time: " + data.delivery_time;
  deliveryTime_data.classList.add("content", "text-left");
  statusData.classList.add("content", "text-left");
  contentContainer.appendChild(statusData);
  contentContainer.appendChild(deliveryTime_data);
  contentContainer.style = "display: flex;"
}
function cancelOrder(order_id) {

  fetch("https://13.80.175.39:5000/cancel_order/" + parseInt(order_id))
    .then(response => {
      if(response.status == 400) {
        response.json().then(data => alert(data.result));
      }
      else {
        response.json().then(data => alert("Your order has been cancelled!"));
      }
    });
}
