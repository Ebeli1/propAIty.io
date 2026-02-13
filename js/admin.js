// Simple authentication check (for demo only)
// In production, this would be server-side authentication
function checkAdminAccess() {
    const isAdmin = sessionStorage.getItem('isAdmin') === 'true';
    
    if (!isAdmin && !window.location.href.includes('login')) {
        // Redirect to login or show access denied
        const proceed = confirm('Admin access required. Click OK to continue as demo admin.');
        if (proceed) {
            sessionStorage.setItem('isAdmin', 'true');
        } else {
            window.location.href = 'index.html';
        }
    }
}

// Call this at the beginning
document.addEventListener('DOMContentLoaded', function() {
    checkAdminAccess();
    initializeAdminPanel();
});

// Admin Panel Functionality

let usersData = [];
let selectedUsers = new Set();
let currentAction = null;

document.addEventListener('DOMContentLoaded', function() {
    initializeAdminPanel();
});

function initializeAdminPanel() {
    // Initialize sidebar navigation
    initializeSidebar();
    
    // Load sample data
    loadSampleData();
    
    // Initialize DataTable
    initializeDataTable();
    
    // Setup event listeners
    setupEventListeners();
    
    // Update current time
    updateCurrentTime();
    setInterval(updateCurrentTime, 60000); // Update every minute
}

function initializeSidebar() {
    const navItems = document.querySelectorAll('.nav-item');
    
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all items
            navItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Show corresponding section
            const targetId = this.getAttribute('href').substring(1);
            showSection(targetId);
        });
    });
}

function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.admin-section').forEach(section => {
        section.classList.remove('active');
    });
    
    // Show target section
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        targetSection.classList.add('active');
    }
}

function loadSampleData() {
    // Sample user data
    usersData = [
        {
            id: 1,
            name: "John Smith",
            email: "john.smith@realty.com",
            phone: "+1 (555) 123-4567",
            role: "agent",
            city: "New York",
            signupDate: "2024-01-15",
            status: "approved",
            lastLogin: "2024-02-20 14:30"
        },
        {
            id: 2,
            name: "Sarah Johnson",
            email: "sarah@luxuryhomes.com",
            phone: "+1 (555) 987-6543",
            role: "agent",
            city: "Los Angeles",
            signupDate: "2024-02-10",
            status: "pending",
            lastLogin: "2024-02-19 09:15"
        },
        {
            id: 3,
            name: "Michael Brown",
            email: "michael@properties.co",
            phone: "+1 (555) 456-7890",
            role: "landlord",
            city: "Chicago",
            signupDate: "2024-02-18",
            status: "pending",
            lastLogin: "2024-02-20 16:45"
        },
        {
            id: 4,
            name: "Emily Davis",
            email: "emily@davisestates.com",
            phone: "+1 (555) 234-5678",
            role: "agent",
            city: "Miami",
            signupDate: "2024-01-28",
            status: "approved",
            lastLogin: "2024-02-19 11:20"
        },
        {
            id: 5,
            name: "Robert Wilson",
            email: "rwilson@devgroup.com",
            phone: "+1 (555) 345-6789",
            role: "developer",
            city: "Austin",
            signupDate: "2024-02-05",
            status: "rejected",
            lastLogin: "2024-02-10 10:00"
        },
        {
            id: 6,
            name: "Jennifer Lee",
            email: "jennifer@leehomes.com",
            phone: "+1 (555) 876-5432",
            role: "agent",
            city: "Seattle",
            signupDate: "2024-02-12",
            status: "pending",
            lastLogin: "2024-02-19 15:30"
        },
        {
            id: 7,
            name: "David Miller",
            email: "david@millerproperties.com",
            phone: "+1 (555) 765-4321",
            role: "landlord",
            city: "Denver",
            signupDate: "2024-02-15",
            status: "approved",
            lastLogin: "2024-02-20 08:45"
        },
        {
            id: 8,
            name: "Lisa Taylor",
            email: "lisa@taylorrealty.com",
            phone: "+1 (555) 654-3210",
            role: "agent",
            city: "Boston",
            signupDate: "2024-01-20",
            status: "approved",
            lastLogin: "2024-02-20 13:15"
        }
    ];
    
    // Update stats
    updateStats();
    
    // Populate recent signups table
    populateRecentSignups();
    
    // Populate export history
    populateExportHistory();
}

