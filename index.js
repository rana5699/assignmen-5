// Get all seat elements
const seats = document.querySelectorAll(".seat");
const totalSeatsNumber = document.getElementById("total-seats");
const seatsContainer = document.getElementById("seats-container");
const totalPrice = document.getElementById("total-price");
const totalSelected = document.getElementById("total-selected");
const applyBtn = document.getElementById("apply-btn");
const cuponCode = document.getElementById("cupon-code");
const discoundCode = document.getElementById("discound-code");
const discoundField = document.getElementById("discount-field");
const totalDiscound = document.getElementById("total-discount");
const grandTotal = document.getElementById("grand-total");
const message = document.getElementById("wrong-cupon");

// Add click event listener to each seat
let total = 0;
let totalSelect = 0;
let totalSeats = seats.length;

seats.forEach((seat) => {
  // totalseats number
  totalSeatsNumber.innerText = totalSeats;

  seat.addEventListener("click", () => {
    // Check if the seat is already selected
    if (seat.style.backgroundColor === "rgb(29, 209, 0)") {
      alert("Already selected All");
      return;
    }

    // Limit check 4 seats only
    if (totalSelect === 4) {
      alert("Select only 4 seats");
      return;
    }

    // total selected seats
    totalSelect++;
    totalSelected.innerText = totalSelect;

    // set background color
    seat.style.backgroundColor = "rgb(29, 209, 0)";
    seat.style.color = "white";
    const price = 550;
    const seatName = seat.innerText;

    // seats number
    totalSeats--;
    totalSeatsNumber.innerText = totalSeats;

    // Create elements dynamically
    const div = document.createElement("div");
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    const seatNameElement = document.createElement("p");
    seatNameElement.innerText = seatName;
    const classElement = document.createElement("p");
    classElement.innerText = "Economy";
    const priceElement = document.createElement("p");
    priceElement.innerText = price;

    // Append elements to div
    div.appendChild(seatNameElement);
    div.appendChild(classElement);
    div.appendChild(priceElement);

    // Append div to seatsContainer
    seatsContainer.appendChild(div);

    // Update total price
    total += parseInt(priceElement.innerText);
    totalPrice.innerText = total;

    // Check if the total selected seats reach 4
    if (totalSelect === 4) {
      applyBtn.disabled = false;
    }
  });
});

// Listen for changes in the coupon code input field
cuponCode.addEventListener("input", (event) => {
  const code = event.target.value;
  applyBtn.addEventListener("click", () => {
    let discount = 0;

    if (code === "NEW15" || code === "Couple20") {
      if (code === "NEW15") {
        discount = (parseInt(total) * 15) / 100;
      } else if (code === "Couple20") {
        discount = (parseInt(total) * 20) / 100;
      }
      // Update the display with the discount
      totalDiscound.innerText = discount;
      discoundField.classList.remove("hidden");
      discoundCode.classList.add("hidden");
      message.classList.add("hidden");
    } else {
      message.classList.remove("hidden");
      grandTotal.innerText = 0;
      return;
    }
    // Calculate grand total after applying discount
    const grand = parseInt(total) - discount;
    grandTotal.innerText = grand;
  });
});
