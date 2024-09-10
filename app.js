const timeZones = [
  "Asia/Kolkata-IST",
  "Asia/Manila-PHT",
  "America/New_York-EST",
  "America/Los_Angeles-PST",
  "Europe/London-GMT",
  "Europe/Paris-CET",
  "Asia/Tokyo-JST",
  
];

function populateDropdown() {
  const fromMenu = document.getElementById("from-timezone-menu");
  const toMenu = document.getElementById("to-timezone-menu");

  timeZones.forEach((zone) => {
    const divFrom = document.createElement("div");
    divFrom.textContent = zone;
    divFrom.dataset.value = zone;
    divFrom.onclick = () => {
      document.getElementById("from-timezone").value = zone.split("-")[0];
      document.getElementById("from-timezone-toggle").textContent = zone;
      fromMenu.style.display = "none";
    };
    fromMenu.appendChild(divFrom);

    const divTo = document.createElement("div");
    divTo.textContent = zone;
    divTo.dataset.value = zone;
    divTo.onclick = () => {
      document.getElementById("to-timezone").value = zone.split("-")[0];
      document.getElementById("to-timezone-toggle").textContent = zone;
      toMenu.style.display = "none";
    };
    toMenu.appendChild(divTo);
  });
}

function filterDropdown(inputId, menuId) {
  const input = document.getElementById(inputId);
  const menu = document.getElementById(menuId);
  const filter = input.value.toLowerCase();
  const items = menu.getElementsByTagName("div");
  Array.from(items).forEach((item) => {
    const text = item.textContent.toLowerCase();
    item.style.display = text.indexOf(filter) > -1 ? "block" : "none";
  });
}

document
  .getElementById("from-timezone")
  .addEventListener("input", () =>
    filterDropdown("from-timezone", "from-timezone-menu")
  );
document
  .getElementById("to-timezone")
  .addEventListener("input", () =>
    filterDropdown("to-timezone", "to-timezone-menu")
  );

document
  .getElementById("from-timezone-toggle")
  .addEventListener("click", () => {
    const menu = document.getElementById("from-timezone-menu");
    menu.classList.toggle("show");
  });

document.getElementById("to-timezone-toggle").addEventListener("click", () => {
  const menu = document.getElementById("to-timezone-menu");
  menu.classList.toggle("show");
});

function convertTime() {
  const date = document.getElementById("input-date").value;
  const hours = parseInt(document.getElementById("input-hours").value, 10);
  const minutes = parseInt(document.getElementById("input-minutes").value, 10);
  const ampm = document.getElementById("am-pm").value;
  const fromZone = document.getElementById("from-timezone").value;
  const toZone = document.getElementById("to-timezone").value;

  if (!date || isNaN(hours) || isNaN(minutes) || !fromZone || !toZone) {
    document.getElementById("converted-time").textContent =
      "Please fill all fields.";
    return;
  }

  // Convert 12-hour to 24-hour format
  let formattedHours = hours;
  if (ampm === "PM" && hours !== 12) {
    formattedHours += 12;
  } else if (ampm === "AM" && hours === 12) {
    formattedHours = 0;
  }

  // Create moment object in 'fromZone'
  const fromDateTime = moment.tz(
    `${date} ${formattedHours}:${minutes}`,
    "YYYY-MM-DD HH:mm",
    fromZone
  );

  // Convert to 'toZone'
  const convertedDateTime = fromDateTime.clone().tz(toZone);

  // Display the converted time
  document.getElementById("converted-time").textContent =
    convertedDateTime.format("dddd, DD/MM/YYYY, hh:mm A");
}

document.addEventListener("DOMContentLoaded", populateDropdown);
