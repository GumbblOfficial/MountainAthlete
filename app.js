// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    // Initialize application
    initApp();
    
    // Initialize all event listeners
    initEventListeners();
    
    // Initialize charts
    initCharts();
    
    // Load data from localStorage if available
    loadData();
});

// Application initialization
function initApp() {
    // Set current date as default
    const today = new Date();
    const formattedDate = today.toISOString().split('T')[0];
    document.getElementById('race-date').value = formattedDate;
    
    // Initialize map
    initMap();
    
    // Load nutrition items
    loadNutritionItems();
    
    // Load gear items
    loadGearItems();
}

// Initialize event listeners
function initEventListeners() {
    // Section navigation
    const navItems = document.querySelectorAll('.side-nav li');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            // Add active class to clicked item
            this.classList.add('active');
            
            // Hide all sections
            const sections = document.querySelectorAll('main .content > section');
            sections.forEach(section => section.classList.remove('active'));
            
            // Show selected section
            const sectionId = this.getAttribute('data-section');
            document.getElementById(sectionId).classList.add('active');
        });
    });
    
    // Tab navigation
    const tabBtns = document.querySelectorAll('.tab-btn');
    tabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            const parent = this.parentElement;
            
            // Remove active class from all tab buttons in the same group
            parent.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all tab contents in the same group
            parent.parentElement.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
            // Show selected tab content
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Meal tab navigation
    const mealTabBtns = document.querySelectorAll('.meal-tab-btn');
    mealTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const mealId = this.getAttribute('data-meal');
            const parent = this.parentElement;
            
            // Remove active class from all meal tab buttons
            parent.querySelectorAll('.meal-tab-btn').forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all meal tab contents
            parent.parentElement.querySelectorAll('.meal-tab-content').forEach(content => content.classList.remove('active'));
            // Show selected meal tab content
            document.getElementById(mealId).classList.add('active');
        });
    });
    
    // Analysis tab navigation
    const analysisTabBtns = document.querySelectorAll('.analysis-tab-btn');
    analysisTabBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const analysisId = this.getAttribute('data-analysis');
            const parent = this.parentElement;
            
            // Remove active class from all analysis tab buttons
            parent.querySelectorAll('.analysis-tab-btn').forEach(btn => btn.classList.remove('active'));
            // Add active class to clicked button
            this.classList.add('active');
            
            // Hide all analysis tab contents
            parent.parentElement.querySelectorAll('.analysis-content').forEach(content => content.classList.remove('active'));
            // Show selected analysis tab content
            document.getElementById(analysisId).classList.add('active');
        });
    });
    
    // Add gear item button
    const addGearBtns = document.querySelectorAll('.add-gear-btn');
    addGearBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            addGearItem(this);
        });
    });
    
    // Add segment button
    const addSegmentBtn = document.querySelector('.add-segment-btn');
    if (addSegmentBtn) {
        addSegmentBtn.addEventListener('click', addRaceSegment);
    }
    
    // Add nutrition item button
    const addNutritionBtns = document.querySelectorAll('.add-nutrition-btn');
    addNutritionBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            openNutritionModal(this);
        });
    });
    
    // Nutrition modal events
    const nutritionModal = document.getElementById('nutrition-modal');
    const closeModal = document.querySelector('.close-modal');
    const nutritionForm = document.getElementById('nutrition-item-form');
    
    if (nutritionModal && closeModal && nutritionForm) {
        closeModal.addEventListener('click', function() {
            nutritionModal.style.display = 'none';
        });
        
        window.addEventListener('click', function(event) {
            if (event.target === nutritionModal) {
                nutritionModal.style.display = 'none';
            }
        });
        
        nutritionForm.addEventListener('submit', function(e) {
            e.preventDefault();
            addNutritionItem();
            nutritionForm.reset();
            nutritionModal.style.display = 'none';
        });
    }
    
    // Add food item button
    const addFoodBtns = document.querySelectorAll('.add-food-btn');
    addFoodBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            addFoodItem(this);
        });
    });
    
    // Save button
    const saveBtn = document.querySelector('.save-btn');
    if (saveBtn) {
        saveBtn.addEventListener('click', saveData);
    }
    
    // Export button
    const exportBtn = document.querySelector('.export-btn');
    if (exportBtn) {
        exportBtn.addEventListener('click', exportData);
    }
    
    // Print button
    const printBtn = document.querySelector('.print-btn');
    if (printBtn) {
        printBtn.addEventListener('click', function() {
            window.print();
        });
    }
    
    // Upload profile button
    const uploadBtn = document.querySelector('.upload-btn');
    if (uploadBtn) {
        uploadBtn.addEventListener('click', function() {
            const fileInput = document.getElementById('race-profile');
            fileInput.click();
        });
    }
}

