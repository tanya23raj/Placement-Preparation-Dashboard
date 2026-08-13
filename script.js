// ==============================
// PLACEMENT PREPARATION DASHBOARD
// COMPLETE JAVASCRIPT FILE
// ==============================

// ---------- Application Data ----------
let companies = JSON.parse(localStorage.getItem("companies")) || [];

// ---------- Input Elements ----------
const dsaInput = document.getElementById("dsaInput");
const dsaTargetInput = document.getElementById("dsaTargetInput");

const aptitudeInput = document.getElementById("aptitudeInput");
const aptitudeTargetInput = document.getElementById("aptitudeTargetInput");

const mockInput = document.getElementById("mockInput");
const mockTargetInput = document.getElementById("mockTargetInput");

// ---------- Dashboard Count Elements ----------
const dsaCount = document.getElementById("dsaCount");
const aptitudeCount = document.getElementById("aptitudeCount");
const mockCount = document.getElementById("mockCount");

// ---------- Progress Elements ----------
const dsaProgressBar = document.getElementById("dsaProgress");
const aptitudeProgressBar = document.getElementById("aptitudeProgress");
const mockProgressBar = document.getElementById("mockProgress");

const dsaPercent = document.getElementById("dsaPercent");
const aptitudePercent = document.getElementById("aptitudePercent");
const mockPercent = document.getElementById("mockPercent");

// ---------- Button ----------
const updateBtn = document.getElementById("updateBtn");

// ---------- Company Form ----------
const companyForm = document.getElementById("companyForm");
const companyList = document.getElementById("companyList");
const emptyMessage = document.getElementById("emptyMessage");

// ==============================
// UPDATE PREPARATION
// ==============================
updateBtn.addEventListener("click", function () {

    // Completed values
    const dsa = Number(dsaInput.value) || 0;
    const aptitude = Number(aptitudeInput.value) || 0;
    const mock = Number(mockInput.value) || 0;

    // Target values
    const dsaTarget = Number(dsaTargetInput.value) || 1;
    const aptitudeTarget = Number(aptitudeTargetInput.value) || 1;
    const mockTarget = Number(mockTargetInput.value) || 1;

    // Update dashboard counts
    dsaCount.textContent = dsa;
    aptitudeCount.textContent = aptitude;
    mockCount.textContent = mock;

    // Calculate percentages
    const dsaProgress = Math.min((dsa / dsaTarget) * 100, 100);
    const aptitudeProgress = Math.min((aptitude / aptitudeTarget) * 100, 100);
    const mockProgress = Math.min((mock / mockTarget) * 100, 100);

    // Update progress bars
    dsaProgressBar.value = dsaProgress;
    aptitudeProgressBar.value = aptitudeProgress;
    mockProgressBar.value = mockProgress;

    // Update percentage text
    dsaPercent.textContent = Math.round(dsaProgress) + "%";
    aptitudePercent.textContent = Math.round(aptitudeProgress) + "%";
    mockPercent.textContent = Math.round(mockProgress) + "%";

    // Save values in localStorage
    localStorage.setItem("dsa", dsa);
    localStorage.setItem("dsaTarget", dsaTarget);

    localStorage.setItem("aptitude", aptitude);
    localStorage.setItem("aptitudeTarget", aptitudeTarget);

    localStorage.setItem("mock", mock);
    localStorage.setItem("mockTarget", mockTarget);

    alert("Preparation updated successfully!");
});

// ==============================
// LOAD SAVED PREPARATION DATA
// ==============================
function loadPreparationData() {

    dsaInput.value = localStorage.getItem("dsa") || 0;
    dsaTargetInput.value = localStorage.getItem("dsaTarget") || 0;

    aptitudeInput.value = localStorage.getItem("aptitude") || 0;
    aptitudeTargetInput.value = localStorage.getItem("aptitudeTarget") || 0;

    mockInput.value = localStorage.getItem("mock") || 0;
    mockTargetInput.value = localStorage.getItem("mockTarget") || 0;

    // Automatically refresh dashboard and progress
    updateBtn.click();
}

// ==============================
// ADD COMPANY APPLICATION
// ==============================
companyForm.addEventListener("submit", function (event) {

    event.preventDefault();

    const company = {

        id: Date.now(),

        name: document.getElementById("companyName").value,

        role: document.getElementById("role").value,

        date: document.getElementById("interviewDate").value,

        status: document.getElementById("status").value
    };

    companies.push(company);

    saveCompanies();

    displayCompanies();

    companyForm.reset();
});

// ==============================
// SAVE COMPANIES
// ==============================
function saveCompanies() {

    localStorage.setItem(
        "companies",
        JSON.stringify(companies)
    );
}

// ==============================
// DISPLAY COMPANIES
// ==============================
function displayCompanies() {

    companyList.innerHTML = "";

    if (companies.length === 0) {

        emptyMessage.style.display = "block";

    } else {

        emptyMessage.style.display = "none";
    }

    // Sort by interview date
    companies
        .sort((a, b) => new Date(a.date) - new Date(b.date))
        .forEach(company => {

            const row = document.createElement("tr");

            // Remove spaces from status for CSS class
            const statusClass = company.status.replace(/\s/g, "");

            row.innerHTML = `
                <td>${company.name}</td>
                <td>${company.role}</td>
                <td>${formatDate(company.date)}</td>
                <td>
                    <span class="status ${statusClass}">
                        ${company.status}
                    </span>
                </td>
                <td>
                    <button
                        class="delete-btn"
                        onclick="deleteCompany(${company.id})"
                    >
                        Delete
                    </button>
                </td>
            `;

            companyList.appendChild(row);
        });

    // Update total applications card
    document.getElementById("applicationCount").textContent =
        companies.length;
}

// ==============================
// DELETE COMPANY
// ==============================
function deleteCompany(id) {

    companies = companies.filter(
        company => company.id !== id
    );

    saveCompanies();

    displayCompanies();
}

// ==============================
// FORMAT DATE
// ==============================
function formatDate(dateString) {

    const date = new Date(dateString);

    return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric"
    });
}

// ==============================
// INITIAL PAGE LOAD
// ==============================
window.addEventListener("load", function () {

    loadPreparationData();

    displayCompanies();
});
