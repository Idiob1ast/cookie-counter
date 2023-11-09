// Initiate counts
let cookieCount = 0;
let bakeryCount = 0;
let factoryCount = 0;
let cookieTimer;
let bakeryTimer;

// Cache the elements
const countDisplay_div = document.querySelector(".count_board");
const cookieDisplay_div = document.querySelector(".cookie_display");
const cookieCount_span = document.getElementById("cookie_count");
const bakeryDisplay_div = document.querySelector(".bakery_display");
const bakeryCount_span = document.getElementById("bakery_count");
const factoryDisplay_div = document.querySelector(".factory_display");
const factoryCount_span = document.getElementById("factory_count");
const stage_div = document.querySelector(".stage");
const bakeButton = document.getElementById("bake_button");
const upgrades_div = document.querySelector(".upgrades");
const bakeryButton = document.getElementById("bakery_button");
const stopButton = document.getElementById("stop_button");
const cookiesNeeded_span = document.getElementById("cookies_needed");
const cps_span = document.getElementById("cps");
const message_div = document.querySelector(".message > p");
const factoryButton = document.getElementById("factory_button");
const bakeriesNeeded_span = document.getElementById("bakeries_needed");
const bps_span = document.getElementById("bps");

getCookiesNeeded();
getBakeriesNeeded();
updateInventory();

bakeButton.addEventListener("click", function () {
  add_cookie();
  if (bakeryCount < 1 && cookieCount >= 10) {
    bakeryButton.style.display = "initial";
  }
});

bakeryButton.addEventListener("click", function () {
  if (bakeryCount < 1) {
    bakeryDisplay_div.style.display = "initial";
  }
  add_bakery();
  if (factoryCount < 1 && bakeryCount >= 5) {
    factoryButton.style.display = "initial";
  }
});

factoryButton.addEventListener("click", function () {
  if (factoryCount < 1) {
    factoryDisplay_div.style.display = "initial";
  }
  add_factory();
});

function add_cookie() {
  cookieCount++;
  if (message_div.innerHTML != "") {
    message_div.innerHTML = ""; // Clear the message if not empty
  }
  updateInventory();
}

function bakeCookie() {
  cookieCount += bakeryCount;
  updateInventory();
}

function buildBakery() {
  bakeryCount += factoryCount;
  updateInventory();
}

function startCookieTimer() {
  cookieTimer = setInterval(bakeCookie, 1000);
}

function stopCookieTimer() {
  clearInterval(cookieTimer);
}

function startBakeryTimer() {
  bakeryTimer = setInterval(buildBakery, 1000);
}

function stopBakeryTimer() {
  clearInterval(bakeryTimer);
}

function getCookiesNeeded() {
  let cookiesNeeded = 10 * (bakeryCount + 1);
  cookiesNeeded_span.innerHTML = cookiesNeeded;
  return cookiesNeeded;
}

function getBakeriesNeeded() {
  let bakeriesNeeded = 5 * (factoryCount + 1);
  bakeriesNeeded_span.innerHTML = bakeriesNeeded;
  return bakeriesNeeded;
}

function add_bakery() {
  if (message_div.innerHTML != "") {
    message_div.innerHTML = ""; // Clear the message if not empty
  }
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
    updateInventory();
    startCookieTimer();
  }
}

function add_factory() {
  if (message_div.innerHTML != "") {
    message_div.innerHTML = ""; // Clear the message if not empty
  }
  let bakeriesNeeded = getBakeriesNeeded();
  if (bakeryCount < bakeriesNeeded) {
    if (bakeriesNeeded - bakeryCount == 1) {
      message_div.innerHTML = `You need 1 more bakery!`;
    } else {
      message_div.innerHTML = `You need ${
        bakeriesNeeded - bakeryCount
      } more bakeries!`;
    }
  } else {
    stopBakeryTimer();
    factoryCount++;
    bakeryCount -= bakeriesNeeded;
    getBakeriesNeeded();
    updateInventory();
    startBakeryTimer();
  }
}

function updateInventory() {
  cookieCount_span.innerHTML = cookieCount;
  bakeryCount_span.innerHTML = bakeryCount;
  factoryCount_span.innerHTML = factoryCount;
  cps_span.innerHTML = bakeryCount;
  bps_span.innerHTML = factoryCount;
}
