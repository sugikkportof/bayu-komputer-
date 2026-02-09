// ==========================================
// BAYU COMPUTER - JAVASCRIPT
// ==========================================

// Sticky Navbar on Scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        if (navMenu.classList.contains('active')) {
            navMenu.style.display = 'flex';
            navMenu.style.flexDirection = 'column';
            navMenu.style.position = 'absolute';
            navMenu.style.top = '100%';
            navMenu.style.left = '0';
            navMenu.style.width = '100%';
            navMenu.style.background = 'white';
            navMenu.style.padding = '1rem';
            navMenu.style.boxShadow = '0 4px 6px rgba(0,0,0,0.1)';
            navMenu.style.gap = '0';
        } else {
            navMenu.style.display = 'none';
        }
    });
}

// Gallery Filter
const galleryTabs = document.querySelectorAll('.gallery-tab');
const galleryItems = document.querySelectorAll('.gallery-item');

galleryTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        const category = this.dataset.category;
        
        // Update active tab
        galleryTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Filter items
        galleryItems.forEach(item => {
            if (category === 'all' || item.dataset.category === category) {
                item.style.display = 'block';
            } else {
                item.style.display = 'none';
            }
        });
    });
});

// ==========================================
// LOCAL STORAGE DATA MANAGEMENT
// ==========================================

// Initialize sample data if empty
function initializeSampleData() {
    const services = localStorage.getItem('bayuComputer_services');
    if (!services) {
        const sampleServices = [
            {
                id: 'INV001',
                branch: 'Singaraja',
                customerName: 'Made Arya',
                phone: '081234567890',
                device: 'Laptop Asus VivoBook',
                issue: 'Laptop Overheat',
                status: 'done',
                price: 75000,
                date: '2024-02-05',
                notes: 'Cleaning fan dan ganti thermal paste'
            },
            {
                id: 'INV002',
                branch: 'Singaraja',
                customerName: 'Wayan Sudi',
                phone: '081987654321',
                device: 'PC Desktop',
                issue: 'Install Windows 11',
                status: 'repairing',
                price: 150000,
                date: '2024-02-07',
                notes: 'Install Windows 11 + driver + office'
            },
            {
                id: 'INV003',
                branch: 'Denpasar',
                customerName: 'Komang Sari',
                phone: '082345678901',
                device: 'Laptop HP Pavilion',
                issue: 'Ganti LCD',
                status: 'pending',
                price: 1200000,
                date: '2024-02-08',
                notes: 'Menunggu part LCD dari supplier'
            }
        ];
        localStorage.setItem('bayuComputer_services', JSON.stringify(sampleServices));
    }

    const finances = localStorage.getItem('bayuComputer_finances');
    if (!finances) {
        const sampleFinances = [
            {
                id: 'FIN001',
                branch: 'Singaraja',
                date: '2024-02-05',
                type: 'income',
                amount: 75000,
                description: 'Service Laptop Overheat - INV001',
                category: 'service'
            },
            {
                id: 'FIN002',
                branch: 'Singaraja',
                date: '2024-02-06',
                type: 'expense',
                amount: 50000,
                description: 'Beli thermal paste & pembersih',
                category: 'supplies'
            },
            {
                id: 'FIN003',
                branch: 'Denpasar',
                date: '2024-02-07',
                type: 'income',
                amount: 200000,
                description: 'Penjualan Mouse & Keyboard',
                category: 'accessories'
            }
        ];
        localStorage.setItem('bayuComputer_finances', JSON.stringify(sampleFinances));
    }
}

// Initialize data on page load
initializeSampleData();

// ==========================================
// ORDER TRACKING
// ==========================================

