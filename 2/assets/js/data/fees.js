        document.addEventListener('DOMContentLoaded', () => {
          
            const academicYearFilter = document.getElementById('academicYearFilter');
            const semesterFilter = document.getElementById('semesterFilter');
            const feeStatusFilter = document.getElementById('feeStatusFilter');
            const studentSearch = document.getElementById('studentSearch');

            // Elements to update
            const totalPaidValue = document.getElementById('totalPaidValue');
            const totalOutstandingValue = document.getElementById('totalOutstandingValue');
            const upcomingDueValue = document.getElementById('upcomingDueValue');
            const overdueFeesValue = document.getElementById('overdueFeesValue');
            const feesTableBody = document.getElementById('feesTableBody');

            const overviewFilterText = document.getElementById('overviewFilterText');
            const feesListFilterText = document.getElementById('feesListFilterText');

            // New elements for Fee Entry Form
            const addNewFeeBtn = document.getElementById('addNewFeeBtn');
            const feeEntryFormContainer = document.getElementById('feeEntryFormContainer');
            const feeEntryForm = document.getElementById('feeEntryForm');
            const cancelFeeEntryBtn = document.getElementById('cancelFeeEntryBtn');


            // Helper function for Indian Rupee formatting
            const formatIndianRupees = (amount) => {
                return new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(amount);
            };

            // Simulated Fees Data
            const feesData = {
                '2024-2025': {
                    'Fall': {
                        overview: { totalPaid: 150000, totalOutstanding: 25000, upcomingDue: 12, overdue: 5 },
                        transactions: [
                            { studentName: 'John Doe', studentImg: 'assets/img/user/maleavatar.jpg', feeType: 'Tuition Fee', amount: 1500, dueDate: 'Oct 30, 2024', paidOn: 'Oct 10, 2024', status: 'Paid', statusClass: 'fees-status-paid', actions: ['View', 'Receipt'] },
                            { studentName: 'Jane Smith', studentImg: 'assets/img/user/femaleavatar.jpg', feeType: 'Library Fee', amount: 50, dueDate: 'Nov 15, 2024', paidOn: '-', status: 'Outstanding', statusClass: 'fees-status-outstanding', actions: ['View', 'Pay Now'] },
                            { studentName: 'Alex Green', studentImg: 'assets/img/user/maleavatar.jpg', feeType: 'Annual Fee', amount: 1000, dueDate: 'Sep 10, 2024', paidOn: '-', status: 'Overdue', statusClass: 'fees-status-overdue', actions: ['View', 'Remind'] },
                            { studentName: 'Emily White', studentImg: 'assets/img/user/femaleavatar.jpg', feeType: 'Lab Fee', amount: 100, dueDate: 'Nov 01, 2024', paidOn: 'Oct 25, 2024', status: 'Paid', statusClass: 'fees-status-paid', actions: ['View', 'Receipt'] },
                            { studentName: 'David Brown', studentImg: 'assets/img/user/maleavatar.jpg', feeType: 'Sports Fee', amount: 75, dueDate: 'Oct 20, 2024', paidOn: '-', status: 'Outstanding', statusClass: 'fees-status-outstanding', actions: ['View', 'Pay Now'] },
                            { studentName: 'Sarah Johnson', studentImg: 'assets/img/user/femaleavatar.jpg', feeType: 'Tuition Fee', amount: 1500, dueDate: 'Dec 01, 2024', paidOn: '-', status: 'Outstanding', statusClass: 'fees-status-outstanding', actions: ['View', 'Pay Now'] },
                            { studentName: 'Michael Davis', studentImg: 'assets/img/user/maleavatar.jpg', feeType: 'Annual Fee', amount: 1000, dueDate: 'Sep 10, 2024', paidOn: 'Sep 05, 2024', status: 'Paid', statusClass: 'fees-status-paid', actions: ['View', 'Receipt'] }
                        ]
                    },
                    'Spring': {
                        overview: { totalPaid: 160000, totalOutstanding: 15000, upcomingDue: 8, overdue: 2 },
                        transactions: [
                            { studentName: 'John Doe', studentImg: 'assets/img/user/maleavatar.jpg', feeType: 'Tuition Fee', amount: 1500, dueDate: 'Mar 30, 2025', paidOn: 'Mar 15, 2025', status: 'Paid', statusClass: 'fees-status-paid', actions: ['View', 'Receipt'] },
                            { studentName: 'Jane Smith', studentImg: 'assets/img/user/femaleavatar.jpg', feeType: 'Annual Fee', amount: 1000, dueDate: 'Feb 10, 2025', paidOn: '-', status: 'Overdue', statusClass: 'fees-status-overdue', actions: ['View', 'Remind'] },
                            { studentName: 'Emily White', studentImg: 'assets/img/user/femaleavatar.jpg', feeType: 'Tuition Fee', amount: 1500, dueDate: 'Apr 01, 2025', paidOn: '-', status: 'Outstanding', statusClass: 'fees-status-outstanding', actions: ['View', 'Pay Now'] }
                        ]
                    },
                    'FullYear': {
                        overview: { totalPaid: 300000, totalOutstanding: 40000, upcomingDue: 20, overdue: 7 },
                        transactions: [
                            { studentName: 'John Doe', studentImg: 'assets/img/user/maleavatar.jpg', feeType: 'Full Year Tuition', amount: 3000, dueDate: 'Aug 30, 2024', paidOn: 'Aug 20, 2024', status: 'Paid', statusClass: 'fees-status-paid', actions: ['View', 'Receipt'] },
                            { studentName: 'Jane Smith', studentImg: 'assets/img/user/femaleavatar.jpg', feeType: 'Full Year Tuition', amount: 3000, dueDate: 'Aug 30, 2024', paidOn: '-', status: 'Overdue', statusClass: 'fees-status-overdue', actions: ['View', 'Remind'] }
                        ]
                    }
                },
                '2023-2024': {
                    'Fall': {
                        overview: { totalPaid: 140000, totalOutstanding: 10000, upcomingDue: 0, overdue: 0 },
                        transactions: [
                            { studentName: 'Alice Blue', studentImg: 'assets/img/user/femaleavatar.jpg', feeType: 'Tuition Fee', amount: 1400, dueDate: 'Oct 30, 2023', paidOn: 'Oct 20, 2023', status: 'Paid', statusClass: 'fees-status-paid', actions: ['View', 'Receipt'] },
                            { studentName: 'Bob White', studentImg: 'assets/img/user/maleavatar.jpg', feeType: 'Annual Fee', amount: 900, dueDate: 'Sep 10, 2023', paidOn: 'Sep 01, 2023', status: 'Paid', statusClass: 'fees-status-paid', actions: ['View', 'Receipt'] }
                        ]
                    },
                    'Spring': {
                        overview: { totalPaid: 145000, totalOutstanding: 5000, upcomingDue: 0, overdue: 0 },
                        transactions: [
                            { studentName: 'Alice Blue', studentImg: 'assets/img/user/femaleavatar.jpg', feeType: 'Tuition Fee', amount: 1400, dueDate: 'Mar 30, 2024', paidOn: 'Mar 20, 2024', status: 'Paid', statusClass: 'fees-status-paid', actions: ['View', 'Receipt'] }
                        ]
                    },
                    'FullYear': {
                        overview: { totalPaid: 285000, totalOutstanding: 15000, upcomingDue: 0, overdue: 0 },
                        transactions: [
                             { studentName: 'Alice Blue', studentImg: 'assets/img/user/femaleavatar.jpg', feeType: 'Full Year Tuition', amount: 2800, dueDate: 'Aug 30, 2023', paidOn: 'Aug 25, 2023', status: 'Paid', statusClass: 'fees-status-paid', actions: ['View', 'Receipt'] }
                        ]
                    }
                }
            };


            // Function to apply filters and update all fees sections
            function applyFeesFilters() {
                const selectedAcademicYear = academicYearFilter.value;
                const selectedSemester = semesterFilter.value;
                const selectedFeeStatus = feeStatusFilter.value;
                const searchStudentQuery = studentSearch.value.toLowerCase();

                const data = feesData[selectedAcademicYear][selectedSemester];

                // Update Overview Cards with Rupee symbol and formatting
                totalPaidValue.textContent = formatIndianRupees(data.overview.totalPaid);
                totalOutstandingValue.textContent = formatIndianRupees(data.overview.totalOutstanding);
                upcomingDueValue.textContent = data.overview.upcomingDue;
                overdueFeesValue.textContent = data.overview.overdue;

                overviewFilterText.textContent = `${selectedAcademicYear} / ${selectedSemester}`;
                feesListFilterText.textContent = selectedFeeStatus === 'All' ? 'All Statuses' : selectedFeeStatus;

                // Update Fee Transactions Table
                feesTableBody.innerHTML = '';
                let filteredTransactions = data.transactions.filter(transaction => {
                    const statusMatch = selectedFeeStatus === 'All' || transaction.status === selectedFeeStatus;
                    const studentMatch = transaction.studentName.toLowerCase().includes(searchStudentQuery);
                    return statusMatch && studentMatch;
                });

                if (filteredTransactions.length > 0) {
                    filteredTransactions.forEach(item => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>
                                <div class="student-info">
                                    <span class="name">${item.studentName}</span>
                                </div>
                            </td>
                            <td>${item.feeType}</td>
                            <td>${formatIndianRupees(item.amount)}</td>
                            <td>${item.dueDate}</td>
                            <td>${item.paidOn}</td>
                            <td class="text-center"><span class="badge ${item.statusClass}">${item.status}</span></td>
                            <td class="text-center">
                                ${item.actions.map(action => `<button class="btn btn-outline-${action === 'Pay Now' ? 'primary' : action === 'Remind' ? 'danger' : action === 'Receipt' ? 'info' : 'secondary'} btn-sm">${action}</button>`).join(' ')}
                            </td>
                        `;
                        feesTableBody.appendChild(row);
                    });
                } else {
                     feesTableBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">No fee transactions found for the selected filters.</td></tr>`;
                }
            }

            // Event listeners for global filters
            academicYearFilter.addEventListener('change', applyFeesFilters);
            semesterFilter.addEventListener('change', applyFeesFilters);
            feeStatusFilter.addEventListener('change', applyFeesFilters);
            studentSearch.addEventListener('input', applyFeesFilters);

            // Initial filter application on page load
            applyFeesFilters();

            // Toggle Fee Entry Form visibility
            addNewFeeBtn.addEventListener('click', () => {
                feeEntryFormContainer.classList.toggle('show');
                // Optionally scroll to the form when it appears
                if (feeEntryFormContainer.classList.contains('show')) {
                    feeEntryFormContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });

            // Handle Fee Entry Form submission
            feeEntryForm.addEventListener('submit', (event) => {
                event.preventDefault(); // Prevent default form submission

                // In a real application, you would collect form data here
                const studentName = document.getElementById('studentName').value;
                const feeType = document.getElementById('feeType').value;
                const amount = document.getElementById('amount').value;
                const dueDate = document.getElementById('dueDate').value;
                const feeStatus = document.getElementById('feeStatus').value;

                console.log('New Fee Submitted:', {
                    studentName, feeType, amount, dueDate, feeStatus
                });

                // Clear the form after submission (optional)
                feeEntryForm.reset();
                // Hide the form after submission
                feeEntryFormContainer.classList.remove('show');

                // Redirect to invoice.html
                window.location.href = 'invoice.html';
            });

            // Handle Cancel button in Fee Entry Form
            cancelFeeEntryBtn.addEventListener('click', () => {
                feeEntryForm.reset(); // Clear the form
                feeEntryFormContainer.classList.remove('show'); // Hide the form
            });

            // Example for Generate Invoice button (can be linked to modals/new pages)
            document.getElementById('generateInvoiceBtn').addEventListener('click', () => {
                alert('Generate Invoice functionality coming soon!');
            });
        });