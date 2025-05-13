document.addEventListener('DOMContentLoaded', function() {
    const chatBox = document.getElementById('chat-box');
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const suggestionChips = document.querySelectorAll('.chip');
    
    // College data for the chatbot to use
    const collegeData = {
        name: "Government Engineering College, Bharatpur",
        established: "2007",
        location: "GOVT. ENGINEERING COLLEGE BHARATPUR Village Shyorana N.H. 11, Bharatpur (Raj.) Pin- 321303",
        contact: {
            phone: "5644234911",
            email: "Principal.gecbharatpur@gmail.com",
            website: "www.gecbharatpur.ac.in",
        },
        courses: [
            "Computer Science Engineering",
            "Electrical Engineering",
            "Mechanical Engineering",
            "Electronics Engineering",
            "Civil Engineering",
            "Artificial Intelligence"
        ],
        facilities: [
            "Modern Library with over 50,000 books",
            "Computer Labs with high-speed internet",
            "Sports Complex with indoor and outdoor facilities",
            "Student Cafeteria",
            "On-campus Hostel accommodation",
            "24/7 Medical Center",
            "Career Counseling Center"
        ],
        admissionProcess: "The admission process starts in May each year. Students need to fill out the application form online, submit required documents, and appear for an entrance test followed by an interview.",
        fees: {
            "Computer Science Engineering": "60,000 per year+Exam Fee",
            "Electrical Engineering": "60,500 per year+Exam Fee",
            "Mechanical Engineering": "60,000 per year+Exam Fee",
            "Civil Engineering": "60,000 per year+Exam Fee",
            "Electronics Engineering": "60,500 per year+Exam Fee"
        },
        faculty: "We have over 150 highly qualified faculty members, with 80% holding Ph.D. degrees from prestigious universities worldwide.",
        achievements: "Our college has been ranked among the top 50 institutions Registered under Rajasthan Technical University for 5 consecutive years. Our research papers have been published in renowned international journals.",
        scholarships: [
            "Rajasthan Post Matric Scholarship for SC/ST and OBC-BPL",
            "CM Higher Education Scholarship",
            "Post Matric Scholarships under the Ministry of Labour & Employment",
            "Rajasthan Police Scholarship",
            "Railway Scholarship",
            "U.P. Scholarship for SC/ST and Gen",
            "National Scholarship: (a) Post Matric Minority Scholarship (b) Central Sector Scheme of Scholarship (c) Merit-cum-means Scholarship",
            "Reliance Foundation Undergraduate Scholarships 2024",
            "PM-USP Central Sector Scheme of Scholarship for College and University Students",
            "Kotak Kanya Scholarship 2024"
        ]
    };
    
    // Greet the user when the page loads
    setTimeout(() => {
        addBotMessage(`Hello! Welcome to ${collegeData.name} chatbot. How can I help you today?`);
    }, 500);
    
    // Event listeners
    sendBtn.addEventListener('click', handleUserMessage);
    userInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });
    
    // Add click events to suggestion chips
    suggestionChips.forEach(chip => {
        chip.addEventListener('click', function() {
            const chipText = this.textContent;
            userInput.value = chipText;
            handleUserMessage();
        });
    });
    
    // Function to handle user messages
    function handleUserMessage() {
        const message = userInput.value.trim();
        if (message === '') return;
        
        // Add user message to chat
        addUserMessage(message);
        userInput.value = '';
        
        // Show typing indicator
        showTypingIndicator();
        
        // Process the message and respond after a short delay
        setTimeout(() => {
            removeTypingIndicator();
            const botResponse = generateResponse(message);
            addBotMessage(botResponse);
        }, 1000 + Math.random() * 1000); // Random delay between 1-2 seconds
    }
    
    // Function to add user message to chat
    function addUserMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'user-message');
        
        const messageText = document.createElement('div');
        messageText.textContent = message;
        
        const timestamp = document.createElement('div');
        timestamp.classList.add('timestamp');
        timestamp.textContent = getCurrentTime();
        
        messageElement.appendChild(messageText);
        messageElement.appendChild(timestamp);
        
        chatBox.appendChild(messageElement);
        scrollToBottom();
    }
    
    // Function to add bot message to chat
    function addBotMessage(message) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', 'bot-message');
        
        const messageText = document.createElement('div');
        messageText.textContent = message;
        
        const timestamp = document.createElement('div');
        timestamp.classList.add('timestamp');
        timestamp.textContent = getCurrentTime();
        
        messageElement.appendChild(messageText);
        messageElement.appendChild(timestamp);
        
        chatBox.appendChild(messageElement);
        scrollToBottom();
    }
    
    // Function to show typing indicator
    function showTypingIndicator() {
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        typingIndicator.id = 'typing-indicator';
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            typingIndicator.appendChild(dot);
        }
        
        chatBox.appendChild(typingIndicator);
        scrollToBottom();
    }
    
    // Function to remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.getElementById('typing-indicator');
        if (typingIndicator) {
            typingIndicator.remove();
        }
    }
    
    // Function to get current time
    function getCurrentTime() {
        const now = new Date();
        let hours = now.getHours();
        let minutes = now.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        
        return `${hours}:${minutes} ${ampm}`;
    }
    
    // Function to scroll chat to bottom
    function scrollToBottom() {
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    
    // Helper function to check if a string contains any of the words in an array
    function containsAny(str, words) {
        return words.some(word => str.includes(word));
    }
    
    // Function to generate response based on user input
    function generateResponse(userMessage) {
        const message = userMessage.toLowerCase();
        
        // Greetings
        if (containsAny(message, ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'])) {
            return `Hello there! How can I help you with information about ${collegeData.name}?`;
        }
        
        // Thank you responses
        if (containsAny(message, ['thank you', 'thanks', 'thx', 'thank'])) {
            return "You're welcome! Feel free to ask if you have any other questions.";
        }
        
        // Goodbye responses
        if (containsAny(message, ['bye', 'goodbye', 'see you', 'talk later'])) {
            return "Goodbye! Have a great day. Feel free to come back if you have more questions!";
        }
        
        // About the college
        if (containsAny(message, ['about', 'tell me about', 'college', 'institution', 'school'])) {
            return `${collegeData.name} was established in ${collegeData.established} and is located in Bharatpur, Rajasthan. We are known for our excellent engineering programs, state-of-the-art facilities, and dedicated faculty.`;
        }
        
        // Location
        if (containsAny(message, ['where', 'location', 'address', 'situated', 'place'])) {
            return `${collegeData.name} is located in Bharatpur, Rajasthan.`;
        }
        
        // Contact information
        if (containsAny(message, ['contact', 'phone', 'email', 'website', 'reach', 'call'])) {
            return `You can contact us at:\nPhone: ${collegeData.contact.phone}\nEmail: ${collegeData.contact.email}\nWebsite: ${collegeData.contact.website}`;
        }
        
        // Courses offered
        if (containsAny(message, ['course', 'program', 'degree', 'major', 'study', 'subject', 'branch', 'engineering'])) {
            return `We offer the following engineering branches: ${collegeData.courses.join(', ')}.`;
        }
        
        // Specific course inquiries
        if (containsAny(message, ['computer', 'cse', 'cs'])) {
            return `Our Computer Science Engineering program is one of our most popular courses. The fee is ${collegeData.fees["Computer Science Engineering"]}. The program covers programming, algorithms, data structures, software engineering, and more.`;
        }
        
        if (containsAny(message, ['electrical', 'ee'])) {
            return `Our Electrical Engineering program covers power systems, electrical machines, control systems, and more. The fee is ${collegeData.fees["Electrical Engineering"]}.`;
        }
        
        if (containsAny(message, ['mechanical', 'me'])) {
            return `Our Mechanical Engineering program covers thermodynamics, manufacturing processes, machine design, and more. The fee is ${collegeData.fees["Mechanical Engineering"]}.`;
        }
        
        if (containsAny(message, ['electronics', 'ece'])) {
            return `Our Electronics Engineering program covers electronic circuits, communication systems, signal processing, and more. The fee is ${collegeData.fees["Electronics Engineering"]}.`;
        }
        
        if (containsAny(message, ['civil', 'ce'])) {
            return `Our Civil Engineering program covers structural engineering, transportation engineering, environmental engineering, and more. The fee is ${collegeData.fees["Civil Engineering"]}.`;
        }
        
        // Facilities
        if (containsAny(message, ['facility', 'facilities', 'amenities', 'infrastructure', 'campus'])) {
            return `Our campus facilities include: ${collegeData.facilities.join(', ')}.`;
        }
        
        // Hostel inquiries
        if (containsAny(message, ['hostel', 'accommodation', 'dorm', 'stay', 'living'])) {
            return `Yes, we provide on-campus hostel accommodation for both boys and girls. The hostels are equipped with all necessary facilities for comfortable living and studying.`;
        }
        
        // Library inquiries
        if (containsAny(message, ['library', 'book', 'read'])) {
            return `Our modern library has over 50,000 books covering all engineering disciplines, technical journals, and digital resources. It's open from 8 AM to 8 PM on weekdays.`;
        }
        
        // Sports inquiries
        if (containsAny(message, ['sport', 'game', 'play', 'physical', 'activity'])) {
            return `We have a Sports Complex with both indoor and outdoor facilities. Students can participate in cricket, football, basketball, badminton, table tennis, and many other sports.`;
        }
        
        // Admission process
        if (containsAny(message, ['admission', 'apply', 'application', 'enroll', 'entrance', 'how to join'])) {
            return collegeData.admissionProcess;
        }
        
        // Fees
        if (containsAny(message, ['fee', 'fees', 'cost', 'tuition', 'expense', 'pay', 'payment'])) {
            let feeInfo = "Our fee structure is as follows:\n";
            for (const [program, fee] of Object.entries(collegeData.fees)) {
                feeInfo += `${program}: ${fee}\n`;
            }
            return feeInfo;
        }
        
        // Faculty
        if (containsAny(message, ['faculty', 'professor', 'teacher', 'staff', 'lecturer'])) {
            return collegeData.faculty;
        }
        
        // Achievements
        if (containsAny(message, ['achievement', 'award', 'recognition', 'ranking', 'accomplishment'])) {
            return collegeData.achievements;
        }
        
        // Placement inquiries
        if (containsAny(message, ['placement', 'job', 'career', 'company', 'recruit', 'package', 'salary'])) {
            return "Our college has an excellent placement record with many top companies visiting our campus for recruitment. Our students have been placed in companies like TCS, Infosys, Wipro, and many more with competitive packages.";
        }
        
        // RTU inquiries
        if (containsAny(message, ['rtu', 'rajasthan technical university', 'university', 'affiliated'])) {
            return "Yes, our college is affiliated with Rajasthan Technical University (RTU), Kota. All our engineering degrees are awarded by RTU.";
        }
        
        // Scholarships
        if (containsAny(message, ['scholarship', 'financial aid', 'financial assistance', 'stipend', 'grant', 'fund'])) {
            let scholarshipInfo = "We offer various scholarships to support our students. Here are the available scholarships:\n\n";
            collegeData.scholarships.forEach((scholarship, index) => {
                scholarshipInfo += `${index + 1}. ${scholarship}\n`;
            });
            scholarshipInfo += "\nFor more details about eligibility criteria and application process, please visit our college website or contact the scholarship cell.";
            return scholarshipInfo;
        }
        
        // Specific scholarship inquiries
        if (containsAny(message, ['sc', 'st', 'obc', 'post matric'])) {
            return "The Rajasthan Post Matric Scholarship is available for SC/ST and OBC-BPL category students. This scholarship covers tuition fees and maintenance allowance. You need to apply through the state scholarship portal with your caste certificate and income certificate.";
        }
        
        if (containsAny(message, ['cm', 'higher education'])) {
            return "The CM Higher Education Scholarship is provided by the Rajasthan government to meritorious students. It offers financial support to students who have secured good ranks in their qualifying examinations.";
        }
        
        if (containsAny(message, ['reliance', 'foundation'])) {
            return "The Reliance Foundation Undergraduate Scholarships 2024 supports meritorious students from economically weaker sections. It covers tuition fees and provides a stipend for living expenses.";
        }
        
        if (containsAny(message, ['kotak', 'kanya'])) {
            return "The Kotak Kanya Scholarship 2024 is specifically for female students pursuing undergraduate studies. It aims to support girl students from underprivileged backgrounds to complete their education.";}}});