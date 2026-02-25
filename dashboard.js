/**
 * KasuApp - Dashboard Script
 * Wannan file din yana kula da dukkan ayyukan dashboard.
 */

document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. SIDEBAR TOGGLE ---
    // Yana bada damar budewa da rufe gefen menu
    const sidebar = document.getElementById('sidebar');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');

    if (menuIcon && sidebar) {
        menuIcon.addEventListener('click', () => {
            sidebar.classList.add('active');
        });
    }

    if (closeIcon && sidebar) {
        closeIcon.addEventListener('click', () => {
            sidebar.classList.remove('active');
        });
    }

    // --- 2. SALES CHART (Jadawalin Ciniki) ---
    // Muna amfani da Chart.js don nuna yadda kasuwanci yake tafiya
    const salesCtx = document.getElementById('salesChart');
    if (salesCtx) {
        new Chart(salesCtx, {
            type: 'bar', // Ko 'line' idan kafi so
            data: {
                labels: ['Lit', 'Tal', 'Lar', 'Alh', 'Jim', 'Asa', 'Lah'],
                datasets: [{
                    label: 'Kudin Shiga (₦)',
                    data: [5000, 12000, 8000, 15000, 20000, 18000, 25000],
                    backgroundColor: '#4e73df',
                    borderRadius: 5
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false
            }
        });
    }

    // --- 3. RECENT ORDERS (Jerin Kasuwanci) ---
    // Misalin yadda ake saka bayanai a cikin table kai tsaye
    const orderTableBody = document.querySelector('#orders-table tbody');
    const orders = [
        { id: '#101', abokin_ciniki: 'Aliyu Musa', kudi: '₦5,500', yanayi: 'An biya' },
        { id: '#102', abokin_ciniki: 'Zainab Lawal', kudi: '₦12,000', yanayi: 'Tana hanya' },
        { id: '#103', abokin_ciniki: 'Ibrahim Sani', kudi: '₦3,200', yanayi: 'An soke' }
    ];

    if (orderTableBody) {
        orderTableBody.innerHTML = orders.map(order => `
            <tr>
                <td>${order.id}</td>
                <td>${order.abokin_ciniki}</td>
                <td>${order.kudi}</td>
                <td><span class="status ${order.yanayi.toLowerCase()}">${order.yanayi}</span></td>
            </tr>
        `).join('');
    }

    // --- 4. LOGOUT ALERT ---
    const logoutBtn = document.getElementById('logout');
    if (logoutBtn) {
        logoutBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const confirmLogout = confirm("Kana son fita daga KasuApp?");
            if (confirmLogout) {
                // Anan zaka sa link din login page dinka
                window.location.href = "login.html";
            }
        });
    }
});

/**
 * KasuApp Pro - Dashboard Core Script
 */

// 1. Kula da canza shafuka (Navigation Logic)
function goPage(page) {
    // A halin yanzu, wannan zai tura ka zuwa file din shafin da ka danna
    // Misali: idan ka danna 'stocks', zai kai ka 'stocks.html'
    window.location.href = `${page}.html`;
}

