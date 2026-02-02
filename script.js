let students = JSON.parse(localStorage.getItem("students")) || [];

function addStudent() {
    const name = document.getElementById("name").value.trim();
    const roll = document.getElementById("roll").value.trim();
    const className = document.getElementById("class").value.trim();
    const marks = document.getElementById("marks").value.trim();

    if (name === "" || roll === "" || className === "" || marks === "") {
        alert("Please fill all fields");
        return;
    }

    const student = {
        id: Date.now(),
        name: name,
        roll: roll,
        className: className,
        marks: Number(marks),
        grade: calculateGrade(marks)
    };

    students.push(student);
    saveData();
    displayStudents();
    clearForm();
}

function calculateGrade(marks) {
    if (marks >= 75) return "A";
    if (marks >= 60) return "B";
    if (marks >= 50) return "C";
    if (marks >= 40) return "D";
    return "Fail";
}

function displayStudents() {
    const table = document.getElementById("studentTable");
    table.innerHTML = "";

    students.forEach(student => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${student.name}</td>
            <td>${student.roll}</td>
            <td>${student.className}</td>
            <td>${student.marks}</td>
            <td>${student.grade}</td>
            <td><button class="delete-btn" onclick="deleteStudent(${student.id})">Delete</button></td>
        `;

        table.appendChild(row);
    });
}

function deleteStudent(id) {
    students = students.filter(student => student.id !== id);
    saveData();
    displayStudents();
}

function saveData() {
    localStorage.setItem("students", JSON.stringify(students));
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("roll").value = "";
    document.getElementById("class").value = "";
    document.getElementById("marks").value = "";
}

displayStudents();
