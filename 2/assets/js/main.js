    // --- Sidebar and Layout Logic ---
        const menuToggleItems = document.querySelectorAll('.sidebar .menu-item-toggle.has-submenu');
        const allNavItems = document.querySelectorAll('.sidebar .menu-item, .sidebar .submenu-item');
        const sidebar = document.getElementById('sidebar');
        const menuToggleButton = document.getElementById('menuToggle');
        const sidebarOverlay = document.getElementById('sidebarOverlay');
        // desktopSidebarToggle is not present in this HTML, so it will be null.
        const desktopSidebarToggle = document.getElementById('desktopSidebarToggle'); 

        function closeAllSubmenus(exceptSubmenu = null) {
            document.querySelectorAll('.sidebar .submenu.show').forEach(submenu => {
                if (submenu !== exceptSubmenu) {
                    submenu.style.maxHeight = '0';
                    submenu.classList.remove('show');
                    const parentToggle = submenu.previousElementSibling;
                    if (parentToggle) {
                        parentToggle.classList.remove('open');
                    }
                }
            });
        }

        menuToggleItems.forEach(item => {
            item.addEventListener('click', (event) => {
                event.preventDefault();
                const submenu = item.nextElementSibling;
                if (!sidebar.classList.contains('sidebar-collapsed') || window.innerWidth < 992) {
                    closeAllSubmenus(submenu);
                    if (submenu && submenu.classList.contains('submenu')) {
                        item.classList.toggle('open');
                        if (submenu.classList.contains('show')) {
                            submenu.style.maxHeight = '0';
                            submenu.classList.remove('show');
                        } else {
                            submenu.style.maxHeight = submenu.scrollHeight + 'px';
                            submenu.classList.add('show');
                        }
                    }
                }
            });
        });

        allNavItems.forEach(item => {
            item.addEventListener('click', (event) => {
                // Remove active class from all items first
                document.querySelectorAll('.sidebar .menu-item, .sidebar .submenu-item').forEach(mi => mi.classList.remove('active'));
                // Add active class to the clicked item or its parent menu-item
                (item.closest('.menu-item') || item).classList.add('active');

                if (item.classList.contains('submenu-item')) {
                    // If a submenu item is clicked, ensure its parent submenu and toggle are open
                    const parentSubmenu = item.closest('.submenu');
                    if (parentSubmenu) {
                        parentSubmenu.style.maxHeight = parentSubmenu.scrollHeight + 'px';
                        parentSubmenu.classList.add('show');
                        const parentToggle = parentSubmenu.previousElementSibling;
                        if (parentToggle && parentToggle.classList.contains('menu-item-toggle')) {
                            parentToggle.classList.add('open');
                        }
                    }
                } else {
                    // If a top-level menu item without a submenu is clicked (and sidebar is not collapsed), close all other submenus
                    if (!item.classList.contains('has-submenu') && !sidebar.classList.contains('sidebar-collapsed')) {
                        closeAllSubmenus();
                    }
                }

                // --- FIX FOR MOBILE SIDEBAR CLOSING ---
                // Only close the sidebar on mobile if the clicked item is NOT a submenu toggle.
                // If it's a submenu item (a "final" link) or a top-level link without a submenu, close the sidebar.
                if (window.innerWidth < 992 && sidebar.classList.contains('sidebar-show')) {
                    const isSubmenuToggle = item.classList.contains('menu-item-toggle');
                    if (!isSubmenuToggle) { // If it's not a menu-item-toggle, then close the sidebar
                        sidebar.classList.remove('sidebar-show');
                        sidebarOverlay.classList.remove('overlay-active');
                    }
                }
            });
        });

        // Handle initially active item to ensure its submenu is open if applicable
        const initiallyActiveItem = document.querySelector('.sidebar .menu-item.active, .sidebar .submenu-item.active');
        if (initiallyActiveItem) {
            // Corrected typo: inituallyActiveItem.classList.contains -> initiallyActiveItem.classList.contains
            if (initiallyActiveItem.classList.contains('submenu-item')) { 
                const parentSubmenu = initiallyActiveItem.closest('.submenu');
                if (parentSubmenu) {
                    parentSubmenu.style.maxHeight = parentSubmenu.scrollHeight + 'px';
                    parentSubmenu.classList.add('show');
                    const parentToggle = parentSubmenu.previousElementSibling;
                    if (parentToggle && parentToggle.classList.contains('menu-item-toggle')) {
                        parentToggle.classList.add('open');
                    }
                }
            }
        }

        // --- Mobile Menu Toggle (Hamburger Icon) Functionality ---
        menuToggleButton.addEventListener('click', () => {
            // This toggles the 'sidebar-show' class which makes the sidebar visible/hidden on mobile
            sidebar.classList.toggle('sidebar-show');
            sidebarOverlay.classList.toggle('overlay-active');
            
            // When sidebar is shown on mobile, ensure it's not in a collapsed state
            if (sidebar.classList.contains('sidebar-show')) {
                sidebar.classList.remove('sidebar-collapsed');
                document.body.classList.remove('sidebar-collapsed-active');
            }
        });

        sidebarOverlay.addEventListener('click', () => {
            sidebar.classList.remove('sidebar-show');
            sidebarOverlay.classList.remove('overlay-active');
        });

        // Desktop sidebar toggle logic (if it exists)
        if (desktopSidebarToggle) {
            desktopSidebarToggle.addEventListener('click', () => {
                const isCollapsed = sidebar.classList.toggle('sidebar-collapsed');
                document.body.classList.toggle('sidebar-collapsed-active', isCollapsed);
                if (isCollapsed) {
                    closeAllSubmenus();
                }
            });
        }


        const handleResize = () => {
            if (window.innerWidth >= 992) {
                // If switching to desktop view, hide mobile sidebar if open
                if (sidebar.classList.contains('sidebar-show')) {
                    sidebar.classList.remove('sidebar-show');
                    sidebarOverlay.classList.remove('overlay-active');
                }
                // Apply desktop collapsed state if applicable
                if (sidebar.classList.contains('sidebar-collapsed')) {
                    document.body.classList.add('sidebar-collapsed-active');
                } else {
                    document.body.classList.remove('sidebar-collapsed-active');
                }
                // Show desktop toggle if it exists
                if (desktopSidebarToggle) desktopSidebarToggle.classList.remove('d-none');
            } else {
                // If switching to mobile view, ensure desktop collapsed state is off
                sidebar.classList.remove('sidebar-collapsed');
                document.body.classList.remove('sidebar-collapsed-active');
                // Hide desktop toggle if it exists
                if (desktopSidebarToggle) desktopSidebarToggle.classList.add('d-none');
            }
            // Recalculate submenu height on resize to prevent issues if content changed
            document.querySelectorAll('.sidebar .submenu.show').forEach(submenu => {
                submenu.style.maxHeight = submenu.scrollHeight + 'px';
            });
        };

        window.addEventListener('resize', handleResize);
        handleResize(); // Initial call to set correct state based on current window size


   
         document.addEventListener('DOMContentLoaded', function() {
    // === Profile Dropdown Logic (Existing) ===
    const profileDropdownToggle = document.getElementById('profileDropdownToggle');
    const customProfileDropdownMenu = document.getElementById('customProfileDropdownMenu');

    if (profileDropdownToggle && customProfileDropdownMenu) {
        profileDropdownToggle.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            customProfileDropdownMenu.classList.toggle('show');
            // Close notification dropdown if open
            customNotificationDropdownMenu.classList.remove('show');
        });
    }

    // === Notification Dropdown Logic (NEW) ===
    const notificationBell = document.getElementById('notificationBell');
    const customNotificationDropdownMenu = document.getElementById('customNotificationDropdownMenu');
    const notificationList = document.getElementById('notificationList');
    const unreadToggle = document.getElementById('unreadToggle');

    if (notificationBell && customNotificationDropdownMenu && notificationList && unreadToggle) {
        notificationBell.addEventListener('click', function(event) {
            event.preventDefault();
            event.stopPropagation();
            customNotificationDropdownMenu.classList.toggle('show');
            // Close profile dropdown if open
            customProfileDropdownMenu.classList.remove('show');
        });

        // Toggle "Show Unread" functionality
        unreadToggle.addEventListener('change', function() {
            const notifications = notificationList.querySelectorAll('.notification-item');
            notifications.forEach(item => {
                if (unreadToggle.checked) {
                    // If toggle is ON, show only unread items
                    if (!item.classList.contains('unread')) {
                        item.style.display = 'none';
                    } else {
                        item.style.display = 'flex'; // Ensure unread are visible
                    }
                } else {
                    // If toggle is OFF, show all items
                    item.style.display = 'flex'; // Reset to default display
                }
            });
            // Update badge (optional, based on actual unread count logic)
            // For now, just a visual toggle.
        });
    }


    // === Close dropdowns when clicking anywhere outside (combined logic) ===
    document.addEventListener('click', function(event) {
        // Close profile dropdown
        if (customProfileDropdownMenu && !profileDropdownToggle.contains(event.target) && !customProfileDropdownMenu.contains(event.target)) {
            customProfileDropdownMenu.classList.remove('show');
        }

        // Close notification dropdown
        if (customNotificationDropdownMenu && !notificationBell.contains(event.target) && !customNotificationDropdownMenu.contains(event.target)) {
            customNotificationDropdownMenu.classList.remove('show');
        }
    });

    // Optional: Close dropdowns on Escape key press (combined logic)
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            if (customProfileDropdownMenu) {
                customProfileDropdownMenu.classList.remove('show');
            }
            if (customNotificationDropdownMenu) {
                customNotificationDropdownMenu.classList.remove('show');
            }
        }
    });

    // Your existing main.js code can continue below this.
    // ...
});

    