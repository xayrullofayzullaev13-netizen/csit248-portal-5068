window.location.href = "board.html?name=" + studentName;

        }

    });

}


// ========================================
// PAGE 2: STUDENT MARKS BOARD
// ========================================

const welcomeMessage = document.querySelector("#welcomeMessage");

if (welcomeMessage) {

    const loadTime = document.querySelector("#loadTime");
    const backButton = document.querySelector("#backButton");
    const sortSelect = document.querySelector("#sortSelect");
    const tableBody = document.querySelector("#studentTableBody");
    const statusMessage = document.querySelector("#statusMessage");

    // Read student name from the URL
    const studentName = new URLSearchParams(location.search).get("name");

    if (studentName === null || studentName.trim() === "") {
        welcomeMessage.textContent = "Welcome, Student";
    } else {
        welcomeMessage.textContent = "Welcome, " + studentName;
    }

    // Display page load time
    const pageLoadTime = new Date();

    loadTime.textContent =
        "Page loaded at: " + pageLoadTime.toLocaleString();

    // Back button
    backButton.addEventListener("click", function() {

        history.back();

    });

    // Grade calculation
    function grade(marks) {

        if (marks < PASS_MARK) {
            return "Fail";
        }

        if (marks >= DISTINCTION_MARK) {
            return "Distinction";
        }

        return "Pass";

    }

    let students = [];

    // Build the student table
    function renderStudents(studentList) {

        tableBody.textContent = "";

        studentList.forEach(function(student) {

            const row = document.createElement("tr");

            const nameCell = document.createElement("td");
            const marksCell = document.createElement("td");
            const cityCell = document.createElement("td");
            const gradeCell = document.createElement("td");

            nameCell.textContent = student.name;
            marksCell.textContent = student.marks;
            cityCell.textContent = student.city;
            gradeCell.textContent = grade(student.marks);

            row.appendChild(nameCell);
            row.appendChild(marksCell);
            row.appendChild(cityCell);
            row.appendChild(gradeCell);

            tableBody.appendChild(row);

        });

    }

    // Sort students
    function sortStudents() {

        const sortedStudents = [...students];

        if (sortSelect.value === "name") {

            sortedStudents.sort(function(a, b) {

                return a.name.localeCompare(b.name);

            });

        } else if (sortSelect.value === "marks") {

            sortedStudents.sort(function(a, b) {

                return b.marks - a.marks;

            });

        }

        renderStudents(sortedStudents);

    }

    // Fetch student data using async and await
    async function loadStudents() {

        try {

            statusMessage.textContent = "Loading students...";

            const response = await fetch("students.json");

            if (response.ok === false) {
                throw new Error("Could not load students.json");
            }

            const data = await response.json();

            if (Array.isArray(data) === false) {
                throw new Error("Student data is invalid.");
            }

            students = data;

            statusMessage.textContent =
                "Successfully loaded " + students.length + " students.";

            sortStudents();

        } catch (error) {

            statusMessage.textContent =
                "Error loading student data. Please run the project using a local server and check students.json.";

        }

    }

    // Sort whenever the selection changes
    sortSelect.addEventListener("change", function() {

        sortStudents();

    });

    // Load student records
    loadStudents();

}

// Log enrolment number
console.log("A85306425068");