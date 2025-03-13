// DOM elements
const sidebar = document.getElementById('sidebar');
const mainContent = document.getElementById('main-content');
const toggleSidebarBtn = document.getElementById('toggle-sidebar');
const recentScreen = document.getElementById('recent-screen');
const welcomeScreen = document.getElementById('welcome-screen');
const chatView = document.getElementById('chat-view');
const newsFeed = document.getElementById('news-feed');
const shareModal = document.getElementById('share-modal');
const openShareModalBtn = document.getElementById('open-share-modal');
const closeModalBtn = document.getElementById('close-modal');
const collaborationOption = document.getElementById('collaboration-option');
const communityOption = document.getElementById('community-option');
const uploadFileBtn = document.getElementById('upload-file-btn');
const chatUploadBtn = document.getElementById('chat-upload-btn');
const sendMessageBtn = document.getElementById('send-message-btn');
const chatInput = document.getElementById('chat-input');
const queryInput = document.getElementById('query-input');
const chatMessages = document.getElementById('chat-messages');
const navItems = document.querySelectorAll('.nav-item');
const recentItems = document.querySelectorAll('.recent-item');
const historySidebar = document.getElementById('history-sidebar');
const closeHistoryBtn = document.getElementById('close-history');

// Add these variables to your JS file
const historyOverlay = document.createElement('div');
historyOverlay.className = 'history-overlay';
document.body.appendChild(historyOverlay);

// State
let currentView = 'recent'; // 'recent', 'welcome', 'chat'
let sidebarExpanded = false;

// Remove this event listener since the button is gone
// toggleSidebarBtn.addEventListener('click', () => {
//     sidebarExpanded = !sidebarExpanded;
//     sidebar.classList.toggle('expanded', sidebarExpanded);
// });

// Switch views function
function switchView(view) {
    currentView = view;
    
    // Only show the recent screen when explicitly requested
    recentScreen.style.display = view === 'recent' ? 'block' : 'none';
    
    // For welcome and chat views
    welcomeScreen.style.display = view === 'welcome' ? 'block' : 'none';
    chatView.style.display = view === 'chat' ? 'block' : 'none';
    
    // Update header title if needed
    const headerTitle = document.querySelector('.header-title h2');
    if (headerTitle) {
        if (view === 'recent') headerTitle.textContent = 'Recent';
        else if (view === 'welcome') headerTitle.textContent = 'Chat';
        else if (view === 'chat') headerTitle.textContent = 'Chat';
    }
    
    // Toggle newsfeed visibility
    if (window.innerWidth > 992) {
        newsFeed.style.display = view === 'welcome' || view === 'chat' ? 'flex' : 'none';
    }
}

// Nav item click
navItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        navItems.forEach(nav => nav.classList.remove('active'));
        item.classList.add('active');
        
        // Switch view based on nav item
        if (index === 0) switchView('recent');
        if (index === 3) switchView('chat');
    });
});

// Recent item click
recentItems.forEach(item => {
    item.addEventListener('click', () => {
        switchView('welcome');
    });
});

// Modal controls
openShareModalBtn.addEventListener('click', () => {
    shareModal.classList.add('active');
});

closeModalBtn.addEventListener('click', () => {
    shareModal.classList.remove('active');
});

// Also close modal when clicking overlay
shareModal.addEventListener('click', (e) => {
    if (e.target === shareModal) {
        shareModal.classList.remove('active');
    }
});

// Modal options
collaborationOption.addEventListener('click', () => {
    shareModal.classList.remove('active');
    // Collaboration action would go here
});

communityOption.addEventListener('click', () => {
    shareModal.classList.remove('active');
    // Community share action would go here
});

// Input actions
queryInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && queryInput.value.trim()) {
        const userQuery = queryInput.value.trim();
        queryInput.value = '';
        switchView('chat');
        
        // Send the user message and immediately get an AI response
        sendMessage(userQuery);
    }
});

chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && chatInput.value.trim()) {
        sendMessage(chatInput.value);
        chatInput.value = '';
    }
});