function updateStats() {
    const total = usersData.length;
    const pending = usersData.filter(u => u.status === 'pending').length;
    const approved = usersData.filter(u => u.status === 'approved').length;
    const conversionRate = approved > 0 ? Math.round((approved / total) * 100) : 0;
    
    document.getElementById('totalSignups').textContent = total;
    document.getElementById('pendingReview').textContent = pending;
    document.getElementById('approvedAgents').textContent = approved;
    document.getElementById('conversionRate').textContent = conversionRate + '%';
    
    // Update badges
    document.getElementById('pendingCount').textContent = pending;
    document.getElementById('pendingBadge').textContent = pending;
}

function populateRecentSignups() {
    const tableBody = document.getElementById('recentSignupsBody');
    if (!tableBody) return;
    
    // Sort by date (newest first) and take first 5
    const recent = [...usersData]
        .sort((a, b) => new Date(b.signupDate) - new Date(a.signupDate))
        .slice(0, 5);
    
    tableBody.innerHTML = recent.map(user => `
        <tr>
            <td>${user.name}</td>
            <td>${user.email}</td>
            <td>
                <span class="role-badge ${user.role}">
                    ${user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
            </td>
            <td>${formatDate(user.signupDate)}</td>
            <td>
                <span class="status-badge status-${user.status}">
                    ${user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                </span>
            </td>
            <td>
                <div class="table-actions">
                    <div class="action-icon view" onclick="viewUserDetail(${user.id})">
                        <i class="fas fa-eye"></i>
                    </div>
                    <div class="action-icon edit" onclick="editUser(${user.id})">
                        <i class="fas fa-edit"></i>
                    </div>
                </div>
            </td>
        </tr>
    `).join('');
}

function initializeDataTable() {
    if ($.fn.DataTable.isDataTable('#usersTable')) {
        $('#usersTable').DataTable().destroy();
    }
    
    const table = $('#usersTable').DataTable({
        data: usersData,
        columns: [
            {
                data: null,
                render: function(data, type, row) {
                    return `<input type="checkbox" class="user-checkbox" data-id="${row.id}">`;
                },
                orderable: false
            },
            { data: 'id' },
            { data: 'name' },
            { data: 'email' },
            { data: 'phone' },
            { 
                data: 'role',
                render: function(data) {
                    return `<span class="role-badge ${data}">${data.charAt(0).toUpperCase() + data.slice(1)}</span>`;
                }
            },
            { data: 'city' },
            { 
                data: 'signupDate',
                render: function(data) {
                    return formatDate(data);
                }
            },
            { 
                data: 'status',
                render: function(data) {
                    return `<span class="status-badge status-${data}">${data.charAt(0).toUpperCase() + data.slice(1)}</span>`;
                }
            },
            {
                data: null,
                render: function(data, type, row) {
                    return `
                        <div class="table-actions">
                            <div class="action-icon view" onclick="viewUserDetail(${row.id})">
                                <i class="fas fa-eye"></i>
                            </div>
                            <div class="action-icon edit" onclick="editUser(${row.id})">
                                <i class="fas fa-edit"></i>
                            </div>
                            <div class="action-icon delete" onclick="deleteUser(${row.id})">
                                <i class="fas fa-trash"></i>
                            </div>
                        </div>
                    `;
                },
                orderable: false
            }
        ],
        pageLength: 10,
        responsive: true,
        dom: 'Bfrtip',
        buttons: [
            {
                extend: 'copy',
                text: '<i class="fas fa-copy"></i> Copy',
                className: 'btn btn-outline'
            },
            {
                extend: 'csv',
                text: '<i class="fas fa-file-csv"></i> CSV',
                className: 'btn btn-outline'
            },
            {
                extend: 'excel',
                text: '<i class="fas fa-file-excel"></i> Excel',
                className: 'btn btn-outline'
            },
            {
                extend: 'pdf',
                text: '<i class="fas fa-file-pdf"></i> PDF',
                className: 'btn btn-outline'
            }
        ],
        initComplete: function() {
            // Add event listener to select all checkbox
            $('#selectAll').on('click', function() {
                const isChecked = this.checked;
                $('.user-checkbox').prop('checked', isChecked);
                updateSelectedUsers();
            });
            
            // Add event listener to individual checkboxes
            $('#usersTable tbody').on('change', '.user-checkbox', function() {
                updateSelectedUsers();
            });
        }
    });
    
    // Apply filters
    $('#applyFiltersBtn').on('click', function() {
        applyFilters();
    });
    
    $('#clearFiltersBtn').on('click', function() {
        clearFilters();
    });
    
    // Search functionality
    $('#userSearch').on('keyup', function() {
        table.search(this.value).draw();
    });
}

