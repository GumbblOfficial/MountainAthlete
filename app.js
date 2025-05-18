// Import required libraries
import 'mapbox-gl/dist/mapbox-gl.css';
import '@fortawesome/fontawesome-free/css/all.css';

// Import components
import { initRaceList } from './components/race-list.js';
import { initMetabolismPanel } from './components/metabolism-panel.js';
import { initGearList } from './components/gear-list.js';
import { initRacePlan } from './components/race-plan.js';
import { initNutritionPlanner } from './components/nutrition-planner.js';
import { initFluidCalculator } from './components/fluid-calculator.js';
import { initPerformanceAnalysis } from './components/performance-analysis.js';
import { initThemeToggle } from './utils/theme-toggle.js';

// Main application initialization
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme toggle
    initThemeToggle();
    
    // Initialize sidebar navigation
    initSidebarNavigation();
    
    // Initialize all components
    initRaceList();
    initMetabolismPanel();
    initGearList();
    initRacePlan();
    initNutritionPlanner();
    initFluidCalculator();
    initPerformanceAnalysis();
    
    // Initialize map
    initMap();
    
    // Load initial data
    loadData();
});

// Initialize sidebar navigation
function initSidebarNavigation() {
    const navItems = document.querySelectorAll('.main-nav a');
    const sections = document.querySelectorAll('main section');
    
    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Remove active class from all nav items
            navItems.forEach(nav => nav.parentElement.classList.remove('active'));
            
            // Add active class to clicked item
            item.parentElement.classList.add('active');
            
            // Hide all sections
            sections.forEach(section => section.classList.remove('active'));
            
            // Show selected section
            const targetId = item.getAttribute('href').substring(1);
            document.getElementById(targetId).classList.add('active');
        });
    });
}

// Initialize map
function initMap() {
    // Initialize mapbox
    mapboxgl.accessToken = 'YOUR_MAPBOX_ACCESS_TOKEN';
    const map = new mapboxgl.Map({
        container: 'race-map',
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

// Load data from local storage
function loadData() {
    // Implement data loading logic
    console.log('Loading data...');
}

// Save data to local storage
function saveData() {
    // Implement data saving logic
    console.log('Saving data...');
}

// Export function for date formatting
export function formatDate(date) {
    return dayjs(date).format('YYYY-MM-DD');
}

// Export function for time formatting
export function formatTime(time) {
    return dayjs(time).format('HH:mm');
}