sendMessageBtn.addEventListener('click', () => {
    if (chatInput.value.trim()) {
        sendMessage(chatInput.value);
        chatInput.value = '';
    }
});

// Simulate file upload
uploadFileBtn.addEventListener('click', () => {
    // In a real app, this would open a file picker
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.doc,.docx,.pdf,.csv,.xls,.xlsx';
    fileInput.click();
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            switchView('chat');
            sendFileMessage(file.name, `${file.type.split('/')[1]} · ${(file.size / 1024).toFixed(1)} KB`);
        }
    });
});

chatUploadBtn.addEventListener('click', () => {
    // In a real app, this would open a file picker
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.doc,.docx,.pdf,.csv,.xls,.xlsx';
    fileInput.click();
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            const file = e.target.files[0];
            sendFileMessage(file.name, `${file.type.split('/')[1]} · ${(file.size / 1024).toFixed(1)} KB`);
        }
    });
});

// Send file message
function sendFileMessage(fileName, fileInfo) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Create message element
    const messageElement = document.createElement('div');
    messageElement.className = 'message user';
    messageElement.innerHTML = `
        <div class="message-avatar">
            <img src="/asset/user.png" alt="User avatar">
        </div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-sender">Arya Fatdhilah</span>
                <span class="message-time">${timestamp}</span>
            </div>
            <div class="message-text">
                <p>Please analyze this file for me.</p>
            </div>
            <div class="message-file">
                <div class="message-file-icon">📄</div>
                <div class="message-file-info">
                    <span class="message-file-name">${fileName}</span>
                    <span class="message-file-size">${fileInfo}</span>
                </div>
                <div class="message-file-close">✕</div>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Simulate AI processing response
    setTimeout(() => {
        const aiResponse = document.createElement('div');
        aiResponse.className = 'message';
        aiResponse.innerHTML = `
            <div class="message-avatar">
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="35" height="35" rx="17.5" fill="white"/>
                    <path d="M17.5 8.75C12.6675 8.75 8.75 12.6675 8.75 17.5C8.75 22.3325 12.6675 26.25 17.5 26.25C22.3325 26.25 26.25 22.3325 26.25 17.5C26.25 12.6675 22.3325 8.75 17.5 8.75ZM13.5625 20.5625L11.375 18.375L13.5625 16.1875L15.75 18.375L13.5625 20.5625ZM17.5 24.5L15.3125 22.3125L17.5 20.125L19.6875 22.3125L17.5 24.5ZM19.6875 20.5625L17.5 18.375L19.6875 16.1875L21.875 18.375L19.6875 20.5625ZM17.5 15.75L15.3125 13.5625L17.5 11.375L19.6875 13.5625L17.5 15.75Z" fill="#000"/>
                </svg>
            </div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-sender">Inalis AI</span>
                    <span class="message-time">${timestamp}</span>
                </div>
                <div class="message-text">
                    <p>I'm analyzing your file now. Give me a moment to process the data...</p>
                </div>
            </div>
        `;
        
        chatMessages.appendChild(aiResponse);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1000);
}

// Send message
function sendMessage(text) {
    const timestamp = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    
    // Create user message element
    const messageElement = document.createElement('div');
    messageElement.className = 'message user';
    messageElement.innerHTML = `
        <div class="message-avatar">
            <img src="/asset/user.png" alt="User avatar">
        </div>
        <div class="message-content">
            <div class="message-header">
                <span class="message-sender">Arya Fatdhilah</span>
                <span class="message-time">${timestamp}</span>
            </div>
            <div class="message-text">
                <p>${text}</p>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(messageElement);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Show typing indicator
    const typingIndicator = document.createElement('div');
    typingIndicator.className = 'message typing-indicator';
    typingIndicator.innerHTML = `
        <div class="message-avatar">
            <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="35" height="35" rx="17.5" fill="white"/>
                <path d="M17.5 8.75C12.6675 8.75 8.75 12.6675 8.75 17.5C8.75 22.3325 12.6675 26.25 17.5 26.25C22.3325 26.25 26.25 22.3325 26.25 17.5C26.25 12.6675 22.3325 8.75 17.5 8.75ZM13.5625 20.5625L11.375 18.375L13.5625 16.1875L15.75 18.375L13.5625 20.5625ZM17.5 24.5L15.3125 22.3125L17.5 20.125L19.6875 22.3125L17.5 24.5ZM19.6875 20.5625L17.5 18.375L19.6875 16.1875L21.875 18.375L19.6875 20.5625ZM17.5 15.75L15.3125 13.5625L17.5 11.375L19.6875 13.5625L17.5 15.75Z" fill="#000"/>
            </svg>
        </div>
        <div class="message-content">
            <div class="typing-dots">
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
    `;
    
    chatMessages.appendChild(typingIndicator);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    // Generate appropriate response based on message content
    let responseContent;
    
    // Look for keywords to provide different responses
    if (text.toLowerCase().includes('bitcoin') || text.toLowerCase().includes('btc')) {
        responseContent = `
            <p>Based on my analysis of Bitcoin (BTC):</p>
            <ul>
                <li>Current price: $56,832.45</li>
                <li>24h change: +2.3%</li>
                <li>Market cap: $1.12T</li>
            </ul>
            <p>Bitcoin has been showing strong momentum over the past week, with institutional buying pressure increasing. The recent approval of the spot ETFs continues to drive inflows, and on-chain metrics suggest accumulation by long-term holders.</p>
            <p>Technical indicators show support at $54,200 and resistance at $58,500. Breaking this resistance could lead to a test of the all-time high.</p>
        `;
    } else if (text.toLowerCase().includes('ethereum') || text.toLowerCase().includes('eth')) {
        responseContent = `
            <p>My analysis of Ethereum (ETH) shows:</p>
            <ul>
                <li>Current price: $3,052.18</li>
                <li>24h change: +1.7%</li>
                <li>Market cap: $366.8B</li>
            </ul>
            <p>Ethereum continues to see strong development activity ahead of the Dencun upgrade. Layer 2 scaling solutions have reduced gas fees and improved transaction throughput significantly.</p>
            <p>Technical analysis indicates a bullish pattern forming with key support at $2,850 and resistance at $3,200. The ETH/BTC ratio has been stabilizing, suggesting ETH could outperform BTC in the short term.</p>
        `;
    } else if (text.toLowerCase().includes('solana') || text.toLowerCase().includes('sol')) {
        responseContent = `
            <p>Here's my analysis of Solana (SOL):</p>
            <ul>
                <li>Current price: $102.35</li>
                <li>24h change: +3.8%</li>
                <li>Market cap: $46.1B</li>
            </ul>
            <p>Solana has recovered strongly from its 2022 lows, with network performance and stability improving significantly. DeFi and NFT activity on the network continues to grow, and major institutional players have increased their positions.</p>
            <p>Technical indicators show a bullish trend with support at $95 and resistance at $110. The network's transaction count and TVL (Total Value Locked) metrics are showing consistent growth, suggesting strong fundamentals.</p>
        `;
    } else {
        // Generic response for other queries
        responseContent = `
            <p>Thank you for your question about "${text}". Here's my analysis:</p>
            <p>The cryptocurrency market overall is showing mixed signals, with Bitcoin dominance at 52.3% and global crypto market cap at $2.27T, up 1.6% in the last 24 hours.</p>
            <p>For more specific insights on particular assets, I recommend considering these factors:</p>
            <ul>
                <li>Market sentiment and momentum indicators</li>
                <li>On-chain analytics and active addresses</li>
                <li>Development activity and roadmap progress</li>
                <li>Institutional investment flows</li>
            </ul>
            <p>Would you like me to analyze a specific cryptocurrency or metric in more detail?</p>
        `;
    }
    
    // Remove typing indicator and add AI response after short delay
    setTimeout(() => {
        // Remove typing indicator
        chatMessages.removeChild(typingIndicator);
        
        // Add AI response
        const aiResponse = document.createElement('div');
        aiResponse.className = 'message';
        aiResponse.innerHTML = `
            <div class="message-avatar">
                <svg width="35" height="35" viewBox="0 0 35 35" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <rect width="35" height="35" rx="17.5" fill="white"/>
                    <path d="M17.5 8.75C12.6675 8.75 8.75 12.6675 8.75 17.5C8.75 22.3325 12.6675 26.25 17.5 26.25C22.3325 26.25 26.25 22.3325 26.25 17.5C26.25 12.6675 22.3325 8.75 17.5 8.75ZM13.5625 20.5625L11.375 18.375L13.5625 16.1875L15.75 18.375L13.5625 20.5625ZM17.5 24.5L15.3125 22.3125L17.5 20.125L19.6875 22.3125L17.5 24.5ZM19.6875 20.5625L17.5 18.375L19.6875 16.1875L21.875 18.375L19.6875 20.5625ZM17.5 15.75L15.3125 13.5625L17.5 11.375L19.6875 13.5625L17.5 15.75Z" fill="#000"/>
                </svg>
            </div>
            <div class="message-content">
                <div class="message-header">
                    <span class="message-sender">Inalis AI</span>
                    <span class="message-time">${timestamp}</span>
                </div>
                <div class="message-text">
                    ${responseContent}
                </div>
            </div>
        `;
        
        chatMessages.appendChild(aiResponse);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 1500);
}