function applyFilters() {
    const statusFilter = $('#statusFilter').val();
    const roleFilter = $('#roleFilter').val();
    const startDate = $('#startDate').val();
    const endDate = $('#endDate').val();
    
    // You would implement actual filtering logic here
    // For now, just show a message
    showToast(`Filters applied: Status=${statusFilter}, Role=${roleFilter}, Date=${startDate} to ${endDate}`, 'info');
}

function clearFilters() {
    $('#statusFilter').val('all');
    $('#roleFilter').val('all');
    $('#startDate').val('');
    $('#endDate').val('');
    showToast('All filters cleared', 'info');
}

function updateSelectedUsers() {
    selectedUsers.clear();
    
    $('.user-checkbox:checked').each(function() {
        const userId = parseInt($(this).data('id'));
        selectedUsers.add(userId);
    });
    
    const count = selectedUsers.size;
    const selectAll = $('#selectAll');
    
    // Update select all checkbox state
    if (count === 0) {
        selectAll.prop('checked', false);
        selectAll.prop('indeterminate', false);
    } else if (count === usersData.length) {
        selectAll.prop('checked', true);
        selectAll.prop('indeterminate', false);
    } else {
        selectAll.prop('checked', false);
        selectAll.prop('indeterminate', true);
    }
    
    // Update bulk actions UI
    const bulkActions = document.getElementById('bulkActions');
    const selectedCount = document.querySelector('.selected-count');
    
    if (count > 0) {
        bulkActions.style.display = 'flex';
        selectedCount.textContent = `${count} user${count === 1 ? '' : 's'} selected`;
    } else {
        bulkActions.style.display = 'none';
    }
}

function setupEventListeners() {
    // Quick action buttons
    document.getElementById('exportLeadsBtn')?.addEventListener('click', exportAllLeads);
    document.getElementById('reviewPendingBtn')?.addEventListener('click', reviewPending);
    document.getElementById('sendBulkEmailBtn')?.addEventListener('click', sendBulkEmail);
    document.getElementById('addManualUserBtn')?.addEventListener('click', showAddUserModal);
    
    // Bulk action buttons
    document.getElementById('bulkApproveBtn')?.addEventListener('click', () => bulkAction('approve'));
    document.getElementById('bulkRejectBtn')?.addEventListener('click', () => bulkAction('reject'));
    document.getElementById('bulkExportBtn')?.addEventListener('click', bulkExport);
    document.getElementById('bulkDeleteBtn')?.addEventListener('click', () => bulkAction('delete'));
    
    // Export buttons
    document.getElementById('exportCSVBtn')?.addEventListener('click', () => exportData('csv'));
    document.getElementById('exportExcelBtn')?.addEventListener('click', () => exportData('excel'));
    document.getElementById('exportJSONBtn')?.addEventListener('click', () => exportData('json'));
    document.getElementById('customExportBtn')?.addEventListener('click', customExport);
    
    // Add user modal
    document.getElementById('addUserBtn')?.addEventListener('click', showAddUserModal);
    document.getElementById('addUserForm')?.addEventListener('submit', handleAddUser);
    
    // Modal close buttons
    document.querySelectorAll('.modal-close, .cancel-btn').forEach(btn => {
        btn.addEventListener('click', closeAllModals);
    });
    
    // Confirmation modal
    document.getElementById('confirmCancelBtn')?.addEventListener('click', closeAllModals);
    document.getElementById('confirmActionBtn')?.addEventListener('click', confirmAction);
}

