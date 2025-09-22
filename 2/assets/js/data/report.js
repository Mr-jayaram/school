        document.addEventListener('DOMContentLoaded', () => {
            // --- Sidebar and Layout Logic (Copied from previous pages) ---
           

            // --- Page Specific Elements ---
            const reportYearFilter = document.getElementById('reportYearFilter');
            const reportTypeFilter = document.getElementById('reportTypeFilter');
            const reportSearch = document.getElementById('reportSearch');

            const totalReportsCard = document.getElementById('totalReportsCard');
            const studentReportsCard = document.getElementById('studentReportsCard');
            const staffReportsCard = document.getElementById('staffReportsCard');
            const attendanceReportsCard = document.getElementById('attendanceReportsCard');
            const overviewFilterText = document.getElementById('overviewFilterText');

            const studentReportTableBody = document.getElementById('studentReportTableBody');
            const staffReportTableBody = document.getElementById('staffReportTableBody');
            const attendanceReportTableBody = document.getElementById('attendanceReportTableBody');
            const noReportsMessage = document.getElementById('noReportsMessage');



            // --- Reports Page Specific Logic ---

            // Simulated Report Data
            const reportsData = {
                '2024-2025': {
                    'student-enrollment': [
                        { ID: 'S24001', Name: 'Alice Johnson', Grade: '10', Department: 'Science', Status: 'Active' },
                        { ID: 'S24002', Name: 'Bob Williams', Grade: '11', Department: 'Mathematics', Status: 'Active' },
                        { ID: 'S24003', Name: 'Charlie Brown', Grade: '9', Department: 'English', Status: 'Active' },
                        { ID: 'S24004', Name: 'Diana Miller', Grade: '10', Department: 'Arts', Status: 'Active' },
                        { ID: 'S24005', Name: 'Eve Davis', Grade: '12', Department: 'History', Status: 'Active' },
                    ],
                    'staff-directory': [
                        { ID: 'T24001', Name: 'Dr. Jane Smith', Department: 'Science', Role: 'Teacher', Status: 'Active' },
                        { ID: 'T24002', Name: 'Mr. John Doe', Department: 'Mathematics', Role: 'Teacher', Status: 'Active' },
                        { ID: 'T24003', Name: 'Ms. Emily White', Department: 'English', Role: 'Teacher', Status: 'Active' },
                        { ID: 'A24001', Name: 'Ms. Sarah Connor', Department: 'Administration', Role: 'Secretary', Status: 'Active' },
                        { ID: 'P24001', Name: 'Mr. David Lee', Department: 'Administration', Role: 'Principal', Status: 'Active' },
                    ],
                    'attendance-summary': [
                        { Date: '2025-09-01', Class: 'Grade 10A', 'Total Students': 30, Present: 28, Absent: 2, Tardy: 1 },
                        { Date: '2025-09-02', Class: 'Grade 11B', 'Total Students': 28, Present: 27, Absent: 1, Tardy: 0 },
                        { Date: '2025-09-03', Class: 'Grade 9C', 'Total Students': 25, Present: 25, Absent: 0, Tardy: 0 },
                        { Date: '2025-09-04', Class: 'Grade 10A', 'Total Students': 30, Present: 29, Absent: 1, Tardy: 0 },
                        { Date: '2025-09-05', Class: 'Grade 12D', 'Total Students': 22, Present: 20, Absent: 2, Tardy: 1 },
                    ]
                },
                '2023-2024': {
                     'student-enrollment': [
                        { ID: 'S23001', Name: 'Frank White', Grade: '9', Department: 'Science', Status: 'Active' },
                        { ID: 'S23002', Name: 'Grace Black', Grade: '10', Department: 'Mathematics', Status: 'Active' },
                    ],
                    'staff-directory': [
                        { ID: 'T23001', Name: 'Dr. Robert Green', Department: 'History', Role: 'Teacher', Status: 'Active' },
                    ],
                    'attendance-summary': [
                        { Date: '2024-03-10', Class: 'Grade 8A', 'Total Students': 28, Present: 26, Absent: 2, Tardy: 0 },
                    ]
                }
            };

            // Report sections mapping
            const reportSections = {
                'student-enrollment': {
                    element: document.getElementById('student-reports'),
                    tableBody: studentReportTableBody,
                    title: 'Student Enrollment Report',
                    headers: ['ID', 'Name', 'Grade', 'Department', 'Status']
                },
                'staff-directory': {
                    element: document.getElementById('staff-reports'),
                    tableBody: staffReportTableBody,
                    title: 'Staff Directory Report',
                    headers: ['ID', 'Name', 'Department', 'Role', 'Status']
                },
                'attendance-summary': {
                    element: document.getElementById('attendance-reports'),
                    tableBody: attendanceReportTableBody,
                    title: 'Monthly Attendance Summary',
                    headers: ['Date', 'Class', 'Total Students', 'Present', 'Absent', 'Tardy']
                }
            };


            function updateReportsPage() {
                const selectedYear = reportYearFilter.value;
                const selectedType = reportTypeFilter.value;
                const searchTerm = reportSearch.value.toLowerCase();

                let visibleReportCount = 0;

                for (const type in reportSections) {
                    const section = reportSections[type];
                    const data = reportsData[selectedYear] ? reportsData[selectedYear][type] : [];
                    let filteredData = data;

                    // Filter by report type (if specific type selected)
                    if (selectedType !== 'All' && type !== selectedType.toLowerCase().replace(' ', '-')) {
                        section.element.classList.add('d-none');
                        continue;
                    }

                    // Filter by search term
                    if (searchTerm) {
                        filteredData = filteredData.filter(row =>
                            Object.values(row).some(value =>
                                String(value).toLowerCase().includes(searchTerm)
                            )
                        );
                    }

                    // Show/hide section based on filtered data presence
                    if (filteredData.length > 0) {
                        section.element.classList.remove('d-none');
                        populateReportTable(section.tableBody, filteredData, section.headers);
                        // Update section header title if it contains year info and filter changes
                        const headerTitleElement = section.element.querySelector('.section-header h5');
                        if (headerTitleElement) {
                             // Basic example, might need more robust title management
                            headerTitleElement.textContent = `${section.title} (${selectedYear})`;
                        }
                        visibleReportCount++;
                    } else {
                        section.element.classList.add('d-none');
                    }
                }

                // Update Overview Cards
                totalReportsCard.textContent = Object.keys(reportsData[selectedYear] || {}).length;
                studentReportsCard.textContent = reportsData[selectedYear]?.['student-enrollment'] ? 1 : 0;
                staffReportsCard.textContent = reportsData[selectedYear]?.['staff-directory'] ? 1 : 0;
                attendanceReportsCard.textContent = reportsData[selectedYear]?.['attendance-summary'] ? 1 : 0;

                overviewFilterText.textContent = `${selectedYear} / ${reportTypeFilter.options[reportTypeFilter.selectedIndex].text}`;

                // Show/hide no reports message
                if (visibleReportCount === 0) {
                    noReportsMessage.classList.remove('d-none');
                } else {
                    noReportsMessage.classList.add('d-none');
                }
            }

            function populateReportTable(tableBodyElement, data, headers) {
                tableBodyElement.innerHTML = ''; // Clear existing rows
                if (data.length === 0) {
                    tableBodyElement.innerHTML = `<tr><td colspan="${headers.length}" class="text-center text-muted py-3">No data available for this report.</td></tr>`;
                    return;
                }
                data.forEach(row => {
                    const tr = document.createElement('tr');
                    headers.forEach(header => {
                        const td = document.createElement('td');
                        td.textContent = row[header] || ''; // Use header name as key
                        tr.appendChild(td);
                    });
                    tableBodyElement.appendChild(tr);
                });
            }


            // --- Excel Download Functionality ---
            function downloadCSV(data, filename) {
                if (!data || data.length === 0) {
                    alert('No data to download.');
                    return;
                }

                const headers = Object.keys(data[0]);
                const csvRows = [];

                // Add header row
                csvRows.push(headers.map(header => `"${header.replace(/"/g, '""')}"`).join(','));

                // Add data rows
                for (const row of data) {
                    const values = headers.map(header => {
                        const value = row[header];
                        // Handle null/undefined values and escape double quotes
                        return `"${(value === null || value === undefined ? '' : String(value)).replace(/"/g, '""')}"`;
                    });
                    csvRows.push(values.join(','));
                }

                const csvString = csvRows.join('\n');
                const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });

                const link = document.createElement('a');
                if (link.download !== undefined) { // Feature detection for HTML5 download attribute
                    const url = URL.createObjectURL(blob);
                    link.setAttribute('href', url);
                    link.setAttribute('download', filename);
                    link.style.visibility = 'hidden';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                } else {
                    // Fallback for browsers that don't support download attribute (e.g., IE)
                    alert('Your browser does not support automatic downloads. Please save the following text as a .csv file:\n\n' + csvString);
                }
            }

            // Event listener for all download buttons
            document.querySelectorAll('.download-excel-btn').forEach(button => {
                button.addEventListener('click', function() {
                    const reportType = this.dataset.reportType;
                    const selectedYear = reportYearFilter.value;
                    const dataToDownload = reportsData[selectedYear]?.[reportType];
                    const reportTitle = reportSections[reportType]?.title || 'Report';

                    if (dataToDownload && dataToDownload.length > 0) {
                        downloadCSV(dataToDownload, `${reportTitle.replace(/\s/g, '_')}_${selectedYear}.csv`);
                    } else {
                        alert(`No data available for "${reportTitle}" in ${selectedYear} to download.`);
                    }
                });
            });


            // Event listeners for filters
            reportYearFilter.addEventListener('change', updateReportsPage);
            reportTypeFilter.addEventListener('change', updateReportsPage);
            reportSearch.addEventListener('input', updateReportsPage);

            // Initial call to populate page on load
            updateReportsPage();
        });