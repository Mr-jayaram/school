        document.addEventListener('DOMContentLoaded', () => {
            

            const academicYearFilter = document.getElementById('academicYearFilter');
            const semesterFilter = document.getElementById('semesterFilter');

            // Elements to update
            const totalStudentsValue = document.getElementById('totalStudentsValue');
            const totalTeachersValue = document.getElementById('totalTeachersValue');
            const totalClassesValue = document.getElementById('totalClassesValue');
            const pendingEnrollmentsValue = document.getElementById('pendingEnrollmentsValue');

            const schoolPerformancePercentage = document.getElementById('schoolPerformancePercentage');
            const overallGradeAvg = document.getElementById('overallGradeAvg');

            const overallAttendanceRate = document.getElementById('overallAttendanceRate');
            const absentStudentsToday = document.getElementById('absentStudentsToday');
            const attendanceBarChart = document.getElementById('attendanceBarChart');
            const attendanceChartTabs = document.getElementById('attendanceChartTabs');

            const upcomingExamsTableBody = document.getElementById('upcomingExamsTableBody');
            const recentActivityTableBody = document.getElementById('recentActivityTableBody');
            const classPerformanceCards = document.getElementById('classPerformanceCards');
            
            const overviewFilterText = document.getElementById('overviewFilterText');
            const upcomingFilterText = document.getElementById('upcomingFilterText');


            // Simulated Dashboard Data for School Management
            const dashboardData = {
                '2024-2025': {
                    'Fall': {
                        overview: { students: 1200, teachers: 75, classes: 60, pending: 15 },
                        schoolPerformance: { percentage: 88, gradeAvg: 'B+', passingRate: '95%', satisfaction: '80%' },
                        attendanceOverview: { rate: '92%', absentToday: 5, dailyTrend: [85, 90, 92, 90, 95, 88, 93], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
                        upcomingExams: [
                            { date: 'Oct 15, 2024', event: 'Mid-Term Exam', class: 'Math 101', status: 'Upcoming', statusClass: 'status-upcoming' },
                            { date: 'Oct 20, 2024', event: 'Project Submission', class: 'Science 101', status: 'Due Soon', statusClass: 'status-due' },
                            { date: 'Oct 25, 2024', event: 'Final Exam', class: 'History 101', status: 'Upcoming', statusClass: 'status-upcoming' },
                            { date: 'Nov 01, 2024', event: 'Mid-Term Exam', class: 'English 101', status: 'Upcoming', statusClass: 'status-upcoming' }
                        ],
                        recentActivity: [
                            { timestamp: 'Oct 10, 2:30 PM', user: 'Admin', action: 'Enrolled Student', target: 'John Doe', statusClass: 'status-success' },
                            { timestamp: 'Oct 09, 10:00 AM', user: 'Teacher A', action: 'Updated Grades', target: 'Math 101', statusClass: 'status-pending' },
                            { timestamp: 'Oct 08, 9:15 AM', user: 'Admin', action: 'Added Class', target: 'Art 101', statusClass: 'status-success' },
                            { timestamp: 'Oct 07, 4:00 PM', user: 'Teacher B', action: 'Marked Attendance', target: 'Science 101', statusClass: 'status-success' },
                            { timestamp: 'Oct 06, 1:00 PM', user: 'Admin', action: 'Archived Course', target: 'Old English', statusClass: 'status-failed' }
                        ],
                        classPerformance: [
                            { title: 'Math 101', avgGrade: 85, colorClass: 'green' },
                            { title: 'Science 101', avgGrade: 70, colorClass: 'orange' },
                            { title: 'History 101', avgGrade: 92, colorClass: 'blue' },
                            { title: 'English 101', avgGrade: 78, colorClass: 'red' }
                        ]
                    },
                    'Spring': {
                        overview: { students: 1180, teachers: 73, classes: 58, pending: 8 },
                        schoolPerformance: { percentage: 90, gradeAvg: 'A-', passingRate: '97%', satisfaction: '85%' },
                        attendanceOverview: { rate: '94%', absentToday: 3, dailyTrend: [90, 95, 93, 96, 91, 94, 92], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
                        upcomingExams: [
                            { date: 'Mar 10, 2025', event: 'Spring Break', class: 'All', status: 'Holiday', statusClass: 'status-success' },
                            { date: 'Apr 01, 2025', event: 'Science Fair', class: 'Science Dept', status: 'Upcoming', statusClass: 'status-upcoming' },
                            { date: 'Apr 15, 2025', event: 'Final Project Due', class: 'Art 101', status: 'Due Soon', statusClass: 'status-due' }
                        ],
                        recentActivity: [
                            { timestamp: 'Feb 28, 1:00 PM', user: 'Teacher C', action: 'Submitted Grades', target: 'Art 101', statusClass: 'status-success' },
                            { timestamp: 'Feb 27, 11:00 AM', user: 'Admin', action: 'New Teacher Onboard', target: 'Ms. Smith', statusClass: 'status-success' },
                            { timestamp: 'Feb 26, 3:45 PM', user: 'Teacher D', action: 'Reported Incident', target: 'Student Jane', statusClass: 'status-failed' }
                        ],
                        classPerformance: [
                            { title: 'Math 101', avgGrade: 88, colorClass: 'green' },
                            { title: 'Science 101', avgGrade: 75, colorClass: 'orange' },
                            { title: 'Art 101', avgGrade: 95, colorClass: 'blue' },
                            { title: 'English 101', avgGrade: 80, colorClass: 'red' }
                        ]
                    },
                    'FullYear': {
                        overview: { students: 1250, teachers: 78, classes: 65, pending: 20 },
                        schoolPerformance: { percentage: 89, gradeAvg: 'B+', passingRate: '96%', satisfaction: '82%' },
                        attendanceOverview: { rate: '93%', absentToday: 7, dailyTrend: [88, 92, 90, 94, 91, 89, 93], labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'] },
                        upcomingExams: [
                            { date: 'Jun 10, 2025', event: 'Graduation Ceremony', class: 'Grade 12', status: 'Event', statusClass: 'status-success' },
                            { date: 'Jul 01, 2025', event: 'Summer School Starts', class: 'All', status: 'Upcoming', statusClass: 'status-upcoming' }
                        ],
                        recentActivity: [
                            { timestamp: 'May 30, 4:00 PM', user: 'Admin', action: 'Archived Academic Year', target: '2023-2024', statusClass: 'status-success' },
                            { timestamp: 'May 29, 9:00 AM', user: 'Teacher Lead', action: 'Finalized Curriculum', target: 'All Classes', statusClass: 'status-success' }
                        ],
                        classPerformance: [
                            { title: 'Math 101', avgGrade: 86, colorClass: 'green' },
                            { title: 'Science 101', avgGrade: 72, colorClass: 'orange' },
                            { title: 'History 101', avgGrade: 90, colorClass: 'blue' },
                            { title: 'English 101', avgGrade: 79, colorClass: 'red' }
                        ]
                    }
                },
                '2023-2024': {
                    'Fall': {
                        overview: { students: 1150, teachers: 70, classes: 55, pending: 10 },
                        schoolPerformance: { percentage: 85, gradeAvg: 'B', passingRate: '90%', satisfaction: '75%' },
                        attendanceOverview: { rate: '90%', absentToday: 8, dailyTrend: [80, 85, 88, 85, 90, 87, 82], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
                        upcomingExams: [
                            { date: 'Nov 15, 2023', event: 'Parent-Teacher Meet', class: 'All', status: 'Event', statusClass: 'status-success' },
                            { date: 'Dec 01, 2023', event: 'Winter Break', class: 'All', status: 'Holiday', statusClass: 'status-success' }
                        ],
                        recentActivity: [
                            { timestamp: 'Dec 15, 12:00 PM', user: 'Admin', action: 'Closed Fall Term', target: '2023-2024 Fall', statusClass: 'status-success' }
                        ],
                        classPerformance: [
                            { title: 'Math 101', avgGrade: 82, colorClass: 'green' },
                            { title: 'Science 101', avgGrade: 68, colorClass: 'orange' },
                            { title: 'History 101', avgGrade: 87, colorClass: 'blue' },
                            { title: 'English 101', avgGrade: 75, colorClass: 'red' }
                        ]
                    },
                    'Spring': {
                        overview: { students: 1130, teachers: 68, classes: 53, pending: 5 },
                        schoolPerformance: { percentage: 87, gradeAvg: 'B+', passingRate: '92%', satisfaction: '78%' },
                        attendanceOverview: { rate: '91%', absentToday: 6, dailyTrend: [85, 88, 90, 87, 92, 89, 86], labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] },
                        upcomingExams: [
                             { date: 'May 20, 2024', event: 'Final Exams', class: 'All', status: 'Upcoming', statusClass: 'status-upcoming' },
                            { date: 'May 25, 2024', event: 'Grade Submission Deadline', class: 'All Teachers', status: 'Due Soon', statusClass: 'status-due' }
                        ],
                        recentActivity: [
                            { timestamp: 'Jun 05, 11:00 AM', user: 'Teacher', action: 'Submitted Final Grades', target: 'Math 101', statusClass: 'status-success' }
                        ],
                        classPerformance: [
                            { title: 'Math 101', avgGrade: 84, colorClass: 'green' },
                            { title: 'Science 101', avgGrade: 70, colorClass: 'orange' },
                            { title: 'History 101', avgGrade: 89, colorClass: 'blue' },
                            { title: 'English 101', avgGrade: 77, colorClass: 'red' }
                        ]
                    },
                    'FullYear': {
                        overview: { students: 1170, teachers: 72, classes: 57, pending: 12 },
                        schoolPerformance: { percentage: 86, gradeAvg: 'B', passingRate: '91%', satisfaction: '76%' },
                        attendanceOverview: { rate: '91%', absentToday: 7, dailyTrend: [83, 87, 89, 86, 90, 88, 85], labels: ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7'] },
                        upcomingExams: [],
                        recentActivity: [
                            { timestamp: 'Jul 10, 10:00 AM', user: 'Admin', action: 'Started New Academic Year Setup', target: '2024-2025', statusClass: 'status-pending' }
                        ],
                        classPerformance: [
                            { title: 'Math 101', avgGrade: 83, colorClass: 'green' },
                            { title: 'Science 101', avgGrade: 69, colorClass: 'orange' },
                            { title: 'History 101', avgGrade: 88, colorClass: 'blue' },
                            { title: 'English 101', avgGrade: 76, colorClass: 'red' }
                        ]
                    }
                }
                // Add more academic years or default data as needed
            };


            // --- Dashboard Filter Logic ---

            // Function to render the attendance bar chart
            function renderAttendanceChart(dailyTrend, labels, activePeriod = 'weekly') {
                attendanceBarChart.innerHTML = ''; // Clear existing bars
                dailyTrend.forEach((value, index) => {
                    const barColumn = document.createElement('div');
                    barColumn.classList.add('bar-column');
                    // Assuming value is a percentage, so directly use it for height
                    const barHeight = value; 
                    barColumn.innerHTML = `
                        <div class="bar" style="height: ${barHeight}%;"></div>
                        <span class="label">${labels[index]}</span>
                    `;
                    // Example active bar: for weekly, highlight the highest attendance day for visual impact
                    const maxAttendance = Math.max(...dailyTrend);
                    if (value === maxAttendance && index === dailyTrend.indexOf(maxAttendance)) {
                         barColumn.querySelector('.bar').classList.add('active');
                    }
                    attendanceBarChart.appendChild(barColumn);
                });
            }

            // Function to apply filters and update all sections
            function applyFilters() {
                const selectedAcademicYear = academicYearFilter.value;
                const selectedSemester = semesterFilter.value;
                const data = dashboardData[selectedAcademicYear][selectedSemester];

                // Update Overview Cards
                totalStudentsValue.textContent = data.overview.students;
                totalTeachersValue.textContent = data.overview.teachers;
                totalClassesValue.textContent = data.overview.classes;
                pendingEnrollmentsValue.textContent = data.overview.pending;
                
                overviewFilterText.textContent = `${selectedAcademicYear} / ${selectedSemester}`;
                upcomingFilterText.textContent = `${selectedSemester} Term`;

                // Update Overall School Performance Card
                schoolPerformancePercentage.textContent = data.schoolPerformance.percentage;
                schoolPerformancePercentage.style.background = `radial-gradient(closest-side, white 79%, transparent 80% 100%), conic-gradient(var(--secondary-green) ${data.schoolPerformance.percentage}%, var(--border-light) 0)`;
                overallGradeAvg.textContent = data.schoolPerformance.gradeAvg;

                // Update Attendance Overview Card
                overallAttendanceRate.textContent = data.attendanceOverview.rate;
                absentStudentsToday.textContent = `${data.attendanceOverview.absentToday} Absent Today`;
                
                // Re-render attendance chart based on active tab
                const activeAttendanceTab = attendanceChartTabs.querySelector('.btn.active');
                const chartPeriod = activeAttendanceTab ? activeAttendanceTab.dataset.chartPeriod : 'weekly';
                renderAttendanceChart(data.attendanceOverview.dailyTrend, data.attendanceOverview.labels, chartPeriod);

                // Update Upcoming Exams & Deadlines Table
                upcomingExamsTableBody.innerHTML = '';
                if (data.upcomingExams && data.upcomingExams.length > 0) {
                    data.upcomingExams.forEach(item => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${item.date}</td>
                            <td>${item.event}</td>
                            <td>${item.class}</td>
                            <td class="${item.statusClass}">${item.status}</td>
                        `;
                        upcomingExamsTableBody.appendChild(row);
                    });
                } else {
                     upcomingExamsTableBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">No upcoming events or exams for this period.</td></tr>`;
                }


                // Update Recent System Activity Table
                recentActivityTableBody.innerHTML = '';
                if (data.recentActivity && data.recentActivity.length > 0) {
                    data.recentActivity.forEach(activity => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${activity.timestamp}</td>
                            <td>${activity.user}</td>
                            <td>${activity.action}</td>
                            <td class="${activity.statusClass}">${activity.target}</td>
                        `;
                        recentActivityTableBody.appendChild(row);
                    });
                } else {
                    recentActivityTableBody.innerHTML = `<tr><td colspan="4" class="text-center text-muted py-4">No recent activity for this period.</td></tr>`;
                }
                

                // Update Class Performance Cards
                classPerformanceCards.innerHTML = '';
                if (data.classPerformance && data.classPerformance.length > 0) {
                    data.classPerformance.forEach(classData => {
                        const col = document.createElement('div');
                        col.classList.add('col-lg-6', 'col-md-6');
                        col.innerHTML = `
                            <div class="class-performance-card-item ${classData.colorClass}">
                                <h6 class="class-title">${classData.title}</h6>
                                <div class="grade-value">
                                    <span>Average Grade</span>
                                    <span>${classData.avgGrade}%</span>
                                </div>
                                <div class="progress-bar-container">
                                    <div class="progress-bar ${classData.colorClass}" style="width: ${classData.avgGrade}%;"></div>
                                </div>
                            </div>
                        `;
                        classPerformanceCards.appendChild(col);
                    });
                } else {
                     classPerformanceCards.innerHTML = `<div class="col-12"><p class="text-center text-muted py-4">No class performance data available for this period.</p></div>`;
                }
            }

            // Event listeners for global filters
            academicYearFilter.addEventListener('change', applyFilters);
            semesterFilter.addEventListener('change', applyFilters);

            // Event listeners for Attendance Overview chart tabs
            attendanceChartTabs.querySelectorAll('.btn').forEach(button => {
                button.addEventListener('click', function() {
                    attendanceChartTabs.querySelectorAll('.btn').forEach(btn => btn.classList.remove('active'));
                    this.classList.add('active');
                    const selectedAcademicYear = academicYearFilter.value;
                    const selectedSemester = semesterFilter.value;
                    const data = dashboardData[selectedAcademicYear][selectedSemester];
                    renderAttendanceChart(data.attendanceOverview.dailyTrend, data.attendanceOverview.labels, this.dataset.chartPeriod);
                });
            });

            applyFilters();
        });