function viewUserDetail(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    
    const modalContent = document.getElementById('userDetailContent');
    if (!modalContent) return;
    
    modalContent.innerHTML = `
        <h2>User Details</h2>
        <div class="user-detail-grid">
            <div class="detail-group">
                <label>Name:</label>
                <p>${user.name}</p>
            </div>
            <div class="detail-group">
                <label>Email:</label>
                <p>${user.email}</p>
            </div>
            <div class="detail-group">
                <label>Phone:</label>
                <p>${user.phone}</p>
            </div>
            <div class="detail-group">
                <label>Role:</label>
                <p><span class="role-badge ${user.role}">${user.role.charAt(0).toUpperCase() + user.role.slice(1)}</span></p>
            </div>
            <div class="detail-group">
                <label>City:</label>
                <p>${user.city}</p>
            </div>
            <div class="detail-group">
                <label>Signup Date:</label>
                <p>${formatDate(user.signupDate)}</p>
            </div>
            <div class="detail-group">
                <label>Status:</label>
                <p><span class="status-badge status-${user.status}">${user.status.charAt(0).toUpperCase() + user.status.slice(1)}</span></p>
            </div>
            <div class="detail-group">
                <label>Last Login:</label>
                <p>${user.lastLogin || 'Never'}</p>
            </div>
        </div>
        <div class="detail-actions">
            <button class="btn btn-primary" onclick="editUser(${user.id})">
                <i class="fas fa-edit"></i> Edit User
            </button>
            <button class="btn btn-outline" onclick="changeUserStatus(${user.id}, '${user.status === 'approved' ? 'reject' : 'approve'}')">
                <i class="fas fa-${user.status === 'approved' ? 'times' : 'check'}"></i>
                ${user.status === 'approved' ? 'Reject' : 'Approve'}
            </button>
        </div>
    `;
    
    showModal('userDetailModal');
}

function editUser(userId) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    
    // For now, just show a message
    showToast(`Edit user: ${user.name} (ID: ${userId})`, 'info');
}

function deleteUser(userId) {
    currentAction = {
        type: 'delete',
        userId: userId,
        message: `Are you sure you want to delete user #${userId}? This action cannot be undone.`
    };
    
    showConfirmationModal(currentAction.message);
}

function changeUserStatus(userId, action) {
    const user = usersData.find(u => u.id === userId);
    if (!user) return;
    
    const newStatus = action === 'approve' ? 'approved' : 'rejected';
    currentAction = {
        type: 'status',
        userId: userId,
        newStatus: newStatus,
        message: `Are you sure you want to ${action} ${user.name}?`
    };
    
    showConfirmationModal(currentAction.message);
}

function bulkAction(action) {
    if (selectedUsers.size === 0) {
        showToast('Please select users first', 'error');
        return;
    }
    
    const count = selectedUsers.size;
    currentAction = {
        type: 'bulk_' + action,
        userIds: Array.from(selectedUsers),
        message: `Are you sure you want to ${action} ${count} user${count === 1 ? '' : 's'}?`
    };
    
    showConfirmationModal(currentAction.message);
}

function exportAllLeads() {
    exportData('excel');
}

function reviewPending() {
    // Show users section with pending filter
    document.querySelector('.nav-item[href="#users"]').click();
    $('#statusFilter').val('pending');
    applyFilters();
}

function sendBulkEmail() {
    showToast('Bulk email feature would open email composer', 'info');
}

function showAddUserModal() {
    showModal('addUserModal');
}

function handleAddUser(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const newUser = {
        id: usersData.length + 1,
        name: formData.get('name'),
        email: formData.get('email'),
        phone: formData.get('phone') || '',
        role: formData.get('role'),
        city: formData.get('city') || '',
        signupDate: new Date().toISOString().split('T')[0],
        status: formData.get('status'),
        lastLogin: null
    };
    
    usersData.push(newUser);
    updateStats();
    populateRecentSignups();
    
    // Reinitialize DataTable with new data
    initializeDataTable();
    
    closeAllModals();
    showToast('User added successfully', 'success');
    e.target.reset();
}

function exportData(format) {
    let data = usersData;
    let filename = `propAIty_users_${formatDate(new Date().toISOString().split('T')[0], 'file')}.${format}`;
    
    switch(format) {
        case 'csv':
            exportToCSV(data, filename);
            break;
        case 'excel':
            exportToExcel(data, filename);
            break;
        case 'json':
            exportToJSON(data, filename);
            break;
    }
    
    addExportHistory(filename, format, data.length);
}

function customExport() {
    const format = document.getElementById('exportFormat').value;
    exportData(format);
}

function exportToCSV(data, filename) {
    const headers = ['Name', 'Email', 'Phone', 'Role', 'City', 'Signup Date', 'Status'];
    const csvContent = [
        headers.join(','),
        ...data.map(row => [
            `"${row.name}"`,
            `"${row.email}"`,
            `"${row.phone}"`,
            `"${row.role}"`,
            `"${row.city}"`,
            `"${row.signupDate}"`,
            `"${row.status}"`
        ].join(','))
    ].join('\n');
    
    downloadFile(csvContent, filename, 'text/csv');
}

function exportToExcel(data, filename) {
    // Simplified Excel export (in real app, use a library like SheetJS)
    const csvContent = exportToCSV(data, filename.replace('.xlsx', '.csv'));
    showToast('Excel export would use SheetJS library in production', 'info');
}

