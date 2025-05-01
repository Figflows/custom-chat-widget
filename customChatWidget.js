(function() {
    // Create and inject styles
    const styles = `
        .custom-chat-widget {
            --chat--color-primary: var(--custom-chat-primary-color, #854fff);
            --chat--color-secondary: var(--custom-chat-secondary-color, #6b3fd4);
            --chat--color-background: var(--custom-chat-background-color, #ffffff);
            --chat--color-font: var(--custom-chat-font-color, #333333);
            font-family: 'Geist Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
    
        .custom-chat-widget .chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 1000;
            display: none;
            width: 380px;
            height: 600px;
            background: var(--chat--color-background);
            border-radius: 12px;
            box-shadow: 0 8px 32px rgba(133, 79, 255, 0.15);
            border: 1px solid rgba(133, 79, 255, 0.2);
            overflow: hidden;
            font-family: inherit;
        }
    
        .custom-chat-widget .chat-container.position-left {
            right: auto;
            left: 20px;
        }
    
        .custom-chat-widget .chat-container.open {
            display: flex;
            flex-direction: column;
        }
    
        .custom-chat-widget .brand-header {
            padding: 16px;
            display: flex;
            align-items: center;
            gap: 12px;
            border-bottom: 1px solid rgba(133, 79, 255, 0.1);
            position: relative;
        }
    
        .custom-chat-widget .close-button {
            position: absolute;
            right: 16px;
            top: 50%;
            transform: translateY(-50%);
            background: none;
            border: none;
            color: var(--chat--color-font);
            cursor: pointer;
            padding: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: color 0.2s;
            font-size: 20px;
            opacity: 0.6;
        }
    
        .custom-chat-widget .close-button:hover {
            opacity: 1;
        }
    
        .custom-chat-widget .brand-header img {
            margin-top: 5px;
            width: 64px;
            height: 32px;
            object-fit: contain;
        }
    
        .custom-chat-widget .brand-header span {
            font-size: 18px;
            font-weight: 500;
            color: var(--chat--color-font);
        }
    
        .custom-chat-widget .new-conversation {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            padding: 20px;
            text-align: center;
            width: 100%;
            max-width: 300px;
        }
    
        .custom-chat-widget .welcome-text {
            font-size: 24px;
            font-weight: 600;
            color: var(--chat--color-font);
            margin-bottom: 24px;
            line-height: 1.3;
        }
    
        .custom-chat-widget .new-chat-btn {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 8px;
            width: 100%;
            padding: 16px 24px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            cursor: pointer;
            font-size: 16px;
            transition: transform 0.3s;
            font-weight: 500;
            font-family: inherit;
            margin-bottom: 12px;
        }
    
        .custom-chat-widget .new-chat-btn:hover {
            transform: scale(1.02);
        }
    
        .custom-chat-widget .message-icon {
            width: 20px;
            height: 20px;
        }
    
        .custom-chat-widget .response-text {
            font-size: 14px;
            color: var(--chat--color-font);
            opacity: 0.7;
            margin: 0;
        }
    
        .custom-chat-widget .chat-interface {
            display: none;
            flex-direction: column;
            height: 100%;
        }
    
        .custom-chat-widget .chat-interface.active {
            display: flex;
        }
    
        .custom-chat-widget .chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 20px;
            background: var(--chat--color-background);
            display: flex;
            flex-direction: column;
        }
    
        .custom-chat-widget .chat-message {
            padding: 12px 16px;
            margin: 8px 0;
            border-radius: 12px;
            max-width: 80%;
            word-wrap: break-word;
            font-size: 14px;
            line-height: 1.5;
        }
    
        .custom-chat-widget .chat-message.user {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            align-self: flex-end;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.2);
            border: none;
        }
    
        .custom-chat-widget .chat-message.bot {
            background: var(--chat--color-background);
            border: 1px solid rgba(133, 79, 255, 0.2);
            color: var(--chat--color-font);
            align-self: flex-start;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
    
        .custom-chat-widget .chat-input {
            padding: 16px;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
            display: flex;
            gap: 8px;
        }
    
        .custom-chat-widget .chat-input textarea {
            flex: 1;
            padding: 12px;
            border: 1px solid rgba(133, 79, 255, 0.2);
            border-radius: 8px;
            background: var(--chat--color-background);
            color: var(--chat--color-font);
            resize: none;
            font-family: inherit;
            font-size: 14px;
        }
    
        .custom-chat-widget .chat-input textarea::placeholder {
            color: var(--chat--color-font);
            opacity: 0.6;
        }
    
        .custom-chat-widget .chat-input button {
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            border-radius: 8px;
            padding: 0 20px;
            cursor: pointer;
            transition: transform 0.2s;
            font-family: inherit;
            font-weight: 500;
        }
    
        .custom-chat-widget .chat-input button:hover {
            transform: scale(1.05);
        }
    
        .custom-chat-widget .chat-toggle {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 60px;
            height: 60px;
            border-radius: 30px;
            background: linear-gradient(135deg, var(--chat--color-primary) 0%, var(--chat--color-secondary) 100%);
            color: white;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 12px rgba(133, 79, 255, 0.3);
            z-index: 999;
            transition: transform 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
        }
    
        .custom-chat-widget .chat-toggle.position-left {
            right: auto;
            left: 20px;
        }
    
        .custom-chat-widget .chat-toggle:hover {
            transform: scale(1.05);
        }
    
        .custom-chat-widget .chat-toggle svg {
            width: 24px;
            height: 24px;
            fill: currentColor;
        }
    
        .custom-chat-widget .chat-footer {
            padding: 8px;
            text-align: center;
            background: var(--chat--color-background);
            border-top: 1px solid rgba(133, 79, 255, 0.1);
        }
    
        .custom-chat-widget .chat-footer a {
            color: var(--chat--color-primary);
            text-decoration: none;
            font-size: 12px;
            opacity: 0.8;
            transition: opacity 0.2s;
            font-family: inherit;
        }
    
        .custom-chat-widget .chat-footer a:hover {
            opacity: 1;
        }
        
        .chat-message.bot {
            display: flex;
            align-items: flex-start;
        }        
        
        .typing-indicator .bot-text {
            font-style: italic;
            opacity: 0.7;
        }
        .clear-history-btn {
            display: flex;
            background-color: transparent;
            border: none;
            padding: 8px 12px;
            cursor: pointer;
            width: 48px;
        }
        
    `;
    
    // Inject styles
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
    
    // Default configuration
    const defaultConfig = {
        webhook: {
            url: '',
            route: ''
        },
        branding: {
            logo: '',
            name: '',
            welcomeText: '',
            responseTimeText: '',
            poweredBy: {
                text: '',
                link: ''
            }
        },
        style: {
            primaryColor: '',
            secondaryColor: '',
            position: 'right',
            backgroundColor: '#ffffff',
            fontColor: '#333333'
        }
    };
    
    // Merge user config with defaults
    const config = window.ChatWidgetConfig ? 
        {
            webhook: { ...defaultConfig.webhook, ...window.ChatWidgetConfig.webhook },
            branding: { ...defaultConfig.branding, ...window.ChatWidgetConfig.branding },
            style: { ...defaultConfig.style, ...window.ChatWidgetConfig.style }
        } : defaultConfig;
    
    // Prevent multiple initializations
    if (window.customChatWidgetInitialized) return;
    window.customChatWidgetInitialized = true;
    
    let currentSessionId = '';
    
    // Create widget container
    const widgetContainer = document.createElement('div');
    widgetContainer.className = 'custom-chat-widget';
    
    // Set CSS variables for colors
    widgetContainer.style.setProperty('--custom-chat-primary-color', config.style.primaryColor);
    widgetContainer.style.setProperty('--custom-chat-secondary-color', config.style.secondaryColor);
    widgetContainer.style.setProperty('--custom-chat-background-color', config.style.backgroundColor);
    widgetContainer.style.setProperty('--custom-chat-font-color', config.style.fontColor);
    
    const chatContainer = document.createElement('div');
    chatContainer.className = `chat-container${config.style.position === 'left' ? ' position-left' : ''}`;
    
    const newConversationHTML = `
        <div class="brand-header">
            <img src="${config.branding.logo}" alt="${config.branding.name}">
            <span>${config.branding.name}</span>
            <button class="close-button">×</button>
        </div>
        <div class="new-conversation">
            <h2 class="welcome-text">${config.branding.welcomeText}</h2>
            <button class="new-chat-btn">
                <svg class="message-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H5.2L4 17.2V4h16v12z"/>
                </svg>
                Ställ en fråga till oss
            </button>
            <p class="response-text">${config.branding.responseTimeText}</p>
        </div>
    `;
    
    const chatInterfaceHTML = `
        <div class="chat-interface">
            <div class="brand-header">
                <img src="${config.branding.logo}" alt="${config.branding.name}">
                <span>${config.branding.name}</span>
                <button class="close-button">×</button>
                
            </div>
            
            <div class="chat-messages"></div>
            <button class="clear-history-btn"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-trash" viewBox="0 0 16 16">
  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
  <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
</svg></button>
            <div class="chat-input">
                <textarea placeholder="Skriv ditt meddelande här..." rows="1"></textarea>
                <button type="submit">Skicka</button>
            </div>
            <div class="chat-footer">
                <a href="${config.branding.poweredBy.link}" target="_blank">${config.branding.poweredBy.text}</a>
            </div>
        </div>
    `;
    
    chatContainer.innerHTML = newConversationHTML + chatInterfaceHTML;
    
    const toggleButton = document.createElement('button');
    toggleButton.className = `chat-toggle${config.style.position === 'left' ? ' position-left' : ''}`;
    toggleButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M12 2C6.477 2 2 6.477 2 12c0 1.821.487 3.53 1.338 5L2.5 21.5l4.5-.838A9.955 9.955 0 0012 22c5.523 0 10-4.477 10-10S17.523 2 12 2zm0 18c-1.476 0-2.886-.313-4.156-.878l-3.156.586.586-3.156A7.962 7.962 0 014 12c0-4.411 3.589-8 8-8s8 3.589 8 8-3.589 8-8 8z"/>
        </svg>`;
    
    widgetContainer.appendChild(chatContainer);
    widgetContainer.appendChild(toggleButton);
    document.body.appendChild(widgetContainer);
    
    const newChatBtn = chatContainer.querySelector('.new-chat-btn');
    const clearHistoryBtn = chatContainer.querySelector('.clear-history-btn');
    clearHistoryBtn.addEventListener('click', clearChatHistory);
    const chatInterface = chatContainer.querySelector('.chat-interface');
    const messagesContainer = chatContainer.querySelector('.chat-messages');
    const textarea = chatContainer.querySelector('textarea');
    const sendButton = chatContainer.querySelector('button[type="submit"]');
    if (localStorage.getItem('chatHistory') && localStorage.getItem('currentSessionId')) {
    currentSessionId = localStorage.getItem('currentSessionId');
    chatContainer.querySelector('.brand-header').style.display = 'none';
    chatContainer.querySelector('.new-conversation').style.display = 'none';
    chatInterface.classList.add('active');
    loadChatHistory();
}
    
    function generateUUID() {
        return crypto.randomUUID();
    }

    function saveMessage(role, content) {
    const history = JSON.parse(localStorage.getItem('customChatHistory')) || [];
    history.push({ role, content });
    localStorage.setItem('customChatHistory', JSON.stringify(history));
}

function saveChatHistory() {
    const messages = Array.from(messagesContainer.children).map(msg => ({
        sender: msg.classList.contains('user') ? 'user' : 'bot',
        message: msg.textContent
    }));

    localStorage.setItem('chatHistory', JSON.stringify(messages));
    localStorage.setItem('currentSessionId', currentSessionId);
}

function loadChatHistory() {
    const history = JSON.parse(localStorage.getItem('chatHistory') || '[]');
    history.forEach(msg => {
        const messageDiv = document.createElement('div');
        messageDiv.className = `chat-message ${msg.sender}`;
        messageDiv.textContent = msg.message;
        messagesContainer.appendChild(messageDiv);
    });
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function appendUserMessage(message) {
    const userMessageDiv = document.createElement('div');
    userMessageDiv.className = 'chat-message user';
    userMessageDiv.textContent = message;
    messagesContainer.appendChild(userMessageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    saveMessage('user', message);
    saveChatHistory();
}

function appendBotMessage(message) {
    const botMessageDiv = document.createElement('div');
    botMessageDiv.className = 'chat-message bot';
    botMessageDiv.innerHTML = `
        <div class="bot-text">${message}</div>
    `;
    messagesContainer.appendChild(botMessageDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    saveMessage('bot', message);
    saveChatHistory();
}

function showTypingIndicator() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'chat-message bot typing-indicator';
    typingDiv.innerHTML = `
        <div class="bot-text">Skriver...</div>
    `;
    typingDiv.id = 'typing-indicator';
    messagesContainer.appendChild(typingDiv);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

function hideTypingIndicator() {
    const typing = document.getElementById('typing-indicator');
    if (typing) {
        typing.remove();
    }
}

function clearChatHistory() {
    localStorage.removeItem('chatHistory');
    localStorage.removeItem('currentSessionId');
    messagesContainer.innerHTML = '';
    currentSessionId = '';
    chatContainer.querySelector('.chat-interface').classList.remove('active');
    chatContainer.querySelector('.brand-header').style.display = '';
    chatContainer.querySelector('.new-conversation').style.display = '';
}

    
    async function startNewConversation() {
    currentSessionId = generateUUID();
    localStorage.setItem('currentSessionId', currentSessionId);
    localStorage.setItem('customChatSessionId', currentSessionId);
    localStorage.setItem('customChatHistory', JSON.stringify([])); // Start empty

    const data = [{
        action: "loadPreviousSession",
        sessionId: currentSessionId,
        route: config.webhook.route,
        metadata: {
            userId: ""
        }
    }];

    try {
        const response = await fetch(config.webhook.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const responseData = await response.json();
        chatContainer.querySelector('.brand-header').style.display = 'none';
        chatContainer.querySelector('.new-conversation').style.display = 'none';
        chatInterface.classList.add('active');

        const message = Array.isArray(responseData) ? responseData[0].output : responseData.output;
        appendBotMessage(message);
    } catch (error) {
        console.error('Error:', error);
    }
}

    
async function sendMessage(message) {
    const messageData = {
        action: "sendMessage",
        sessionId: currentSessionId,
        route: config.webhook.route,
        chatInput: message,
        metadata: {
            userId: ""
        }
    };

    appendUserMessage(message);
    showTypingIndicator();

    try {
        const response = await fetch(config.webhook.url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageData)
        });

        const data = await response.json();
        hideTypingIndicator();

        const botReply = Array.isArray(data) ? data[0].output : data.output;
        appendBotMessage(botReply);
    } catch (error) {
        console.error('Error:', error);
    }
}

    
    newChatBtn.addEventListener('click', startNewConversation);
    
    sendButton.addEventListener('click', () => {
        const message = textarea.value.trim();
        if (message) {
            sendMessage(message);
            textarea.value = '';
        }

        
    });
    
    textarea.addEventListener('keypress', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            const message = textarea.value.trim();
            if (message) {
                sendMessage(message);
                textarea.value = '';
            }
        }
    });
    
    toggleButton.addEventListener('click', () => {
        chatContainer.classList.toggle('open');
    });
    
    // Add close button handlers
    const closeButtons = chatContainer.querySelectorAll('.close-button');
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            chatContainer.classList.remove('open');
        });
    });
    })();