// 2. Sidebar Toggle (Na Waya/Mobile)
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// 3. Kula da lissafin Dashboard idan shafi ya gama load
document.addEventListener('DOMContentLoaded', () => {
    
    // Misalin bayanan da za su fito daga Database/Localstorage
    const dashboardData = {
        totalProducts: 45,
        maxProducts: 100,
        todaySales: 12500.50,
        totalProfit: 4200.00,
        inventoryValue: 155000.00,
        lowStockItems: [] // Jerin kayan da suka kusa karewa
    };

    // --- Sabunta UI (UI Update) ---
    
    // Total Items
    const productEl = document.getElementById('totalProducts');
    if (productEl) productEl.innerText = dashboardData.totalProducts;

    // Today's Sales
    const salesEl = document.getElementById('todaySales');
    if (salesEl) salesEl.innerText = `₦${dashboardData.todaySales.toLocaleString()}`;

    // Total Profit
    const profitEl = document.getElementById('totalProfit');
    if (profitEl) profitEl.innerText = `₦${dashboardData.totalProfit.toLocaleString()}`;

    // Store Value
    const inventoryEl = document.getElementById('inventoryValue');
    if (inventoryEl) inventoryEl.innerText = `₦${dashboardData.inventoryValue.toLocaleString()}`;

    // Sidebar Usage Stats
    const usageProducts = document.getElementById('usageProducts');
    const usageSales = document.getElementById('usageSales');
    
    if (usageProducts) usageProducts.innerText = `${dashboardData.totalProducts}/${dashboardData.maxProducts}`;
    if (usageSales) usageSales.innerText = `₦${dashboardData.todaySales.toLocaleString()}`;

    // --- Low Stock Alert Logic ---
    const alertDiv = document.getElementById('lowStockAlert');
    if (alertDiv) {
        if (dashboardData.lowStockItems.length > 0) {
            alertDiv.innerHTML = `<p style="color: #e74c3c;">⚠️ Warning: ${dashboardData.lowStockItems.length} items are low in stock!</p>`;
            alertDiv.classList.add('warning'); // Zaka iya saka style din warning a CSS
        } else {
            alertDiv.innerHTML = `<p>✅ All items are in good stock.</p>`;
        }
    }

    // Rufe sidebar idan aka danna ko ina a "main-content" (na mobile)
    const mainContent = document.getElementById('main-content');
    mainContent.addEventListener('click', () => {
        const sidebar = document.getElementById('sidebar');
        if (sidebar.classList.contains('active')) {
            sidebar.classList.remove('active');
        }
    });
});

/**
 * KasuApp - Categories & General Logic
 */

// 1. Navigation Function
function goPage(page) {
    window.location.href = `${page}.html`;
}

// 2. Load Categories from LocalStorage
// Muna amfani da localStorage don bayanan su zauna a memory
let categories = JSON.parse(localStorage.getItem('kasu_categories')) || [];

// 3. Function to Add Category
function addCategory() {
    const catInput = document.getElementById('catName');
    const catName = catInput.value.trim();

    if (catName === "") {
        alert("Don Allah rubuta sunan rukunin kaya (Category)!");
        return;
    }

    // Duba idan rukunin ya riga ya kasance
    const exists = categories.some(c => c.name.toLowerCase() === catName.toLowerCase());
    if (exists) {
        alert("Wannan rukunin ya riga ya kasance!");
        return;
    }

    // Saka sabon rukuni
    const newCat = {
        id: Date.now(),
        name: catName
    };

    categories.push(newCat);
    saveAndRefresh();
    catInput.value = ""; // Share input box din
}

// 4. Function to Display Categories in Table
function displayCategories() {
    const tableBody = document.getElementById('catTableBody');
    const noCatMsg = document.getElementById('noCatMsg');

    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (categories.length === 0) {
        noCatMsg.style.display = "block";
    } else {
        noCatMsg.style.display = "none";
        categories.forEach((cat) => {
            const row = `
                <tr>
                    <td>${cat.name}</td>
                    <td style="text-align: right;">
                        <button onclick="deleteCategory(${cat.id})" 
                                style="background:#ff4757; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">
                            🗑️ Delete
                        </button>
                    </td>
                </tr>
            `;
            tableBody.innerHTML += row;
        });
    }
}

// 5. Function to Delete Category
function deleteCategory(id) {
    if (confirm("Shin kana da tabbacin kana son goge wannan rukunin?")) {
        categories = categories.filter(cat => cat.id !== id);
        saveAndRefresh();
    }
}

// 6. Save to LocalStorage and Update UI
function saveAndRefresh() {
    localStorage.setItem('kasu_categories', JSON.stringify(categories));
    displayCategories();
}

// Tabbatar shafin ya nuna data idan an bude
document.addEventListener('DOMContentLoaded', () => {
    displayCategories();
});

/** * KASUAPP - CUSTOMER MANAGEMENT LOGIC
 */

// 1. Load data daga LocalStorage
let customers = JSON.parse(localStorage.getItem('kasu_customers')) || [];

// 2. Function na saka sabon Customer
function addCustomer() {
    const nameInput = document.getElementById('custName');
    const phoneInput = document.getElementById('custPhone');
    
    const name = nameInput.value.trim();
    const phone = phoneInput.value.trim();

    if (name === "" || phone === "") {
        alert("Don Allah cike sunan customer da lambar waya!");
        return;
    }

    // Kirkirar sabon customer object
    const newCustomer = {
        id: Date.now(),
        name: name,
        phone: phone,
        dateAdded: new Date().toLocaleDateString()
    };

    // Adana bayanan
    customers.push(newCustomer);
    saveAndRefreshCustomers();

    // Share input boxes
    nameInput.value = "";
    phoneInput.value = "";
    alert("An ajiye sunan " + name + " nasara!");
}

