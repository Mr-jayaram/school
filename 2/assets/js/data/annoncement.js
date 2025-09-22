

        document.addEventListener('DOMContentLoaded', () => {
           

            // --- Page Specific Elements ---
            const announcementStatusFilter = document.getElementById('announcementStatusFilter');
            const announcementAudienceFilter = document.getElementById('announcementAudienceFilter');
            const announcementSearch = document.getElementById('announcementSearch');
            const addNewAnnouncementBtn = document.getElementById('addNewAnnouncementBtn');

            const totalAnnouncementsCard = document.getElementById('totalAnnouncementsCard');
            const publishedAnnouncementsCard = document.getElementById('publishedAnnouncementsCard');
            const draftAnnouncementsCard = document.getElementById('draftAnnouncementsCard');
            const archivedAnnouncementsCard = document.getElementById('archivedAnnouncementsCard');
            const overviewFilterText = document.getElementById('overviewFilterText');

            const announcementTableBody = document.getElementById('announcementTableBody');

            // --- Modal Elements ---
            // Add Announcement Modal
            const addAnnouncementModal = new bootstrap.Modal(document.getElementById('addAnnouncementModal'));
            const addAnnouncementForm = document.getElementById('addAnnouncementForm');
            const addAnnouncementTitle = document.getElementById('addAnnouncementTitle');
            const addAnnouncementContent = document.getElementById('addAnnouncementContent');
            const addAnnouncementAudience = document.getElementById('addAnnouncementAudience');
            const addAnnouncementStatus = document.getElementById('addAnnouncementStatus');

            // View Announcement Details Modal
            const viewAnnouncementDetailsModal = new bootstrap.Modal(document.getElementById('viewAnnouncementDetailsModal'));
            const viewAnnouncementTitle = document.getElementById('viewAnnouncementTitle');
            const viewAnnouncementId = document.getElementById('viewAnnouncementId');
            const viewAnnouncementPublishDate = document.getElementById('viewAnnouncementPublishDate');
            const viewAnnouncementAudience = document.getElementById('viewAnnouncementAudience');
            const viewAnnouncementStatus = document.getElementById('viewAnnouncementStatus');
            const viewAnnouncementContent = document.getElementById('viewAnnouncementContent');

            // Edit Announcement Modal
            const editAnnouncementModal = new bootstrap.Modal(document.getElementById('editAnnouncementModal'));
            const editAnnouncementForm = document.getElementById('editAnnouncementForm');
            const editAnnouncementIdHidden = document.getElementById('editAnnouncementIdHidden');
            const editAnnouncementTitleDisplay = document.getElementById('editAnnouncementTitleDisplay');
            const editAnnouncementTitle = document.getElementById('editAnnouncementTitle');
            const editAnnouncementContent = document.getElementById('editAnnouncementContent');
            const editAnnouncementAudience = document.getElementById('editAnnouncementAudience');
            const editAnnouncementStatus = document.getElementById('editAnnouncementStatus');

            // Delete Confirmation Modal
            const deleteAnnouncementModal = new bootstrap.Modal(document.getElementById('deleteAnnouncementModal'));
            const deleteAnnouncementTitleConfirm = document.getElementById('deleteAnnouncementTitleConfirm');
            const deleteAnnouncementIdConfirm = document.getElementById('deleteAnnouncementIdConfirm');
            const deleteAnnouncementIdHidden = document.getElementById('deleteAnnouncementIdHidden');
            const confirmDeleteAnnouncementBtn = document.getElementById('confirmDeleteAnnouncementBtn');


            // Simulated Announcement Data
            let announcementData = [
                { id: 'ANN001', title: 'Welcome Back to School!', content: 'Dear Students, Staff, and Parents,\n\nWe extend a warm welcome to everyone for the new academic year! We are excited to embark on another year of learning, growth, and memorable experiences.', publishDate: '2025-09-01', audience: 'All', status: 'Published' },
                { id: 'ANN002', title: 'Parent-Teacher Conference Schedule', content: 'Our annual Parent-Teacher Conferences will be held on October 15th and 16th. Please sign up for a slot via the school portal by October 10th.', publishDate: '2025-09-05', audience: 'Parents', status: 'Published' },
                { id: 'ANN003', title: 'School Holiday - October 12th', content: 'Please note that the school will be closed on October 12th in observance of Thanksgiving. Classes will resume on October 13th.', publishDate: '2025-09-10', audience: 'All', status: 'Published' },
                { id: 'ANN004', title: 'New After-School Programs Starting Soon', content: 'We are thrilled to announce the launch of several new after-school programs including coding club, debate team, and art workshops. Enrollment details will be shared next week.', publishDate: '2025-09-12', audience: 'Students', status: 'Published' },
                { id: 'ANN005', title: 'Mandatory Staff Meeting Reminder', content: 'A mandatory staff meeting will be held on Friday, September 13th, at 3:00 PM in the library. All teaching and administrative staff are required to attend.', publishDate: '2025-09-12', audience: 'Staff', status: 'Published' },
                { id: 'ANN006', title: 'Upcoming Field Trip for Grade 5', content: 'Grade 5 students will be visiting the Natural History Museum on September 25th. Consent forms must be submitted by September 20th.', publishDate: '2025-09-13', audience: 'Students', status: 'Published' },
                { id: 'ANN007', title: 'School Yearbook Photo Submissions', content: 'Calling all students! Submit your candid photos for this year\'s school yearbook. Details on submission guidelines can be found on the student portal.', publishDate: '2025-09-14', audience: 'Students', status: 'Published' },
            ];

            function generateAnnouncementId() {
                const prefix = 'ANN';
                const currentYear = new Date().getFullYear().toString().slice(-2);
                const numAnnouncements = announcementData.length + 1;
                const paddedNum = String(numAnnouncements).padStart(3, '0');
                return `${prefix}${currentYear}${paddedNum}`;
            }

            function updateAnnouncementsPage() {
                const selectedStatus = announcementStatusFilter.value;
                const selectedAudience = announcementAudienceFilter.value;
                const searchTerm = announcementSearch.value.toLowerCase();

                let currentAnnouncements = [...announcementData]; // Use a copy for filtering

                // Filter by status
                if (selectedStatus !== 'All') {
                    currentAnnouncements = currentAnnouncements.filter(ann => ann.status === selectedStatus);
                }

                // Filter by audience
                if (selectedAudience !== 'All') {
                    currentAnnouncements = currentAnnouncements.filter(ann => ann.audience === selectedAudience);
                }

                // Filter by search term
                if (searchTerm) {
                    currentAnnouncements = currentAnnouncements.filter(ann =>
                        ann.title.toLowerCase().includes(searchTerm) ||
                        ann.content.toLowerCase().includes(searchTerm) ||
                        ann.id.toLowerCase().includes(searchTerm)
                    );
                }

                // Update Overview Cards
                totalAnnouncementsCard.textContent = announcementData.length; // Total count is of all announcements
                publishedAnnouncementsCard.textContent = announcementData.filter(ann => ann.status === 'Published').length;
                draftAnnouncementsCard.textContent = announcementData.filter(ann => ann.status === 'Draft').length;
                archivedAnnouncementsCard.textContent = announcementData.filter(ann => ann.status === 'Archived').length;

                overviewFilterText.textContent = `${selectedStatus} / ${selectedAudience}`;

                // Populate Announcement List Table
                announcementTableBody.innerHTML = ''; // Clear existing rows
                if (currentAnnouncements.length > 0) {
                    currentAnnouncements.forEach((announcement, index) => {
                        const row = document.createElement('tr');
                        const statusClass = announcement.status.toLowerCase(); // published, draft, archived
                        row.innerHTML = `
                            <td>${index + 1}</td>
                            <td class="announcement-info">
                                <span class="title">${announcement.title}</span>
                            </td>
                            <td>${announcement.publishDate}</td>
                            <td>${announcement.audience}</td>
                            <td class="text-center"><span class="badge bg-${statusClass}">${announcement.status}</span></td>
                            <td class="text-center">
                                <button class="btn btn-sm btn-outline-secondary me-2 view-announcement-btn" data-announcement-id="${announcement.id}"><i class="bi bi-eye"></i></button>
                                <button class="btn btn-sm btn-outline-info me-2 edit-announcement-btn" data-announcement-id="${announcement.id}"><i class="bi bi-pencil"></i></button>
                                <button class="btn btn-sm btn-outline-danger delete-announcement-btn" data-announcement-id="${announcement.id}"><i class="bi bi-trash"></i></button>
                            </td>
                        `;
                        announcementTableBody.appendChild(row);
                    });

                    // Re-attach event listeners to the new buttons
                    attachAnnouncementActionListeners(currentAnnouncements);

                } else {
                    announcementTableBody.innerHTML = `<tr><td colspan="6" class="text-center text-muted py-4">No announcement records found for this selection.</td></tr>`;
                }
            }

            // Function to attach event listeners to announcement action buttons
            function attachAnnouncementActionListeners(announcementsDisplayed) {
                announcementTableBody.querySelectorAll('.view-announcement-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const announcementId = this.dataset.announcementId;
                        const announcement = announcementsDisplayed.find(a => a.id === announcementId);
                        if (announcement) {
                            viewAnnouncementTitle.textContent = announcement.title;
                            viewAnnouncementId.textContent = announcement.id;
                            viewAnnouncementPublishDate.textContent = announcement.publishDate;
                            viewAnnouncementAudience.textContent = announcement.audience;
                            viewAnnouncementStatus.textContent = announcement.status;
                            viewAnnouncementStatus.className = `badge bg-${announcement.status.toLowerCase()}`;
                            viewAnnouncementContent.textContent = announcement.content;
                            viewAnnouncementDetailsModal.show();
                        }
                    });
                });

                announcementTableBody.querySelectorAll('.edit-announcement-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const announcementId = this.dataset.announcementId;
                        const announcement = announcementsDisplayed.find(a => a.id === announcementId);
                        if (announcement) {
                            editAnnouncementIdHidden.value = announcement.id;
                            editAnnouncementTitleDisplay.textContent = announcement.title;
                            editAnnouncementTitle.value = announcement.title;
                            editAnnouncementContent.value = announcement.content;
                            editAnnouncementAudience.value = announcement.audience;
                            editAnnouncementStatus.value = announcement.status;
                            editAnnouncementModal.show();
                        }
                    });
                });

                announcementTableBody.querySelectorAll('.delete-announcement-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        const announcementId = this.dataset.announcementId;
                        const announcement = announcementsDisplayed.find(a => a.id === announcementId);
                        if (announcement) {
                            deleteAnnouncementTitleConfirm.textContent = announcement.title;
                            deleteAnnouncementIdConfirm.textContent = announcement.id;
                            deleteAnnouncementIdHidden.value = announcement.id;
                            deleteAnnouncementModal.show();
                        }
                    });
                });
            }

            // --- Modal Form Submissions/Confirmations ---

            // Add Announcement Form Submission
            addAnnouncementForm.addEventListener('submit', function(event) {
                event.preventDefault();

                const newAnnouncement = {
                    id: generateAnnouncementId(), // Generate a unique ID
                    title: addAnnouncementTitle.value.trim(),
                    content: addAnnouncementContent.value.trim(),
                    publishDate: new Date().toISOString().slice(0, 10), // Current date
                    audience: addAnnouncementAudience.value,
                    status: addAnnouncementStatus.value,
                };

                // Basic validation for title uniqueness (optional)
                if (announcementData.some(a => a.title.toLowerCase() === newAnnouncement.title.toLowerCase())) {
                    alert('Error: An announcement with this title already exists.');
                    return;
                }

                // Simulate adding announcement to mock data
                announcementData.push(newAnnouncement);

                addAnnouncementModal.hide();
                alert(`Announcement "${newAnnouncement.title}" (ID: ${newAnnouncement.id}) created successfully.`);
                addAnnouncementForm.reset();
                updateAnnouncementsPage();
            });


            // Edit Announcement Form Submission
            editAnnouncementForm.addEventListener('submit', function(event) {
                event.preventDefault();
                const announcementIdToEdit = editAnnouncementIdHidden.value;
                const newTitle = editAnnouncementTitle.value.trim();
                const newContent = editAnnouncementContent.value.trim();
                const newAudience = editAnnouncementAudience.value;
                const newStatus = editAnnouncementStatus.value;

                // Simulate data update in mock data
                const announcementIndex = announcementData.findIndex(a => a.id === announcementIdToEdit);
                if (announcementIndex !== -1) {
                    // Check for title uniqueness if changed
                    if (newTitle.toLowerCase() !== announcementData[announcementIndex].title.toLowerCase() &&
                        announcementData.some(a => a.title.toLowerCase() === newTitle.toLowerCase() && a.id !== announcementIdToEdit)) {
                        alert('Error: An announcement with this title already exists.');
                        return;
                    }

                    announcementData[announcementIndex].title = newTitle;
                    announcementData[announcementIndex].content = newContent;
                    announcementData[announcementIndex].audience = newAudience;
                    announcementData[announcementIndex].status = newStatus;
                }

                editAnnouncementModal.hide();
                alert(`Announcement "${newTitle}" (ID: ${announcementIdToEdit}) updated successfully.`);
                updateAnnouncementsPage();
            });

            confirmDeleteAnnouncementBtn.addEventListener('click', function() {
                const announcementIdToDelete = deleteAnnouncementIdHidden.value;

                // Simulate deletion from mock data
                const initialLength = announcementData.length;
                announcementData = announcementData.filter(ann => ann.id !== announcementIdToDelete);

                if (announcementData.length < initialLength) {
                    alert(`Announcement ID: ${announcementIdToDelete} deleted successfully.`);
                } else {
                    alert(`Announcement ID: ${announcementIdToDelete} not found for deletion.`);
                }

                deleteAnnouncementModal.hide();
                updateAnnouncementsPage();
            });


            // Event listeners for filters
            announcementStatusFilter.addEventListener('change', updateAnnouncementsPage);
            announcementAudienceFilter.addEventListener('change', updateAnnouncementsPage);
            announcementSearch.addEventListener('input', updateAnnouncementsPage);

            addNewAnnouncementBtn.addEventListener('click', () => {
                addAnnouncementForm.reset();
                addAnnouncementModal.show();
            });

            // Initial call to populate page on load
            updateAnnouncementsPage();
        });