// Simulate chat for query input
function simulateChat(query) {
    switchView('chat');
    sendMessage(query);
}

// File message close button
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('message-file-close')) {
        const fileElement = e.target.closest('.message-file');
        fileElement.style.display = 'none';
    }
});

// Animations
document.addEventListener('DOMContentLoaded', () => {
    // Initial view
    switchView('recent');
    
    // Responsive handler for news feed
    function handleResize() {
        if (window.innerWidth <= 992) {
            newsFeed.style.display = 'none';
        } else {
            newsFeed.style.display = currentView === 'welcome' || currentView === 'chat' ? 'flex' : 'none';
        }
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Demo button to show welcome screen
    setTimeout(() => {
        document.querySelectorAll('.recent-item')[0].click();
    }, 500);
    
    // Get all nav items
    const navItems = document.querySelectorAll('.sidebar .nav-item');
    
    // Add click event listeners to each nav item
    navItems.forEach((item, index) => {
        item.addEventListener('click', () => {
            // Remove active class from all nav items
            navItems.forEach(nav => nav.classList.remove('active'));
            
            // Add active class to clicked item
            item.classList.add('active');
            
            // First item (index 0) always shows welcome screen
            if (index === 0) {
                switchView('welcome');
                return;
            }
            
            // Check if this is a view item
            const view = item.getAttribute('data-view');
            if (view) {
                switchView(view);
            }
            
            // Check if this is the history toggle
            const action = item.getAttribute('data-action');
            if (action === 'toggle-history') {
                toggleHistorySidebar();
            }
        });
    });
    
    // Set the chat nav item as active by default
    navItems[0].classList.add('active');
    
    // Set close history button event
    if (closeHistoryBtn) {
        closeHistoryBtn.addEventListener('click', () => {
            toggleHistorySidebar(false);
        });
    }
    
    // Initial view (welcome screen with "Hi, Arya Fatdhilah")
    switchView('welcome');
});

// Toggle history sidebar without changing the current view
function toggleHistorySidebar(forceState) {
    const isOpen = forceState !== undefined ? forceState : !historySidebar.classList.contains('open');
    
    if (isOpen) {
        historySidebar.classList.add('open');
        historyOverlay.classList.add('visible');
        
        // Add click event to the overlay to close history when clicked outside
        historyOverlay.onclick = () => {
            toggleHistorySidebar(false);
        };
    } else {
        historySidebar.classList.remove('open');
        historyOverlay.classList.remove('visible');
    }
}

// Keyboard shortcut to toggle views (for demo purposes)
document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.key === '1') switchView('recent');
    if (e.ctrlKey && e.key === '2') switchView('welcome');
    if (e.ctrlKey && e.key === '3') switchView('chat');
    if (e.ctrlKey && e.key === '4') shareModal.classList.add('active');
});
