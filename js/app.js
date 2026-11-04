// Storage Key
const STORAGE_KEY = "cb_class_scheduler_data";

// State
let classes = [];
let activeDay = "Monday";

// DOM Elements
const scheduleGrid = document.getElementById("scheduleGrid");
const emptySchedule = document.getElementById("emptySchedule");
const activeDayHeading = document.getElementById("activeDayHeading");
const classCountBadge = document.getElementById("classCountBadge");
const dayTabs = document.getElementById("dayTabs");

const toggleFormBtn = document.getElementById("toggleFormBtn");
const classFormContainer = document.getElementById("classFormContainer");
const newClassForm = document.getElementById("newClassForm");
const cancelFormBtn = document.getElementById("cancelFormBtn");

// 1. Load Data
function loadClasses() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      classes = JSON.parse(stored);
    } catch (e) {
      classes = [...defaultClasses];
    }
  } else {
    classes = [...defaultClasses];
    saveClasses();
  }
}

function saveClasses() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(classes));
}

// 2. Render Grid
function renderSchedule() {
  scheduleGrid.innerHTML = "";

  const filtered = activeDay === "All"
    ? classes
    : classes.filter((c) => c.day === activeDay);

  activeDayHeading.textContent = activeDay === "All" ? "Full Week Schedule" : `${activeDay}'s Schedule`;
  classCountBadge.textContent = `${filtered.length} class${filtered.length === 1 ? "" : "es"}`;

  if (filtered.length === 0) {
    emptySchedule.classList.remove("hidden");
    return;
  }

  emptySchedule.classList.add("hidden");

  // Sort by start time
  filtered.sort((a, b) => a.startTime.localeCompare(b.startTime));

  filtered.forEach((item) => {
    const card = document.createElement("article");
    card.className = "class-card";
    card.innerHTML = `
      <div>
        <div class="card-top">
          <span class="day-badge">${item.day}</span>
          <span class="time-slot">${item.startTime} - ${item.endTime}</span>
        </div>
        <h3 class="class-title">${item.course}</h3>
        <p class="class-instructor">Lecturer: ${item.instructor}</p>
      </div>
      <div class="card-bottom">
        <span class="room-badge">&#128205; ${item.room}</span>
        <button class="btn-delete" data-id="${item.id}">Remove</button>
      </div>
    `;

    card.querySelector(".btn-delete").addEventListener("click", () => {
      deleteClass(item.id);
    });

    scheduleGrid.appendChild(card);
  });
}

// 3. Delete Class
function deleteClass(id) {
  classes = classes.filter((c) => c.id !== id);
  saveClasses();
  renderSchedule();
}

// 4. Add Class
function handleCreateClass(e) {
  e.preventDefault();
  const course = document.getElementById("courseName").value.trim();
  const instructor = document.getElementById("instructorName").value.trim();
  const day = document.getElementById("classDay").value;
  const startTime = document.getElementById("startTime").value;
  const endTime = document.getElementById("endTime").value;
  const room = document.getElementById("roomNumber").value.trim();

  if (!course || !instructor || !startTime || !endTime || !room) return;

  const newClass = {
    id: Date.now(),
    course,
    instructor,
    day,
    startTime,
    endTime,
    room
  };

  classes.push(newClass);
  saveClasses();

  newClassForm.reset();
  classFormContainer.classList.add("hidden");

  // Switch view to the day just added
  activeDay = day;
  updateActiveTab();
  renderSchedule();
}

// 5. Update Tab UI
function updateActiveTab() {
  document.querySelectorAll(".day-tab-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.day === activeDay);
  });
}

// Event Listeners
dayTabs.addEventListener("click", (e) => {
  if (e.target.classList.contains("day-tab-btn")) {
    activeDay = e.target.dataset.day;
    updateActiveTab();
    renderSchedule();
  }
});

toggleFormBtn.addEventListener("click", () => {
  classFormContainer.classList.toggle("hidden");
});

cancelFormBtn.addEventListener("click", () => {
  newClassForm.reset();
  classFormContainer.classList.add("hidden");
});

newClassForm.addEventListener("submit", handleCreateClass);

// Initialization
document.addEventListener("DOMContentLoaded", () => {
  loadClasses();
  renderSchedule();
});