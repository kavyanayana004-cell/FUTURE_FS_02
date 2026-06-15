const bookingTable = document.getElementById("bookingTable");

async function loadBookings() {
  try {
    const response = await fetch("http://localhost:5001/api/bookings");

    const bookings = await response.json();

    bookingTable.innerHTML = "";

    bookings.forEach((booking) => {
      bookingTable.innerHTML += `
        <tr>
          <td>${booking.name}</td>
          <td>${booking.email}</td>
          <td>${booking.phone}</td>
          <td>${booking.date}</td>
          <td>${booking.time}</td>
          <td>${booking.guests}</td>
          <td>${booking.specialRequest || "-"}</td>
        </tr>
      `;
    });

  } catch (error) {
    console.error("Error loading bookings:", error);
  }
}

loadBookings();