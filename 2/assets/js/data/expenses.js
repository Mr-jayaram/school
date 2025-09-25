        document.addEventListener('DOMContentLoaded', () => {
            const academicYearFilter = document.getElementById('academicYearFilter');
            const semesterFilter = document.getElementById('semesterFilter');
            const expenseStatusFilter = document.getElementById('expenseStatusFilter');
            const vendorSearch = document.getElementById('vendorSearch');

            const totalSpentValue = document.getElementById('totalSpentValue');
            const budgetRemainingValue = document.getElementById('budgetRemainingValue');
            const pendingPaymentsValue = document.getElementById('pendingPaymentsValue');
            const overdueBillsValue = document.getElementById('overdueBillsValue');
            const expensesTableBody = document.getElementById('expensesTableBody');

            const overviewFilterText = document.getElementById('overviewFilterText');
            const expensesListFilterText = document.getElementById('expensesListFilterText');

            // Modal elements
            const addExpenseModalElement = document.getElementById('addExpenseModal');
            const addExpenseModal = new bootstrap.Modal(addExpenseModalElement);
            const addExpenseForm = document.getElementById('addExpenseForm');
            const expenseItemInput = document.getElementById('expenseItem');
            const expenseCategoryInput = document.getElementById('expenseCategory');
            const expensePaidToInput = document.getElementById('expensePaidTo');
            const expenseAmountInput = document.getElementById('expenseAmount');
            const expensePaymentDateInput = document.getElementById('expensePaymentDate');
            const expenseStatusSelect = document.getElementById('expenseStatus');

            const formatIndianRupees = (amount) => {
                return new Intl.NumberFormat('en-IN', {
                    style: 'currency',
                    currency: 'INR',
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0
                }).format(amount);
            };

            let expensesData = {
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
                    }
                    // FullYear will be calculated dynamically
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
                    }
                    // FullYear will be calculated dynamically
                }
            };

            let currentFilteredTransactions = [];

            // Function to get or calculate data based on academic year and semester
            function getFilteredData(academicYear, semester) {
                if (semester === 'FullYear') {
                    const fallData = expensesData[academicYear] && expensesData[academicYear]['Fall'];
                    const springData = expensesData[academicYear] && expensesData[academicYear]['Spring'];

                    const combinedTransactions = [...(fallData ? fallData.transactions : []), ...(springData ? springData.transactions : [])];

                    // Sum overview values, handle cases where Fall/Spring might not exist or be empty
                    const totalSpent = (fallData?.overview.totalSpent || 0) + (springData?.overview.totalSpent || 0);
                    // Budget remaining aggregation might be complex; for simplicity, summing, but could be year-level budget
                    const budgetRemaining = (fallData?.overview.budgetRemaining || 0) + (springData?.overview.budgetRemaining || 0);
                    const pendingPayments = (fallData?.overview.pendingPayments || 0) + (springData?.overview.pendingPayments || 0);
                    const overdue = (fallData?.overview.overdue || 0) + (springData?.overview.overdue || 0);

                    return {
                        overview: { totalSpent, budgetRemaining, pendingPayments, overdue },
                        transactions: combinedTransactions
                    };
                } else {
                    // Ensure the academic year and semester exist before returning
                    if (expensesData[academicYear] && expensesData[academicYear][semester]) {
                        return expensesData[academicYear][semester];
                    } else {
                        // Return default empty structure if data is not found
                        return { overview: { totalSpent: 0, budgetRemaining: 0, pendingPayments: 0, overdue: 0 }, transactions: [] };
                    }
                }
            }

            function applyExpensesFilters() {
                const selectedAcademicYear = academicYearFilter.value;
                const selectedSemester = semesterFilter.value;
                const selectedExpenseStatus = expenseStatusFilter.value;
                const searchVendorQuery = vendorSearch.value.toLowerCase();

                const data = getFilteredData(selectedAcademicYear, selectedSemester);

                totalSpentValue.textContent = formatIndianRupees(data.overview.totalSpent);
                budgetRemainingValue.textContent = formatIndianRupees(data.overview.budgetRemaining);
                pendingPaymentsValue.textContent = data.overview.pendingPayments;
                overdueBillsValue.textContent = data.overview.overdue;

                overviewFilterText.textContent = `${selectedAcademicYear} / ${selectedSemester}`;
                expensesListFilterText.textContent = selectedExpenseStatus === 'All' ? 'All Statuses' : selectedExpenseStatus;

                currentFilteredTransactions = data.transactions.filter(transaction => {
                    const statusMatch = selectedExpenseStatus === 'All' || transaction.status === selectedExpenseStatus;
                    const vendorItemMatch = transaction.item.toLowerCase().includes(searchVendorQuery) || transaction.paidTo.toLowerCase().includes(searchVendorQuery);
                    return statusMatch && vendorItemMatch;
                });

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

            academicYearFilter.addEventListener('change', applyExpensesFilters);
            semesterFilter.addEventListener('change', applyExpensesFilters);
            expenseStatusFilter.addEventListener('change', applyExpensesFilters);
            vendorSearch.addEventListener('input', applyExpensesFilters);

            applyExpensesFilters(); // Initial filter application

            // Event listener for "Add New Expense" button to open the modal
            document.getElementById('addNewExpenseBtn').addEventListener('click', () => {
                addExpenseForm.reset(); // Clear any previous values
                expensePaymentDateInput.value = new Date().toISOString().slice(0, 10); // Set default date to today
                addExpenseModal.show();
            });

            // Handle form submission for adding a new expense
            addExpenseForm.addEventListener('submit', (event) => {
                event.preventDefault();

                const newItem = expenseItemInput.value;
                const newCategory = expenseCategoryInput.value;
                const newPaidTo = expensePaidToInput.value;
                const newAmount = parseFloat(expenseAmountInput.value);
                const newPaymentDate = new Date(expensePaymentDateInput.value).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
                const newStatus = expenseStatusSelect.value;

                if (!newItem || !newCategory || !newPaidTo || isNaN(newAmount) || newAmount <= 0 || !expensePaymentDateInput.value) { // Check raw input value for date
                    alert('Please fill in all required fields with valid data.');
                    return;
                }

                let statusClass = '';
                let actions = ['View'];
                if (newStatus === 'Paid') {
                    statusClass = 'expenses-status-paid';
                    actions.push('Receipt');
                } else if (newStatus === 'Pending') {
                    statusClass = 'expenses-status-pending';
                    actions.push('Pay Now');
                } else if (newStatus === 'Overdue') {
                    statusClass = 'expenses-status-overdue';
                    actions.push('Remind');
                }

                const newExpense = {
                    item: newItem,
                    category: newCategory,
                    paidTo: newPaidTo,
                    amount: newAmount,
                    paymentDate: newPaymentDate,
                    status: newStatus,
                    statusClass: statusClass,
                    actions: actions
                };

                const selectedAcademicYear = academicYearFilter.value;
                const selectedSemester = semesterFilter.value;

                // Ensure the academic year and semester objects exist
                if (!expensesData[selectedAcademicYear]) {
                    expensesData[selectedAcademicYear] = {};
                }
                if (!expensesData[selectedAcademicYear][selectedSemester]) {
                    expensesData[selectedAcademicYear][selectedSemester] = {
                        overview: { totalSpent: 0, budgetRemaining: 0, pendingPayments: 0, overdue: 0 },
                        transactions: []
                    };
                }

                expensesData[selectedAcademicYear][selectedSemester].transactions.unshift(newExpense);

                // Update overview statistics for the specific semester
                expensesData[selectedAcademicYear][selectedSemester].overview.totalSpent += newAmount;
                if (newStatus === 'Pending') {
                    expensesData[selectedAcademicYear][selectedSemester].overview.pendingPayments += 1;
                } else if (newStatus === 'Overdue') {
                    expensesData[selectedAcademicYear][selectedSemester].overview.overdue += 1;
                }
                // BudgetRemaining would need a specific budget setting to be accurately updated here or managed separately.

                applyExpensesFilters(); // Re-apply filters to show the new expense and updated overview
                addExpenseModal.hide();
                alert('New expense added successfully!');
            });

            document.getElementById('generateReportBtn').addEventListener('click', () => {
                if (currentFilteredTransactions.length === 0) {
                    alert('No data to generate report for the current filters.');
                    return;
                }

                const headers = ["ITEM/SERVICE", "CATEGORY", "PAID TO", "AMOUNT", "PAYMENT DATE", "STATUS"];
                let csvContent = headers.map(h => `"${h}"`).join(',') + '\n';

                currentFilteredTransactions.forEach(transaction => {
                    const row = [
                        `"${transaction.item}"`,
                        `"${transaction.category}"`,
                        `"${transaction.paidTo}"`,
                        `${transaction.amount}`,
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
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(url);

                alert('Expense report downloaded successfully!');
            });
        });