function trackOrder() {
    const invoiceInput = document.getElementById('invoiceInput');
    const trackingResult = document.getElementById('trackingResult');
    const invoiceNumber = invoiceInput.value.trim().toUpperCase();

    if (!invoiceNumber) {
        trackingResult.innerHTML = `
            <div style="text-align: center; color: rgba(255,255,255,0.9);">
                <p>⚠️ Silakan masukkan nomor invoice</p>
            </div>
        `;
        trackingResult.classList.add('show');
        return;
    }

    // Get services from localStorage
    const services = JSON.parse(localStorage.getItem('bayuComputer_services') || '[]');
    const order = services.find(s => s.id === invoiceNumber);

    if (order) {
        let statusText = '';
        let statusColor = '';
        let statusIcon = '';

        switch(order.status) {
            case 'pending':
                statusText = 'Menunggu Pengerjaan';
                statusColor = '#f59e0b';
                statusIcon = '⏳';
                break;
            case 'repairing':
                statusText = 'Sedang Diperbaiki';
                statusColor = '#3b82f6';
                statusIcon = '🔧';
                break;
            case 'done':
                statusText = 'Selesai - Siap Diambil';
                statusColor = '#10b981';
                statusIcon = '✅';
                break;
        }

        trackingResult.innerHTML = `
            <div style="background: rgba(255,255,255,0.15); padding: 1.5rem; border-radius: 0.75rem; text-align: left;">
                <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem; padding-bottom: 1rem; border-bottom: 1px solid rgba(255,255,255,0.2);">
                    <div style="font-size: 2rem;">${statusIcon}</div>
                    <div>
                        <div style="font-size: 0.875rem; opacity: 0.8;">Invoice: ${order.id}</div>
                        <div style="font-size: 1.25rem; font-weight: 700; color: ${statusColor};">${statusText}</div>
                    </div>
                </div>
                <div style="display: grid; gap: 0.75rem;">
                    <div>
                        <div style="font-size: 0.875rem; opacity: 0.8;">Perangkat:</div>
                        <div style="font-weight: 600;">${order.device}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.875rem; opacity: 0.8;">Kerusakan:</div>
                        <div style="font-weight: 600;">${order.issue}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.875rem; opacity: 0.8;">Cabang:</div>
                        <div style="font-weight: 600;">${order.branch}</div>
                    </div>
                    <div>
                        <div style="font-size: 0.875rem; opacity: 0.8;">Tanggal Masuk:</div>
                        <div style="font-weight: 600;">${new Date(order.date).toLocaleDateString('id-ID', { year: 'numeric', month: 'long', day: 'numeric' })}</div>
                    </div>
                    ${order.notes ? `
                    <div>
                        <div style="font-size: 0.875rem; opacity: 0.8;">Catatan:</div>
                        <div style="font-weight: 600;">${order.notes}</div>
                    </div>
                    ` : ''}
                </div>
                <div style="margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(255,255,255,0.2); text-align: center;">
                    <a href="https://wa.me/6285738387791?text=Halo%20saya%20ingin%20tanya%20status%20${order.id}" 
                       style="color: white; text-decoration: underline; font-weight: 600;">
                       📱 Hubungi Kami untuk Info Lebih Lanjut
                    </a>
                </div>
            </div>
        `;
    } else {
        trackingResult.innerHTML = `
            <div style="text-align: center; color: rgba(255,255,255,0.9);">
                <p style="font-size: 2rem; margin-bottom: 0.5rem;">❌</p>
                <p style="font-weight: 600; margin-bottom: 0.5rem;">Invoice tidak ditemukan</p>
                <p style="font-size: 0.875rem; opacity: 0.8;">Pastikan nomor invoice yang Anda masukkan benar</p>
                <a href="https://wa.me/6285738387791?text=Halo%20saya%20ingin%20tanya%20tentang%20invoice%20${invoiceNumber}" 
                   style="display: inline-block; margin-top: 1rem; color: white; text-decoration: underline; font-weight: 600;">
                   📱 Hubungi Kami
                </a>
            </div>
        `;
    }

    trackingResult.classList.add('show');
}

// Allow Enter key to track
const invoiceInput = document.getElementById('invoiceInput');
if (invoiceInput) {
    invoiceInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            trackOrder();
        }
    });
}

// ==========================================
// ADMIN MODAL
// ==========================================

function showAdminLogin() {
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.classList.add('show');
    }
}

