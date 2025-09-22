
        document.addEventListener('DOMContentLoaded', () => {
           
            const academicYearFilter = document.getElementById('academicYearFilter');
            const semesterFilter = document.getElementById('semesterFilter');
            const classFilter = document.getElementById('classFilter');
            const dateFilter = document.getElementById('dateFilter');
            const recordAttendanceBtn = document.getElementById('recordAttendanceBtn');

            // Attendance Overview Card elements
            const totalStudentsCount = document.getElementById('totalStudentsCount');
            const presentCount = document.getElementById('presentCount');
            const lateCount = document.getElementById('lateCount');
            const absentCount = document.getElementById('absentCount');
            
            const attendanceTableBody = document.getElementById('attendanceTableBody');

            let dataTableInstance = null; // To hold the DataTables instance


            // Structure: academicYear -> semester -> date -> class -> studentsAttendance
            const attendanceData = {
                '2024-2025': {
                    'Fall': {
                        '2024-10-10': { // YYYY-MM-DD
                            'Math 101': [
                                { id: 1, name: 'Alice Smith', roll: 'M101-001', status: 'Present', timeIn: '08:00 AM', img: 'https://via.placeholder.com/35/FF6B6B/FFFFFF?text=AS' },
                                { id: 2, name: 'Bob Johnson', roll: 'M101-002', status: 'Present', timeIn: '08:01 AM', img: 'https://via.placeholder.com/35/6BFFB8/FFFFFF?text=BJ' },
                                { id: 3, name: 'Charlie Brown', roll: 'M101-003', status: 'Late', timeIn: '08:05 AM', img: 'https://via.placeholder.com/35/8BCBFB/FFFFFF?text=CB' },
                                { id: 4, name: 'Diana Prince', roll: 'M101-004', status: 'Absent', timeIn: '', img: 'https://via.placeholder.com/35/F16464/FFFFFF?text=DP' },
                                { id: 5, name: 'Eve Adams', roll: 'M101-005', status: 'Present', timeIn: '08:00 AM', img: 'https://via.placeholder.com/35/FFB86B/FFFFFF?text=EA' },
                                { id: 6, name: 'Frank White', roll: 'M101-006', status: 'Present', timeIn: '08:02 AM', img: 'https://via.placeholder.com/35/81D3AD/FFFFFF?text=FW' },
                                { id: 7, name: 'Grace Hopper', roll: 'M101-007', status: 'Late', timeIn: '08:08 AM', img: 'https://via.placeholder.com/35/8BCBFB/FFFFFF?text=GH' },
                            ],
                            'Science 101': [
                                { id: 10, name: 'Hannah Green', roll: 'S101-001', status: 'Present', timeIn: '09:00 AM', img: 'https://via.placeholder.com/35/FF6B6B/FFFFFF?text=HG' },
                                { id: 11, name: 'Ian Black', roll: 'S101-002', status: 'Present', timeIn: '09:01 AM', img: 'https://via.placeholder.com/35/6BFFB8/FFFFFF?text=IB' },
                                { id: 12, name: 'Jane Doe', roll: 'S101-003', status: 'Absent', timeIn: '', img: 'https://via.placeholder.com/35/F16464/FFFFFF?text=JD' },
                            ]
                        },
                        '2024-10-11': {
                            'Math 101': [
                                { id: 1, name: 'Alice Smith', roll: 'M101-001', status: 'Present', timeIn: '08:00 AM', img: 'https://via.placeholder.com/35/FF6B6B/FFFFFF?text=AS' },
                                { id: 2, name: 'Bob Johnson', roll: 'M101-002', status: 'Absent', timeIn: '', img: 'https://via.placeholder.com/35/6BFFB8/FFFFFF?text=BJ' },
                                { id: 3, name: 'Charlie Brown', roll: 'M101-003', status: 'Present', timeIn: '08:00 AM', img: 'https://via.placeholder.com/35/8BCBFB/FFFFFF?text=CB' },
                                { id: 4, name: 'Diana Prince', roll: 'M101-004', status: 'Present', timeIn: '08:00 AM', img: 'https://via.placeholder.com/35/F16464/FFFFFF?text=DP' },
                                { id: 5, name: 'Eve Adams', roll: 'M101-005', status: 'Present', timeIn: '08:00 AM', img: 'https://via.placeholder.com/35/FFB86B/FFFFFF?text=EA' },
                                { id: 6, name: 'Frank White', roll: 'M101-006', status: 'Present', timeIn: '08:02 AM', img: 'https://via.placeholder.com/35/81D3AD/FFFFFF?text=FW' },
                                { id: 7, name: 'Grace Hopper', roll: 'M101-007', status: 'Present', timeIn: '08:00 AM', img: 'https://via.placeholder.com/35/8BCBFB/FFFFFF?text=GH' },
                            ]
                        },
                        '2024-10-12': { // Saturday, might have less data
                             'Math 101': [
                                { id: 1, name: 'Alice Smith', roll: 'M101-001', status: 'Absent', timeIn: '', img: 'https://via.placeholder.com/35/FF6B6B/FFFFFF?text=AS' },
                                { id: 2, name: 'Bob Johnson', roll: 'M101-002', status: 'Absent', timeIn: '', img: 'https://via.placeholder.com/35/6BFFB8/FFFFFF?text=BJ' },
                            ],
                        }
                    },
                    'Spring': {
                        '2025-03-05': {
                            'English 101': [
                                { id: 20, name: 'Kyle Blue', roll: 'E101-001', status: 'Present', timeIn: '10:00 AM', img: 'https://via.placeholder.com/35/6B8BFF/FFFFFF?text=KB' },
                                { id: 21, name: 'Liam Red', roll: 'E101-002', status: 'Late', timeIn: '10:07 AM', img: 'https://via.placeholder.com/35/F16464/FFFFFF?text=LR' },
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
                { id: 4, name: 'Diana Prince', roll: 'M101-004', class: 'Math 101', img: 'https://via.placeholder.com/35/F16464/FFFFFF?text=DP' },
                { id: 5, name: 'Eve Adams', roll: 'M101-005', class: 'Math 101', img: 'https://via.placeholder.com/35/FFB86B/FFFFFF?text=EA' },
                { id: 6, name: 'Frank White', roll: 'M101-006', class: 'Math 101', img: 'https://via.placeholder.com/35/81D3AD/FFFFFF?text=FW' },
                { id: 7, name: 'Grace Hopper', roll: 'M101-007', class: 'Math 101', img: 'https://via.placeholder.com/35/8BCBFB/FFFFFF?text=GH' },
                { id: 8, name: 'Henry Ford', roll: 'M101-008', class: 'Math 101', img: 'https://via.placeholder.com/35/F16464/FFFFFF?text=HF' },
                { id: 9, name: 'Ivy Green', roll: 'M101-009', class: 'Math 101', img: 'https://via.placeholder.com/35/FFB86B/FFFFFF?text=IG' },

                { id: 10, name: 'Hannah Green', roll: 'S101-001', class: 'Science 101', img: 'https://via.placeholder.com/35/FF6B6B/FFFFFF?text=HG' },
                { id: 11, name: 'Ian Black', roll: 'S101-002', class: 'Science 101', img: 'https://via.placeholder.com/35/6BFFB8/FFFFFF?text=IB' },
                { id: 12, name: 'Jane Doe', roll: 'S101-003', class: 'Science 101', img: 'https://via.placeholder.com/35/F16464/FFFFFF?text=JD' },
                { id: 13, name: 'Kevin Brown', roll: 'S101-004', class: 'Science 101', img: 'https://via.placeholder.com/35/81D3AD/FFFFFF?text=KB' },
                
                { id: 20, name: 'Kyle Blue', roll: 'E101-001', class: 'English 101', img: 'https://via.placeholder.com/35/6B8BFF/FFFFFF?text=KB' },
                { id: 21, name: 'Liam Red', roll: 'E101-002', class: 'English 101', img: 'https://via.placeholder.com/35/F16464/FFFFFF?text=LR' },
                { id: 22, name: 'Mia White', roll: 'E101-003', class: 'English 101', img: 'https://via.placeholder.com/35/FFB86B/FFFFFF?text=MW' },
            ];

            // Set current date as default for dateFilter
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, '0');
            const day = String(today.getDate()).padStart(2, '0');
            dateFilter.value = `${year}-${month}-${day}`;

            // Helper function to format date for display (not used in this version but kept for potential future use)
            function formatDateForDisplay(dateString) {
                const date = new Date(dateString + 'T00:00:00'); // Add T00:00:00 to avoid timezone issues
                return date.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
            }

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
                    Object.values(currentAttendanceRecords).forEach(classStudents => {
                        studentsToDisplay = studentsToDisplay.concat(classStudents);
                    });
                    if (studentsToDisplay.length === 0) {
                         allStudents.forEach(student => {
                            studentsToDisplay.push({ ...student, status: 'Not Marked', timeIn: '' });
                         });
                    }

                } else {
                    studentsToDisplay = currentAttendanceRecords[selectedClass] || 
                                        allStudents.filter(s => s.class === selectedClass).map(s => ({ ...s, status: 'Not Marked', timeIn: '' }));
                }

                let present = 0;
                let late = 0;
                let absent = 0;
                
                studentsToDisplay.forEach(student => {
                    if (student.status === 'Present') present++;
                    else if (student.status === 'Late') late++;
                    else if (student.status === 'Absent') absent++;
                });

                totalStudentsCount.textContent = studentsToDisplay.length;
                presentCount.textContent = present;
                lateCount.textContent = late;
                absentCount.textContent = absent;

                if (dataTableInstance !== null) {
                    dataTableInstance.destroy();
                    attendanceTableBody.innerHTML = ''; 
                }

                // Populate attendance table
                if (studentsToDisplay.length > 0) {
                    studentsToDisplay.forEach((student, index) => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td class="text-center">${index + 1}</td>
                            <td class="student-info">
                                <span class="name">${student.name}</span>
                            </td>
                            <td>${student.roll}</td>
                            <td class="text-center">
                               <span class="leave-status">Present</span>
                            </td>
                        `;
                        attendanceTableBody.appendChild(row);
                    });
                } else {
                    attendanceTableBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">No student data found for this selection.</td></tr>`;
                }

                // Initialize DataTables after populating the table
                // Ensure jQuery is loaded before this call.
                // We use $(document).ready for the initial load, and direct initialization here.
                dataTableInstance = $('#attendanceTable').DataTable({
                    "paging": true,
                    "ordering": true,
                    "info": true,
                    "searching": true, // Enable search box
                    "lengthChange": true, // Show number of entries per page dropdown
                    "dom": 'lfrtip', // Default DataTables DOM structure for pagination, length, filter, table, info, processing
                    "columnDefs": [
                        { "orderable": false, "targets": [3] } // Disable ordering for the 'STATUS' column if buttons should not trigger sort
                    ]
                });

                // Add event listeners for status buttons (must be re-attached after table re-population)
                attendanceTableBody.querySelectorAll('.attendance-status-selector .btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const selector = this.closest('.attendance-status-selector');
                        const studentId = selector.dataset.studentId;
                        const studentClass = selector.dataset.class;
                        const newStatus = this.dataset.status;

                        // Visually update active state with Bootstrap colors
                        selector.querySelectorAll('.btn').forEach(btn => {
                            btn.classList.remove('active', 'btn-success', 'btn-danger', 'btn-warning');
                            btn.classList.add('btn-success', 'btn-danger', 'btn-outline-warning'); // Reset to outline
                        });

                        this.classList.add('active');
                        if (newStatus === 'Present'){ this.classList.remove('btn-success', 'btn-danger', 'btn-outline-warning'); this.classList.add('btn-success');}
                        else if (newStatus === 'Absent'){ this.classList.remove('btn-success', 'btn-danger', 'btn-outline-warning'); this.classList.add('btn-danger');}
                        else if (newStatus === 'Late') {this.classList.remove('btn-success', 'btn-danger', 'btn-outline-warning'); this.classList.add('btn-warning');}

                        // --- Simulate data update ---
                        // Find and update the status in our mock data
                        if (currentAttendanceRecords[studentClass]) {
                            const studentIndex = currentAttendanceRecords[studentClass].findIndex(s => s.id == studentId);
                            if (studentIndex !== -1) {
                                currentAttendanceRecords[studentClass][studentIndex].status = newStatus;
                                if (newStatus === 'Present' || newStatus === 'Late') {
                                    if (!currentAttendanceRecords[studentClass][studentIndex].timeIn) {
                                        const now = new Date();
                                        currentAttendanceRecords[studentClass][studentIndex].timeIn = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });
                                    }
                                } else {
                                     currentAttendanceRecords[studentClass][studentIndex].timeIn = '';
                                }
                            }
                        }
                        // Re-run summary counts without re-rendering table
                        let updatedPresent = 0;
                        let updatedLate = 0;
                        let updatedAbsent = 0;
                        studentsToDisplay.forEach(student => { // Use the current studentsToDisplay after update
                            if (student.status === 'Present') updatedPresent++;
                            else if (student.status === 'Late') updatedLate++;
                            else if (student.status === 'Absent') updatedAbsent++;
                        });
                        presentCount.textContent = updatedPresent;
                        lateCount.textContent = updatedLate;
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
                alert('Attendance recorded for selected class and date (simulated).');
                // In a real application, you'd send this data to a server
            });

            // Initial call to populate page on load
            updateAttendancePage();
        });