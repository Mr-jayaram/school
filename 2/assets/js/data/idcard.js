        document.addEventListener('DOMContentLoaded', () => {
            // --- ID Card Elements ---
            const idCardAcademicYearFilter = document.getElementById('idCardAcademicYearFilter');
            const idCardTypeFilter = document.getElementById('idCardTypeFilter');
            const idCardClassFilter = document.getElementById('idCardClassFilter');
            const idCardStudentFilter = document.getElementById('idCardStudentFilter');
            const idCardDepartmentFilter = document.getElementById('idCardDepartmentFilter');
            const idCardStaffMemberFilter = document.getElementById('idCardStaffMemberFilter');
            const idCardBackgroundImageInput = document.getElementById('idCardBackgroundImageInput');
            const generateIdCardsBtn = document.getElementById('generateIdCardsBtn');
            const downloadAllIdCardsPdfBtn = document.getElementById('downloadAllIdCardsPdfBtn');
            const idCardDisplayArea = document.getElementById('idCardDisplayArea');
            const idCardFilterText = document.getElementById('idCardFilterText');
            const idCardSection = document.getElementById('id-card-section');
            const idCardContent = document.getElementById('id_card_preview');


            
            // const dashboardSection = document.getElementById('dashboard-section'); // Removed, assuming no dashboard section if only ID cards

            const studentFilterGroups = document.querySelectorAll('.student-filters');
            const staffFilterGroups = document.querySelectorAll('.staff-filters');

            let selectedBackgroundImageDataUrl = ''; // Variable to store image data URL

            // --- Simulated Data ---
            const simulatedStudents = {
                '6-A': [
                    { id: '232', name: 'Anshul', rollNo: '232', dob: '25-Sep-2002', father: 'Rakesh Kumar', mother: 'Kavita Rani', address: 'WZ-G-1-25A, Uttam Nagar, India', class: '6-A', photo: 'https://via.placeholder.com/120x120/87CEEB/FFFFFF?text=A.K.' }
                ],
                'Grade 10': [
                    { id: 'S001', name: 'Alok Kumar', rollNo: 'S001', dob: '10-Mar-2008', father: 'Suresh Kumar', mother: 'Priya Devi', address: '123, Gandhi Road, Delhi', class: 'Grade 10', photo: 'https://via.placeholder.com/120x120/87CEEB/FFFFFF?text=A.K.' },
                    { id: 'S002', name: 'Bhavna Devi', rollNo: 'S002', dob: '05-Jul-2008', father: 'Rajesh Sharma', mother: 'Meena Sharma', address: '456, Nehru Vihar, Noida', class: 'Grade 10', photo: 'https://via.placeholder.com/120x120/87CEEB/FFFFFF?text=B.D.' },
                    { id: 'S003', name: 'Chandan Singh', rollNo: 'S003', dob: '18-Jan-2008', father: 'Vijay Singh', mother: 'Kiran Singh', address: '789, Patel Nagar, Ghaziabad', class: 'Grade 10', photo: 'https://via.placeholder.com/120x120/87CEEB/FFFFFF?text=C.S.' },
                    { id: 'S004', name: 'Divya Sharma', rollNo: 'S004', dob: '22-Apr-2008', father: 'Rajesh Sharma', mother: 'Pooja Sharma', address: '101, Green Park, Delhi', class: 'Grade 10', photo: 'https://via.placeholder.com/120x120/87CEEB/FFFFFF?text=D.S.' },
                    { id: 'S005', name: 'Eshwar Kumar', rollNo: 'S005', dob: '01-Nov-2008', father: 'Gopal Kumar', mother: 'Sita Devi', address: '202, Ashok Vihar, Gurgaon', class: 'Grade 10', photo: 'https://via.placeholder.com/120x120/87CEEB/FFFFFF?text=E.K.' },
                    { id: 'S006', name: 'Farah Khan', rollNo: 'S006', dob: '15-Feb-2008', father: 'Imran Khan', mother: 'Sana Khan', address: '303, Cyber City, Bangalore', class: 'Grade 10', photo: 'https://via.placeholder.com/120x120/87CEEB/FFFFFF?text=F.K.' }
                ],
                'Grade 9': [
                    { id: 'S007', name: 'Deepa Sharma', rollNo: 'S007', dob: '01-Apr-2009', father: 'Anil Sharma', mother: 'Ritu Sharma', address: '101, Civil Lines, Gurgaon', class: 'Grade 9', photo: 'https://via.placeholder.com/120x120/87CEEB/FFFFFF?text=D.S.' },
                    { id: 'S008', name: 'Eshwar Reddy', rollNo: 'S008', dob: '12-Sep-2009', father: 'Gopal Reddy', mother: 'Lakshmi Reddy', address: '202, Cyber City, Bangalore', class: 'Grade 9', photo: 'https://via.placeholder.com/120x120/87CEEB/FFFFFF?text=E.R.' }
                ]
            };

            // Simulated Staff Data
            const simulatedStaffs = {
                'Administration': [
                    { id: 'EM001', name: 'Jon Principal', position: 'Principal', department: 'Administration', email: 'principal@demo.com', phone: '123-456-7890', photo: 'assets/img/logo/user.png' },
                    { id: 'EM002', name: 'Alice Admin', position: 'Admin Assistant', department: 'Administration', email: 'alice@demo.com', phone: '987-654-3210', photo: 'https://via.placeholder.com/120x120/87CEEB/FFFFFF?text=A.A.' }
                ],
                'Teaching': [
                    { id: 'EM003', name: 'Mr. Sharma', position: 'Senior Teacher', department: 'Teaching', email: 'sharma@demo.com', phone: '111-222-3333', photo: 'https://via.placeholder.com/120x120/87CEEB/FFFFFF?text=M.S.' },
                    { id: 'EM004', name: 'Ms. Verma', position: 'Teacher', department: 'Teaching', email: 'verma@demo.com', phone: '444-555-6666', photo: 'https://via.placeholder.com/120x120/87CEEB/FFFFFF?text=M.V.' }
                ]
            };


            // --- ID Card Functions ---

            // Event listener for background image input
            idCardBackgroundImageInput.addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        selectedBackgroundImageDataUrl = e.target.result;
                        // Optionally, trigger generateIdCards() here for immediate preview:
                        // generateIdCards();
                    };
                    reader.readAsDataURL(file);
                } else {
                    selectedBackgroundImageDataUrl = ''; // Clear if no file selected
                }
            });

            // Function to update dynamic filters based on card type
            function updateIdCardTypeFilters() {
                const selectedType = idCardTypeFilter.value;

                if (selectedType === 'student') {
                    studentFilterGroups.forEach(group => group.classList.remove('hidden-filter'));
                    staffFilterGroups.forEach(group => group.classList.add('hidden-filter'));
                    populateStudentIdCardFilter(); // Populate student list based on selected class
                    idCardDepartmentFilter.value = ''; // Clear staff department selection
                    idCardStaffMemberFilter.innerHTML = '<option value="">Select Staff Member</option>'; // Clear staff members
                } else { // staff
                    studentFilterGroups.forEach(group => group.classList.add('hidden-filter'));
                    staffFilterGroups.forEach(group => group.classList.remove('hidden-filter'));
                    populateStaffIdCardFilter(); // Populate staff list based on selected department
                    idCardClassFilter.value = ''; // Clear student class selection
                    idCardStudentFilter.innerHTML = '<option value="">Select Student</option>'; // Clear students
                }
                updateIdCardFilterText();
            }

            // Function to populate student dropdown for ID cards
            function populateStudentIdCardFilter() {
                const selectedClass = idCardClassFilter.value;
                const studentsInClass = simulatedStudents[selectedClass] || [];

                idCardStudentFilter.innerHTML = '<option value="">Select Student</option>';
                if (selectedClass) { // Only add "All Students" if a class is actually selected
                    const allStudentsOption = document.createElement('option');
                    allStudentsOption.value = 'all';
                    allStudentsOption.textContent = 'All Students';
                    idCardStudentFilter.appendChild(allStudentsOption);
                }
                studentsInClass.forEach(student => {
                    const option = document.createElement('option');
                    option.value = student.id;
                    option.textContent = student.name;
                    idCardStudentFilter.appendChild(option);
                });
                updateIdCardFilterText(); // Update filter text after populating
            }

            // Function to populate staff dropdown for ID cards
            function populateStaffIdCardFilter() {
                const selectedDepartment = idCardDepartmentFilter.value;
                const staffInDepartment = simulatedStaffs[selectedDepartment] || [];

                idCardStaffMemberFilter.innerHTML = '<option value="">Select Staff Member</option>';
                if (selectedDepartment) { // Only add "All Staff Members" if a department is actually selected
                    const allStaffOption = document.createElement('option');
                    allStaffOption.value = 'all';
                    allStaffOption.textContent = 'All Staff Members';
                    idCardStaffMemberFilter.appendChild(allStaffOption);
                }
                staffInDepartment.forEach(staff => {
                    const option = document.createElement('option');
                    option.value = staff.id;
                    option.textContent = staff.name;
                    idCardStaffMemberFilter.appendChild(option);
                });
                updateIdCardFilterText(); // Update filter text after populating
            }

            // Function to update the filter text display
            function updateIdCardFilterText() {
                const selectedAcademicYear = idCardAcademicYearFilter.value;
                const selectedType = idCardTypeFilter.value;
                let memberInfo = '';

                if (selectedType === 'student') {
                    const selectedClass = idCardClassFilter.value;
                    const selectedStudentId = idCardStudentFilter.value;
                    const selectedStudent = (simulatedStudents[selectedClass] || []).find(s => s.id === selectedStudentId);

                    let studentNameDisplay = 'Select Student';
                    if (selectedStudentId === 'all') {
                        studentNameDisplay = 'All Students';
                    } else if (selectedStudent) {
                        studentNameDisplay = selectedStudent.name;
                    }
                    memberInfo = `${selectedClass || 'Select Class'} / ${studentNameDisplay}`;

                } else { // staff
                    const selectedDepartment = idCardDepartmentFilter.value;
                    const selectedStaffId = idCardStaffMemberFilter.value;
                    const selectedStaff = (simulatedStaffs[selectedDepartment] || []).find(s => s.id === selectedStaffId);
                    let staffNameDisplay = 'Select Staff Member';
                    if (selectedStaffId === 'all') {
                        staffNameDisplay = 'All Staff Members';
                    } else if (selectedStaff) {
                        staffNameDisplay = selectedStaff.name;
                    }
                    memberInfo = `${selectedDepartment || 'Select Department'} / ${staffNameDisplay}`;
                }
                idCardFilterText.textContent = `${selectedAcademicYear} / ${selectedType === 'student' ? 'Student' : 'Staff'} / ${memberInfo}`;
            }

                     function generateIdCards() {
                idCardContent.style.display = "block";
                const selectedAcademicYear = idCardAcademicYearFilter.value;
                const selectedType = idCardTypeFilter.value;
                let membersToGenerate = [];
                let validationMessage = '';

                // Determine selected members and validate
                if (selectedType === 'student') {
                    const selectedClass = idCardClassFilter.value;
                    const selectedStudentId = idCardStudentFilter.value;

                    if (!selectedClass) {
                        validationMessage = 'Please select a Class.';
                    } else if (selectedStudentId === 'all') {
                        membersToGenerate = simulatedStudents[selectedClass] || [];
                    } else if (selectedStudentId) {
                        const student = (simulatedStudents[selectedClass] || []).find(s => s.id === selectedStudentId);
                        if (student) membersToGenerate.push(student);
                    } else {
                        validationMessage = 'Please select a Student or "All Students".';
                    }
                    if (membersToGenerate.length === 0 && !validationMessage) {
                         validationMessage = 'No students found for the selected class.';
                    }

                } else { // staff
                    const selectedDepartment = idCardDepartmentFilter.value;
                    const selectedStaffId = idCardStaffMemberFilter.value;

                    if (!selectedDepartment) {
                        validationMessage = 'Please select a Department.';
                    } else if (selectedStaffId === 'all') {
                        membersToGenerate = simulatedStaffs[selectedDepartment] || [];
                    } else if (selectedStaffId) {
                        const staff = (simulatedStaffs[selectedDepartment] || []).find(s => s.id === selectedStaffId);
                        if (staff) membersToGenerate.push(staff);
                    } else {
                        validationMessage = 'Please select a Staff Member or "All Staff Members".';
                    }
                    if (membersToGenerate.length === 0 && !validationMessage) {
                        validationMessage = 'No staff members found for the selected department.';
                    }
                }

                idCardDisplayArea.innerHTML = ''; // Clear previous cards

                if (membersToGenerate.length === 0) {
                    idCardDisplayArea.innerHTML = `<p class="text-center text-muted py-4">${validationMessage || 'No members to generate ID cards for based on your selection.'}</p>`;
                    updateIdCardFilterText();
                    return;
                }

                membersToGenerate.forEach(member => {
                    let backgroundStyle = `background-color: #FFFFFF;`; // Default to white if no image
                    if (selectedBackgroundImageDataUrl) { // Use the uploaded image if available
                        backgroundStyle = `
                            background-image: url('${selectedBackgroundImageDataUrl}');
                            background-size: cover;
                            background-position: center;
                            background-repeat: no-repeat;
                            background-color: transparent;
                        `;
                    } else { // Fallback to the default image if no image is uploaded
                         backgroundStyle = `
                            background-image: url('assets/img/bg/idcard-1.jpeg');
                            background-size: cover;
                            background-position: center;
                            background-repeat: no-repeat;
                            background-color: transparent;
                        `;
                    }

                    let frontDetailsHtml = '';
                    let backDetailsHtml = '';
                    let cardName = member.name.toUpperCase();
                    let cardPosition = '';

                    if (selectedType === 'student') {
                        cardPosition = `STUDENT - ${member.class || 'N/A'}`;
                        frontDetailsHtml = `
                            <p><span>Class</span> : ${member.class || 'N/A'}</p>
                            <p><span>Roll No.</span> : ${member.rollNo || 'N/A'}</p>
                            <p><span>DOB</span> : ${member.dob || 'N/A'}</p>
                            <p><span>Father</span> : ${member.father || 'N/A'}</p>
                            <p><span>Mother</span> : ${member.mother || 'N/A'}</p>
                        `;
                        backDetailsHtml = `
                            <p><span>ACAD. YEAR</span> : ${selectedAcademicYear}</p>
                            <p><span>CLASS</span> : ${member.class || 'N/A'}</p>
                            <p><span>ROLL NO.</span> : ${member.rollNo || 'N/A'}</p>
                            <p><span>ADDRESS</span> : ${member.address || 'N/A'}</p>
                        `;
                    } else { // staff
                        cardPosition = member.position.toUpperCase();
                        frontDetailsHtml = `
                            <p><span>Dept</span> : ${member.department || 'N/A'}</p>
                            <p><span>Email</span> : ${member.email || 'N/A'}</p>
                            <p><span>Phone</span> : ${member.phone || 'N/A'}</p>
                            <p><span>Emp ID</span> : ${member.id || 'N/A'}</p>
                        `;
                         backDetailsHtml = `
                            <p><span>JOIN DATE</span> : 01.01.2020</p>
                            <p><span>EXPIRE DATE</span> : 01.01.2025</p>
                            <p><span>EMP ID</span> : ${member.id || 'N/A'}</p>
                            <p><span>DEPARTMENT</span> : ${member.department || 'N/A'}</p>
                        `;
                    }

                    const cardPairHtml = `
                        <div class="id-card-pair">
                            <!-- Front of the ID Card -->
                            <div class="id-card-item id-card-front" style="${backgroundStyle}">
                             
                                <div class="id-card-content-area">
                                     <div class="id-card-top-pattern">
                                        <div class="id-card-company-logo-back">
                                        <span class="tagline-main">Demo Matriculation Schools </span>
                                    </div>
                                </div>   
                                    <div class="id-card-photo-container">
                                        <img src="assets/img/logo/user.png" alt="${member.name} Photo" class="id-card-photo">
                                    </div>
                                    <p class="id-card-name-main m-0">${cardName}</p>
                                    <p class="id-card-position m-1">${cardPosition}</p>
                                    <div class="id-card-details-list">
                                        ${frontDetailsHtml}
                                    </div>
                                   
                                </div>
                            </div>

                            <!-- Back of the ID Card -->
                            <div class="id-card-item id-card-back" style="${backgroundStyle}">
                               
                                <div class="id-card-content-area-back">
                                    <p class="id-card-name-back">${cardName}</p>
                                    <p class="id-card-position-back">${cardPosition}</p>
                                    <img src="https://via.placeholder.com/100x30/FFFFFF/000000?text=Signature" alt="Signature" class="id-card-signature">
                                    <div class="id-card-info-dates">
                                        ${backDetailsHtml}
                                    </div>
                                   
                                    <div class="id-card-qr-code-container">
                                        <img src="https://api.qrserver.com/v1/create-qr-code/?size=80x80&data=${member.id}" alt="QR Code" class="id-card-qr-code">
                                    </div>
                                </div>
                               
                            </div>
                        </div>
                    `;
                    idCardDisplayArea.insertAdjacentHTML('beforeend', cardPairHtml);
                });
                updateIdCardFilterText();
            }

            function downloadAllIdCardsPdf() {
                const selectedType = idCardTypeFilter.value;
                const selectedAcademicYear = idCardAcademicYearFilter.value;
                let fileNamePrefix = selectedType === 'student' ? 'Student_ID_Cards' : 'Staff_ID_Cards';

                const idCardElements = idCardDisplayArea.querySelectorAll('.id-card-item');

                if (idCardElements.length === 0) {
                    alert('No ID cards generated to download. Please generate them first.');
                    return;
                }

                const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
                const margin = 10;
                let currentY = margin;
                const pageWidth = pdf.internal.pageSize.getWidth();

                const processCard = (index) => {
                    if (index >= idCardElements.length) {
                        pdf.save(`${fileNamePrefix}_${selectedAcademicYear}.pdf`);
                        alert('All ID cards downloaded successfully!');
                        return;
                    }

                    const cardElement = idCardElements[index];
                    // Ensure html2canvas captures the inline background styles
                    html2canvas(cardElement, { scale: 2, logging: false, useCORS: true }).then(canvas => {
                        const imgData = canvas.toDataURL('image/png');
                        const imgHeight = (canvas.height * (pageWidth - 2 * margin)) / canvas.width; // Scale to fit width

                        // Check if current card fits on the page
                        if (currentY + imgHeight + margin > pdf.internal.pageSize.getHeight()) {
                            pdf.addPage();
                            currentY = margin;
                        }

                        // Add image, centered horizontally
                        pdf.addImage(imgData, 'PNG', margin, currentY, (pageWidth - 2 * margin), imgHeight);
                        currentY += imgHeight + margin; // Move Y for next card

                        processCard(index + 1);
                    }).catch(error => {
                        console.error('Error generating PDF for ID card:', cardElement, error);
                        alert(`Failed to generate PDF for some ID cards. See console for details. (Card ${index + 1})`);
                        processCard(index + 1);
                    });
                };

                processCard(0);
            }


            // --- Event Listeners ---

            // ID Card Event Listeners
            idCardAcademicYearFilter.addEventListener('change', updateIdCardFilterText);
            idCardTypeFilter.addEventListener('change', updateIdCardTypeFilters);
            idCardClassFilter.addEventListener('change', populateStudentIdCardFilter);
            idCardClassFilter.addEventListener('change', updateIdCardFilterText);
            idCardStudentFilter.addEventListener('change', updateIdCardFilterText);
            idCardDepartmentFilter.addEventListener('change', populateStaffIdCardFilter);
            idCardDepartmentFilter.addEventListener('change', updateIdCardFilterText);
            idCardStaffMemberFilter.addEventListener('change', updateIdCardFilterText);

            idCardBackgroundImageInput.addEventListener('change', (event) => {
                const file = event.target.files[0];
                if (file) {
                    const reader = new FileReader();
                    reader.onload = (e) => {
                        selectedBackgroundImageDataUrl = e.target.result;
                        // regenerate if you want live preview: generateIdCards();
                    };
                    reader.readAsDataURL(file);
                } else {
                    selectedBackgroundImageDataUrl = '';
                }
            });

            generateIdCardsBtn.addEventListener('click', generateIdCards);
            downloadAllIdCardsPdfBtn.addEventListener('click', downloadAllIdCardsPdf);

            // Initial setup for ID card filters
            updateIdCardTypeFilters(); // Call to set initial state of student/staff filters
        });