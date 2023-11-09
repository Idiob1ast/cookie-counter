// Initiate counts
let cookieCount = 0;
let bakeryCount = 0;
let cookieTimer;

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
const cps_span = document.getElementById("cps");
const message_div = document.querySelector(".message > p");

getCookiesNeeded();
updateInventory();

bakeButton.addEventListener("click", function () {
  add_cookie();
  if (message_div.innerHTML != "") {
    message_div.innerHTML = ""; // Clear the message if not empty
  }
  if (bakeryCount < 1 && cookieCount >= 10) {
    bakeryButton.style.display = "initial";
  }
});

bakeryButton.addEventListener("click", function () {
  if (bakeryCount < 1) {
    bakeryDisplay_div.style.display = "initial";
  }
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

function startCookieTimer() {
  cookieTimer = setInterval(bakeCookie, 1000);
}

function stopCookieTimer() {
  clearInterval(cookieTimer);
}

function getCookiesNeeded() {
  let cookiesNeeded = 10 * (bakeryCount + 1);
  cookiesNeeded_span.innerHTML = cookiesNeeded;
  return cookiesNeeded;
}

function getCookiesPerSecond() {
  cps_span.innerHTML = bakeryCount;
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
    stopCookieTimer();
    bakeryCount++;
    cookieCount -= cookiesNeeded;
    getCookiesNeeded();
    getCookiesPerSecond();
    updateInventory();
    startCookieTimer();
  }
}

function updateInventory() {
  cookieCount_span.innerHTML = cookieCount;
  bakeryCount_span.innerHTML = bakeryCount;
}
