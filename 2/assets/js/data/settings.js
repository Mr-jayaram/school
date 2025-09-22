    document.addEventListener('DOMContentLoaded', () => {
        // --- Specific logic for Students Class Promotions tab ---
        const promotionForm = document.getElementById('promotionForm');
        const previewPromotionsBtn = document.getElementById('previewPromotions');
        const promotionResultsDiv = document.getElementById('promotionResults');
        const promotionResultsList = promotionResultsDiv.querySelector('.list-group'); // Select the ul element

        // Dummy student data for preview
        const dummyStudents = [
            { id: 1, name: 'Student A', currentClass: 'Grade 3' },
            { id: 2, name: 'Student B', currentClass: 'Grade 3' },
            { id: 3, name: 'Student C', currentClass: 'Grade 3' },
            { id: 4, name: 'Student D', currentClass: 'Grade 3' },
            { id: 5, name: 'Student E', currentClass: 'Grade 3' },
        ];

        previewPromotionsBtn.addEventListener('click', () => {
            const currentYear = document.getElementById('currentAcademicYear').value;
            const targetYear = document.getElementById('targetAcademicYear').value;
            const currentClass = document.getElementById('currentClass').value;
            const targetClass = document.getElementById('targetClass').value;

            if (!currentYear || !targetYear || !currentClass || !targetClass) {
                alert('Please select all academic years and classes for preview.');
                return;
            }

            // Simulate fetching students based on currentClass and currentYear
            const eligibleStudents = dummyStudents.filter(s => s.currentClass === currentClass);

            promotionResultsList.innerHTML = ''; // Clear previous results
            if (eligibleStudents.length > 0) {
                eligibleStudents.forEach(student => {
                    const listItem = document.createElement('li');
                    listItem.classList.add('list-group-item');
                    listItem.textContent = `${student.name} - Current: ${student.currentClass}, Promote to: ${targetClass}`;
                    promotionResultsList.appendChild(listItem);
                });
            } else {
                const listItem = document.createElement('li');
                listItem.classList.add('list-group-item', 'text-muted');
                listItem.textContent = 'No eligible students found for this class in the current academic year.';
                promotionResultsList.appendChild(listItem);
            }

            promotionResultsDiv.style.display = 'block'; // Show the preview section
        });


        promotionForm.addEventListener('submit', (event) => {
            event.preventDefault(); // Prevent actual form submission

            const currentYear = document.getElementById('currentAcademicYear').value;
            const targetYear = document.getElementById('targetAcademicYear').value;
            const currentClass = document.getElementById('currentClass').value;
            const targetClass = document = document.getElementById('targetClass').value;
            const criteria = document.getElementById('promotionCriteria').value;

            if (confirm(`Are you sure you want to promote students from ${currentClass} (${currentYear}) to ${targetClass} (${targetYear})?`)) {
                // In a real application, this is where you'd send an AJAX request to your backend
                // to perform the actual database update for student promotions.
                console.log('Promoting students with the following settings:', {
                    currentYear,
                    targetYear,
                    currentClass,
                    targetClass,
                    criteria
                });

                alert(`Students from ${currentClass} (${currentYear}) successfully promoted to ${targetClass} (${targetYear})!`);
                promotionResultsDiv.style.display = 'none'; // Hide preview after promotion
                promotionForm.reset(); // Reset form
            }
        });
    });