function closeAdminModal() {
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.classList.remove('show');
    }
}

function adminLogin() {
    const password = document.getElementById('adminPassword').value;
    if (password === 'admin123') {
        closeAdminModal();
        window.location.href = 'admin.html';
    } else {
        alert('Password salah!');
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(event) {
    const modal = document.getElementById('adminModal');
    if (event.target === modal) {
        closeAdminModal();
    }
});

// ==========================================
// ADMIN DASHBOARD (for admin.html)
// ==========================================

// Check if on admin page
if (window.location.pathname.includes('admin.html')) {
    document.addEventListener('DOMContentLoaded', initAdminDashboard);
}

function initAdminDashboard() {
    loadDashboardStats();
    loadServicesList();
    loadFinancesList();
    
    // Set up event listeners
    const serviceForm = document.getElementById('serviceForm');
    if (serviceForm) {
        serviceForm.addEventListener('submit', handleServiceSubmit);
    }
    
    const financeForm = document.getElementById('financeForm');
    if (financeForm) {
        financeForm.addEventListener('submit', handleFinanceSubmit);
    }
    
    const branchFilter = document.getElementById('branchFilter');
    if (branchFilter) {
        branchFilter.addEventListener('change', function() {
            loadServicesList();
            loadFinancesList();
            loadDashboardStats();
        });
    }
}

function loadDashboardStats() {
    const branch = document.getElementById('branchFilter')?.value || 'all';
    const services = JSON.parse(localStorage.getItem('bayuComputer_services') || '[]');
    const finances = JSON.parse(localStorage.getItem('bayuComputer_finances') || '[]');
    
    // Filter by branch
    const filteredServices = branch === 'all' ? services : services.filter(s => s.branch === branch);
    const filteredFinances = branch === 'all' ? finances : finances.filter(f => f.branch === branch);
    
    // Calculate stats
    const totalServices = filteredServices.length;
    const pendingServices = filteredServices.filter(s => s.status === 'pending').length;
    const repairingServices = filteredServices.filter(s => s.status === 'repairing').length;
    const doneServices = filteredServices.filter(s => s.status === 'done').length;
    
    const totalIncome = filteredFinances
        .filter(f => f.type === 'income')
        .reduce((sum, f) => sum + f.amount, 0);
    
    const totalExpense = filteredFinances
        .filter(f => f.type === 'expense')
        .reduce((sum, f) => sum + f.amount, 0);
    
    const profit = totalIncome - totalExpense;
    
    // Update dashboard
    const statsHTML = `
        <div class="stat-card">
            <div class="stat-number">${totalServices}</div>
            <div class="stat-label">Total Service</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${pendingServices}</div>
            <div class="stat-label">Pending</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${repairingServices}</div>
            <div class="stat-label">Dikerjakan</div>
        </div>
        <div class="stat-card">
            <div class="stat-number">${doneServices}</div>
            <div class="stat-label">Selesai</div>
        </div>
        <div class="stat-card income">
            <div class="stat-number">Rp ${totalIncome.toLocaleString('id-ID')}</div>
            <div class="stat-label">Pemasukan</div>
        </div>
        <div class="stat-card expense">
            <div class="stat-number">Rp ${totalExpense.toLocaleString('id-ID')}</div>
            <div class="stat-label">Pengeluaran</div>
        </div>
        <div class="stat-card ${profit >= 0 ? 'profit' : 'loss'}">
            <div class="stat-number">Rp ${profit.toLocaleString('id-ID')}</div>
            <div class="stat-label">${profit >= 0 ? 'Profit' : 'Loss'}</div>
        </div>
    `;
    
    const statsContainer = document.getElementById('dashboardStats');
    if (statsContainer) {
        statsContainer.innerHTML = statsHTML;
    }
}

function loadServicesList() {
    const branch = document.getElementById('branchFilter')?.value || 'all';
    const services = JSON.parse(localStorage.getItem('bayuComputer_services') || '[]');
    const filteredServices = branch === 'all' ? services : services.filter(s => s.branch === branch);
    
    const tableBody = document.getElementById('servicesTableBody');
    if (!tableBody) return;
    
    if (filteredServices.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="8" style="text-align: center; padding: 2rem; color: #64748b;">Belum ada data service</td></tr>';
        return;
    }
    
    tableBody.innerHTML = filteredServices.map(service => `
        <tr>
            <td>${service.id}</td>
            <td>${service.branch}</td>
            <td>${service.customerName}</td>
            <td>${service.device}</td>
            <td>${service.issue}</td>
            <td><span class="status-badge status-${service.status}">${getStatusText(service.status)}</span></td>
            <td>Rp ${service.price.toLocaleString('id-ID')}</td>
            <td>
                <button onclick="printReceipt('${service.id}')" class="btn-action">🖨️ Print</button>
                <button onclick="deleteService('${service.id}')" class="btn-action btn-danger">🗑️</button>
            </td>
        </tr>
    `).join('');
}

function loadFinancesList() {
    const branch = document.getElementById('branchFilter')?.value || 'all';
    const finances = JSON.parse(localStorage.getItem('bayuComputer_finances') || '[]');
    const filteredFinances = branch === 'all' ? finances : finances.filter(f => f.branch === branch);
    
    const tableBody = document.getElementById('financesTableBody');
    if (!tableBody) return;
    
    if (filteredFinances.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align: center; padding: 2rem; color: #64748b;">Belum ada data keuangan</td></tr>';
        return;
    }
    
    tableBody.innerHTML = filteredFinances.map(finance => `
        <tr>
            <td>${finance.date}</td>
            <td>${finance.branch}</td>
            <td><span class="finance-badge finance-${finance.type}">${finance.type === 'income' ? 'Pemasukan' : 'Pengeluaran'}</span></td>
            <td>${finance.description}</td>
            <td class="${finance.type === 'income' ? 'text-success' : 'text-danger'}">Rp ${finance.amount.toLocaleString('id-ID')}</td>
            <td>
                <button onclick="deleteFinance('${finance.id}')" class="btn-action btn-danger">🗑️</button>
            </td>
        </tr>
    `).join('');
}

function handleServiceSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const services = JSON.parse(localStorage.getItem('bayuComputer_services') || '[]');
    
    const newService = {
        id: generateInvoiceNumber(),
        branch: formData.get('branch'),
        customerName: formData.get('customerName'),
        phone: formData.get('phone'),
        device: formData.get('device'),
        issue: formData.get('issue'),
        status: formData.get('status'),
        price: parseInt(formData.get('price')),
        date: formData.get('date'),
        notes: formData.get('notes')
    };
    
    services.push(newService);
    localStorage.setItem('bayuComputer_services', JSON.stringify(services));
    
    // Add to finance if done
    if (newService.status === 'done') {
        const finances = JSON.parse(localStorage.getItem('bayuComputer_finances') || '[]');
        finances.push({
            id: 'FIN' + Date.now(),
            branch: newService.branch,
            date: newService.date,
            type: 'income',
            amount: newService.price,
            description: `Service ${newService.device} - ${newService.id}`,
            category: 'service'
        });
        localStorage.setItem('bayuComputer_finances', JSON.stringify(finances));
    }
    
    e.target.reset();
    loadServicesList();
    loadDashboardStats();
    loadFinancesList();
    
    alert(`✅ Service berhasil ditambahkan!\nInvoice: ${newService.id}`);
}