// 3. Nuna jerin Customers a Table
function displayCustomers() {
    const tableBody = document.getElementById('customerBody');
    if (!tableBody) return;

    tableBody.innerHTML = "";

    if (customers.length === 0) {
        tableBody.innerHTML = `<tr><td colspan="3" style="text-align:center; padding:20px; color:#888;">Baka da abokan ciniki a rajista tukuna.</td></tr>`;
        return;
    }

    customers.forEach((cust) => {
        const row = `
            <tr>
                <td>${cust.name}</td>
                <td>${cust.phone}</td>
                <td style="text-align: right;">
                    <button onclick="deleteCustomer(${cust.id})" 
                            style="background:#ff4757; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">
                        🗑️
                    </button>
                    <a href="tel:${cust.phone}" style="text-decoration:none; background:#2ecc71; color:white; padding:5px 10px; border-radius:5px; margin-left:5px;">📞</a>
                </td>
            </tr>
        `;
        tableBody.innerHTML += row;
    });
}

// 4. Gogewa (Delete Customer)
function deleteCustomer(id) {
    if (confirm("Kana son goge wannan abokin cinikin?")) {
        customers = customers.filter(cust => cust.id !== id);
        saveAndRefreshCustomers();
    }
}

// 5. Ajiye a LocalStorage
function saveAndRefreshCustomers() {
    localStorage.setItem('kasu_customers', JSON.stringify(customers));
    displayCustomers();
}

// Kira aikin display idan an bude shafin
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('customerBody')) {
        displayCustomers();
    }
});

/**
 * KASUAPP - SALES HISTORY LOGIC
 */

// 1. Dauko bayanan ciniki daga LocalStorage
let salesHistory = JSON.parse(localStorage.getItem('kasu_sales')) || [];

// 2. Nuna Tarihin Ciniki a Table
function displayHistory() {
    const historyBody = document.getElementById('historyBody');
    const noData = document.getElementById('noData');

    if (!historyBody) return;

    historyBody.innerHTML = "";

    if (salesHistory.length === 0) {
        noData.style.display = "block";
        return;
    }

    noData.style.display = "none";

    // Muna jera su daga na kusa (reverse) don tsohon ciniki ya koma kasa
    [...salesHistory].reverse().forEach((sale) => {
        const row = `
            <tr>
                <td>${sale.productName}</td>
                <td>₦${parseFloat(sale.amount).toLocaleString()}</td>
                <td style="color: #2ecc71; font-weight: bold;">₦${parseFloat(sale.profit).toLocaleString()}</td>
                <td style="font-size: 12px; color: #666;">${sale.date}</td>
            </tr>
        `;
        historyBody.innerHTML += row;
    });
}

// 3. Function na goge duk wani tarihi (Clear History)
function clearHistory() {
    if (confirm("Shin kana da tabbacin kana son goge dukkan tarihin ciniki? Wannan aikin ba zai gyaru ba!")) {
        localStorage.removeItem('kasu_sales');
        salesHistory = [];
        displayHistory();
        alert("An goge tarihin ciniki nasara.");
    }
}

// Tabbatar an nuna data idan shafi ya tashi
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('historyBody')) {
        displayHistory();
    }
});

/**
 * KASUAPP - PROFILE & STORE SETTINGS LOGIC
 */

// 1. Function na loda bayanan shago (Load Store Info)
function loadStoreProfile() {
    const storeNameDisplay = document.getElementById('storeNameDisplay');
    const userEmail = document.getElementById('userEmail');

    // Muna dauko bayanan ne daga localStorage
    // Idan babu komai, zamu bada default values
    let appName = localStorage.getItem('appName') || 'KasuApp Store';
    let appEmail = localStorage.getItem('appEmail') || 'mai-kanti@kasuapp.com';

    if (storeNameDisplay) {
        storeNameDisplay.innerText = appName;
    }
    
    if (userEmail) {
        userEmail.innerText = appEmail;
    }
    
    // Sabunta Logo a Sidebar idan yana nan
    const sidebarLogo = document.getElementById('sidebarLogo');
    if (sidebarLogo) sidebarLogo.innerText = appName;
}

