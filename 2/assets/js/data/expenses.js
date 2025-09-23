        document.addEventListener('DOMContentLoaded', () => {
           

            const academicYearFilter = document.getElementById('academicYearFilter');
            const semesterFilter = document.getElementById('semesterFilter');
            const expenseStatusFilter = document.getElementById('expenseStatusFilter');
            const vendorSearch = document.getElementById('vendorSearch');

            // Elements to update
            const totalSpentValue = document.getElementById('totalSpentValue');
            const budgetRemainingValue = document.getElementById('budgetRemainingValue');
            const pendingPaymentsValue = document.getElementById('pendingPaymentsValue');
            const overdueBillsValue = document.getElementById('overdueBillsValue');
            const expensesTableBody = document.getElementById('expensesTableBody');

            const overviewFilterText = document.getElementById('overviewFilterText');
            const expensesListFilterText = document.getElementById('expensesListFilterText');

            // Helper function for Indian Rupee formatting
            const formatIndianRupees = (amount) => {
                return new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(amount);
            };

            // Simulated Expenses Data
            let expensesData = { // Changed to 'let' to allow modification if needed, though not strictly required for this
                '2024-2025': {
                    'Fall': {
                        overview: { totalSpent: 80000, budgetRemaining: 20000, pendingPayments: 8, overdue: 3 },
                        transactions: [
                            { item: 'Office Supplies', category: 'Administration', paidTo: 'Stationery Mart', amount: 1200, paymentDate: 'Oct 12, 2024', status: 'Paid', statusClass: 'expenses-status-paid', actions: ['View', 'Receipt'] },
                            { item: 'Electricity Bill', category: 'Utilities', paidTo: 'Power Co.', amount: 8500, paymentDate: 'Nov 20, 2024', status: 'Pending', statusClass: 'expenses-status-pending', actions: ['View', 'Pay Now'] },
                            { item: 'Internet Service', category: 'Utilities', paidTo: 'ISP Ltd.', amount: 2500, paymentDate: 'Sep 05, 2024', status: 'Overdue', statusClass: 'expenses-status-overdue', actions: ['View', 'Remind'] },
                            { item: 'Teacher Salary', category: 'Payroll', paidTo: 'John Doe', amount: 45000, paymentDate: 'Oct 31, 2024', status: 'Paid', statusClass: 'expenses-status-paid', actions: ['View', 'Details'] },
                            { item: 'Sports Equipment', category: 'Facilities', paidTo: 'Sports Gear', amount: 5000, paymentDate: 'Nov 10, 2024', status: 'Pending', statusClass: 'expenses-status-pending', actions: ['View', 'Pay Now'] },
                            { item: 'Maintenance', category: 'Facilities', paidTo: 'Handy Services', amount: 3000, paymentDate: 'Oct 01, 2024', status: 'Overdue', statusClass: 'expenses-status-overdue', actions: ['View', 'Remind'] }
                        ]
                    },
                    'Spring': {
                        overview: { totalSpent: 75000, budgetRemaining: 25000, pendingPayments: 5, overdue: 1 },
                        transactions: [
                            { item: 'Textbooks', category: 'Academics', paidTo: 'Book Depot', amount: 15000, paymentDate: 'Feb 15, 2025', status: 'Paid', statusClass: 'expenses-status-paid', actions: ['View', 'Receipt'] },
                            { item: 'Water Bill', category: 'Utilities', paidTo: 'Water Works', amount: 3000, paymentDate: 'Mar 10, 2025', status: 'Pending', statusClass: 'expenses-status-pending', actions: ['View', 'Pay Now'] }
                        ]
                    },
                    'FullYear': {
                        overview: { totalSpent: 155000, budgetRemaining: 45000, pendingPayments: 13, overdue: 4 },
                        transactions: [
                            { item: 'Annual Software License', category: 'IT', paidTo: 'Software Solutions', amount: 20000, paymentDate: 'Jan 01, 2025', status: 'Paid', statusClass: 'expenses-status-paid', actions: ['View', 'Receipt'] },
                            { item: 'Security Services', category: 'Administration', paidTo: 'Guard Force', amount: 12000, paymentDate: 'Dec 15, 2024', status: 'Pending', statusClass: 'expenses-status-pending', actions: ['View', 'Pay Now'] }
                        ]
                    }
                },
                '2023-2024': {
                    'Fall': {
                        overview: { totalSpent: 70000, budgetRemaining: 15000, pendingPayments: 0, overdue: 0 },
                        transactions: [
                            { item: 'Cleaning Services', category: 'Facilities', paidTo: 'Sparkle Clean', amount: 7000, paymentDate: 'Oct 01, 2023', status: 'Paid', statusClass: 'expenses-status-paid', actions: ['View', 'Receipt'] }
                        ]
                    },
                    'Spring': {
                        overview: { totalSpent: 68000, budgetRemaining: 12000, pendingPayments: 0, overdue: 0 },
                        transactions: [
                            { item: 'Exam Printing', category: 'Academics', paidTo: 'Print Hub', amount: 4000, paymentDate: 'Mar 15, 2024', status: 'Paid', statusClass: 'expenses-status-paid', actions: ['View', 'Receipt'] }
                        ]
                    },
                    'FullYear': {
                        overview: { totalSpent: 138000, budgetRemaining: 27000, pendingPayments: 0, overdue: 0 },
                        transactions: [
                             { item: 'Annual Audit', category: 'Administration', paidTo: 'Audit & Co.', amount: 10000, paymentDate: 'Jul 30, 2024', status: 'Paid', statusClass: 'expenses-status-paid', actions: ['View', 'Receipt'] }
                        ]
                    }
                }
            };

            // This variable will hold the *currently filtered* transactions for reporting purposes
            let currentFilteredTransactions = [];


            // Function to apply filters and update all expenses sections
            function applyExpensesFilters() {
                const selectedAcademicYear = academicYearFilter.value;
                const selectedSemester = semesterFilter.value;
                const selectedExpenseStatus = expenseStatusFilter.value;
                const searchVendorQuery = vendorSearch.value.toLowerCase();

                const data = expensesData[selectedAcademicYear][selectedSemester];

                // Update Overview Cards with Rupee symbol and formatting
                totalSpentValue.textContent = formatIndianRupees(data.overview.totalSpent);
                budgetRemainingValue.textContent = formatIndianRupees(data.overview.budgetRemaining);
                pendingPaymentsValue.textContent = data.overview.pendingPayments;
                overdueBillsValue.textContent = data.overview.overdue;

                overviewFilterText.textContent = `${selectedAcademicYear} / ${selectedSemester}`;
                expensesListFilterText.textContent = selectedExpenseStatus === 'All' ? 'All Statuses' : selectedExpenseStatus;

                // Filter transactions and store them in currentFilteredTransactions
                currentFilteredTransactions = data.transactions.filter(transaction => {
                    const statusMatch = selectedExpenseStatus === 'All' || transaction.status === selectedExpenseStatus;
                    const vendorItemMatch = transaction.item.toLowerCase().includes(searchVendorQuery) || transaction.paidTo.toLowerCase().includes(searchVendorQuery);
                    return statusMatch && vendorItemMatch;
                });

                // Update Expense Transactions Table
                expensesTableBody.innerHTML = '';
                if (currentFilteredTransactions.length > 0) {
                    currentFilteredTransactions.forEach(item => {
                        const row = document.createElement('tr');
                        row.innerHTML = `
                            <td>${item.item}</td>
                            <td>${item.category}</td>
                            <td>${item.paidTo}</td>
                            <td>${formatIndianRupees(item.amount)}</td>
                            <td>${item.paymentDate}</td>
                            <td class="text-center"><span class="badge ${item.statusClass}">${item.status}</span></td>
                            <td class="text-center">
                                ${item.actions.map(action => `<button class="btn btn-outline-${action === 'Pay Now' ? 'primary' : action === 'Remind' ? 'danger' : action === 'Receipt' || action === 'Details' ? 'info' : 'secondary'} btn-sm">${action}</button>`).join(' ')}
                            </td>
                        `;
                        expensesTableBody.appendChild(row);
                    });
                } else {
                     expensesTableBody.innerHTML = `<tr><td colspan="7" class="text-center text-muted py-4">No expense transactions found for the selected filters.</td></tr>`;
                }
            }

            // Event listeners for global filters
            academicYearFilter.addEventListener('change', applyExpensesFilters);
            semesterFilter.addEventListener('change', applyExpensesFilters);
            expenseStatusFilter.addEventListener('change', applyExpensesFilters);
            vendorSearch.addEventListener('input', applyExpensesFilters);

            // Initial filter application on page load
            applyExpensesFilters();

            // Example for Add New Expense button
            document.getElementById('addNewExpenseBtn').addEventListener('click', () => {
                alert('Add New Expense functionality coming soon!'); // You can route this to a new add_expense.html page if needed
            });

            // NEW: Generate Report (Download Excel CSV)
            document.getElementById('generateReportBtn').addEventListener('click', () => {
                if (currentFilteredTransactions.length === 0) {
                    alert('No data to generate report for the current filters.');
                    return;
                }

                const headers = ["ITEM/SERVICE", "CATEGORY", "PAID TO", "AMOUNT", "PAYMENT DATE", "STATUS"];
                let csvContent = headers.map(h => `"${h}"`).join(',') + '\n'; // Add header row

                currentFilteredTransactions.forEach(transaction => {
                    const row = [
                        `"${transaction.item}"`,
                        `"${transaction.category}"`,
                        `"${transaction.paidTo}"`,
                        `${transaction.amount}`, // Use raw amount for calculation in Excel, display formatting is only visual
                        `"${transaction.paymentDate}"`,
                        `"${transaction.status}"`
                    ];
                    csvContent += row.join(',') + '\n';
                });

                const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
                const url = URL.createObjectURL(blob);
                const link = document.createElement('a');
                link.setAttribute('href', url);
                const year = academicYearFilter.value;
                const term = semesterFilter.value;
                const status = expenseStatusFilter.value;
                link.setAttribute('download', `Expenses_Report_${year}_${term}_${status}.csv`);
                document.body.appendChild(link); // Required for Firefox
                link.click();
                document.body.removeChild(link); // Clean up
                URL.revokeObjectURL(url); // Release the object URL

                alert('Expense report downloaded successfully!');
            });
        });