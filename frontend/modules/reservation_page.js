import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them
  try {
    const response = await fetch(config.backendEndpoint + '/reservations');
    return await response.json();
  } catch (error) {
    return null;
  }

}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent

  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */
 if(reservations.length === 0){
  document.getElementById('no-reservation-banner').style.display = 'block';
  document.getElementById('reservation-table-parent').style.display = 'none';
 }
 else{
  document.getElementById('no-reservation-banner').style.display = 'none';
  document.getElementById('reservation-table-parent').style.display = 'block';
 }

 let tableBody = document.getElementById('reservation-table');
 reservations.forEach(item => {
  const dateStr = `${new Date(item.time).toLocaleString("en-IN",{day:"numeric",month:"long",year:"numeric"})}`;
  const timeStr = `${new Date(item.time).toLocaleString("en-IN",{hour:"numeric",minute:"numeric",second:"numeric",hour12:true})}`;
  const row = document.createElement('tr');
  row.innerHTML = `<td><strong>${item.id}</strong></td>
  <td>${item.name}</td>
  <td>${item.adventureName}</td>
  <td>${item.person}</td>
  <td>${new Date(item.date).toLocaleString("en-IN",{day:"numeric",month:"numeric",year:"numeric"})}</td>
  <td>${item.price}</td>
  <td>${dateStr}, ${timeStr}</td>
  <td><button id="${item.id}" class="reservation-visit-button"><a href="../detail/?adventure=${item.adventure}">Visit Adventure</a></button></td>`;
  tableBody.append(row);
 });
}

export { fetchReservations, addReservationToTable };