// 2. Function na fita (Logout)
function logout() {
    if (confirm("Shin kana da tabbacin kana son fita daga KasuApp?")) {
        // Zaka iya goge session idan kana amfani da shi
        sessionStorage.removeItem('isLoggedIn');
        window.location.href = 'login.html';
    }
}

// 3. Tabbatar dukkan shafuka suna amfani da sunan shago daya
function applyAppName() {
    let appName = localStorage.getItem('appName') || 'KasuApp';
    const mainLogos = document.querySelectorAll('.logo, #mainLogo');
    
    mainLogos.forEach(logo => {
        logo.innerText = appName;
    });
}

// Kira ayyukan idan shafi ya gama loda kansa
document.addEventListener('DOMContentLoaded', () => {
    applyAppName();
    if (document.getElementById('storeNameDisplay')) {
        loadStoreProfile();
    }
});

/**
 * KASUAPP - BUSINESS REPORTS LOGIC
 */

function generateReport() {
    // 1. Dauko dukkan ciniki daga LocalStorage
    const allSales = JSON.parse(localStorage.getItem('kasu_sales')) || [];
    
    // 2. Initialize counters
    let monthlySales = 0;
    let totalProfit = 0;
    let productPerformance = {}; // Don gano wane kaya aka fi saya

    // Samun kwanan wata na yanzu (don lissafin wata daya)
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();

    allSales.forEach(sale => {
        const saleDate = new Date(sale.date);
        
        // Lissafin Kudin Shiga na Wannan Watan
        if (saleDate.getMonth() === currentMonth && saleDate.getFullYear() === currentYear) {
            monthlySales += parseFloat(sale.amount);
        }

        // Jimillar Riba (Total Profit)
        totalProfit += parseFloat(sale.profit);

        // Kididdigar Kayan da aka fi saye
        if (productPerformance[sale.productName]) {
            productPerformance[sale.productName] += 1;
        } else {
            productPerformance[sale.productName] = 1;
        }
    });

    // 3. Sabunta UI (Displaying the data)
    const repMonthlySales = document.getElementById('repMonthlySales');
    const repTotalProfit = document.getElementById('repTotalProfit');
    const repSalesCount = document.getElementById('repSalesCount');
    const topProductsList = document.getElementById('topProductsList');

    if (repMonthlySales) repMonthlySales.innerText = `₦${monthlySales.toLocaleString()}`;
    if (repTotalProfit) repTotalProfit.innerText = `₦${totalProfit.toLocaleString()}`;
    if (repSalesCount) repSalesCount.innerText = allSales.length;

    // 4. Fitar da Top Selling Products
    if (topProductsList) {
        if (allSales.length === 0) {
            topProductsList.innerHTML = `<p style="color: #888;">Babu bayanai tukunna.</p>`;
            return;
        }

        // Juya object din zuwa array sannan ayi sorting
        const sortedProducts = Object.entries(productPerformance)
            .sort((a, b) => b[1] - a[1]) // Daga mafi yawa zuwa kasa
            .slice(0, 5); // Dauki guda 5 na farko

        topProductsList.innerHTML = sortedProducts.map(([name, count]) => `
            <div style="display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee;">
                <span>${name}</span>
                <span style="font-weight: 600; color: #2575fc;">${count} Sales</span>
            </div>
        `).join('');
    }
}

/**
 * KASUAPP - NEW SALE & RECEIPT LOGIC
 */

// 1. Loda jerin kaya don Autocomplete
function loadProductList() {
    const products = JSON.parse(localStorage.getItem('kasu_stocks')) || [];
    const list = document.getElementById('productsList');
    if (!list) return;

    list.innerHTML = products.map(p => `<option value="${p.name}">`).join('');
}

// 2. Loda jerin Customers a Select Box
function loadCustomersInSale() {
    const customers = JSON.parse(localStorage.getItem('kasu_customers')) || [];
    const select = document.getElementById('saleCustomer');
    if (!select) return;

    customers.forEach(cust => {
        const opt = document.createElement('option');
        opt.value = cust.name;
        opt.text = cust.name;
        select.appendChild(opt);
    });
}

