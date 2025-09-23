        document.addEventListener('DOMContentLoaded', () => {

            // --- Page-specific Logic ---
            const academicYearFilter = document.getElementById('academicYearFilter');
            const semesterFilter = document.getElementById('semesterFilter');
            const classFilter = document.getElementById('classFilter');
            const examTimetableBody = document.getElementById('examTimetableBody');
            const timetableFilterText = document.getElementById('timetableFilterText');

            // Modals and form elements
            const addEditExamModal = new bootstrap.Modal(document.getElementById('addEditExamModal'));
            const viewExamModal = new bootstrap.Modal(document.getElementById('viewExamModal'));
            const examForm = document.getElementById('examForm');
            const addEditModalLabel = document.getElementById('addEditExamModalLabel');
            const saveExamBtn = document.getElementById('saveExamBtn');

            const examIdInput = document.getElementById('examId');
            const examDateInput = document.getElementById('examDate');
            const examTimeInput = document.getElementById('examTime');
            const examSubjectInput = document.getElementById('examSubject');
            const examClassInput = document.getElementById('examClass');
            const examRoomInput = document.getElementById('examRoom');
            const examInvigilatorInput = document.getElementById('examInvigilator');

            // View Modal elements
            const viewExamDate = document.getElementById('viewExamDate');
            const viewExamTime = document.getElementById('viewExamTime');
            const viewExamSubject = document.getElementById('viewExamSubject');
            const viewExamClass = document.getElementById('viewExamClass');
            const viewExamRoom = document.getElementById('viewExamRoom');
            const viewExamInvigilator = document.getElementById('viewExamInvigilator');


            // Simulated Exam Timetable Data with unique IDs
            const examTimetableData = {
                '2024-2025': {
                    'Fall': [
                        { id: 'ex001', date: '2024-10-20', time: '09:00', subject: 'Math', class: 'Grade 10', room: 'B101', invigilator: 'Ms. Smith' },
                        { id: 'ex002', date: '2024-10-20', time: '09:00', subject: 'English', class: 'Grade 8', room: 'A203', invigilator: 'Mr. Brown' },
                        { id: 'ex003', date: '2024-10-21', time: '13:00', subject: 'Science', class: 'Grade 10', room: 'B101', invigilator: 'Mr. David' },
                        { id: 'ex004', date: '2024-10-22', time: '09:00', subject: 'History', class: 'Grade 9', room: 'C301', invigilator: 'Ms. White' },
                    ],
                    'Spring': [
                        { id: 'ex005', date: '2025-03-10', time: '09:00', subject: 'Physics', class: 'Grade 10', room: 'L201', invigilator: 'Dr. Rao' },
                        { id: 'ex006', date: '2025-03-11', time: '13:00', subject: 'Chemistry', class: 'Grade 9', room: 'L202', invigilator: 'Ms. Kaur' },
                    ]
                },
                '2023-2024': {
                    'Fall': [
                        { id: 'ex007', date: '2023-10-15', time: '09:00', subject: 'Math', class: 'Grade 9', room: 'B102', invigilator: 'Mr. Sharma' },
                    ],
                    'Spring': [
                        { id: 'ex008', date: '2024-03-05', time: '09:00', subject: 'Biology', class: 'Grade 10', room: 'L301', invigilator: 'Dr. Verma' },
                    ]
                }
            };

            // Function to generate a unique ID for new exams
            // We'll calculate the highest existing ID to ensure uniqueness
            function getHighestExistingExamId() {
                let maxIdNum = 0;
                for (const year in examTimetableData) {
                    for (const semester in examTimetableData[year]) {
                        examTimetableData[year][semester].forEach(exam => {
                            const idNum = parseInt(exam.id.replace('ex', ''), 10);
                            if (!isNaN(idNum) && idNum > maxIdNum) {
                                maxIdNum = idNum;
                            }
                        });
                    }
                }
                return maxIdNum;
            }

            let nextExamIdCounter = getHighestExistingExamId(); // Initialize counter based on existing IDs

            function generateUniqueExamId() {
                nextExamIdCounter++;
                return `ex${String(nextExamIdCounter).padStart(3, '0')}`;
            }

            // Global variable to store the current filtered data for download/CSV
            let currentFilteredTimetable = [];

            // Helper function to format date for display
            function formatDateForDisplay(isoDateString) {
                if (!isoDateString) return '';
                const date = new Date(isoDateString + 'T00:00:00'); // Add T00:00:00 to avoid timezone issues
                return date.toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' });
            }

            function applyTimetableFilters() {
                const selectedAcademicYear = academicYearFilter.value;
                const selectedSemester = semesterFilter.value;
                const selectedClass = classFilter.value;

                const dataForPeriod = examTimetableData[selectedAcademicYear] ? examTimetableData[selectedAcademicYear][selectedSemester] : [];

                currentFilteredTimetable = dataForPeriod.filter(exam =>
                    selectedClass === 'All' || exam.class === selectedClass
                );

                renderTimetable(currentFilteredTimetable);

                timetableFilterText.textContent = `${selectedAcademicYear} / ${selectedSemester} / ${selectedClass === 'All' ? 'All Classes' : selectedClass}`;
            }

            function renderTimetable(timetable) {
                examTimetableBody.innerHTML = ''; // Clear existing rows

                if (timetable.length === 0) {
                    examTimetableBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">No exams scheduled for the selected filters.</td></tr>`;
                    return;
                }

                timetable.forEach(exam => {
                    const row = document.createElement('tr');
                    // Determine AM/PM for display, assuming time is 24-hour format
                    const displayTime = exam.time; // Keep 24hr for consistency or convert if needed
                    // For display, you might want to convert to 12-hour format:
                    // const [hours, minutes] = exam.time.split(':');
                    // const formattedTime = new Date(2000, 0, 1, hours, minutes).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true });

                    row.innerHTML = `
                        <td>${formatDateForDisplay(exam.date)}</td>
                        <td>${displayTime}</td>
                        <td>${exam.subject}</td>
                        <td>${exam.class}</td>
                        <td>${exam.room}</td>
                        <td>${exam.invigilator}</td>
                        <td>
                            <button class="btn btn-outline-secondary btn-sm view-exam-btn" data-exam-id="${exam.id}"><i class="bi bi-eye"></i> View</button>
                            <button class="btn btn-outline-info btn-sm edit-exam-btn" data-exam-id="${exam.id}"><i class="bi bi-pencil"></i> Edit</button>
                        </td>
                    `;
                    examTimetableBody.appendChild(row);
                });
            }

            // Function to find an exam by its ID
            function findExamById(id) {
                for (const year in examTimetableData) {
                    for (const semester in examTimetableData[year]) {
                        const examsInSemester = examTimetableData[year][semester];
                        const exam = examsInSemester.find(e => e.id === id);
                        if (exam) {
                            return { exam, year, semester, index: examsInSemester.indexOf(exam) };
                        }
                    }
                }
                return null;
            }

            // --- Add/Edit Exam Modal Logic ---
            function showAddEditExamModal(examId = null) {
                examForm.reset(); // Clear form fields
                examIdInput.value = ''; // Clear hidden ID

                if (examId) {
                    // Edit existing exam
                    const found = findExamById(examId);
                    if (found) {
                        const { exam } = found;
                        addEditModalLabel.textContent = 'Edit Exam Details';
                        saveExamBtn.textContent = 'Save Changes';
                        examIdInput.value = exam.id;
                        examDateInput.value = exam.date;
                        examTimeInput.value = exam.time;
                        examSubjectInput.value = exam.subject;
                        examClassInput.value = exam.class;
                        examRoomInput.value = exam.room;
                        examInvigilatorInput.value = exam.invigilator;
                    }
                } else {
                    // Add new exam
                    addEditModalLabel.textContent = 'Add New Exam';
                    saveExamBtn.textContent = 'Add Exam';
                    // Optionally pre-fill class filter if not 'All'
                    if (classFilter.value !== 'All') {
                        examClassInput.value = classFilter.value;
                    }
                }
                addEditExamModal.show();
            }

            examForm.addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent default form submission

                const id = examIdInput.value;
                const newExamData = {
                    date: examDateInput.value,
                    time: examTimeInput.value,
                    subject: examSubjectInput.value,
                    class: examClassInput.value,
                    room: examRoomInput.value,
                    invigilator: examInvigilatorInput.value
                };

                const selectedAcademicYear = academicYearFilter.value;
                const selectedSemester = semesterFilter.value;

                if (!examTimetableData[selectedAcademicYear]) {
                    examTimetableData[selectedAcademicYear] = {};
                }
                if (!examTimetableData[selectedAcademicYear][selectedSemester]) {
                    examTimetableData[selectedAcademicYear][selectedSemester] = [];
                }

                if (id) {
                    // Editing an existing exam
                    const found = findExamById(id);
                    if (found) {
                        Object.assign(found.exam, newExamData); // Update properties
                        alert('Exam updated successfully!');
                    }
                } else {
                    // Adding a new exam
                    newExamData.id = generateUniqueExamId();
                    examTimetableData[selectedAcademicYear][selectedSemester].push(newExamData);
                    alert('New exam added successfully!');
                }

                addEditExamModal.hide();
                applyTimetableFilters(); // Re-render the table with updated data
            });

            // --- View Exam Modal Logic ---
            function showViewExamDetails(examId) {
                const found = findExamById(examId);
                if (found) {
                    const { exam } = found;
                    viewExamDate.textContent = formatDateForDisplay(exam.date);
                    viewExamTime.textContent = exam.time;
                    viewExamSubject.textContent = exam.subject;
                    viewExamClass.textContent = exam.class;
                    viewExamRoom.textContent = exam.room;
                    viewExamInvigilator.textContent = exam.invigilator;
                    viewExamModal.show();
                } else {
                    alert('Exam not found.');
                }
            }

            // Event Listeners for filters
            academicYearFilter.addEventListener('change', applyTimetableFilters);
            semesterFilter.addEventListener('change', applyTimetableFilters);
            classFilter.addEventListener('change', applyTimetableFilters);

            // Initial render
            applyTimetableFilters();

            // Add New Exam button
            document.getElementById('addNewExamBtn').addEventListener('click', () => {
                showAddEditExamModal();
            });

            // Event delegation for View and Edit buttons in the table
            examTimetableBody.addEventListener('click', (event) => {
                const target = event.target;
                const button = target.closest('button'); // Find the closest button ancestor

                if (button) {
                    const examId = button.dataset.examId;

                    if (examId) {
                        if (button.classList.contains('view-exam-btn')) {
                            showViewExamDetails(examId);
                        } else if (button.classList.contains('edit-exam-btn')) {
                            showAddEditExamModal(examId);
                        }
                    }
                }
            });


            // Download Timetable (CSV) button
            document.getElementById('downloadTimetableBtn').addEventListener('click', () => {
                if (currentFilteredTimetable.length === 0) {
                    alert('No exam data to download for the current filters.');
                    return;
                }

                const headers = ["Date", "Time", "Subject", "Class", "Room", "Invigilator"];
                let csvContent = headers.map(h => `"${h}"`).join(',') + '\n';

                currentFilteredTimetable.forEach(exam => {
                    const row = [
                        `"${formatDateForDisplay(exam.date)}"`,
                        `"${exam.time}"`,
                        `"${exam.subject}"`,
                        `"${exam.class}"`,
                        `"${exam.room}"`,
                        `"${exam.invigilator}"`
                    ];
                    csvContent += row.join(',') + '\n';
                });

                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.setAttribute('href', url);
                const year = academicYearFilter.value;
                const term = semesterFilter.value;
                const className = classFilter.value;
                link.setAttribute('download', `Exam_Timetable_${year}_${term}_${className}.csv`);
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                alert('Exam timetable downloaded successfully!');
            });
        });