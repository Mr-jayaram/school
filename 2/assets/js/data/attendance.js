document.addEventListener('DOMContentLoaded', () => {
           
    const academicYearFilter = document.getElementById('academicYearFilter');
    const semesterFilter = document.getElementById('semesterFilter');
    const classFilter = document.getElementById('classFilter');
    const dateFilter = document.getElementById('dateFilter');
    const recordAttendanceBtn = document.getElementById('recordAttendanceBtn');

    // Attendance Overview Card elements
    const totalStudentsCount = document.getElementById('totalStudentsCount');
    const presentCount = document.getElementById('presentCount');
    const absentCount = document.getElementById('absentCount');
    // Removed lateCount as per new requirements
    
    const attendanceTableBody = document.getElementById('attendanceTableBody');

    let dataTableInstance = null; // To hold the DataTables instance


    // Structure: academicYear -> semester -> date -> class -> studentsAttendance
    // Note: Removed 'Late' status from mock data to align with new functionality
    const attendanceData = {
        '2024-2025': {
            'Fall': {
                '2024-10-10': { // YYYY-MM-DD
                    'Math 101': [
                        { id: 1, name: 'Alice Smith', roll: 'M101-001', status: 'Present', timeIn: '08:00 AM', img: 'https://via.placeholder.com/35/FF6B6B/FFFFFF?text=AS', class: 'Math 101' },
                        { id: 2, name: 'Bob Johnson', roll: 'M101-002', status: 'Present', timeIn: '08:01 AM', img: 'https://via.placeholder.com/35/6BFFB8/FFFFFF?text=BJ', class: 'Math 101' },
                        { id: 3, name: 'Charlie Brown', roll: 'M101-003', status: 'Present', timeIn: '08:05 AM', img: 'https://via.placeholder.com/35/8BCBFB/FFFFFF?text=CB', class: 'Math 101' }, // Changed from Late
                        { id: 4, name: 'Diana Prince', roll: 'M101-004', status: 'Absent', timeIn: '', img: 'https://via.placeholder.com/35/F16464/FFFFFF?text=DP', class: 'Math 101' },
                        { id: 5, name: 'Eve Adams', roll: 'M101-005', status: 'Present', timeIn: '08:00 AM', img: 'https://via.placeholder.com/35/FFB86B/FFFFFF?text=EA', class: 'Math 101' },
                        { id: 6, name: 'Frank White', roll: 'M101-006', status: 'Present', timeIn: '08:02 AM', img: 'https://via.placeholder.com/35/81D3AD/FFFFFF?text=FW', class: 'Math 101' },
                        { id: 7, name: 'Grace Hopper', roll: 'M101-007', status: 'Present', timeIn: '08:08 AM', img: 'https://via.placeholder.com/35/8BCBFB/FFFFFF?text=GH', class: 'Math 101' }, // Changed from Late
                    ],
                    'Science 101': [
                        { id: 10, name: 'Hannah Green', roll: 'S101-001', status: 'Present', timeIn: '09:00 AM', img: 'https://via.placeholder.com/35/FF6B6B/FFFFFF?text=HG', class: 'Science 101' },
                        { id: 11, name: 'Ian Black', roll: 'S101-002', status: 'Present', timeIn: '09:01 AM', img: 'https://via.placeholder.com/35/6BFFB8/FFFFFF?text=IB', class: 'Science 101' },
                        { id: 12, name: 'Jane Doe', roll: 'S101-003', status: 'Absent', timeIn: '', img: 'https://via.placeholder.com/35/F16464/FFFFFF?text=JD', class: 'Science 101' },
                    ]
                },
                '2024-10-11': {
                    'Math 101': [
                        { id: 1, name: 'Alice Smith', roll: 'M101-001', status: 'Present', timeIn: '08:00 AM', img: 'https://via.placeholder.com/35/FF6B6B/FFFFFF?text=AS', class: 'Math 101' },
                        { id: 2, name: 'Bob Johnson', roll: 'M101-002', status: 'Absent', timeIn: '', img: 'https://via.placeholder.com/35/6BFFB8/FFFFFF?text=BJ', class: 'Math 101' },
                        { id: 3, name: 'Charlie Brown', roll: 'M101-003', status: 'Present', timeIn: '08:00 AM', img: 'https://via.placeholder.com/35/8BCBFB/FFFFFF?text=CB', class: 'Math 101' },
                        { id: 4, name: 'Diana Prince', roll: 'M101-004', status: 'Present', timeIn: '08:00 AM', img: 'https://via.placeholder.com/35/F16464/FFFFFF?text=DP', class: 'Math 101' },
                        { id: 5, name: 'Eve Adams', roll: 'M101-005', status: 'Present', timeIn: '08:00 AM', img: 'https://via.placeholder.com/35/FFB86B/FFFFFF?text=EA', class: 'Math 101' },
                        { id: 6, name: 'Frank White', roll: 'M101-006', status: 'Present', timeIn: '08:02 AM', img: 'https://via.placeholder.com/35/81D3AD/FFFFFF?text=FW', class: 'Math 101' },
                        { id: 7, name: 'Grace Hopper', roll: 'M101-007', status: 'Present', timeIn: '08:00 AM', img: 'https://via.placeholder.com/35/8BCBFB/FFFFFF?text=GH', class: 'Math 101' },
                    ]
                },
                '2024-10-12': { // Saturday, might have less data
                     'Math 101': [
                        { id: 1, name: 'Alice Smith', roll: 'M101-001', status: 'Absent', timeIn: '', img: 'https://via.placeholder.com/35/FF6B6B/FFFFFF?text=AS', class: 'Math 101' },
                        { id: 2, name: 'Bob Johnson', roll: 'M101-002', status: 'Absent', timeIn: '', img: 'https://via.placeholder.com/35/6BFFB8/FFFFFF?text=BJ', class: 'Math 101' },
                    ],
                }
            },
            'Spring': {
                '2025-03-05': {
                    'English 101': [
                        { id: 20, name: 'Kyle Blue', roll: 'E101-001', status: 'Present', timeIn: '10:00 AM', img: 'https://via.placeholder.com/35/6B8BFF/FFFFFF?text=KB', class: 'English 101' },
                        { id: 21, name: 'Liam Red', roll: 'E101-002', status: 'Absent', timeIn: '10:07 AM', img: 'https://via.placeholder.com/35/F16464/FFFFFF?text=LR', class: 'English 101' }, // Changed from Late
                    ]
                }
            }
        }
        // More academic years/semesters/dates/classes can be added here
    };

    const allStudents = [
        { id: 1, name: 'Alice Smith', roll: 'M101-001', class: 'Math 101', img: 'https://via.placeholder.com/35/FF6B6B/FFFFFF?text=AS' },
        { id: 2, name: 'Bob Johnson', roll: 'M101-002', class: 'Math 101', img: 'https://via.placeholder.com/35/6BFFB8/FFFFFF?text=BJ' },
        { id: 3, name: 'Charlie Brown', roll: 'M101-003', class: 'Math 101', img: 'https://via.placeholder.com/35/8BCBFB/FFFFFF?text=CB' },
        { id: 4, 'name': 'Diana Prince', 'roll': 'M101-004', 'class': 'Math 101', 'img': 'https://via.placeholder.com/35/F16464/FFFFFF?text=DP' },
        { id: 5, 'name': 'Eve Adams', 'roll': 'M101-005', 'class': 'Math 101', 'img': 'https://via.placeholder.com/35/FFB86B/FFFFFF?text=EA' },
        { id: 6, 'name': 'Frank White', 'roll': 'M101-006', 'class': 'Math 101', 'img': 'https://via.placeholder.com/35/81D3AD/FFFFFF?text=FW' },
        { id: 7, 'name': 'Grace Hopper', 'roll': 'M101-007', 'class': 'Math 101', 'img': 'https://via.placeholder.com/35/8BCBFB/FFFFFF?text=GH' },
        { id: 8, 'name': 'Henry Ford', 'roll': 'M101-008', 'class': 'Math 101', 'img': 'https://via.placeholder.com/35/F16464/FFFFFF?text=HF' },
        { id: 9, 'name': 'Ivy Green', 'roll': 'M101-009', 'class': 'Math 101', 'img': 'https://via.placeholder.com/35/FFB86B/FFFFFF?text=IG' },

        { id: 10, 'name': 'Hannah Green', 'roll': 'S101-001', 'class': 'Science 101', 'img': 'https://via.placeholder.com/35/FF6B6B/FFFFFF?text=HG' },
        { id: 11, 'name': 'Ian Black', 'roll': 'S101-002', 'class': 'Science 101', 'img': 'https://via.placeholder.com/35/6BFFB8/FFFFFF?text=IB' },
        { id: 12, 'name': 'Jane Doe', 'roll': 'S101-003', 'class': 'Science 101', 'img': 'https://via.placeholder.com/35/F16464/FFFFFF?text=JD' },
        { id: 13, 'name': 'Kevin Brown', 'roll': 'S101-004', 'class': 'Science 101', 'img': 'https://via.placeholder.com/35/81D3AD/FFFFFF?text=KB' },
        
        { id: 20, 'name': 'Kyle Blue', 'roll': 'E101-001', 'class': 'English 101', 'img': 'https://via.placeholder.com/35/6B8BFF/FFFFFF?text=KB' },
        { id: 21, 'name': 'Liam Red', 'roll': 'E101-002', 'class': 'English 101', 'img': 'https://via.placeholder.com/35/F16464/FFFFFF?text=LR' },
        { id: 22, 'name': 'Mia White', 'roll': 'E101-003', 'class': 'English 101', 'img': 'https://via.placeholder.com/35/FFB86B/FFFFFF?text=MW' },
    ];

    // Set current date as default for dateFilter
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    dateFilter.value = `${year}-${month}-${day}`;

    // Function to update attendance data based on filters
    function updateAttendancePage() {
        const selectedAcademicYear = academicYearFilter.value;
        const selectedSemester = semesterFilter.value;
        const selectedClass = classFilter.value;
        const selectedDate = dateFilter.value;

        // Get attendance data for selected filters
        const currentAttendanceRecords = attendanceData[selectedAcademicYear]
                                         && attendanceData[selectedAcademicYear][selectedSemester]
                                         && attendanceData[selectedAcademicYear][selectedSemester][selectedDate]
                                         ? attendanceData[selectedAcademicYear][selectedSemester][selectedDate]
                                         : {};
        
        let studentsToDisplay = [];
        if (selectedClass === 'All') {
            const studentsWithAttendance = new Set();
            Object.values(currentAttendanceRecords).forEach(classStudents => {
                classStudents.forEach(student => {
                    if (!studentsWithAttendance.has(student.id)) {
                        studentsToDisplay.push({ ...student, class: student.class });
                        studentsWithAttendance.add(student.id);
                    }
                });
            });

            allStudents.forEach(student => {
                if (!studentsWithAttendance.has(student.id)) {
                    studentsToDisplay.push({ ...student, status: 'Absent', timeIn: '' }); // Default to Absent if not marked
                }
            });

        } else {
            studentsToDisplay = currentAttendanceRecords[selectedClass] || 
                                allStudents.filter(s => s.class === selectedClass).map(s => ({ ...s, status: 'Absent', timeIn: '' })); // Default to Absent
        }

        // Sort students alphabetically by name
        studentsToDisplay.sort((a, b) => a.name.localeCompare(b.name));


        let present = 0;
        let absent = 0;
        
        studentsToDisplay.forEach(student => {
            if (student.status === 'Present') present++;
            else if (student.status === 'Absent') absent++;
        });

        totalStudentsCount.textContent = studentsToDisplay.length;
        presentCount.textContent = present;
        absentCount.textContent = absent;

        if (dataTableInstance !== null) {
            dataTableInstance.destroy();
            attendanceTableBody.innerHTML = ''; 
        }

        // Populate attendance table
        if (studentsToDisplay.length > 0) {
            studentsToDisplay.forEach((student, index) => {
                const row = document.createElement('tr');
                const isPresent = student.status === 'Present';

                row.innerHTML = `
                    <td class="text-center">${index + 1}</td>
                    <td class="student-info">
                        <span class="name">${student.name}</span>
                    </td>
                    <td>${student.roll}</td>
                    <td class="text-center">
                        <div class="form-check form-switch d-inline-flex align-items-center attendance-switch">
                            <input class="form-check-input" type="checkbox" role="switch" id="attendanceSwitch-${student.id}"
                                ${isPresent ? 'checked' : ''}
                                data-student-id="${student.id}" 
                                data-class="${student.class || 'Unknown'}">
                            <label class="form-check-label ms-2" for="attendanceSwitch-${student.id}">
                                ${isPresent ? 'Present' : 'Absent'}
                            </label>
                        </div>
                    </td>
                `;
                attendanceTableBody.appendChild(row);
            });
        } else {
            attendanceTableBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">No student data found for this selection.</td></tr>`;
        }

        // Initialize DataTables after populating the table
        dataTableInstance = $('#attendanceTable').DataTable({
            "paging": true,
            "ordering": true,
            "info": true,
            "searching": true, // Enable search box
            "lengthChange": true, // Show number of entries per page dropdown
            "dom": 'lfrtip', // Default DataTables DOM structure for pagination, length, filter, table, info, processing
            "columnDefs": [
                { "orderable": false, "targets": [3] } // Disable ordering for the 'STATUS' column
            ]
        });

        // Add event listeners for status switches
        attendanceTableBody.querySelectorAll('.form-check-input[type="checkbox"]').forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const studentId = this.dataset.studentId;
                const studentClass = this.dataset.class;
                const newStatus = this.checked ? 'Present' : 'Absent';
                const label = this.nextElementSibling; // Get the label next to the checkbox

                // Update label text
                label.textContent = newStatus;

                // --- Simulate data update ---
                // 1. Update the 'studentsToDisplay' array (for immediate count refresh)
                const studentToUpdateInDisplay = studentsToDisplay.find(s => s.id == studentId && s.class == studentClass);
                if (studentToUpdateInDisplay) {
                    studentToUpdateInDisplay.status = newStatus;
                    if (newStatus === 'Present') {
                        if (!studentToUpdateInDisplay.timeIn) { // Set timeIn only if not already set
                            const now = new Date();
                            studentToUpdateInDisplay.timeIn = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                        }
                    } else { // If Absent
                        studentToUpdateInDisplay.timeIn = ''; // Clear timeIn
                    }
                }

                // 2. Update the 'attendanceData' mock backend (for persistence across filter changes within session)
                const currentAcademicYearData = attendanceData[selectedAcademicYear];
                if (currentAcademicYearData) {
                    const currentSemesterData = currentAcademicYearData[selectedSemester];
                    if (currentSemesterData) {
                        const currentDateData = currentSemesterData[selectedDate];
                        if (currentDateData) {
                            // Ensure the class key exists for the selected class if not already present
                            if (!currentDateData[studentClass]) {
                                currentDateData[studentClass] = [];
                            }

                            let studentFoundInMock = false;
                            for (const className in currentDateData) {
                                if (currentDateData.hasOwnProperty(className)) {
                                    const classStudents = currentDateData[className];
                                    const studentIndexInMock = classStudents.findIndex(s => s.id == studentId && s.class == studentClass);
                                    if (studentIndexInMock !== -1) {
                                        classStudents[studentIndexInMock].status = newStatus;
                                        if (newStatus === 'Present') {
                                            if (!classStudents[studentIndexInMock].timeIn) {
                                                const now = new Date();
                                                classStudents[studentIndexInMock].timeIn = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                                            }
                                        } else {
                                            classStudents[studentIndexInMock].timeIn = '';
                                        }
                                        studentFoundInMock = true;
                                        break; 
                                    }
                                }
                            }

                            // If student was not found in mock data for this date/class (e.g., initially not present in attendanceData)
                            // then add them to the correct class for the current date.
                            if (!studentFoundInMock && (selectedClass === studentClass || selectedClass === 'All')) {
                                const studentOriginal = allStudents.find(s => s.id == studentId);
                                if (studentOriginal) {
                                    const newStudentEntry = {
                                        ...studentOriginal,
                                        status: newStatus,
                                        timeIn: (newStatus === 'Present') ? new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }) : ''
                                    };
                                    if (currentDateData[studentClass]) {
                                        currentDateData[studentClass].push(newStudentEntry);
                                    } else {
                                        currentDateData[studentClass] = [newStudentEntry];
                                    }
                                }
                            }
                        }
                    }
                }

                // Re-run summary counts using the *updated* studentsToDisplay array
                let updatedPresent = 0;
                let updatedAbsent = 0;
                studentsToDisplay.forEach(student => { 
                    if (student.status === 'Present') updatedPresent++;
                    else if (student.status === 'Absent') updatedAbsent++;
                });
                presentCount.textContent = updatedPresent;
                absentCount.textContent = updatedAbsent;
            });
        });
    }

    // Event listeners for filters
    academicYearFilter.addEventListener('change', updateAttendancePage);
    semesterFilter.addEventListener('change', updateAttendancePage);
    classFilter.addEventListener('change', updateAttendancePage);
    dateFilter.addEventListener('change', updateAttendancePage);

    recordAttendanceBtn.addEventListener('click', () => {
        alert('Attendance recorded for selected class and date (simulated). The data is updated in the browser session.');
        console.log('Updated Attendance Data for current date/class:', attendanceData[academicYearFilter.value]?.[semesterFilter.value]?.[dateFilter.value]);
    });

    // Initial call to populate page on load
    updateAttendancePage();
});