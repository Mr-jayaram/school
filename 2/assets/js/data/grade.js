        document.addEventListener('DOMContentLoaded', () => {
            // --- Page-specific Logic ---
            const academicYearFilter = document.getElementById('academicYearFilter');
            const semesterFilter = document.getElementById('semesterFilter');
            const classFilter = document.getElementById('classFilter');
            const subjectFilter = document.getElementById('subjectFilter');
            const gradeEntryBody = document.getElementById('gradeEntryBody');
            const gradeEntryFilterText = document.getElementById('gradeEntryFilterText');

            // Simulated student data for grade entry
            const students = [
                { id: 'S001', name: 'Alok Kumar' },
                { id: 'S002', name: 'Bhavna Devi' },
                { id: 'S003', name: 'Chandan Singh' },
                { id: 'S004', name: 'Deepa Sharma' },
                { id: 'S005', name: 'Eshwar Reddy' },
            ];

            // Simulated grades storage (in a real app, this would be fetched from a backend)
            let storedGrades = {
                '2024-2025': {
                    'Fall': {
                        'Grade 10': {
                            'Math': {
                                'S001': { midterm: 40, assignments: 18, final: 85 },
                                'S002': { midterm: 35, assignments: 15, final: 78 },
                                'S003': { midterm: 45, assignments: 19, final: 92 },
                            },
                            'Science': {
                                'S001': { midterm: 38, assignments: 17, final: 82 },
                                'S004': { midterm: 42, assignments: 16, final: 88 },
                            }
                        }
                    }
                }
            };

            function calculateTotal(midterm, assignments, final) {
                return (parseInt(midterm) || 0) + (parseInt(assignments) || 0) + (parseInt(final) || 0);
            }

            function getGrade(total) {
                if (total >= 150) return 'A+';
                if (total >= 135) return 'A';
                if (total >= 120) return 'B+';
                if (total >= 100) return 'B';
                if (total >= 80) return 'C';
                return 'F';
            }

            function renderGradeEntryTable() {
                const selectedAcademicYear = academicYearFilter.value;
                const selectedSemester = semesterFilter.value;
                const selectedClass = classFilter.value;
                const selectedSubject = subjectFilter.value;

                gradeEntryBody.innerHTML = ''; // Clear existing rows

                const gradesForSubject = (storedGrades[selectedAcademicYear] &&
                                          storedGrades[selectedAcademicYear][selectedSemester] &&
                                          storedGrades[selectedAcademicYear][selectedSemester][selectedClass] &&
                                          storedGrades[selectedAcademicYear][selectedSemester][selectedClass][selectedSubject]) || {};

                if (students.length === 0) {
                    gradeEntryBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">No students available for this class.</td></tr>`;
                    return;
                }

                students.forEach(student => {
                    const studentGrades = gradesForSubject[student.id] || { midterm: '', assignments: '', final: '' };
                    const total = calculateTotal(studentGrades.midterm, studentGrades.assignments, studentGrades.final);
                    const grade = getGrade(total);

                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>
                            <div class="student-info">
                                <img src="assets/img/user/maleavatar.jpg" alt="${student.name}"> <!-- Placeholder image -->
                                <span class="name">${student.name}</span>
                            </div>
                        </td>
                        <td>${student.id}</td>
                        <td><input type="number" class="form-control form-control-sm grade-input midterm-grade" data-student-id="${student.id}" value="${studentGrades.midterm}" min="0" max="50"></td>
                        <td><input type="number" class="form-control form-control-sm grade-input assignments-grade" data-student-id="${student.id}" value="${studentGrades.assignments}" min="0" max="20"></td>
                        <td><input type="number" class="form-control form-control-sm grade-input final-grade" data-student-id="${student.id}" value="${studentGrades.final}" min="0" max="100"></td>
                        <td class="total-score" id="total-${student.id}">${total}</td>
                        <td class="final-grade" id="grade-${student.id}">${grade}</td>
                    `;
                    gradeEntryBody.appendChild(row);
                });

                // Attach event listeners for grade input changes
                document.querySelectorAll('.grade-input').forEach(input => {
                    input.addEventListener('input', updateStudentTotalAndGrade);
                });

                gradeEntryFilterText.textContent = `${selectedAcademicYear} / ${selectedSemester} / ${selectedClass} / ${selectedSubject}`;
            }

            function updateStudentTotalAndGrade(event) {
                const studentId = event.target.dataset.studentId;
                const row = event.target.closest('tr');

                const midterm = row.querySelector('.midterm-grade').value;
                const assignments = row.querySelector('.assignments-grade').value;
                const final = row.querySelector('.final-grade').value;

                const total = calculateTotal(midterm, assignments, final);
                const grade = getGrade(total);

                row.querySelector(`#total-${studentId}`).textContent = total;
                row.querySelector(`#grade-${studentId}`).textContent = grade;
            }

            // Event Listeners for filters
            academicYearFilter.addEventListener('change', renderGradeEntryTable);
            semesterFilter.addEventListener('change', renderGradeEntryTable);
            classFilter.addEventListener('change', renderGradeEntryTable);
            subjectFilter.addEventListener('change', renderGradeEntryTable);

            // Initial render
            renderGradeEntryTable();

            // Save Grades button
            document.getElementById('saveGradesBtn').addEventListener('click', () => {
                const selectedAcademicYear = academicYearFilter.value;
                const selectedSemester = semesterFilter.value;
                const selectedClass = classFilter.value;
                const selectedSubject = subjectFilter.value;

                // Ensure nested objects exist for storing grades
                if (!storedGrades[selectedAcademicYear]) storedGrades[selectedAcademicYear] = {};
                if (!storedGrades[selectedAcademicYear][selectedSemester]) storedGrades[selectedAcademicYear][selectedSemester] = {};
                if (!storedGrades[selectedAcademicYear][selectedSemester][selectedClass]) storedGrades[selectedAcademicYear][selectedSemester][selectedClass] = {};
                if (!storedGrades[selectedAcademicYear][selectedSemester][selectedClass][selectedSubject]) storedGrades[selectedAcademicYear][selectedSemester][selectedClass][selectedSubject] = {};

                const currentGrades = {};
                document.querySelectorAll('#gradeEntryBody tr').forEach(row => {
                    const studentId = row.querySelector('.grade-input').dataset.studentId;
                    currentGrades[studentId] = {
                        midterm: row.querySelector('.midterm-grade').value,
                        assignments: row.querySelector('.assignments-grade').value,
                        final: row.querySelector('.final-grade').value
                    };
                });
                storedGrades[selectedAcademicYear][selectedSemester][selectedClass][selectedSubject] = currentGrades;
                console.log("Saved Grades:", storedGrades);
                alert('Grades saved successfully!');
            });

            // Load Existing Grades button (just re-renders with current stored data)
            document.getElementById('loadGradesBtn').addEventListener('click', () => {
                renderGradeEntryTable();
                alert('Existing grades loaded.');
            });
        });