const bookingForm = document.getElementById("bookingForm");
const message = document.getElementById("message");

function toggleSidebar() {
  document.getElementById("sidebar").classList.toggle("active");
  document.getElementById("sidebarOverlay").classList.toggle("active");
}

// CREATE BOOKING

bookingForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const bookingData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    phone: document.getElementById("phone").value,
    date: document.getElementById("date").value,
    time: document.getElementById("time").value,
    guests: Number(document.getElementById("guests").value),
    specialRequest:
      document.getElementById("specialRequest").value
  };

  try {

    const response = await fetch(
      "http://localhost:5001/api/bookings",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bookingData)
      }
    );

    const data = await response.json();

    message.innerText = data.message;

    bookingForm.reset();

  } catch (error) {

    console.error(error);

    message.innerText =
      "Something went wrong";
  }
});


// CANCEL BOOKING
document.getElementById("cancelMessage").innerText = "";
async function cancelBooking() {

  const email =
    document.getElementById("cancelEmail").value;

  const date =
    document.getElementById("cancelDate").value;

  if (!email || !date) {
    alert("Please enter email and booking date.");
    return;
  }

  try {

    const response = await fetch(
      "http://localhost:5001/api/bookings/cancel",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          email,
          date
        })
      }
    );

    const data = await response.json();

    document.getElementById("cancelMessage").innerText = data.message;

    document.getElementById("cancelEmail").value = "";
    document.getElementById("cancelDate").value = "";

  }catch (error) {

  document.getElementById("cancelMessage").innerText =
    "Unable to cancel booking.";

  console.error(error);
}
}