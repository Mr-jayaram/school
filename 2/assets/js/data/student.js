        document.addEventListener('DOMContentLoaded', () => {
           

            // --- Page Specific Elements ---
            const academicYearFilter = document.getElementById('academicYearFilter');
            const semesterFilter = document.getElementById('semesterFilter');
            const classFilter = document.getElementById('classFilter');
            const studentSearch = document.getElementById('studentSearch');
            const addNewStudentBtn = document.getElementById('addNewStudentBtn');

            const totalStudentsCard = document.getElementById('totalStudentsCard');
            const activeStudentsCard = document.getElementById('activeStudentsCard');
            const graduatedStudentsCard = document.getElementById('graduatedStudentsCard');
            const suspendedStudentsCard = document.getElementById('suspendedStudentsCard');
            const overviewFilterText = document.getElementById('overviewFilterText');

            const studentTableBody = document.getElementById('studentTableBody');

            // --- Modal Elements ---
            const viewStudentProfileModal = new bootstrap.Modal(document.getElementById('viewStudentProfileModal'));
            const editStudentModal = new bootstrap.Modal(document.getElementById('editStudentModal'));
            const deleteStudentModal = new bootstrap.Modal(document.getElementById('deleteStudentModal'));

            // View Profile Modal fields
            const viewProfileName = document.getElementById('viewProfileName');
            const viewProfileImg = document.getElementById('viewProfileImg');
            const viewProfileId = document.getElementById('viewProfileId');
            const viewProfileClass = document.getElementById('viewProfileClass');
            const viewProfileStatus = document.getElementById('viewProfileStatus');
            const viewProfileAcademicYear = document.getElementById('viewProfileAcademicYear');
            const viewProfileSemester = document.getElementById('viewProfileSemester');


            // Edit Student Modal fields
            const editStudentForm = document.getElementById('editStudentForm');
            const editStudentIdHidden = document.getElementById('editStudentIdHidden');
            const editStudentName = document.getElementById('editStudentName');
            const editName = document.getElementById('editName');
            const editClass = document.getElementById('editClass');
            const editStatus = document.getElementById('editStatus');

            // Delete Confirmation Modal fields
            const deleteStudentNameConfirm = document.getElementById('deleteStudentNameConfirm');
            const deleteStudentIdConfirm = document.getElementById('deleteStudentIdConfirm');
            const deleteStudentIdHidden = document.getElementById('deleteStudentIdHidden');
            const confirmDeleteBtn = document.getElementById('confirmDeleteBtn');




            // --- Student Page Specific Logic ---

            // Simulated Student Data (using 'let' for mutability)
            let studentData = {
                '2024-2025': {
                    'Fall': [
                        { id: 'S24001', name: 'Alice Smith', class: 'Math 101', status: 'Active', img: 'https://via.placeholder.com/35/FF6B6B/FFFFFF?text=AS', dob: '2010-01-15', guardian: 'Mr. John Smith', contact: 'john.smith@example.com' },
                        { id: 'S24002', name: 'Bob Johnson', class: 'Science 101', status: 'Active', img: 'https://via.placeholder.com/35/6BFFB8/FFFFFF?text=BJ', dob: '2011-03-22', guardian: 'Ms. Emily Johnson', contact: 'emily.j@example.com' },
                        { id: 'S24003', name: 'Charlie Brown', class: 'History 101', status: 'Active', img: 'https://via.placeholder.com/35/8BCBFB/FFFFFF?text=CB', dob: '2010-07-01', guardian: 'Mrs. Lucy Brown', contact: 'lucy.b@example.com' },
                        { id: 'S24004', name: 'Diana Prince', class: 'English 101', status: 'Active', img: 'https://via.placeholder.com/35/F16464/FFFFFF?text=DP', dob: '2009-11-05', guardian: 'Mr. Wayne Prince', contact: 'wayne.p@example.com' },
                        { id: 'S24005', name: 'Eve Adams', class: 'Math 101', status: 'Active', img: 'https://via.placeholder.com/35/FFB86B/FFFFFF?text=EA', dob: '2011-02-10', guardian: 'Mr. David Adams', contact: 'david.a@example.com' },
                        { id: 'S24006', name: 'Frank White', class: 'Science 101', status: 'Active', img: 'https://via.placeholder.com/35/81D3AD/FFFFFF?text=FW', dob: '2010-09-18', guardian: 'Mrs. Susan White', contact: 'susan.w@example.com' },
                        { id: 'S24007', name: 'Grace Hopper', class: 'History 101', status: 'Active', img: 'https://via.placeholder.com/35/8BCBFB/FFFFFF?text=GH', dob: '2009-04-30', guardian: 'Mr. Allan Hopper', contact: 'allan.h@example.com' },
                        { id: 'S24008', name: 'Henry Ford', class: 'Math 101', status: 'Suspended', img: 'https://via.placeholder.com/35/F16464/FFFFFF?text=HF', dob: '2010-06-01', guardian: 'Mrs. Betty Ford', contact: 'betty.f@example.com' },
                        { id: 'S24009', name: 'Ivy Green', class: 'English 101', status: 'Active', img: 'https://via.placeholder.com/35/FFB86B/FFFFFF?text=IG', dob: '2011-08-25', guardian: 'Mr. Robert Green', contact: 'robert.g@example.com' },
                        { id: 'S24010', name: 'Jack Black', class: 'Art 101', status: 'Active', img: 'https://via.placeholder.com/35/81D3AD/FFFFFF?text=JB', dob: '2010-03-10', guardian: 'Ms. Kelly Black', contact: 'kelly.b@example.com' },
                    ],
                    'Spring': [
                        { id: 'S24001', name: 'Alice Smith', class: 'Math 101', status: 'Active', img: 'https://via.placeholder.com/35/FF6B6B/FFFFFF?text=AS', dob: '2010-01-15', guardian: 'Mr. John Smith', contact: 'john.smith@example.com' },
                        { id: 'S24002', name: 'Bob Johnson', class: 'Science 101', status: 'Active', img: 'https://via.placeholder.com/35/6BFFB8/FFFFFF?text=BJ', dob: '2011-03-22', guardian: 'Ms. Emily Johnson', contact: 'emily.j@example.com' },
                        { id: 'S24003', name: 'Charlie Brown', class: 'History 101', status: 'Active', img: 'https://via.placeholder.com/35/8BCBFB/FFFFFF?text=CB', dob: '2010-07-01', guardian: 'Mrs. Lucy Brown', contact: 'lucy.b@example.com' },
                        { id: 'S24004', name: 'Diana Prince', class: 'English 101', status: 'Active', img: 'https://via.placeholder.com/35/F16464/FFFFFF?text=DP', dob: '2009-11-05', guardian: 'Mr. Wayne Prince', contact: 'wayne.p@example.com' },
                        { id: 'S24005', name: 'Eve Adams', class: 'Math 101', status: 'Active', img: 'https://via.placeholder.com/35/FFB86B/FFFFFF?text=EA', dob: '2011-02-10', guardian: 'Mr. David Adams', contact: 'david.a@example.com' },
                        { id: 'S24008', name: 'Henry Ford', class: 'Math 101', status: 'Suspended', img: 'https://via.placeholder.com/35/F16464/FFFFFF?text=HF', dob: '2010-06-01', guardian: 'Mrs. Betty Ford', contact: 'betty.f@example.com' },
                        { id: 'S24011', name: 'Karen Kim', class: 'Art 101', status: 'Active', img: 'https://via.placeholder.com/35/6B8BFF/FFFFFF?text=KK', dob: '2010-10-20', guardian: 'Mr. Paul Kim', contact: 'paul.k@example.com' },
                    ],
                    'FullYear': [] // Will be dynamically combined in getStudentsForPeriod
                },
                '2023-2024': {
                    'FullYear': [ // For simplicity, only showing full year for previous academic year
                        { id: 'S23001', name: 'Old Student A', class: 'Math 101', status: 'Graduated', img: 'https://via.placeholder.com/35/999999/FFFFFF?text=OA', dob: '2008-05-10', guardian: 'Mr. Old Guardian A', contact: 'old.a@example.com' },
                        { id: 'S23002', name: 'Old Student B', class: 'History 101', status: 'Graduated', img: 'https://via.placeholder.com/35/999999/FFFFFF?text=OB', dob: '2008-09-01', guardian: 'Ms. Old Guardian B', contact: 'old.b@example.com' },
                        { id: 'S23003', name: 'Student C (Left)', class: 'Science 101', status: 'Inactive', img: 'https://via.placeholder.com/35/999999/FFFFFF?text=SC', dob: '2009-02-28', guardian: 'Mr. New Guardian C', contact: 'new.c@example.com' },
                    ]
                }
            };

            // Helper function to get unique students for a given year/semester combination
            function getStudentsForPeriod(year, semester) {
                const yearData = studentData[year];
                if (!yearData) return [];

                if (semester === 'All' || semester === 'FullYear') {
                    if (yearData['FullYear'] && yearData['FullYear'].length > 0) {
                        return yearData['FullYear'];
                    }

                    let allStudentsInYear = [];
                    const seenIds = new Set();
                    for (const semKey in yearData) {
                        if (semKey !== 'FullYear' && Array.isArray(yearData[semKey])) {
                            yearData[semKey].forEach(student => {
                                if (!seenIds.has(student.id)) {
                                    allStudentsInYear.push(student);
                                    seenIds.add(student.id);
                                }
                            });
                        }
                    }
                    // Cache the combined FullYear data for future access
                    if (semester === 'FullYear') {
                       yearData['FullYear'] = allStudentsInYear;
                    }
                    return allStudentsInYear;
                } else {
                    return yearData[semester] || [];
                }
            }


            function updateStudentsPage() {
                const selectedAcademicYear = academicYearFilter.value;
                const selectedSemester = semesterFilter.value;
                const selectedClass = classFilter.value;
                const searchTerm = studentSearch.value.toLowerCase();

                // Get base student list for the selected academic year and semester
                let currentStudents = getStudentsForPeriod(selectedAcademicYear, selectedSemester);

                // Filter by class
                if (selectedClass !== 'All') {
                    currentStudents = currentStudents.filter(student => student.class === selectedClass);
                }

                // Filter by search term (manual search since DataTables is removed)
                if (searchTerm) {
                    currentStudents = currentStudents.filter(student =>
                        student.name.toLowerCase().includes(searchTerm) ||
                        student.id.toLowerCase().includes(searchTerm)
                    );
                }

                // Update Overview Cards
                totalStudentsCard.textContent = currentStudents.length;
                activeStudentsCard.textContent = currentStudents.filter(s => s.status === 'Active').length;
                graduatedStudentsCard.textContent = currentStudents.filter(s => s.status === 'Graduated').length;
                suspendedStudentsCard.textContent = currentStudents.filter(s => s.status === 'Suspended').length;
                
                overviewFilterText.textContent = `${selectedAcademicYear} / ${selectedSemester}`;

                // Populate Student List Table (Manual Rendering)
                studentTableBody.innerHTML = ''; // Clear existing rows
                if (currentStudents.length > 0) {
                    currentStudents.forEach((student, index) => {
                        const row = document.createElement('tr');
                        const statusClass = student.status.toLowerCase().replace(/\s/g, ''); // active, inactive, graduated, suspended
                        row.innerHTML = `
                            <td>${index + 1}</td>
                            <td class="student-info">
                                <img src="${student.img || 'https://via.placeholder.com/35/CCCCCC/FFFFFF?text=' + student.name.charAt(0)}" alt="${student.name}">
                                <span class="name">${student.name}</span>
                            </td>
                            <td>${student.id}</td>
                            <td>${student.class}</td>
                            <td><span class="badge bg-${statusClass}">${student.status}</span></td>
                            <td class="action-td">
                                <button class="btn btn-sm btn-outline-secondary me-2 view-profile-btn" data-student-id="${student.id}"><i class="bi bi-eye"></i></button>
                                <button class="btn btn-sm btn-outline-info me-2 edit-student-btn" data-student-id="${student.id}"><i class="bi bi-pencil"></i></button>
                                <button class="btn btn-sm btn-outline-danger delete-student-btn" data-student-id="${student.id}"><i class="bi bi-trash"></i></button>
                            </td>
                        `;
                        studentTableBody.appendChild(row);
                    });

                    // Re-attach event listeners to the new buttons
                    attachStudentActionListeners(currentStudents);

                } else {
                    studentTableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">No student records found for this selection.</td></tr>`;
                }
            }

            // Function to attach event listeners to student action buttons
            function attachStudentActionListeners(studentsDisplayed) {
                studentTableBody.querySelectorAll('.view-profile-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const studentId = this.dataset.studentId;
                        const student = studentsDisplayed.find(s => s.id === studentId);
                        if (student) {
                            viewProfileName.textContent = student.name;
                            viewProfileImg.src = student.img || 'https://via.placeholder.com/100/CCCCCC/FFFFFF?text=' + student.name.charAt(0);
                            viewProfileId.textContent = student.id;
                            viewProfileClass.textContent = student.class;
                            viewProfileStatus.textContent = student.status;
                            viewProfileStatus.className = `badge bg-${student.status.toLowerCase().replace(/\s/g, '')}`;
                            viewProfileAcademicYear.textContent = academicYearFilter.value; // Show current filter context
                            viewProfileSemester.textContent = semesterFilter.value; // Show current filter context
                            viewStudentProfileModal.show();
                        }
                    });
                });

                studentTableBody.querySelectorAll('.edit-student-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const studentId = this.dataset.studentId;
                        const student = studentsDisplayed.find(s => s.id === studentId);
                        if (student) {
                            editStudentIdHidden.value = student.id;
                            editStudentName.textContent = student.name;
                            editName.value = student.name;
                            editClass.value = student.class;
                            editStatus.value = student.status;
                            editStudentModal.show();
                        }
                    });
                });

                studentTableBody.querySelectorAll('.delete-student-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const studentId = this.dataset.studentId;
                        const student = studentsDisplayed.find(s => s.id === studentId);
                        if (student) {
                            deleteStudentNameConfirm.textContent = student.name;
                            deleteStudentIdConfirm.textContent = student.id;
                            deleteStudentIdHidden.value = student.id;
                            deleteStudentModal.show();
                        }
                    });
                });
            }

            // --- Modal Form Submissions/Confirmations ---
            editStudentForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const studentIdToEdit = editStudentIdHidden.value;
                const newName = editName.value;
                const newClass = editClass.value;
                const newStatus = editStatus.value;

                // --- Simulate data update in mock data ---
                let found = false;
                for (const year in studentData) {
                    for (const semester in studentData[year]) {
                        if (Array.isArray(studentData[year][semester])) { // Ensure it's an array of students
                            const studentIndex = studentData[year][semester].findIndex(s => s.id === studentIdToEdit);
                            if (studentIndex !== -1) {
                                studentData[year][semester][studentIndex].name = newName;
                                studentData[year][semester][studentIndex].class = newClass;
                                studentData[year][semester][studentIndex].status = newStatus;
                                found = true;
                                break; // Stop searching once found and updated
                            }
                        }
                    }
                    if (found) break;
                }
                // Also update FullYear caches if they exist
                for (const year in studentData) {
                    if (studentData[year]['FullYear'] && studentData[year]['FullYear'].length > 0) {
                        const studentIndex = studentData[year]['FullYear'].findIndex(s => s.id === studentIdToEdit);
                        if (studentIndex !== -1) {
                            studentData[year]['FullYear'][studentIndex].name = newName;
                            studentData[year]['FullYear'][studentIndex].class = newClass;
                            studentData[year]['FullYear'][studentIndex].status = newStatus;
                        }
                    }
                }
                
                editStudentModal.hide();
                alert(`Student ${newName} (ID: ${studentIdToEdit}) updated successfully (simulated).`);
                updateStudentsPage(); // Re-render table with updated data
            });

            confirmDeleteBtn.addEventListener('click', function() {
                const studentIdToDelete = deleteStudentIdHidden.value;
                
                // --- Simulate deletion from mock data ---
                let deletedCount = 0;
                for (const year in studentData) {
                    for (const semester in studentData[year]) {
                        if (Array.isArray(studentData[year][semester])) { // Ensure it's an array of students
                            const initialLength = studentData[year][semester].length;
                            studentData[year][semester] = studentData[year][semester].filter(s => s.id !== studentIdToDelete);
                            if (studentData[year][semester].length < initialLength) {
                                deletedCount++;
                            }
                        }
                    }
                }

                if (deletedCount > 0) {
                    alert(`Student ID: ${studentIdToDelete} deleted successfully (simulated).`);
                } else {
                    alert(`Student ID: ${studentIdToDelete} not found for deletion.`);
                }
                
                deleteStudentModal.hide();
                updateStudentsPage(); // Re-render table and update counts
            });


            // Event listeners for filters
            academicYearFilter.addEventListener('change', updateStudentsPage);
            semesterFilter.addEventListener('change', updateStudentsPage);
            classFilter.addEventListener('change', updateStudentsPage);
            studentSearch.addEventListener('input', updateStudentsPage); // Filter on keypress

            addNewStudentBtn.addEventListener('click', () => {
                alert('Add New Student functionality (simulated).\n(This would typically open a modal or navigate to a form.)');
                // Could open a modal with a form for adding a new student
            });

            // Initial call to populate page on load
            updateStudentsPage();
        });