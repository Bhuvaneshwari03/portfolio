document.addEventListener('DOMContentLoaded', () => {
    // Navigation toggle
    const navToggle = document.querySelector('.nav-toggle');
    const sideNav = document.querySelector('.side-nav');
    
    navToggle.addEventListener('click', () => {
        sideNav.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Active link highlighting
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observerCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    sections.forEach(section => observer.observe(section));

    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!sideNav.contains(e.target) && !navToggle.contains(e.target)) {
            sideNav.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });

    // Theme toggle functionality removed

    // Skill bars animation
    const skillBars = document.querySelectorAll('.skill-bar');
    
    const skillObserverOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.2
    };
    
    const skillObserverCallback = (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillBar = entry.target;
                const skillLevel = skillBar.getAttribute('data-level');
                skillBar.style.width = `${skillLevel}%`;
                
                // Add a class to indicate animation has started
                skillBar.classList.add('animated');
                
                // Unobserve after animation
                skillObserver.unobserve(skillBar);
            }
        });
    };
    
    const skillObserver = new IntersectionObserver(skillObserverCallback, skillObserverOptions);
    skillBars.forEach(bar => skillObserver.observe(bar));

    // DOM Elements
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');
    const chatMessages = document.getElementById('chat-messages');

    // Chat history to maintain context
    let chatHistory = [
        {
            role: 'assistant',
            content: 'Hi there! I\'m Bhuvaneshwari, a Full-Stack Developer. Feel free to ask me anything about my projects, skills, or experience. How can I help you today?'
        }
    ];

    // Predefined responses for common questions
    const predefinedResponses = {
        'projects': 'I have several projects including a Tax Assistant built with TypeScript, a GST Bill Estimation system using HTML/CSS/PHP, and a Scratch Animation project. You can find all of them on my GitHub profile!',
        'skills': 'My technical skills include Java, SQL, HTML, and React. I\'m also proficient with tools like GitHub and VS Code.',
        'experience': 'I\'m a Full-Stack Developer with experience in building web applications. I\'ve worked on projects involving tax calculations, billing systems, and more.',
        'contact': 'You can reach me through LinkedIn or GitHub. Feel free to connect with me!',
        'github': 'You can find my GitHub profile at https://github.com/Bhuvaneshwari03',
        'linkedin': 'You can connect with me on LinkedIn at https://www.linkedin.com/in/bhuvaneshwari-g-51675724b',
        'leetcode': 'Check out my LeetCode profile at https://leetcode.com/u/49wF5B4bOO/',
        'hackerrank': 'You can find me on HackerRank at https://www.hackerrank.com/profile/24MCR013'
    };

    // Function to add a message to the chat
    function addMessage(content, isUser = false) {
        // Create message element
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message');
        messageDiv.classList.add(isUser ? 'user-message' : 'bot-message');
        
        // Create message content
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        
        // Create paragraph for message text
        const messageText = document.createElement('p');
        messageText.textContent = content;
        messageContent.appendChild(messageText);
        
        // Create timestamp
        const messageTime = document.createElement('div');
        messageTime.classList.add('message-time');
        messageTime.textContent = getCurrentTime();
        
        // Assemble message
        messageDiv.appendChild(messageContent);
        messageDiv.appendChild(messageTime);
        
        // Add to chat
        chatMessages.appendChild(messageDiv);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Add to chat history
        chatHistory.push({
            role: isUser ? 'user' : 'assistant',
            content: content
        });
    }

    // Function to get current time in HH:MM format
    function getCurrentTime() {
        const now = new Date();
        return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
    }

    // Function to process user input and generate response
    function processUserInput(userInput) {
        // Convert to lowercase for easier matching
        const input = userInput.toLowerCase();
        
        // Check for predefined responses
        for (const [keyword, response] of Object.entries(predefinedResponses)) {
            if (input.includes(keyword)) {
                return response;
            }
        }
        
        // Default response if no match found
        return "I'm not sure about that. You can ask me about my projects, skills, experience, or how to contact me.";
    }

    // Function to simulate AI response with typing effect
    function simulateAIResponse(response) {
        // Show typing indicator
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
        typingIndicator.innerHTML = '<div class="message-content"><p>Typing...</p></div>';
        chatMessages.appendChild(typingIndicator);
        chatMessages.scrollTop = chatMessages.scrollHeight;
        
        // Remove typing indicator after delay and show response
        setTimeout(() => {
            chatMessages.removeChild(typingIndicator);
            addMessage(response);
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }

    // Event listeners
    sendButton.addEventListener('click', sendMessage);
    chatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });

    // Function to send message
    function sendMessage() {
        const message = chatInput.value.trim();
        
        if (message) {
            // Add user message to chat
            addMessage(message, true);
            
            // Clear input
            chatInput.value = '';
            
            // Process and respond
            const response = processUserInput(message);
            simulateAIResponse(response);
        }
    }

    // Contact Form Functionality
    const contactForm = document.getElementById('contact-form');
    const formSuccess = document.getElementById('form-success');
    
    if (contactForm) {
        contactForm.addEventListener('submit', handleFormSubmit);
    }
    
    function handleFormSubmit(e) {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            message: document.getElementById('message').value
        };
        
        // Show loading state
        const submitButton = contactForm.querySelector('.submit-button');
        const originalButtonText = submitButton.innerHTML;
        submitButton.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
        submitButton.disabled = true;
        
        // COMMENT: EmailJS Integration
        /*
        To integrate with EmailJS:
        
        1. First, add the EmailJS SDK to your HTML file:
        <script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
        
        2. Initialize EmailJS with your user ID:
        emailjs.init("YOUR_USER_ID");
        
        3. Replace the setTimeout below with this code:
        
        emailjs.send(
            "YOUR_SERVICE_ID", // Email service ID from EmailJS
            "YOUR_TEMPLATE_ID", // Email template ID from EmailJS
            {
                from_name: formData.name,
                from_email: formData.email,
                message: formData.message,
                to_email: "bhuvaneshwariganeshraj@gmail.com"
            }
        )
        .then(
            function(response) {
                console.log("SUCCESS", response);
                showSuccessMessage();
            },
            function(error) {
                console.log("FAILED", error);
                alert("Failed to send message. Please try again later.");
                resetForm();
            }
        );
        */
        
        // Simulate sending email (replace with actual EmailJS integration)
        setTimeout(() => {
            // Reset button state
            submitButton.innerHTML = originalButtonText;
            submitButton.disabled = false;
            
            // Show success message
            contactForm.style.display = 'none';
            formSuccess.style.display = 'flex';
            
            // Reset form
            contactForm.reset();
            
            // Hide success message after 5 seconds and show form again
            setTimeout(() => {
                formSuccess.style.display = 'none';
                contactForm.style.display = 'flex';
            }, 5000);
        }, 1500);
    }

    // COMMENT: API Integration
    /*
    To integrate with an AI API like OpenAI:

    1. Replace the processUserInput function with an API call:

    async function processUserInput(userInput) {
        try {
            const response = await fetch('https://api.openai.com/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_API_KEY'
                },
                body: JSON.stringify({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'You are Bhuvaneshwari, a Full-Stack Developer. Answer questions about your projects, skills, and experience based on the portfolio information.'
                        },
                        ...chatHistory,
                        {
                            role: 'user',
                            content: userInput
                        }
                    ],
                    max_tokens: 150
                })
            });
            
            const data = await response.json();
            return data.choices[0].message.content;
        } catch (error) {
            console.error('Error calling AI API:', error);
            return "I'm having trouble connecting right now. Please try again later.";
        }
    }

    2. Update the sendMessage function to handle async responses:

    async function sendMessage() {
        const message = chatInput.value.trim();
        
        if (message) {
            // Add user message to chat
            addMessage(message, true);
            
            // Clear input
            chatInput.value = '';
            
            // Show typing indicator
            const typingIndicator = document.createElement('div');
            typingIndicator.classList.add('message', 'bot-message', 'typing-indicator');
            typingIndicator.innerHTML = '<div class="message-content"><p>Typing...</p></div>';
            chatMessages.appendChild(typingIndicator);
            chatMessages.scrollTop = chatMessages.scrollHeight;
            
            // Process and respond
            const response = await processUserInput(message);
            
            // Remove typing indicator and show response
            chatMessages.removeChild(typingIndicator);
            addMessage(response);
        }
    }
    */
}); 