function exportToJSON(data, filename) {
    const jsonContent = JSON.stringify(data, null, 2);
    downloadFile(jsonContent, filename, 'application/json');
}

function downloadFile(content, filename, mimeType) {
    const blob = new Blob([content], { type: mimeType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    showToast(`File downloaded: ${filename}`, 'success');
}

function addExportHistory(filename, format, recordCount) {
    const tableBody = document.getElementById('exportHistoryBody');
    if (!tableBody) return;
    
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${filename}</td>
        <td>${format.toUpperCase()}</td>
        <td>${formatDate(new Date().toISOString().split('T')[0])}</td>
        <td>${recordCount}</td>
        <td>
            <button class="btn btn-outline btn-sm" onclick="downloadAgain('${filename}', '${format}')">
                <i class="fas fa-download"></i>
            </button>
        </td>
    `;
    
    tableBody.prepend(row);
}

function populateExportHistory() {
    // Add some sample export history
    const sampleExports = [
        { filename: 'users_2024_02_15.csv', format: 'csv', date: '2024-02-15', records: 45 },
        { filename: 'agents_2024_02_10.xlsx', format: 'excel', date: '2024-02-10', records: 28 },
        { filename: 'all_data_2024_02_01.json', format: 'json', date: '2024-02-01', records: 120 }
    ];
    
    const tableBody = document.getElementById('exportHistoryBody');
    if (!tableBody) return;
    
    tableBody.innerHTML = sampleExports.map(exp => `
        <tr>
            <td>${exp.filename}</td>
            <td>${exp.format.toUpperCase()}</td>
            <td>${formatDate(exp.date)}</td>
            <td>${exp.records}</td>
            <td>
                <button class="btn btn-outline btn-sm" onclick="downloadAgain('${exp.filename}', '${exp.format}')">
                    <i class="fas fa-download"></i>
                </button>
            </td>
        </tr>
    `).join('');
}

function downloadAgain(filename, format) {
    showToast(`Would re-download: ${filename}`, 'info');
}

function showConfirmationModal(message) {
    document.getElementById('confirmationMessage').textContent = message;
    showModal('confirmationModal');
}

function confirmAction() {
    if (!currentAction) return;
    
    switch(currentAction.type) {
        case 'delete':
            usersData = usersData.filter(u => u.id !== currentAction.userId);
            showToast('User deleted successfully', 'success');
            break;
            
        case 'status':
            const user = usersData.find(u => u.id === currentAction.userId);
            if (user) {
                user.status = currentAction.newStatus;
                showToast(`User ${currentAction.newStatus} successfully`, 'success');
            }
            break;
            
        case 'bulk_approve':
        case 'bulk_reject':
        case 'bulk_delete':
            const newStatus = currentAction.type.includes('approve') ? 'approved' : 
                            currentAction.type.includes('reject') ? 'rejected' : null;
            
            usersData = usersData.filter(user => {
                if (currentAction.userIds.includes(user.id)) {
                    if (newStatus) {
                        user.status = newStatus;
                        return true;
                    }
                    return false; // Delete
                }
                return true;
            });
            
            const actionText = newStatus ? newStatus : 'deleted';
            showToast(`${currentAction.userIds.length} users ${actionText}`, 'success');
            break;
    }
    
    // Update UI
    updateStats();
    populateRecentSignups();
    initializeDataTable();
    closeAllModals();
    currentAction = null;
}

function showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
}

function closeAllModals() {
    document.querySelectorAll('.modal').forEach(modal => {
        modal.classList.add('hidden');
    });
    document.body.style.overflow = 'auto';
    currentAction = null;
}

function updateCurrentTime() {
    const now = new Date();
    const timeString = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: true 
    });
    const dateString = now.toLocaleDateString('en-US', {
        weekday: 'short',
        month: 'short',
        day: 'numeric'
    });
    
    document.getElementById('currentTime').textContent = `${dateString} at ${timeString}`;
}

function formatDate(dateString, type = 'display') {
    if (!dateString) return 'N/A';
    
    if (type === 'file') {
        return dateString.replace(/-/g, '_');
    }
    
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showToast(message, type = 'info') {
    // Reuse toast function from login.js or create a simple one
    alert(`${type.toUpperCase()}: ${message}`);
}

// Make functions available globally
window.viewUserDetail = viewUserDetail;
window.editUser = editUser;
window.deleteUser = deleteUser;
window.changeUserStatus = changeUserStatus;
window.downloadAgain = downloadAgain;