// Initialize charts using Chart.js
function initCharts() {
    // Substrate utilization chart
    const substrateCtx = document.getElementById('substrateChart');
    if (substrateCtx) {
        new Chart(substrateCtx, {
            type: 'bar',
            data: {
                labels: ['Carbs', 'Fat', 'Protein'],
                datasets: [{
                    label: 'Energy Contribution (%)',
                    data: [60, 30, 10],
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.7)',
                        'rgba(46, 204, 113, 0.7)',
                        'rgba(230, 126, 34, 0.7)'
                    ],
                    borderColor: [
                        'rgba(52, 152, 219, 1)',
                        'rgba(46, 204, 113, 1)',
                        'rgba(230, 126, 34, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true,
                        max: 100
                    }
                }
            }
        });
    }
    
    // Fluid requirements chart
    const fluidCtx = document.getElementById('fluidChart');
    if (fluidCtx) {
        new Chart(fluidCtx, {
            type: 'line',
            data: {
                labels: ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h'],
                datasets: [{
                    label: 'Fluid Intake (ml)',
                    data: [500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500, 500],
                    borderColor: 'rgba(52, 152, 219, 1)',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    }
    
    // Energy systems chart
    const energySystemsCtx = document.getElementById('energySystemsChart');
    if (energySystemsCtx) {
        new Chart(energySystemsCtx, {
            type: 'radar',
            data: {
                labels: ['Start', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h'],
                datasets: [{
                    label: 'Anaerobic',
                    data: [80, 65, 50, 40, 35, 30, 25, 20, 15, 10, 10, 10, 10, 10, 10],
                    borderColor: 'rgba(231, 76, 60, 1)',
                    backgroundColor: 'rgba(231, 76, 60, 0.2)',
                    pointBackgroundColor: 'rgba(231, 76, 60, 1)'
                }, {
                    label: 'Aerobic',
                    data: [20, 35, 50, 60, 65, 70, 75, 80, 85, 90, 90, 90, 90, 90, 90],
                    borderColor: 'rgba(46, 204, 113, 1)',
                    backgroundColor: 'rgba(46, 204, 113, 0.2)',
                    pointBackgroundColor: 'rgba(46, 204, 113, 1)'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    r: {
                        angleLines: {
                            display: true
                        },
                        suggestedMin: 0,
                        suggestedMax: 100
                    }
                }
            }
        });
    }
    
    // Nutrition balance chart
    const nutritionBalanceCtx = document.getElementById('nutritionBalanceChart');
    if (nutritionBalanceCtx) {
        new Chart(nutritionBalanceCtx, {
            type: 'doughnut',
            data: {
                labels: ['Carbohydrates', 'Protein', 'Fat'],
                datasets: [{
                    data: [60, 20, 20],
                    backgroundColor: [
                        'rgba(52, 152, 219, 0.7)',
                        'rgba(46, 204, 113, 0.7)',
                        'rgba(230, 126, 34, 0.7)'
                    ],
                    borderColor: [
                        'rgba(52, 152, 219, 1)',
                        'rgba(46, 204, 113, 1)',
                        'rgba(230, 126, 34, 1)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'right'
                    }
                }
            }
        });
    }
    
    // Pacing strategy chart
    const pacingStrategyCtx = document.getElementById('pacingStrategyChart');
    if (pacingStrategyCtx) {
        new Chart(pacingStrategyCtx, {
            type: 'line',
            data: {
                labels: ['0h', '1h', '2h', '3h', '4h', '5h', '6h', '7h', '8h', '9h', '10h', '11h', '12h', '13h', '14h'],
                datasets: [{
                    label: 'Pace (min/km)',
                    data: [5.5, 5.5, 5.6, 5.7, 5.8, 5.9, 6.0, 6.0, 6.0, 5.9, 5.8, 5.7, 5.6, 5.5, 5.5],
                    borderColor: 'rgba(52, 152, 219, 1)',
                    backgroundColor: 'rgba(52, 152, 219, 0.1)',
                    fill: true,
                    tension: 0.4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    y: {
                        beginAtZero: false,
                        title: {
                            display: true,
                            text: 'Pace (min/km)'
                        }
                    }
                }
            }
        });
    }
}

// Initialize map using Mapbox
function initMap() {
    // Replace with your actual Mapbox access token
    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    
    const mapContainer = document.getElementById('map');
    if (mapContainer) {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/outdoors-v12',
            center: [-74.5, 40], // Default center
            zoom: 9 // Default zoom level
        });
        
        // Add navigation controls
        map.addControl(new mapboxgl.NavigationControl());
        
        // Add geolocate control
        map.addControl(new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true
        }));
    }
}

// Add gear item to the list
function addGearItem(button) {
    const parentTab = button.closest('.tab-content');
    const gearType = parentTab.id === 'mandatory' ? 'Mandatory' : 'Optional';
    
    // Create gear item HTML
    const gearItemHTML = `
        <div class="gear-item">
            <div class="form-row">
                <div class="form-group">
                    <label>Item Name</label>
                    <input type="text" class="gear-name" placeholder="Item name">
                </div>
                <div class="form-group">
                    <label>Quantity</label>
                    <input type="number" class="gear-quantity" min="1" value="1">
                </div>
            </div>
            <div class="form-group">
                <label>Notes</label>
                <textarea class="gear-notes" placeholder="Enter notes about this item"></textarea>
            </div>
            <button class="btn remove-gear-btn"><i class="fas fa-trash"></i> Remove</button>
        </div>
    `;
    
    // Add gear item to the list
    const gearList = parentTab.querySelector('.gear-list');
    gearList.insertAdjacentHTML('beforeend', gearItemHTML);
    
    // Add event listener to the remove button
    const removeBtn = gearList.lastElementChild.querySelector('.remove-gear-btn');
    removeBtn.addEventListener('click', function() {
        this.parentElement.remove();
    });
    
    // Save data automatically when adding a new item
    saveData();
}

// Add a new race segment
function addRaceSegment() {
    const segmentsContainer = document.querySelector('.segments-container');
    
    // Create segment HTML
    const segmentHTML = `
        <div class="race-segment">
            <div class="form-row">
                <div class="form-group">
                    <label>Distance (km)</label>
                    <input type="number" min="0.1" step="0.1" class="segment-distance" placeholder="Distance">
                </div>
                <div class="form-group">
                    <label>Elevation Gain (m)</label>
                    <input type="number" min="0" class="segment-elevation" placeholder="Elevation gain">
                </div>
                <div class="form-group">
                    <label>Estimated Time</label>
                    <input type="time" class="segment-time" placeholder="Estimated time">
                </div>
            </div>
            <div class="form-group">
                <label>Notes</label>
                <textarea class="segment-notes" placeholder="Enter notes about this segment"></textarea>
            </div>
            <button class="btn remove-segment-btn"><i class="fas fa-trash"></i> Remove</button>
        </div>
    `;
    
    // Add segment to the container
    segmentsContainer.insertAdjacentHTML('beforeend', segmentHTML);
    
    // Add event listener to the remove button
    const removeBtn = segmentsContainer.lastElementChild.querySelector('.remove-segment-btn');
    removeBtn.addEventListener('click', function() {
        this.parentElement.remove();
    });
    
    // Save data automatically when adding a new segment
    saveData();
}

// Open nutrition item modal
function openNutritionModal(button) {
    // Get nutrition item details if editing existing item
    let itemName = '';
    let itemHour = '';
    let itemQuantity = '';
    let itemCarbs = '';
    let itemCalories = '';
    
    // Check if we're editing an existing item
    const existingItem = button.closest('.nutrition-row');
    if (existingItem) {
        itemName = existingItem.querySelector('.item-name').textContent;
        itemHour = existingItem.dataset.hour;
        itemQuantity = existingItem.querySelector('.item-quantity').textContent;
        itemCarbs = existingItem.querySelector('.item-carbs').textContent.replace('g', '');
        itemCalories = existingItem.querySelector('.item-calories').textContent.replace('cal', '');
        
        // Set form values for editing
        document.getElementById('item-name').value = itemName;
        document.getElementById('item-hour').value = itemHour;
        document.getElementById('item-quantity').value = itemQuantity;
        document.getElementById('item-carbs').value = itemCarbs;
        document.getElementById('item-calories').value = itemCalories;
        
        // Store reference to the existing item for update
        button.dataset.editing = 'true';
        button.dataset.itemId = existingItem.dataset.id;
    } else {
        // Clear form values for new item
        document.getElementById('nutrition-item-form').reset();
        button.dataset.editing = 'false';
    }
    
    // Show the modal
    document.getElementById('nutrition-modal').style.display = 'flex';
}

// Add or update nutrition item
function addNutritionItem() {
    const form = document.getElementById('nutrition-item-form');
    const itemName = form.querySelector('#item-name').value;
    const itemHour = form.querySelector('#item-hour').value;
    const itemQuantity = form.querySelector('#item-quantity').value;
    const itemCarbs = form.querySelector('#item-carbs').value;
    const itemCalories = form.querySelector('#item-calories').value;
    
    // Get button that opened the modal
    const button = document.querySelector('.add-nutrition-btn[data-editing]');
    
    // If we're editing an existing item
    if (button && button.dataset.editing === 'true') {
        const itemId = button.dataset.itemId;
        updateNutritionItem(itemId, itemName, itemHour, itemQuantity, itemCarbs, itemCalories);
    } else {
        // Create new item ID
        const itemId = Date.now().toString();
        
        // Create nutrition item HTML
        const nutritionItemHTML = `
            <tr class="nutrition-row" data-id="${itemId}" data-hour="${itemHour}">
                <td class="item-hour">${itemHour}</td>
                <td class="item-name">${itemName}</td>
                <td class="item-quantity">${itemQuantity}</td>
                <td class="item-carbs">${itemCarbs}g</td>
                <td class="item-calories">${itemCalories}cal</td>
                <td>
                    <button class="btn edit-nutrition-btn"><i class="fas fa-edit"></i></button>
                    <button class="btn delete-nutrition-btn"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
        
        // Add item to the table
        document.getElementById('nutrition-table-body').insertAdjacentHTML('beforeend', nutritionItemHTML);
        
        // Add event listeners to new buttons
        const editBtn = document.querySelector(`.nutrition-row[data-id="${itemId}"] .edit-nutrition-btn`);
        const deleteBtn = document.querySelector(`.nutrition-row[data-id="${itemId}"] .delete-nutrition-btn`);
        
        editBtn.addEventListener('click', function() {
            openNutritionModal(this);
        });
        
        deleteBtn.addEventListener('click', function() {
            this.closest('.nutrition-row').remove();
            updateNutritionSummary();
        });
    }
    
    // Update nutrition summary
    updateNutritionSummary();
    
    // Save data automatically
    saveData();
}

// Update existing nutrition item
function updateNutritionItem(itemId, itemName, itemHour, itemQuantity, itemCarbs, itemCalories) {
    const itemRow = document.querySelector(`.nutrition-row[data-id="${itemId}"]`);
    if (itemRow) {
        itemRow.querySelector('.item-hour').textContent = itemHour;
        itemRow.querySelector('.item-name').textContent = itemName;
        itemRow.querySelector('.item-quantity').textContent = itemQuantity;
        itemRow.querySelector('.item-carbs').textContent = `${itemCarbs}g`;
        itemRow.querySelector('.item-calories').textContent = `${itemCalories}cal`;
        itemRow.dataset.hour = itemHour;
    }
    
    // Update nutrition summary
    updateNutritionSummary();
}

// Update nutrition summary values
function updateNutritionSummary() {
    const rows = document.querySelectorAll('.nutrition-row');
    let totalCarbs = 0;
    let totalCalories = 0;
    
    rows.forEach(row => {
        const carbsText = row.querySelector('.item-carbs').textContent;
        const caloriesText = row.querySelector('.item-calories').textContent;
        
        // Extract numeric values
        const carbs = parseFloat(carbsText.replace('g', ''));
        const calories = parseFloat(caloriesText.replace('cal', ''));
        
        totalCarbs += carbs;
        totalCalories += calories;
    });
    
    // Update summary elements
    document.querySelector('.nutrition-summary .summary-item:nth-child(1) span:last-child').textContent = `${totalCarbs}g`;
    document.querySelector('.nutrition-summary .summary-item:nth-child(2) span:last-child').textContent = `${totalCalories}cal`;
}

// Load nutrition items from localStorage
function loadNutritionItems() {
    const savedItems = localStorage.getItem('nutritionItems');
    if (savedItems) {
        const items = JSON.parse(savedItems);
        
        items.forEach(item => {
            const nutritionItemHTML = `
                <tr class="nutrition-row" data-id="${item.id}" data-hour="${item.hour}">
                    <td class="item-hour">${item.hour}</td>
                    <td class="item-name">${item.name}</td>
                    <td class="item-quantity">${item.quantity}</td>
                    <td class="item-carbs">${item.carbs}g</td>
                    <td class="item-calories">${item.calories}cal</td>
                    <td>
                        <button class="btn edit-nutrition-btn"><i class="fas fa-edit"></i></button>
                        <button class="btn delete-nutrition-btn"><i class="fas fa-trash"></i></button>
                    </td>
                </tr>
            `;
            
            document.getElementById('nutrition-table-body').insertAdjacentHTML('beforeend', nutritionItemHTML);
            
            // Add event listeners to new buttons
            const editBtn = document.querySelector(`.nutrition-row[data-id="${item.id}"] .edit-nutrition-btn`);
            const deleteBtn = document.querySelector(`.nutrition-row[data-id="${item.id}"] .delete-nutrition-btn`);
            
            editBtn.addEventListener('click', function() {
                openNutritionModal(this);
            });
            
            deleteBtn.addEventListener('click', function() {
                this.closest('.nutrition-row').remove();
                updateNutritionSummary();
                saveData();
            });
        });
        
        updateNutritionSummary();
    }
}

// Add food item to meal plan
function addFoodItem(button) {
    const mealTab = document.querySelector('.meal-tab-content.active');
    const foodName = button.previousElementSibling.querySelector('.food-name').textContent;
    const foodQuantity = button.previousElementSibling.querySelector('.food-quantity input').value;
    const foodUnit = button.previousElementSibling.querySelector('.food-quantity select').value;
    
    // Create food item HTML
    const foodItemHTML = `
        <div class="meal-item">
            <div class="meal-item-details">
                <h4>${foodName}</h4>
                <p>${foodQuantity} ${foodUnit}</p>
            </div>
            <div class="meal-item-actions">
                <button class="btn remove-meal-item-btn"><i class="fas fa-trash"></i></button>
            </div>
        </div>
    `;
    
    // Add food item to the meal tab
    mealTab.querySelector('.meal-items').insertAdjacentHTML('beforeend', foodItemHTML);
    
    // Add event listener to the remove button
    const removeBtn = mealTab.querySelector('.meal-items .remove-meal-item-btn');
    removeBtn.addEventListener('click', function() {
        this.parentElement.remove();
        updateMealSummary();
    });
    
    // Update meal summary
    updateMealSummary();
    
    // Save data automatically
    saveData();
}

// Update meal plan summary
function updateMealSummary() {
    // This function would calculate and update the summary based on added food items
    // Implementation depends on having a database of food nutritional values
    // For this example, we'll just update with placeholder values
    const summaryItems = document.querySelectorAll('.meal-summary .summary-item span:last-child');
    
    // Update with random values for demonstration
    summaryItems[0].textContent = Math.floor(Math.random() * 500 + 500) + ' kcal';
    summaryItems[1].textContent = Math.floor(Math.random() * 50 + 100) + 'g';
    summaryItems[2].textContent = Math.floor(Math.random() * 20 + 10) + 'g';
    summaryItems[3].textContent = Math.floor(Math.random() * 15 + 5) + 'g';
}

// Load gear items from localStorage
function loadGearItems() {
    const mandatorySaved = localStorage.getItem('mandatoryGear');
    const optionalSaved = localStorage.getItem('optionalGear');
    
    if (mandatorySaved) {
        const mandatoryItems = JSON.parse(mandatorySaved);
        const mandatoryList = document.getElementById('mandatory').querySelector('.gear-list');
        
        mandatoryItems.forEach(item => {
            const gearItemHTML = `
                <div class="gear-item">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Item Name</label>
                            <input type="text" class="gear-name" value="${item.name}">
                        </div>
                        <div class="form-group">
                            <label>Quantity</label>
                            <input type="number" class="gear-quantity" value="${item.quantity}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Notes</label>
                        <textarea class="gear-notes">${item.notes}</textarea>
                    </div>
                    <button class="btn remove-gear-btn"><i class="fas fa-trash"></i> Remove</button>
                </div>
            `;
            
            mandatoryList.insertAdjacentHTML('beforeend', gearItemHTML);
            
            // Add event listener to the remove button
            const removeBtn = mandatoryList.lastElementChild.querySelector('.remove-gear-btn');
            removeBtn.addEventListener('click', function() {
                this.parentElement.remove();
                saveData();
            });
        });
    }
    
    if (optionalSaved) {
        const optionalItems = JSON.parse(optionalSaved);
        const optionalList = document.getElementById('optional').querySelector('.gear-list');
        
        optionalItems.forEach(item => {
            const gearItemHTML = `
                <div class="gear-item">
                    <div class="form-row">
                        <div class="form-group">
                            <label>Item Name</label>
                            <input type="text" class="gear-name" value="${item.name}">
                        </div>
                        <div class="form-group">
                            <label>Quantity</label>
                            <input type="number" class="gear-quantity" value="${item.quantity}">
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Notes</label>
                        <textarea class="gear-notes">${item.notes}</textarea>
                    </div>
                    <button class="btn remove-gear-btn"><i class="fas fa-trash"></i> Remove</button>
                </div>
            `;
            
            optionalList.insertAdjacentHTML('beforeend', gearItemHTML);
            
            // Add event listener to the remove button
            const removeBtn = optionalList.lastElementChild.querySelector('.remove-gear-btn');
            removeBtn.addEventListener('click', function() {
                this.parentElement.remove();
                saveData();
            });
        });
    }
}

// Save all data to localStorage
function saveData() {
    // Save race information
    const raceName = document.getElementById('race-name')?.value || '';
    const raceDate = document.getElementById('race-date')?.value || '';
    const raceLocation = document.getElementById('race-location')?.value || '';
    
    const raceInfo = {
        name: raceName,
        date: raceDate,
        location: raceLocation
    };
    
    localStorage.setItem('raceInfo', JSON.stringify(raceInfo));
    
    // Save metabolism data
    const duration = document.getElementById('duration')?.value || '';
    const intensity = document.getElementById('intensity')?.value || '';
    const calPerHour = document.getElementById('cal-per-hour')?.value || '';
    const choPerHour = document.getElementById('cho-per-hour')?.value || '';
    const fatPerHour = document.getElementById('fat-per-hour')?.value || '';
    
    const metabolismData = {
        duration,
        intensity,
        calPerHour,
        choPerHour,
        fatPerHour
    };
    
    localStorage.setItem('metabolismData', JSON.stringify(metabolismData));
    
    // Save gear data
    const mandatoryItems = [];
    document.getElementById('mandatory')?.querySelectorAll('.gear-item').forEach(item => {
        mandatoryItems.push({
            name: item.querySelector('.gear-name').value,
            quantity: item.querySelector('.gear-quantity').value,
            notes: item.querySelector('.gear-notes').value
        });
    });
    
    const optionalItems = [];
    document.getElementById('optional')?.querySelectorAll('.gear-item').forEach(item => {
        optionalItems.push({
            name: item.querySelector('.gear-name').value,
            quantity: item.querySelector('.gear-quantity').value,
            notes: item.querySelector('.gear-notes').value
        });
    });
    
    localStorage.setItem('mandatoryGear', JSON.stringify(mandatoryItems));
    localStorage.setItem('optionalGear', JSON.stringify(optionalItems));
    
    // Save race plan data
    const startTime = document.getElementById('start-time')?.value || '';
    const flatSpeed = document.getElementById('flat-speed')?.value || '';
    
    const racePlanData = {
        startTime,
        flatSpeed
    };
    
    localStorage.setItem('racePlanData', JSON.stringify(racePlanData));
    
    // Save protocol data
    const athleteWeight = document.getElementById('athlete-weight')?.value || '';
    const substrate = document.getElementById('substrate')?.value || '';
    
    const protocolData = {
        athleteWeight,
        substrate
    };
    
    localStorage.setItem('protocolData', JSON.stringify(protocolData));
    
    // Save nutrition data
    const nutritionItems = [];
    document.querySelectorAll('.nutrition-row').forEach(row => {
        nutritionItems.push({
            id: row.dataset.id,
            name: row.querySelector('.item-name').textContent,
            hour: row.dataset.hour,
            quantity: row.querySelector('.item-quantity').textContent,
            carbs: parseFloat(row.querySelector('.item-carbs').textContent.replace('g', '')),
            calories: parseFloat(row.querySelector('.item-calories').textContent.replace('cal', ''))
        });
    });
    
    localStorage.setItem('nutritionItems', JSON.stringify(nutritionItems));
    
    // Save fluid data
    const temperature = document.getElementById('temperature')?.value || '';
    const humidity = document.getElementById('humidity')?.value || '';
    const exerciseDuration = document.getElementById('exercise-duration')?.value || '';
    const fluidIntake = document.getElementById('fluid-intake')?.value || '';
    const sodiumIntake = document.getElementById('sodium-intake')?.value || '';
    
    const fluidData = {
        temperature,
        humidity,
        exerciseDuration,
        fluidIntake,
        sodiumIntake
    };
    
    localStorage.setItem('fluidData', JSON.stringify(fluidData));
}

// Export data to a downloadable file
function exportData() {
    // Collect all data
    const allData = {
        raceInfo: JSON.parse(localStorage.getItem('raceInfo') || '{}'),
        metabolismData: JSON.parse(localStorage.getItem('metabolismData') || '{}'),
        mandatoryGear: JSON.parse(localStorage.getItem('mandatoryGear') || '[]'),
        optionalGear: JSON.parse(localStorage.getItem('optionalGear') || '[]'),
        racePlanData: JSON.parse(localStorage.getItem('racePlanData') || '{}'),
        protocolData: JSON.parse(localStorage.getItem('protocolData') || '{}'),
        nutritionItems: JSON.parse(localStorage.getItem('nutritionItems') || '[]'),
        fluidData: JSON.parse(localStorage.getItem('fluidData') || '{}')
    };
    
    // Create a Blob from the data
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(allData, null, 2));
    
    // Create a download link
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "race-planner-data.json");
    document.body.appendChild(downloadAnchorNode);
    
    // Trigger the download
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
}

// Load data from localStorage
function loadData() {
    // Load race information
    const raceInfo = JSON.parse(localStorage.getItem('raceInfo') || '{}');
    if (raceInfo.name) document.getElementById('race-name')?.value = raceInfo.name;
    if (raceInfo.date) document.getElementById('race-date')?.value = raceInfo.date;
    if (raceInfo.location) document.getElementById('race-location')?.value = raceInfo.location;
    
    // Load metabolism data
    const metabolismData = JSON.parse(localStorage.getItem('metabolismData') || '{}');
    if (metabolismData.duration) document.getElementById('duration')?.value = metabolismData.duration;
    if (metabolismData.intensity) document.getElementById('intensity')?.value = metabolismData.intensity;
    if (metabolismData.calPerHour) document.getElementById('cal-per-hour')?.value = metabolismData.calPerHour;
    if (metabolismData.choPerHour) document.getElementById('cho-per-hour')?.value = metabolismData.choPerHour;
    if (metabolismData.fatPerHour) document.getElementById('fat-per-hour')?.value = metabolismData.fatPerHour;
    
    // Load race plan data
    const racePlanData = JSON.parse(localStorage.getItem('racePlanData') || '{}');
    if (racePlanData.startTime) document.getElementById('start-time')?.value = racePlanData.startTime;
    if (racePlanData.flatSpeed) document.getElementById('flat-speed')?.value = racePlanData.flatSpeed;
    
    // Load protocol data
    const protocolData = JSON.parse(localStorage.getItem('protocolData') || '{}');
    if (protocolData.athleteWeight) document.getElementById('athlete-weight')?.value = protocolData.athleteWeight;
    if (protocolData.substrate) document.getElementById('substrate')?.value = protocolData.substrate;
    
    // Load fluid data
    const fluidData = JSON.parse(localStorage.getItem('fluidData') || '{}');
    if (fluidData.temperature) document.getElementById('temperature')?.value = fluidData.temperature;
    if (fluidData.humidity) document.getElementById('humidity')?.value = fluidData.humidity;
    if (fluidData.exerciseDuration) document.getElementById('exercise-duration')?.value = fluidData.exerciseDuration;
    if (fluidData.fluidIntake) document.getElementById('fluid-intake')?.value = fluidData.fluidIntake;
    if (fluidData.sodiumIntake) document.getElementById('sodium-intake')?.value = fluidData.sodiumIntake;
    
    // Load nutrition items
    loadNutritionItems();
    
    // Load gear items
    loadGearItems();
}