// 3. Cike kudi kai tsaye idan an zabi suna (Autofill)
function autoFillDetails() {
    const products = JSON.parse(localStorage.getItem('kasu_stocks')) || [];
    const nameInput = document.getElementById('itemName').value;
    const priceInput = document.getElementById('sellingPrice');
    const costInput = document.getElementById('costPrice');

    const item = products.find(p => p.name.toLowerCase() === nameInput.toLowerCase());
    if (item) {
        priceInput.value = item.sellingPrice;
        costInput.value = item.costPrice;
    }
}

// 4. Sarrafa Ciniki (Process Sale)
function processSale() {
    const item = document.getElementById('itemName').value;
    const sPrice = parseFloat(document.getElementById('sellingPrice').value);
    const cPrice = parseFloat(document.getElementById('costPrice').value) || 0;
    const qty = parseInt(document.getElementById('quantity').value);
    const customer = document.getElementById('saleCustomer').value;

    if (!item || isNaN(sPrice)) {
        alert("Don Allah shigar da sunan kaya da farashi!");
        return;
    }

    const totalAmount = sPrice * qty;
    const totalProfit = (sPrice - cPrice) * qty;

    // Ajiye a History
    const sales = JSON.parse(localStorage.getItem('kasu_sales')) || [];
    const newSale = {
        productName: item,
        amount: totalAmount,
        profit: totalProfit,
        qty: qty,
        customer: customer,
        date: new Date().toLocaleString()
    };

    sales.push(newSale);
    localStorage.setItem('kasu_sales', JSON.stringify(sales));

    // Nuna Risit
    showReceipt(newSale);
}

// 5. Logic na Risit (Receipt Modal)
function showReceipt(sale) {
    const appName = localStorage.getItem('appName') || 'KasuApp';
    document.getElementById('receiptStoreName').innerText = appName;
    document.getElementById('receiptDate').innerText = sale.date;
    document.getElementById('receiptItem').innerText = sale.productName;
    document.getElementById('receiptQty').innerText = sale.qty;
    document.getElementById('receiptPrice').innerText = `₦${(sale.amount / sale.qty).toLocaleString()}`;
    document.getElementById('receiptTotal').innerText = `₦${sale.amount.toLocaleString()}`;

    document.getElementById('receiptModal').style.display = 'flex';
}

function closeReceipt() {
    document.getElementById('receiptModal').style.display = 'none';
    window.location.reload(); // Don share komai bayan an gama
}

function printReceipt() {
    window.print();
}

/**
 * KASUAPP - SETTINGS, BACKUP & RESTORE LOGIC
 */

// 1. Export Data (Download Backup)
function exportData() {
    // Tattara dukkan bayananmu a wuri guda
    const kasuData = {
        categories: JSON.parse(localStorage.getItem('kasu_categories')) || [],
        customers: JSON.parse(localStorage.getItem('kasu_customers')) || [],
        stocks: JSON.parse(localStorage.getItem('kasu_stocks')) || [],
        sales: JSON.parse(localStorage.getItem('kasu_sales')) || [],
        appName: localStorage.getItem('appName') || 'KasuApp'
    };

    // Canza data zuwa rubutun JSON
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(kasuData));
    const downloadAnchorNode = document.createElement('a');
    
    // Suna da ranar wata don backup file din
    const date = new Date().toISOString().slice(0, 10);
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `KasuApp_Backup_${date}.json`);
    
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
    
    alert("An saukar da backup din nasara! Ajiye shi a wuri mai kyau.");
}

// 2. Import Data (Restore from File)
function importData() {
    const fileInput = document.getElementById('importFile');
    const file = fileInput.files[0];

    if (!file) {
        alert("Don Allah zabi file din da kake son lodawa.");
        return;
    }

    const reader = new FileReader();
    reader.onload = function(e) {
        try {
            const importedData = JSON.parse(e.target.result);

            // Tabbatar data tana da kyau kafin mu ajiye
            if (confirm("Shin kana da tabbacin kana son goge bayanan yanzu ka dawo da wadannan?")) {
                localStorage.setItem('kasu_categories', JSON.stringify(importedData.categories || []));
                localStorage.setItem('kasu_customers', JSON.stringify(importedData.customers || []));
                localStorage.setItem('kasu_stocks', JSON.stringify(importedData.stocks || []));
                localStorage.setItem('kasu_sales', JSON.stringify(importedData.sales || []));
                if(importedData.appName) localStorage.setItem('appName', importedData.appName);

                alert("An dawo da bayanai nasara! Shafin zai yi refresh.");
                window.location.reload();
            }
        } catch (error) {
            alert("Kuskure! Wannan file din ba na KasuApp ba ne.");
        }
    };
    reader.readAsText(file);
}

