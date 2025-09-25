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
    const viewProfileDOB = document.getElementById('viewProfileDOB');
    const viewProfileGuardian = document.getElementById('viewProfileGuardian');
    const viewProfileContact = document.getElementById('viewProfileContact');


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

    // Add New Student Modal fields
    const addStudentModal = new bootstrap.Modal(document.getElementById('addStudentModal'));
    const addStudentForm = document.getElementById('addStudentForm');
    const addStudentName = document.getElementById('addStudentName');
    const addStudentId = document.getElementById('addStudentId');
    const addStudentClass = document.getElementById('addStudentClass');
    const addStudentStatus = document.getElementById('addStudentStatus');
    const addStudentDOB = document.getElementById('addStudentDOB');
    const addStudentGuardian = document.getElementById('addStudentGuardian');
    const addStudentContact = document.getElementById('addStudentContact');


    // --- Student Page Specific Logic ---

    // Simulated Student Data (using 'let' for mutability)
    let studentData = {
        '2024-2025': {
            'Fall': [
                { id: 'S24001', name: 'Alice Smith', class: 'Math 101', status: 'Active', img: 'assets/img/user/maleavatar.jpg', dob: '2010-01-15', guardian: 'Mr. John Smith', contact: 'john.smith@example.com' },
                { id: 'S24002', name: 'Bob Johnson', class: 'Science 101', status: 'Active', img: 'assets/img/user/maleavatar.jpg', dob: '2011-03-22', guardian: 'Ms. Emily Johnson', contact: 'emily.j@example.com' },
                { id: 'S24003', name: 'Charlie Brown', class: 'History 101', status: 'Active', img: 'assets/img/user/maleavatar.jpg', dob: '2010-07-01', guardian: 'Mrs. Lucy Brown', contact: 'lucy.b@example.com' },
                { id: 'S24004', name: 'Diana Prince', class: 'English 101', status: 'Active', img: 'assets/img/user/maleavatar.jpg', dob: '2009-11-05', guardian: 'Mr. Wayne Prince', contact: 'wayne.p@example.com' },
                { id: 'S24005', name: 'Eve Adams', class: 'Math 101', status: 'Active', img: 'assets/img/user/maleavatar.jpg', dob: '2011-02-10', guardian: 'Mr. David Adams', contact: 'david.a@example.com' },
                { id: 'S24006', name: 'Frank White', class: 'Science 101', status: 'Active', img: 'assets/img/user/maleavatar.jpg', dob: '2010-09-18', guardian: 'Mrs. Susan White', contact: 'susan.w@example.com' },
                { id: 'S24007', name: 'Grace Hopper', class: 'History 101', status: 'Active', img: 'assets/img/user/maleavatar.jpg', dob: '2009-04-30', guardian: 'Mr. Allan Hopper', contact: 'allan.h@example.com' },
                { id: 'S24008', name: 'Henry Ford', class: 'Math 101', status: 'Suspended', img: 'assets/img/user/maleavatar.jpg', dob: '2010-06-01', guardian: 'Mrs. Betty Ford', contact: 'betty.f@example.com' },
                { id: 'S24009', name: 'Ivy Green', class: 'English 101', status: 'Active', img: 'assets/img/user/maleavatar.jpg', dob: '2011-08-25', guardian: 'Mr. Robert Green', contact: 'robert.g@example.com' },
                { id: 'S24010', name: 'Jack Black', class: 'Art 101', status: 'Active', img: 'assets/img/user/maleavatar.jpg', dob: '2010-03-10', guardian: 'Ms. Kelly Black', contact: 'kelly.b@example.com' },
            ],
            'Spring': [
                { id: 'S24001', name: 'Alice Smith', class: 'Math 101', status: 'Active', img: 'assets/img/user/maleavatar.jpg', dob: '2010-01-15', guardian: 'Mr. John Smith', contact: 'john.smith@example.com' },
                { id: 'S24002', name: 'Bob Johnson', class: 'Science 101', status: 'Active', img: 'assets/img/user/maleavatar.jpg', dob: '2011-03-22', guardian: 'Ms. Emily Johnson', contact: 'emily.j@example.com' },
                { id: 'S24003', name: 'Charlie Brown', class: 'History 101', status: 'Active', img: 'assets/img/user/maleavatar.jpg', dob: '2010-07-01', guardian: 'Mrs. Lucy Brown', contact: 'lucy.b@example.com' },
                { id: 'S24004', name: 'Diana Prince', class: 'English 101', status: 'Active', img: 'assets/img/user/maleavatar.jpg', dob: '2009-11-05', guardian: 'Mr. Wayne Prince', contact: 'wayne.p@example.com' },
                { id: 'S24005', name: 'Eve Adams', class: 'Math 101', status: 'Active', img: 'assets/img/user/maleavatar.jpg', dob: '2011-02-10', guardian: 'Mr. David Adams', contact: 'david.a@example.com' },
                { id: 'S24008', name: 'Henry Ford', class: 'Math 101', status: 'Suspended', img: 'assets/img/user/maleavatar.jpg', dob: '2010-06-01', guardian: 'Mrs. Betty Ford', contact: 'betty.f@example.com' },
                { id: 'S24011', name: 'Karen Kim', class: 'Art 101', status: 'Active', img: 'assets/img/user/maleavatar.jpg', dob: '2010-10-20', guardian: 'Mr. Paul Kim', contact: 'paul.k@example.com' },
            ],
            'FullYear': [] // This will be dynamically populated/cached
        },
        '2023-2024': {
            'FullYear': [
                { id: 'S23001', name: 'Old Student A', class: 'Math 101', status: 'Graduated', img: 'assets/img/user/maleavatar.jpg', dob: '2008-05-10', guardian: 'Mr. Old Guardian A', contact: 'old.a@example.com' },
                { id: 'S23002', name: 'Old Student B', class: 'History 101', status: 'Graduated', img: 'assets/img/user/maleavatar.jpg', dob: '2008-09-01', guardian: 'Ms. Old Guardian B', contact: 'old.b@example.com' },
                { id: 'S23003', name: 'Student C (Left)', class: 'Science 101', status: 'Inactive', img: 'assets/img/user/maleavatar.jpg', dob: '2009-02-28', guardian: 'Mr. New Guardian C', contact: 'new.c@example.com' },
            ]
        }
    };


    // Helper function to get unique students for a given year/semester combination
    function getStudentsForPeriod(year, semester) {
        const yearData = studentData[year];
        if (!yearData) return [];

        if (semester === 'All') {
            let allStudentsInYear = [];
            const seenIds = new Set();
            for (const semKey in yearData) {
                if (Array.isArray(yearData[semKey])) {
                    yearData[semKey].forEach(student => {
                        if (!seenIds.has(student.id)) {
                            allStudentsInYear.push(student);
                            seenIds.add(student.id);
                        }
                    });
                }
            }
            return allStudentsInYear;
        } else if (semester === 'FullYear') {
            // If FullYear data is explicitly cached, use it
            if (yearData['FullYear'] && yearData['FullYear'].length > 0) {
                return yearData['FullYear'];
            }
            
            // Otherwise, combine all known students for the year and cache it
            let allStudentsForCaching = [];
            const seenIds = new Set();
            for (const semKey in yearData) {
                if (semKey !== 'FullYear' && Array.isArray(yearData[semKey])) {
                    yearData[semKey].forEach(student => {
                        if (!seenIds.has(student.id)) {
                            allStudentsForCaching.push(student);
                            seenIds.add(student.id);
                        }
                    });
                }
            }
            yearData['FullYear'] = allStudentsForCaching; // Cache it
            return allStudentsForCaching;

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
                        <img src="${student.img || 'assets/img/user/maleavatar.jpg'}" alt="${student.name}">
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
                    viewProfileImg.src = student.img || 'assets/img/user/maleavatar.jpg';
                    viewProfileId.textContent = student.id;
                    viewProfileClass.textContent = student.class;
                    viewProfileStatus.textContent = student.status;
                    viewProfileStatus.className = `badge bg-${student.status.toLowerCase().replace(/\s/g, '')}`;
                    viewProfileAcademicYear.textContent = academicYearFilter.value; // Show current filter context
                    viewProfileSemester.textContent = semesterFilter.value; // Show current filter context
                    viewProfileDOB.textContent = student.dob || 'N/A';
                    viewProfileGuardian.textContent = student.guardian || 'N/A';
                    viewProfileContact.textContent = student.contact || 'N/A';
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
                        // For simplicity, we assume one student ID is unique across all semesters within a year for update purposes
                        break; 
                    }
                }
            }
            if (found) break; // Stop searching years once student is found and updated
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


    // NEW: Add New Student Form Submission
    addStudentForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newStudent = {
            id: addStudentId.value.trim(),
            name: addStudentName.value.trim(),
            class: addStudentClass.value,
            status: addStudentStatus.value,
            img: addStudentStatus.value === 'maleavatar.jpg' ? 'assets/img/user/maleavatar.jpg' : 'assets/img/user/maleavatar.jpg', // Default image based on hypothetical gender field, or just 'user.png'
            dob: addStudentDOB.value,
            guardian: addStudentGuardian.value.trim(),
            contact: addStudentContact.value.trim()
        };

        // Simple validation for ID uniqueness within the entire studentData (can be more robust)
        let isIdUnique = true;
        for (const year in studentData) {
            for (const semester in studentData[year]) {
                if (Array.isArray(studentData[year][semester])) {
                    if (studentData[year][semester].some(s => s.id === newStudent.id)) {
                        isIdUnique = false;
                        break;
                    }
                }
            }
            if (!isIdUnique) break;
        }

        if (!isIdUnique) {
            alert('Error: Student ID already exists in the system. Please use a unique ID.');
            return;
        }

        const currentAcademicYear = academicYearFilter.value;
        const currentSemester = semesterFilter.value;

        // Ensure the academic year and semester structure exists
        if (!studentData[currentAcademicYear]) {
            studentData[currentAcademicYear] = {};
        }
        if (!studentData[currentAcademicYear][currentSemester]) {
            studentData[currentAcademicYear][currentSemester] = [];
        }
        studentData[currentAcademicYear][currentSemester].push(newStudent);

        // Invalidate the 'FullYear' cache for the current academic year if it exists
        if (studentData[currentAcademicYear]['FullYear']) {
            studentData[currentAcademicYear]['FullYear'] = []; // Clear to force re-generation on next access
        }

        addStudentModal.hide();
        addStudentForm.reset(); // Clear the form
        updateStudentsPage(); // Re-render table with new data
    });


    // Event listeners for filters
    academicYearFilter.addEventListener('change', updateStudentsPage);
    semesterFilter.addEventListener('change', updateStudentsPage);
    classFilter.addEventListener('change', updateStudentsPage);
    studentSearch.addEventListener('input', updateStudentsPage); // Filter on keypress

    // MODIFIED: Open the new add student modal
    addNewStudentBtn.addEventListener('click', () => {
        addStudentForm.reset(); // Clear any previous input
        addStudentStatus.value = "Active"; // Set default status
        addStudentClass.value = ""; // Ensure class is reset to default placeholder
        addStudentModal.show(); // Show the add student modal
    });

    // Initial call to populate page on load
    updateStudentsPage();
});