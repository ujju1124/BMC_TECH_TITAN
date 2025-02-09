const carpoolingData = [
    { driver: "John Doe", start: "New Baneshwor", end: "Thamel", time: "08:30", contact: "+977 9801234567" },
    { driver: "Jane Smith", start: "Patan", end: "Durbarmarg", time: "09:00", contact: "+977 9812345678" },
    { driver: "Raj Kumar", start: "Koteshwor", end: "Gongabu", time: "07:45", contact: "+977 9841234567" },
  ];
  
// Initialize Leaflet map
const map = L.map('map').setView([27.7172, 85.3240], 13); // Centered on Kathmandu
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
}).addTo(map);

function showRoute() {
  const busName = document.getElementById('bus-name').value;
  // Simulate route data (replace with actual data)
  const route = [
    [27.7172, 85.3240],
    [27.7272, 85.3340],
    [27.7372, 85.3440],
  ];
  L.polyline(route, { color: 'blue' }).addTo(map);
}

function submitViolation() {
  const vehicleNumber = document.getElementById('vehicle-number').value;
  alert(`Violation reported for vehicle: ${vehicleNumber}`);
}

function submitPothole() {
  const description = document.getElementById('pothole-description').value;
  alert(`Pothole reported: ${description}`);
}
  
  function findCarpoolMatch() {
    const start = document.getElementById("start-location").value.trim();
    const end = document.getElementById("end-location").value.trim();
    let time = document.getElementById("travel-time").value.trim();
    const resultsDiv = document.getElementById("match-results");

    // Clear previous results
    resultsDiv.innerHTML = "";

    if (!start || !end || !time) {
        resultsDiv.innerHTML = "<p style='color: red;'>❌ Please enter all fields.</p>";
        return;
    }

    // Convert the time format to match dataset (HH:MM)
    time = time.substring(0, 5);  

    const matches = carpoolingData.filter(
        ride => ride.start.toLowerCase() === start.toLowerCase() &&
                ride.end.toLowerCase() === end.toLowerCase() &&
                ride.time.startsWith(time) // Fix time format issue
    );

    if (matches.length > 0) {
        let output = "";
        matches.forEach(match => {
            output += `
                <p>🚗 <b>${match.driver}</b> is traveling from <b>${match.start}</b> to <b>${match.end}</b> at <b>${match.time}</b>.<br>
                📞 Contact: <b>${match.contact}</b></p>
            `;
        });
        resultsDiv.innerHTML = output;
    } else {
        resultsDiv.innerHTML = "<p style='color: red;'>❌ No drivers available for this route and time.</p>";
    }
}