// 3. Factory Reset (Clear All)
function resetSystem() {
    const code = "GOGE"; // Kalmar sirri ta tabbatarwa
    const input = prompt(`Shin kana da tabbacin kana son goge dukkan bayanan shagonka? \n\n Rubuta "${code}" domin tabbatarwa:`);

    if (input === code) {
        localStorage.clear();
        alert("An goge komai! Tsarin ya koma sabo.");
        window.location.href = 'index.html';
    } else {
        alert("Ba a goge komai ba.");
    }
}

// 4. Change PIN (Simple Placeholder)
function changePin() {
    const newPin = prompt("Shigar da sabon PIN din tsarinka (Lamba 4):");
    if (newPin && newPin.length === 4) {
        localStorage.setItem('kasu_pin', newPin);
        alert("An canja PIN nasara!");
    } else {
        alert("PIN dole ya zama lambobi 4.");
    }
}

/**
 * KASUAPP - STOCK & INVENTORY LOGIC
 */

// 1. Load Categories into the Dropdown (Domin zabar rukuni)
function loadCategoriesInSelect() {
    const cats = JSON.parse(localStorage.getItem('kasu_categories')) || [];
    const select = document.getElementById('pCategory');
    if (!select) return;

    // Share tsofaffi (banda na farko)
    select.innerHTML = '<option value="General">-- Zaɓi Category --</option>';
    
    cats.forEach(c => {
        let option = document.createElement('option');
        option.value = c.name;
        option.innerText = c.name;
        select.appendChild(option);
    });
}

// 2. Add New Product to Stock
function addProduct() {
    const name = document.getElementById('pName').value.trim();
    const qty = parseInt(document.getElementById('pQty').value);
    const costPrice = parseFloat(document.getElementById('pPrice').value);
    const category = document.getElementById('pCategory').value;

    if (!name || isNaN(qty) || isNaN(costPrice)) {
        alert("Don Allah cike dukkan bayanan kaya!");
        return;
    }

    // Muna lissafin Selling Price ta hanyar kara kashi 20% (Misali ne, zaka iya canzawa)
    const sellingPrice = costPrice + (costPrice * 0.20); 

    let stocks = JSON.parse(localStorage.getItem('kasu_stocks')) || [];

    const newProduct = {
        id: Date.now(),
        name: name,
        qty: qty,
        costPrice: costPrice,
        sellingPrice: sellingPrice,
        category: category,
        dateAdded: new Date().toLocaleDateString()
    };

    stocks.push(newProduct);
    localStorage.setItem('kasu_stocks', JSON.stringify(stocks));
    
    alert(`An saka ${name} a stock nasara!`);
    
    // Wanke input fields
    document.getElementById('pName').value = '';
    document.getElementById('pQty').value = '';
    document.getElementById('pPrice').value = '';
    
    displayStock();
}

// 3. Display Stock in Table
function displayStock() {
    const stockBody = document.getElementById('stockBody');
    if (!stockBody) return;

    const stocks = JSON.parse(localStorage.getItem('kasu_stocks')) || [];
    stockBody.innerHTML = "";

    if (stocks.length === 0) {
        stockBody.innerHTML = `<tr><td colspan="4" style="text-align:center; padding:20px; color:#888;">Baka da kaya a stock tukuna.</td></tr>`;
        return;
    }

    stocks.forEach((item) => {
        const row = `
            <tr>
                <td><b>${item.name}</b><br><small style="color:#888;">${item.category}</small></td>
                <td>${item.qty}</td>
                <td>₦${item.costPrice.toLocaleString()}</td>
                <td>
                    <button onclick="deleteStock(${item.id})" style="background:#ff4757; color:white; border:none; padding:5px 10px; border-radius:5px; cursor:pointer;">🗑️</button>
                </td>
            </tr>
        `;
        stockBody.innerHTML += row;
    });
}

