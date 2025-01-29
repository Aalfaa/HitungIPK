document.addEventListener("DOMContentLoaded", () => {
    const semesterContainer = document.getElementById("semesterContainer");
    const addSemesterButton = document.getElementById("addSemester");
    const calculateGPAButton = document.getElementById("calculateGPA");

    function applyEventListeners(semesterElement) {
        const addRowButton = semesterElement.querySelector(".addRow");
        addRowButton.addEventListener("click", () => {
            const semesterTableBody = semesterElement.querySelector("tbody");
            const row = document.createElement("tr");
            row.innerHTML = `
                <td><input type="text" placeholder="Course Name"></td>
                <td><input type="number" placeholder="Credits"></td>
                <td>
                    <select>
                        <option value="A">A</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="C+">C+</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="E">E</option>
                    </select>
                </td>
                <td><button class="deleteRow">X</button></td>
            `;
            row.querySelector(".deleteRow").addEventListener("click", () => row.remove());
            semesterTableBody.appendChild(row);
        });

        semesterElement.querySelectorAll(".deleteRow").forEach(button => {
            button.addEventListener("click", () => button.closest("tr").remove());
        });

        semesterElement.querySelector(".calculateIPS").addEventListener("click", () => {
            calculateIPS(semesterElement);
        });
    }

    applyEventListeners(document.querySelector(".semester"));

    addSemesterButton.addEventListener("click", () => {
        const newSemester = document.createElement("div");
        newSemester.classList.add("semester");
        newSemester.innerHTML = `
            <h2>Semester ${semesterContainer.childElementCount + 1}</h2>
            <table>
                <thead>
                    <tr>
                        <th>Nama Mata Kuliah</th>
                        <th>Jumlah SKS</th>
                        <th>Nilai</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td><input type="text" placeholder="Course Name"></td>
                        <td><input type="number" placeholder="Credits"></td>
                        <td>
                            <select>
                                <option value="A">A</option>
                                <option value="B+">B+</option>
                                <option value="B">B</option>
                                <option value="C+">C+</option>
                                <option value="C">C</option>
                                <option value="D">D</option>
                                <option value="E">E</option>
                            </select>
                        </td>
                        <td><button class="deleteRow">X</button></td>
                    </tr>
                </tbody>
            </table>
            <div class="semester-actions">
                <button class="addRow">+ Tambah Matkul</button>
                <button class="calculateIPS">Hitung IPS</button>
            </div>
            <div class="ipsResult"></div>
        `;
        semesterContainer.appendChild(newSemester);
        applyEventListeners(newSemester);
    });

    calculateGPAButton.addEventListener("click", () => {
        let totalCredits = 0, totalWeightedScore = 0;
        semesterContainer.querySelectorAll(".semester").forEach(semester => {
            semester.querySelectorAll("tbody tr").forEach(row => {
                const credits = parseFloat(row.querySelector('input[type="number"]').value) || 0;
                const gradePoint = getGradePoint(row.querySelector("select").value);
                totalCredits += credits;
                totalWeightedScore += gradePoint * credits;
            });
        });
        alert(`Your cumulative GPA is: ${(totalWeightedScore / totalCredits).toFixed(2)}`);
    });

    function calculateIPS(semester) {
        let totalCredits = 0, totalWeightedScore = 0;
        semester.querySelectorAll("tbody tr").forEach(row => {
            const credits = parseFloat(row.querySelector('input[type="number"]').value) || 0;
            totalCredits += credits;
            totalWeightedScore += getGradePoint(row.querySelector("select").value) * credits;
        });
        semester.querySelector(".ipsResult").textContent = `IPS: ${(totalWeightedScore / totalCredits).toFixed(2)}`;
    }

    function getGradePoint(grade) {
        return { "A": 4, "B+": 3.5, "B": 3, "C+": 2.5, "C": 2, "D": 1, "E": 0 }[grade] || 0;
    }
});
