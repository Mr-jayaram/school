        document.addEventListener('DOMContentLoaded', () => {
            const academicYearFilter = document.getElementById('academicYearFilter');
            const semesterFilter = document.getElementById('semesterFilter'); // Now acts as Term filter
            const classFilter = document.getElementById('classFilter');
            const studentFilter = document.getElementById('studentFilter');
            const reportCardContent = document.getElementById('reportCardContent');
            const reportCardFilterText = document.getElementById('reportCardFilterText');
            const generatePreviewBtn = document.getElementById('generatePreviewBtn');
            const downloadPdfBtn = document.getElementById('downloadPdfBtn');

            // Simulated student data to match the image
            const simulatedStudents = {
                '6-A': [
                    { id: '232', name: 'Anshul', dob: '25-Sep-2002', father: 'Rakesh Kumar', mother: 'Kavita Rani', address: 'WZ-G-1-25A, Uttam Nagar, India' }
                ],
                'Grade 10': [
                    { id: 'S001', name: 'Alok Kumar' }
                ],
                'Grade 9': [
                    { id: 'S004', name: 'Deepa Sharma' }
                ]
            };

            // Hardcoded report card content for Anshul (exactly as in the image, but with stacked terms and "Mark" instead of "Grade")
            const anshulReportCardHtml = `
                <div class="report-card-container">
                    <div class="report-card-header-main">
                        <div class="school-branding">
                            <img src="https://jaiinfo.tech/logo/logo_only.png" alt="School Logo" class="school-logo">
                            <p class="school-affiliation">(Recognized and Affiliated to C.B.S.E)</p>
                        </div>
                        <div class="school-info">
                            <h2 class="school-name">Demo School</h2>
                            <p>Complete Address: G Near Uttam Nagar(West) Metro Station, Uttam Nagar, New Delhi, Delhi , India, 110059</p>
                            <p class="contact-info">Telephone no: <span class="placeholder-line"></span> E-mail id: <span class="placeholder-line"></span></p>
                        </div>
                    </div>
                    <div class="report-card-title">
                        <h3>Report Card (2013-14)</h3>
                    </div>
                    <div class="student-details-grid">
                        <div class="detail-row">
                            <p><strong>Name of Student :</strong> Anshul</p>
                            <p><strong>Registration/Roll No :</strong> 232</p>
                        </div>
                        <div class="detail-row">
                            <p><strong>Class :</strong> 6-A</p>
                            <p><strong>Date of Birth :</strong> 25-Sep-2002</p>
                        </div>
                        <div class="detail-row">
                            <p><strong>Father's Name :</strong> Rakesh Kumar</p>
                            <p><strong>Mother's Name :</strong> Kavita Rani</p>
                        </div>
                        <div class="detail-row full-width">
                            <p><strong>Residential Address :</strong> WZ-G-1-25A, Uttam Nagar, India</p>
                        </div>
                    </div>

                    <div class="academic-performance mt-4">
                        <div class="section-heading">Part 1 : Scholastic Areas - 1(A)</div>

                        <div id="term1-container" class="term-section">
                            <h5 class="mt-3">Term 1 Performance</h5>
                            <div class="table-responsive">
                                <table class="table table-bordered report-card-table">
                                    <thead>
                                        <tr>
                                            <th>Subjects</th>
                                            <th class="text-center">FA1 (10.0) <br> Mark</th>
                                            <th class="text-center">FA2 (10.0) <br> Mark</th>
                                            <th class="text-center">SA1 (30.0) <br> Mark</th>
                                            <th class="text-center">Term Total (50.0) <br> Mark</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Computer</td><td class="text-center">95</td><td class="text-center">92</td><td class="text-center">90</td><td class="text-center">92</td></tr>
                                        <tr><td>English</td><td class="text-center">85</td><td class="text-center">90</td><td class="text-center">88</td><td class="text-center">87</td></tr>
                                        <tr><td>Hindi</td><td class="text-center">93</td><td class="text-center">91</td><td class="text-center">89</td><td class="text-center">91</td></tr>
                                        <tr><td>Mathematics</td><td class="text-center">88</td><td class="text-center">85</td><td class="text-center">82</td><td class="text-center">85</td></tr>
                                        <tr><td>Sanskrit</td><td class="text-center">96</td><td class="text-center">94</td><td class="text-center">92</td><td class="text-center">94</td></tr>
                                        <tr><td>Science</td><td class="text-center">87</td><td class="text-center">90</td><td class="text-center">89</td><td class="text-center">89</td></tr>
                                        <tr><td>Social science</td><td class="text-center">94</td><td class="text-center">93</td><td class="text-center">91</td><td class="text-center">93</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="term2-container" class="term-section">
                            <h5 class="mt-4">Term 2 Performance</h5>
                            <div class="table-responsive">
                                <table class="table table-bordered report-card-table">
                                    <thead>
                                        <tr>
                                            <th>Subjects</th>
                                            <th class="text-center">FA3 (10.0) <br> Mark</th>
                                            <th class="text-center">FA4 (10.0) <br> Mark</th>
                                            <th class="text-center">SA2 (30.0) <br> Mark</th>
                                            <th class="text-center">Term Total (50.0) <br> Mark</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Computer</td><td class="text-center">90</td><td class="text-center">85</td><td class="text-center">88</td><td class="text-center">87</td></tr>
                                        <tr><td>English</td><td class="text-center">91</td><td class="text-center">90</td><td class="text-center">85</td><td class="text-center">88</td></tr>
                                        <tr><td>Hindi</td><td class="text-center">92</td><td class="text-center">93</td><td class="text-center">90</td><td class="text-center">92</td></tr>
                                        <tr><td>Mathematics</td><td class="text-center">86</td><td class="text-center">84</td><td class="text-center">91</td><td class="text-center">87</td></tr>
                                        <tr><td>Sanskrit</td><td class="text-center">93</td><td class="text-center">88</td><td class="text-center">90</td><td class="text-center">90</td></tr>
                                        <tr><td>Science</td><td class="text-center">90</td><td class="text-center">91</td><td class="text-center">92</td><td class="text-center">91</td></tr>
                                        <tr><td>Social science</td><td class="text-center">95</td><td class="text-center">94</td><td class="text-center">93</td><td class="text-center">94</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div id="term3-container" class="term-section"> <!-- New Term 3 Section -->
                            <h5 class="mt-4">Term 3 Performance (Simulated)</h5>
                            <div class="table-responsive">
                                <table class="table table-bordered report-card-table">
                                    <thead>
                                        <tr>
                                            <th>Subjects</th>
                                            <th class="text-center">FA5 (10.0) <br> Mark</th> <!-- Assuming FA5 for Term 3 -->
                                            <th class="text-center">FA6 (10.0) <br> Mark</th> <!-- Assuming FA6 for Term 3 -->
                                            <th class="text-center">SA3 (30.0) <br> Mark</th> <!-- Assuming SA3 for Term 3 -->
                                            <th class="text-center">Term Total (50.0) <br> Mark</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <!-- Using Term 2 data as simulated Term 3 data for consistency -->
                                        <tr><td>Computer</td><td class="text-center">90</td><td class="text-center">85</td><td class="text-center">88</td><td class="text-center">87</td></tr>
                                        <tr><td>English</td><td class="text-center">91</td><td class="text-center">90</td><td class="text-center">85</td><td class="text-center">88</td></tr>
                                        <tr><td>Hindi</td><td class="text-center">92</td><td class="text-center">93</td><td class="text-center">90</td><td class="text-center">92</td></tr>
                                        <tr><td>Mathematics</td><td class="text-center">86</td><td class="text-center">84</td><td class="text-center">91</td><td class="text-center">87</td></tr>
                                        <tr><td>Sanskrit</td><td class="text-center">93</td><td class="text-center">88</td><td class="text-center">90</td><td class="text-center">90</td></tr>
                                        <tr><td>Science</td><td class="text-center">90</td><td class="text-center">91</td><td class="text-center">92</td><td class="text-center">91</td></tr>
                                        <tr><td>Social science</td><td class="text-center">95</td><td class="text-center">94</td><td class="text-center">93</td><td class="text-center">94</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>


                        <div id="totalyear-container" class="term-section">
                            <h5 class="mt-4">Total Year Performance</h5>
                            <div class="table-responsive">
                                <table class="table table-bordered report-card-table">
                                    <thead>
                                        <tr>
                                            <th>Subjects</th>
                                            <th class="text-center">Total Year (100) <br> Mark</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr><td>Computer</td><td class="text-center">90</td></tr>
                                        <tr><td>English</td><td class="text-center">88</td></tr>
                                        <tr><td>Hindi</td><td class="text-center">92</td></tr>
                                        <tr><td>Mathematics</td><td class="text-center">87</td></tr>
                                        <tr><td>Sanskrit</td><td class="text-center">90</td></tr>
                                        <tr><td>Science</td><td class="text-center">91</td></tr>
                                        <tr><td>Social science</td><td class="text-center">94</td></tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="grade-key">
                            <span>Ab: Absent</span>
                            <span>*: Up-scaled/Changed Mark</span>
                        </div>
                    </div>

                    <div class="summary-section">
                        <div class="summary-item attendance">
                            <strong>Attendance Report :</strong> 210.0 / 230 (91.3 %)
                        </div>
                        <div class="summary-item performance-stats">
                            <strong>CGPA :</strong> 9.71
                            <strong>Percentile :</strong> 93.75
                        </div>
                        <div class="summary-item result">
                            <strong>Result :</strong> Congratulations! You are promoted to next standard :-)
                        </div>
                    </div>
                </div>
            `;

            function updateStudentFilter() {
                const selectedClass = classFilter.value;
                const studentsInClass = simulatedStudents[selectedClass] || [];

                studentFilter.innerHTML = '<option value="">Select Student</option>';
                studentsInClass.forEach(student => {
                    const option = document.createElement('option');
                    option.value = student.id;
                    option.textContent = student.name;
                    studentFilter.appendChild(option);
                });
            }

            function generateReportCardPreview() {
                const selectedAcademicYear = academicYearFilter.value;
                const selectedTerm = semesterFilter.value; // Renamed for clarity
                const selectedClass = classFilter.value;
                const selectedStudentId = studentFilter.value;

                const selectedStudent = (simulatedStudents[selectedClass] || []).find(s => s.id === selectedStudentId);

                if (selectedStudentId === '232' && selectedStudent &&
                    selectedAcademicYear === '2013-2014' && selectedClass === '6-A') {
                    reportCardContent.innerHTML = anshulReportCardHtml; // Load the full report card first

                    // Get references to the new term containers
                    const term1Container = document.getElementById('term1-container');
                    const term2Container = document.getElementById('term2-container');
                    const term3Container = document.getElementById('term3-container'); // Get Term 3 container
                    const totalYearContainer = document.getElementById('totalyear-container');

                    // Hide/show sections based on the selected term filter
                    if (selectedTerm === 'Term 1') {
                        term1Container.style.display = 'block';
                        term2Container.style.display = 'none';
                        term3Container.style.display = 'none';
                        totalYearContainer.style.display = 'none';
                    } else if (selectedTerm === 'Term 2') {
                        term1Container.style.display = 'none';
                        term2Container.style.display = 'block';
                        term3Container.style.display = 'none';
                        totalYearContainer.style.display = 'none';
                    } else if (selectedTerm === 'Term 3') { // Handle Term 3 selection
                        term1Container.style.display = 'none';
                        term2Container.style.display = 'none';
                        term3Container.style.display = 'block';
                        totalYearContainer.style.display = 'none';
                    }
                    else { // 'All Terms' or any other value
                        term1Container.style.display = 'block';
                        term2Container.style.display = 'block';
                        term3Container.style.display = 'block'; // Show Term 3 for All Terms
                        totalYearContainer.style.display = 'block';
                    }

                    reportCardFilterText.textContent = `${selectedAcademicYear} / ${selectedTerm} / ${selectedClass} / ${selectedStudent.name}`;
                } else {
                    // Generic message if Anshul is not selected or filters don't match for him
                    reportCardContent.innerHTML = `<p class="text-center text-muted py-4">Please select 'Anshul' from '6-A' for '2013-2014' to see the report card preview.</p>`;
                    reportCardFilterText.textContent = `${academicYearFilter.value} / ${semesterFilter.value} / ${classFilter.value} / Select Student`;
                }
            }

            function downloadReportCardPdf() {
                const selectedStudentName = studentFilter.options[studentFilter.selectedIndex].text;
                const selectedStudentId = studentFilter.value;
                const selectedAcademicYear = academicYearFilter.value;
                const selectedClass = classFilter.value;
                const selectedTerm = semesterFilter.value; // Get the selected term for filename

                // Only allow PDF download for Anshul's specific report card that matches the image
                if (!(selectedStudentId === '232' && selectedAcademicYear === '2013-2014' && selectedClass === '6-A')) {
                    alert('Please ensure you have selected Anshul (ID: 232) for Class 6-A in the 2013-2014 academic year to download this specific report card.');
                    return;
                }

                const element = document.getElementById('reportCardContent');
                // Use a higher scale for better PDF quality, but be mindful of performance for very large documents
                // We target the inner 'report-card-container' to capture only the report card itself.
                html2canvas(element.querySelector('.report-card-container'), { scale: 2 }).then(canvas => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jspdf.jsPDF('p', 'mm', 'a4'); // 'p' for portrait, 'mm' for millimeters, 'a4' for A4 size
                    const imgWidth = 210; // A4 width in mm
                    const pageHeight = 295; // A4 height in mm
                    const imgHeight = canvas.height * imgWidth / canvas.width;
                    let heightLeft = imgHeight;
                    let position = 0;

                    // Add image to PDF
                    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                    heightLeft -= pageHeight;

                    // Handle multiple pages if content is too long for one A4 page
                    while (heightLeft >= 0) {
                        position = heightLeft - imgHeight;
                        pdf.addPage();
                        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
                        heightLeft -= pageHeight;
                    }
                    pdf.save(`${selectedStudentName.replace(/\s/g, '_')}_ReportCard_${selectedAcademicYear}_${selectedClass.replace(/\s/g, '-')}_${selectedTerm.replace(/\s/g, '-')}.pdf`);
                    alert('Report card PDF downloaded!');
                }).catch(error => {
                    console.error('Error generating PDF:', error);
                    alert('Failed to generate PDF. Please try again or check the console for details.');
                });
            }


            // Event Listeners
            academicYearFilter.addEventListener('change', generateReportCardPreview);
            semesterFilter.addEventListener('change', generateReportCardPreview); // Listener for Term filter
            classFilter.addEventListener('change', () => {
                updateStudentFilter(); // Update students when class changes
                generateReportCardPreview(); // Then generate preview
            });
            studentFilter.addEventListener('change', generateReportCardPreview);
            generatePreviewBtn.addEventListener('click', generateReportCardPreview);
            downloadPdfBtn.addEventListener('click', downloadReportCardPdf);

            // Initial setup
            updateStudentFilter(); // Populate student filter on load
            // Set initial filter values to match Anshul's report card for immediate display
            academicYearFilter.value = '2013-2014';
            classFilter.value = '6-A';
            updateStudentFilter(); // Re-populate students after setting class
            studentFilter.value = '232'; // Select Anshul
            semesterFilter.value = 'All Terms'; // Set initial term filter
            generateReportCardPreview(); // Generate initial preview
        });