// Initiate counts
let cookieCount = 0;
let bakeryCount = 0;

// Cache the elements
const countDisplay_div = document.querySelector(".count_board");
const cookieDisplay_div = document.querySelector(".cookie_display");
const cookieCount_span = document.getElementById("cookie_count");
const bakeryDisplay_div = document.querySelector(".bakery_display");
const bakeryCount_span = document.getElementById("bakery_count");
const stage_div = document.querySelector(".stage");
const bakeButton = document.getElementById("bake_button");
const upgrades_div = document.querySelector(".upgrades");
const bakeryButton = document.getElementById("bakery_button");
const stopButton = document.getElementById("stop_button");
const cookiesNeeded_span = document.getElementById("cookies_needed");
const message_div = document.querySelector(".message > p");

getCookiesNeeded();
updateInventory();

bakeButton.addEventListener("click", function () {
  add_cookie();
  if (message_div.innerHTML != "") {
    message_div.innerHTML = ""; // Clear the message if not empty
  }
});

bakeryButton.addEventListener("click", function () {
  add_bakery();
});

function add_cookie() {
  cookieCount++;
  updateInventory();
}

function bakeCookie() {
  cookieCount += bakeryCount;
  updateInventory();
}

function getCookiesNeeded() {
  let cookiesNeeded = 10 * (bakeryCount + 1);
  cookiesNeeded_span.innerHTML = cookiesNeeded;
  return cookiesNeeded;
}

function add_bakery() {
  let cookiesNeeded = getCookiesNeeded();
  if (cookieCount < cookiesNeeded) {
    if (cookiesNeeded - cookieCount == 1) {
      message_div.innerHTML = `You need 1 more cookie!`;
    } else {
      message_div.innerHTML = `You need ${
        cookiesNeeded - cookieCount
      } more cookies!`;
    }
  } else {
    bakeryCount++;
    cookieCount -= cookiesNeeded;
    getCookiesNeeded();
    updateInventory();
  }
}

function updateInventory() {
  cookieCount_span.innerHTML = cookieCount;
  bakeryCount_span.innerHTML = bakeryCount;
}