// 4. Delete Stock Item
function deleteStock(id) {
    if (confirm("Kana son goge wannan kayan daga stock?")) {
        let stocks = JSON.parse(localStorage.getItem('kasu_stocks')) || [];
        stocks = stocks.filter(item => item.id !== id);
        localStorage.setItem('kasu_stocks', JSON.stringify(stocks));
        displayStock();
    }
}

// Kira ayyukan idan shafi ya gama loda kansa
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('stockBody')) {
        displayStock();
        loadCategoriesInSelect();
    }
});

/**
 * KASUAPP - FINAL SETTINGS & CUSTOMIZATION LOGIC
 */

// 1. Canza Sunan Shago (Update Store Name)
function changeAppName() {
    const nameField = document.getElementById('newAppName');
    const newName = nameField.value.trim();

    if (newName === "") {
        alert("Don Allah shigar da sabon sunan shagon!");
        return;
    }

    // Ajiye sabon suna a LocalStorage
    localStorage.setItem('appName', newName);
    
    // Sabunta sunan a dukkan sassan da ake gani
    applyAppName();
    
    nameField.value = "";
    nameField.placeholder = "Yanzu: " + newName;
    alert("An canja sunan shago zuwa: " + newName);
    
    // Zabi: refresh don komai ya hau
    window.location.reload();
}

// 2. Add New Module (Placeholder na Pro Features)
function addNewModule() {
    alert("Wannan sashin na masu amfani da KasuApp Pro ne kawai. Za a saki sabon update nan ba da dadewa ba! 🚀");
}

// 3. Gyara sassan Export/Import (Update daga wanda muka yi a baya)
// Wannan zai tabbatar file dinka yana dauke da dukkan Tables
function exportData() {
    const backupData = {
        appName: localStorage.getItem('appName') || 'KasuApp',
        kasu_categories: JSON.parse(localStorage.getItem('kasu_categories')) || [],
        kasu_customers: JSON.parse(localStorage.getItem('kasu_customers')) || [],
        kasu_stocks: JSON.parse(localStorage.getItem('kasu_stocks')) || [],
        kasu_sales: JSON.parse(localStorage.getItem('kasu_sales')) || []
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupData));
    const downloadAnchorNode = document.createElement('a');
    const date = new Date().toLocaleDateString().replace(/\//g, '-');
    
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `Kasuwa_Backup_${date}.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// 4. Branding Engine (Apply App Name Everywhere)
function applyAppName() {
    const savedName = localStorage.getItem('appName') || 'KasuApp';
    
    // Nemo duk inda aka yi amfani da sunan shago ko logo
    const elements = document.querySelectorAll('#mainLogo, #sidebarLogo, .logo, #receiptStoreName');
    elements.forEach(el => {
        el.innerText = savedName;
    });
    
    // Canza title na browser
    document.title = savedName + " - Dashboard";
}

/**
 * KASUAPP - AUTHENTICATION LOGIC (LOGIN)
 */

// 1. Saitin PIN na farko (Idan ba a taba saita PIN ba)
if (!localStorage.getItem('kasu_pin')) {
    localStorage.setItem('kasu_pin', '1234'); // Default PIN shine 1234
}

// 2. Function na duba Login
function checkLogin() {
    const pinInput = document.getElementById('userPin').value;
    const savedPin = localStorage.getItem('kasu_pin');
    const errorMessage = document.getElementById('loginError');

    if (pinInput === savedPin) {
        // Idan PIN yayi daidai
        sessionStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'index.html'; // Kai shi dashboard
    } else {
        // Idan PIN bai yi daidai ba
        if (errorMessage) {
            errorMessage.style.display = 'block';
            errorMessage.innerText = "PIN ba daidai ba ne! Gwada kuma.";
        } else {
            alert("PIN ba daidai ba ne! Gwada kuma.");
        }
        // Share input din
        document.getElementById('userPin').value = "";
    }
}

// 3. Tsaro: Hana shiga Dashboard ba tare da Login ba
function validateSession() {
    const currentPage = window.location.pathname.split("/").pop();
    
    // Kada mu duba session idan muna shafin login
    if (currentPage === "login.html") return;

    if (sessionStorage.getItem('isLoggedIn') !== 'true') {
        window.location.href = 'login.html';
    }
}

// Tabbatar muna duba tsaro a kowane shafi
document.addEventListener('DOMContentLoaded', () => {
    validateSession();
});