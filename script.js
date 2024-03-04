document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('jobApplicationForm');
  const jobApplicationTable = document.getElementById('jobApplicationTable');

  let jobApplications = JSON.parse(localStorage.getItem('jobApplications')) || [];

  function displayJobApplications() {
    jobApplicationTable.innerHTML = '';

    jobApplications.forEach((application, index) => {
      const row = document.createElement('tr');

      Object.keys(application).forEach((key) => {
        const cell = document.createElement('td');
        cell.setAttribute('data-label', key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1'));
        cell.textContent = application[key];
        row.appendChild(cell);
      });

      const deleteCell = document.createElement('td');
      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete-button';
      deleteButton.textContent = 'Delete';
      deleteButton.onclick = function () {
        jobApplications.splice(index, 1);
        localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
        displayJobApplications();
      };
      deleteCell.appendChild(deleteButton);
      row.appendChild(deleteCell);

      jobApplicationTable.appendChild(row);
    });
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const newApplication = {
      date: form.date.value,
      company: form.company.value,
      position: form.position.value,
      contractType: form.contractType.value,
      source: form.source.value,
      followUpDate: form.followUpDate.value,
      status: form.status.value,
      employerResponse: form.employerResponse.value,
      responseMode: form.responseMode.value,
      reasons: form.reasons.value,
      interview: form.interview.value,
      profiles: form.profiles.value,
      documentsSent: form.documentsSent.value
    };

    jobApplications.push(newApplication);
    localStorage.setItem('jobApplications', JSON.stringify(jobApplications));
    displayJobApplications();
    form.reset();
    jobApplicationTable.style.display = 'table'; // Show the table after the form is submitted
  });

  displayJobApplications();
});

// Updated updateDateTime function
function updateDateTime() {
  const currentDate = new Date();
  const optionsTime = {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  };
  const formattedTime = currentDate.toLocaleString('en-US', optionsTime);

  const optionsDate = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  };
  const formattedDate = currentDate.toLocaleString('en-US', optionsDate);

  const timeElement = document.createElement('div');
  timeElement.textContent = formattedTime;

  const dateElement = document.createElement('div');
  dateElement.textContent = formattedDate;

  document.getElementById('currentDateTime').innerHTML = '';
  document.getElementById('currentDateTime').appendChild(timeElement);
  document.getElementById('currentDateTime').appendChild(dateElement);
}

setInterval(updateDateTime, 1000);
updateDateTime();