function handleFinanceSubmit(e) {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const finances = JSON.parse(localStorage.getItem('bayuComputer_finances') || '[]');
    
    const newFinance = {
        id: 'FIN' + Date.now(),
        branch: formData.get('financeBranch'),
        date: formData.get('financeDate'),
        type: formData.get('financeType'),
        amount: parseInt(formData.get('financeAmount')),
        description: formData.get('financeDescription'),
        category: formData.get('financeCategory')
    };
    
    finances.push(newFinance);
    localStorage.setItem('bayuComputer_finances', JSON.stringify(finances));
    
    e.target.reset();
    loadFinancesList();
    loadDashboardStats();
    
    alert('✅ Data keuangan berhasil ditambahkan!');
}

function generateInvoiceNumber() {
    const services = JSON.parse(localStorage.getItem('bayuComputer_services') || '[]');
    const lastNumber = services.length > 0 
        ? Math.max(...services.map(s => parseInt(s.id.replace('INV', '')))) 
        : 0;
    return 'INV' + String(lastNumber + 1).padStart(3, '0');
}

function getStatusText(status) {
    const statusMap = {
        'pending': 'Pending',
        'repairing': 'Dikerjakan',
        'done': 'Selesai'
    };
    return statusMap[status] || status;
}

function printReceipt(invoiceId) {
    const services = JSON.parse(localStorage.getItem('bayuComputer_services') || '[]');
    const service = services.find(s => s.id === invoiceId);
    
    if (!service) {
        alert('Invoice tidak ditemukan!');
        return;
    }
    
    const printWindow = window.open('', '_blank');
    printWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Receipt - ${service.id}</title>
            <style>
                body { font-family: 'Courier New', monospace; padding: 20px; max-width: 400px; margin: 0 auto; }
                .header { text-align: center; border-bottom: 2px dashed #000; padding-bottom: 10px; margin-bottom: 10px; }
                .row { display: flex; justify-content: space-between; margin: 5px 0; }
                .total { border-top: 2px dashed #000; padding-top: 10px; margin-top: 10px; font-weight: bold; }
                @media print { body { padding: 0; } }
            </style>
        </head>
        <body>
            <div class="header">
                <h2>BAYU COMPUTER</h2>
                <p>Jl. Pahlawan No.45, Singaraja<br>WA: 0857-3838-7791</p>
            </div>
            <div class="row"><span>Invoice:</span><span>${service.id}</span></div>
            <div class="row"><span>Tanggal:</span><span>${new Date(service.date).toLocaleDateString('id-ID')}</span></div>
            <div class="row"><span>Cabang:</span><span>${service.branch}</span></div>
            <div style="border-top: 1px dashed #000; margin: 10px 0;"></div>
            <div class="row"><span>Pelanggan:</span><span>${service.customerName}</span></div>
            <div class="row"><span>Telepon:</span><span>${service.phone}</span></div>
            <div class="row"><span>Perangkat:</span><span>${service.device}</span></div>
            <div class="row"><span>Kerusakan:</span><span>${service.issue}</span></div>
            <div class="row"><span>Status:</span><span>${getStatusText(service.status)}</span></div>
            ${service.notes ? `<div class="row"><span>Catatan:</span><span>${service.notes}</span></div>` : ''}
            <div class="total">
                <div class="row"><span>TOTAL:</span><span>Rp ${service.price.toLocaleString('id-ID')}</span></div>
            </div>
            <div style="text-align: center; margin-top: 20px; font-size: 12px;">
                <p>Terima kasih atas kepercayaan Anda!</p>
                <p>Garansi service sesuai ketentuan</p>
            </div>
            <script>
                window.onload = function() { window.print(); }
            </script>
        </body>
        </html>
    `);
    printWindow.document.close();
}

function deleteService(invoiceId) {
    if (!confirm('Yakin ingin menghapus service ini?')) return;
    
    const services = JSON.parse(localStorage.getItem('bayuComputer_services') || '[]');
    const filtered = services.filter(s => s.id !== invoiceId);
    localStorage.setItem('bayuComputer_services', JSON.stringify(filtered));
    
    loadServicesList();
    loadDashboardStats();
    
    alert('✅ Service berhasil dihapus!');
}

function deleteFinance(financeId) {
    if (!confirm('Yakin ingin menghapus data keuangan ini?')) return;
    
    const finances = JSON.parse(localStorage.getItem('bayuComputer_finances') || '[]');
    const filtered = finances.filter(f => f.id !== financeId);
    localStorage.setItem('bayuComputer_finances', JSON.stringify(filtered));
    
    loadFinancesList();
    loadDashboardStats();
    
    alert('✅ Data keuangan berhasil dihapus!');
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
