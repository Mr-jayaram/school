
        document.addEventListener('DOMContentLoaded', () => {

            // --- Teacher Page Specific Logic ---
        
            const academicYearFilter = document.getElementById('academicYearFilter');
            const semesterFilter = document.getElementById('semesterFilter');
            const departmentFilter = document.getElementById('departmentFilter');
            const teacherSearch = document.getElementById('teacherSearch');
            const addNewTeacherBtn = document.getElementById('addNewTeacherBtn');

            const totalTeachersCard = document.getElementById('totalTeachersCard');
            const activeTeachersCard = document.getElementById('activeTeachersCard');
            const onLeaveTeachersCard = document.getElementById('onLeaveTeachersCard');
            const vacantPositionsCard = document.getElementById('vacantPositionsCard');
            const overviewFilterText = document.getElementById('overviewFilterText');

            const teacherTableBody = document.getElementById('teacherTableBody');

            // --- Modal Elements ---
            // Add Teacher Modal
            const addTeacherModal = new bootstrap.Modal(document.getElementById('addTeacherModal'));
            const addTeacherForm = document.getElementById('addTeacherForm');
            const addTeacherName = document.getElementById('addTeacherName');
            const addTeacherId = document.getElementById('addTeacherId');
            const addTeacherDepartment = document.getElementById('addTeacherDepartment');
            const addTeacherStatus = document.getElementById('addTeacherStatus');

            // View Teacher Profile Modal
            const viewTeacherProfileModal = new bootstrap.Modal(document.getElementById('viewTeacherProfileModal'));
            const viewProfileName = document.getElementById('viewProfileName');
            const viewProfileImg = document.getElementById('viewProfileImg');
            const viewProfileId = document.getElementById('viewProfileId');
            const viewProfileDepartment = document.getElementById('viewProfileDepartment');
            const viewProfileStatus = document.getElementById('viewProfileStatus');
            const viewProfileAcademicYear = document.getElementById('viewProfileAcademicYear');
            const viewProfileSemester = document.getElementById('viewProfileSemester');
            const viewProfileSpecialization = document.getElementById('viewProfileSpecialization');
            const viewProfileContact = document.getElementById('viewProfileContact');
            const viewProfileDateHired = document.getElementById('viewProfileDateHired');


            // Edit Teacher Modal
            const editTeacherModal = new bootstrap.Modal(document.getElementById('editTeacherModal'));
            const editTeacherForm = document.getElementById('editTeacherForm');
            const editTeacherIdHidden = document.getElementById('editTeacherIdHidden');
            const editTeacherNameDisplay = document.getElementById('editTeacherNameDisplay');
            const editTeacherName = document.getElementById('editTeacherName');
            const editTeacherDepartment = document.getElementById('editTeacherDepartment');
            const editTeacherStatus = document.getElementById('editTeacherStatus');
            const editTeacherSpecialization = document.getElementById('editTeacherSpecialization');

            // Delete Confirmation Modal
            const deleteTeacherModal = new bootstrap.Modal(document.getElementById('deleteTeacherModal'));
            const deleteTeacherNameConfirm = document.getElementById('deleteTeacherNameConfirm');
            const deleteTeacherIdConfirm = document.getElementById('deleteTeacherIdConfirm');
            const deleteTeacherIdHidden = document.getElementById('deleteTeacherIdHidden');
            const confirmDeleteTeacherBtn = document.getElementById('confirmDeleteTeacherBtn');


            // Simulated Teacher Data (using 'let' for mutability)
            let teacherData = {
                '2024-2025': {
                    'Fall': [
                        { id: 'T24001', name: 'Dr. Jane Smith', department: 'Science', status: 'Active', img: 'https://via.placeholder.com/35/FF6B6B/FFFFFF?text=JS', specialization: 'Physics', contact: 'jane.s@edudash.com', dateHired: '2020-08-15' },
                        { id: 'T24002', name: 'Mr. John Doe', department: 'Mathematics', status: 'Active', img: 'https://via.placeholder.com/35/6BFFB8/FFFFFF?text=JD', specialization: 'Calculus', contact: 'john.d@edudash.com', dateHired: '2019-09-01' },
                        { id: 'T24003', name: 'Ms. Emily White', department: 'English', status: 'Active', img: 'https://via.placeholder.com/35/8BCBFB/FFFFFF?text=EW', specialization: 'Literature', contact: 'emily.w@edudash.com', dateHired: '2021-01-10' },
                        { id: 'T24004', name: 'Prof. Alex Green', department: 'History', status: 'On Leave', img: 'https://via.placeholder.com/35/F16464/FFFFFF?text=AG', specialization: 'World History', contact: 'alex.g@edudash.com', dateHired: '2018-03-01' },
                        { id: 'T24005', name: 'Ms. Sarah Brown', department: 'Arts', status: 'Active', img: 'https://via.placeholder.com/35/FFB86B/FFFFFF?text=SB', specialization: 'Visual Arts', contact: 'sarah.b@edudash.com', dateHired: '2022-09-01' },
                        { id: 'T24006', name: 'Mr. Chris Davis', department: 'Science', status: 'Active', img: 'https://via.placeholder.com/35/81D3AD/FFFFFF?text', specialization: 'Biology', contact: 'chris.d@edudash.com', dateHired: '2020-01-05' },
                        { id: 'T24007', name: 'Dr. Maria Lopez', department: 'Mathematics', status: 'Active', img: 'https://via.placeholder.com/35/8BCBFB/FFFFFF?', specialization: 'Algebra', contact: 'maria.l@edudash.com', dateHired: '2017-08-01' },
                    ],
                    'Spring': [
                        { id: 'T24001', name: 'Dr. Jane Smith', department: 'Science', status: 'Active', img: 'https://via.placeholder.com/35/FF6B6B/FFFFFF?text=JS', specialization: 'Physics', contact: 'jane.s@edudash.com', dateHired: '2020-08-15' },
                        { id: 'T24002', name: 'Mr. John Doe', department: 'Mathematics', status: 'Active', img: 'https://via.placeholder.com/35/6BFFB8/FFFFFF?text=JD', specialization: 'Calculus', contact: 'john.d@edudash.com', dateHired: '2019-09-01' },
                        { id: 'T24003', name: 'Ms. Emily White', department: 'English', status: 'Active', img: 'https://via.placeholder.com/35/8BCBFB/FFFFFF?text=EW', specialization: 'Literature', contact: 'emily.w@edudash.com', dateHired: '2021-01-10' },
                        { id: 'T24005', name: 'Ms. Sarah Brown', department: 'Arts', status: 'Active', img: 'https://via.placeholder.com/35/FFB86B/FFFFFF?text=SB', specialization: 'Visual Arts', contact: 'sarah.b@edudash.com', dateHired: '2022-09-01' },
                        { id: 'T24006', name: 'Mr. Chris Davis', department: 'Science', status: 'Active', img: 'https://via.placeholder.com/35/81D3AD/FFFFFF?text=CD', specialization: 'Biology', contact: 'chris.d@edudash.com', dateHired: '2020-01-05' },
                        { id: 'T24008', name: 'Mr. Peter Jones', department: 'History', status: 'Active', img: 'https://via.placeholder.com/35/FF6B6B/FFFFFF?text=PJ', specialization: 'Ancient History', contact: 'peter.j@edudash.com', dateHired: '2023-01-01' },
                        { id: 'T24009', name: 'Dr. Lisa King', department: 'Science', status: 'Active', img: 'https://via.placeholder.com/35/6BFFB8/FFFFFF?text=LK', specialization: 'Chemistry', contact: 'lisa.k@edudash.com', dateHired: '2023-09-15' },
                    ],
                    'FullYear': [] // Will be dynamically combined
                },
                '2023-2024': {
                    'FullYear': [ // For simplicity, only full year for previous academic year
                        { id: 'T23001', name: 'Mr. David Lee', department: 'Mathematics', status: 'Retired', img: 'https://via.placeholder.com/35/999999/FFFFFF?text=DL', specialization: 'Geometry', contact: 'david.l@edudash.com', dateHired: '2000-09-01' },
                        { id: 'T23002', name: 'Ms. Laura Chen', department: 'English', status: 'Active', img: 'https://via.placeholder.com/35/999999/FFFFFF?text=LC', specialization: 'Grammar', contact: 'laura.c@edudash.com', dateHired: '2015-01-10' },
                    ]
                }
            };

            // Helper function to get unique teachers for a given year/semester combination
            function getTeachersForPeriod(year, semester) {
                const yearData = teacherData[year];
                if (!yearData) return [];

                if (semester === 'All' || semester === 'FullYear') {
                    if (yearData['FullYear'] && yearData['FullYear'].length > 0 && semester === 'FullYear') {
                        return yearData['FullYear'];
                    }

                    let allTeachersInYear = [];
                    const seenIds = new Set();
                    for (const semKey in yearData) {
                        if (semKey !== 'FullYear' && Array.isArray(yearData[semKey])) {
                            yearData[semKey].forEach(teacher => {
                                if (!seenIds.has(teacher.id)) {
                                    allTeachersInYear.push(teacher);
                                    seenIds.add(teacher.id);
                                }
                            });
                        }
                    }
                    if (semester === 'FullYear') {
                       yearData['FullYear'] = allTeachersInYear; // Cache the combined FullYear data
                    }
                    return allTeachersInYear;
                } else {
                    return yearData[semester] || [];
                }
            }


            function updateTeachersPage() {
                const selectedAcademicYear = academicYearFilter.value;
                const selectedSemester = semesterFilter.value;
                const selectedDepartment = departmentFilter.value;
                const searchTerm = teacherSearch.value.toLowerCase();

                // Get base teacher list for the selected academic year and semester
                let currentTeachers = getTeachersForPeriod(selectedAcademicYear, selectedSemester);

                // Filter by department
                if (selectedDepartment !== 'All') {
                    currentTeachers = currentTeachers.filter(teacher => teacher.department === selectedDepartment);
                }

                // Filter by search term
                if (searchTerm) {
                    currentTeachers = currentTeachers.filter(teacher =>
                        teacher.name.toLowerCase().includes(searchTerm) ||
                        teacher.id.toLowerCase().includes(searchTerm)
                    );
                }

                // Update Overview Cards
                totalTeachersCard.textContent = currentTeachers.length;
                activeTeachersCard.textContent = currentTeachers.filter(t => t.status === 'Active').length;
                onLeaveTeachersCard.textContent = currentTeachers.filter(t => t.status === 'On Leave').length;
                vacantPositionsCard.textContent = currentTeachers.filter(t => t.status === 'Vacant').length; // Assuming 'Vacant' means a position, not an active teacher

                overviewFilterText.textContent = `${selectedAcademicYear} / ${selectedSemester}`;

                // Populate Teacher List Table (Manual Rendering)
                teacherTableBody.innerHTML = ''; // Clear existing rows
                if (currentTeachers.length > 0) {
                    currentTeachers.forEach((teacher, index) => {
                        const row = document.createElement('tr');
                        const statusClass = teacher.status.toLowerCase().replace(/\s/g, ''); // active, onleave, retired, vacant
                        row.innerHTML = `
                            <td class="action-td">${index + 1}</td>
                            <td class="teacher-info">
                                <span class="name">${teacher.name}</span>
                            </td>
                            <td>${teacher.id}</td>
                            <td>${teacher.department}</td>
                            <td class="action-td"><span class="badge bg-${statusClass}">${teacher.status}</span></td>
                            <td class="action-td"> 
                                <button class="btn btn-sm btn-outline-secondary me-2 view-profile-btn" data-teacher-id="${teacher.id}"><i class="bi bi-eye"></i></button>
                                <button class="btn btn-sm btn-outline-info me-2 edit-teacher-btn" data-teacher-id="${teacher.id}"><i class="bi bi-pencil"></i></button>
                                <button class="btn btn-sm btn-outline-danger delete-teacher-btn" data-teacher-id="${teacher.id}"><i class="bi bi-trash"></i></button>
                            </td>
                        `;
                        teacherTableBody.appendChild(row);
                    });

                    // Re-attach event listeners to the new buttons
                    attachTeacherActionListeners(currentTeachers);

                } else {
                    teacherTableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">No teacher records found for this selection.</td></tr>`;
                }
            }

            // Function to attach event listeners to teacher action buttons
            function attachTeacherActionListeners(teachersDisplayed) {
                teacherTableBody.querySelectorAll('.view-profile-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const teacherId = this.dataset.teacherId;
                        const teacher = teachersDisplayed.find(t => t.id === teacherId);
                        if (teacher) {
                            viewProfileName.textContent = teacher.name;
                            viewProfileImg.src = teacher.img || 'https://via.placeholder.com/100/CCCCCC/FFFFFF?text=' + teacher.name.charAt(0);
                            viewProfileId.textContent = teacher.id;
                            viewProfileDepartment.textContent = teacher.department;
                            viewProfileStatus.textContent = teacher.status;
                            viewProfileStatus.className = `badge bg-${teacher.status.toLowerCase().replace(/\s/g, '')}`;
                            viewProfileAcademicYear.textContent = academicYearFilter.value; // Show current filter context
                            viewProfileSemester.textContent = semesterFilter.value; // Show current filter context
                            // Additional profile details
                            viewProfileSpecialization.textContent = teacher.specialization || 'N/A';
                            viewProfileContact.textContent = teacher.contact || 'N/A';
                            viewProfileDateHired.textContent = teacher.dateHired || 'N/A';
                            viewTeacherProfileModal.show();
                        }
                    });
                });

                teacherTableBody.querySelectorAll('.edit-teacher-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const teacherId = this.dataset.teacherId;
                        const teacher = teachersDisplayed.find(t => t.id === teacherId);
                        if (teacher) {
                            editTeacherIdHidden.value = teacher.id;
                            editTeacherNameDisplay.textContent = teacher.name; // Update modal title
                            editTeacherName.value = teacher.name;
                            editTeacherDepartment.value = teacher.department;
                            editTeacherStatus.value = teacher.status;
                            editTeacherSpecialization.value = teacher.specialization || '';
                            editTeacherModal.show();
                        }
                    });
                });

                teacherTableBody.querySelectorAll('.delete-teacher-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const teacherId = this.dataset.teacherId;
                        const teacher = teachersDisplayed.find(t => t.id === teacherId);
                        if (teacher) {
                            deleteTeacherNameConfirm.textContent = teacher.name;
                            deleteTeacherIdConfirm.textContent = teacher.id;
                            deleteTeacherIdHidden.value = teacher.id;
                            deleteTeacherModal.show();
                        }
                    });
                });
            }

            // --- Modal Form Submissions/Confirmations ---

            // Add Teacher Form Submission
            addTeacherForm.addEventListener('submit', function(event) {
                event.preventDefault();

                const newTeacher = {
                    id: addTeacherId.value.trim(),
                    name: addTeacherName.value.trim(),
                    department: addTeacherDepartment.value,
                    status: addTeacherStatus.value,
                    img: `https://via.placeholder.com/35/ADD8E6/FFFFFF?text=${addTeacherName.value.charAt(0)}`, // Generate a simple placeholder image
                    specialization: 'General', // Default
                    contact: 'N/A',
                    dateHired: new Date().toISOString().slice(0, 10) // Current date
                };

                // Basic validation for ID uniqueness
                const selectedAcademicYear = academicYearFilter.value;
                const selectedSemester = semesterFilter.value;
                const existingTeachersInPeriod = getTeachersForPeriod(selectedAcademicYear, selectedSemester);
                if (existingTeachersInPeriod.some(t => t.id === newTeacher.id)) {
                    alert('Error: Teacher ID already exists for the current academic period.');
                    return;
                }

                // --- Simulate adding teacher to mock data ---
                if (!teacherData[selectedAcademicYear]) {
                    teacherData[selectedAcademicYear] = {};
                }
                if (!teacherData[selectedAcademicYear][selectedSemester]) {
                    teacherData[selectedAcademicYear][selectedSemester] = [];
                }
                teacherData[selectedAcademicYear][selectedSemester].push(newTeacher);

                // Invalidate FullYear cache for the current year
                if (teacherData[selectedAcademicYear]['FullYear']) {
                    teacherData[selectedAcademicYear]['FullYear'] = [];
                }

                addTeacherModal.hide();
                alert(`Teacher ${newTeacher.name} (ID: ${newTeacher.id}) added successfully (simulated).`);
                addTeacherForm.reset();
                updateTeachersPage();
            });


            // Edit Teacher Form Submission
            editTeacherForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const teacherIdToEdit = editTeacherIdHidden.value;
                const newName = editTeacherName.value.trim();
                const newDepartment = editTeacherDepartment.value;
                const newStatus = editTeacherStatus.value;
                const newSpecialization = editTeacherSpecialization.value.trim();

                // --- Simulate data update in mock data ---
                let found = false;
                for (const year in teacherData) {
                    for (const semester in teacherData[year]) {
                        if (Array.isArray(teacherData[year][semester])) {
                            const teacherIndex = teacherData[year][semester].findIndex(t => t.id === teacherIdToEdit);
                            if (teacherIndex !== -1) {
                                teacherData[year][semester][teacherIndex].name = newName;
                                teacherData[year][semester][teacherIndex].department = newDepartment;
                                teacherData[year][semester][teacherIndex].status = newStatus;
                                teacherData[year][semester][teacherIndex].specialization = newSpecialization;
                                found = true;
                            }
                        }
                    }
                }
                for (const year in teacherData) {
                    if (teacherData[year]['FullYear']) {
                        const teacherIndex = teacherData[year]['FullYear'].findIndex(t => t.id === teacherIdToEdit);
                        if (teacherIndex !== -1) {
                            teacherData[year]['FullYear'][teacherIndex].name = newName;
                            teacherData[year]['FullYear'][teacherIndex].department = newDepartment;
                            teacherData[year]['FullYear'][teacherIndex].status = newStatus;
                            teacherData[year]['FullYear'][teacherIndex].specialization = newSpecialization;
                        } else if (found) {
                             teacherData[year]['FullYear'] = []; // Invalidate cache to force rebuild
                        }
                    }
                }

                editTeacherModal.hide();
                alert(`Teacher ${newName} (ID: ${teacherIdToEdit}) updated successfully (simulated).`);
                updateTeachersPage();
            });

            confirmDeleteTeacherBtn.addEventListener('click', function() {
                const teacherIdToDelete = deleteTeacherIdHidden.value;

                // --- Simulate deletion from mock data ---
                let deletedCount = 0;
                for (const year in teacherData) {
                    for (const semester in teacherData[year]) {
                        if (Array.isArray(teacherData[year][semester])) {
                            const initialLength = teacherData[year][semester].length;
                            teacherData[year][semester] = teacherData[year][semester].filter(t => t.id !== teacherIdToDelete);
                            if (teacherData[year][semester].length < initialLength) {
                                deletedCount++;
                            }
                        }
                    }
                    if (teacherData[year]['FullYear']) {
                        teacherData[year]['FullYear'] = [];
                    }
                }

                if (deletedCount > 0) {
                    alert(`Teacher ID: ${teacherIdToDelete} deleted successfully (simulated).`);
                } else {
                    alert(`Teacher ID: ${teacherIdToDelete} not found for deletion.`);
                }

                deleteTeacherModal.hide();
                updateTeachersPage();
            });


            // Event listeners for filters
            academicYearFilter.addEventListener('change', updateTeachersPage);
            semesterFilter.addEventListener('change', updateTeachersPage);
            departmentFilter.addEventListener('change', updateTeachersPage);
            teacherSearch.addEventListener('input', updateTeachersPage);

            addNewTeacherBtn.addEventListener('click', () => {
                addTeacherForm.reset();
                addTeacherModal.show();
            });

            // Initial call to populate page on load
            updateTeachersPage();
        });