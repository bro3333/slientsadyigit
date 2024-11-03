document.addEventListener('DOMContentLoaded', () => {
    const chatBody = document.querySelector('.chat-body');
    const sendMessageBtn = document.getElementById('send-message');
    const messageInput = document.querySelector('.message-input');


    const enterButton = document.getElementById('button');
    
    if (enterButton) {
        enterButton.addEventListener('click', (e) => {
            e.preventDefault();
            console.log("Enter butonuna tıklandı.");
            window.location.href = 'login.html'; // Yönlendirme
        });
    } else {
        console.error("Enter butonu bulunamadı. 'enter' ID'sini kontrol edin.");
    }

    const API_KEY = "AIzaSyARHBU6dyvVEp71zvrsdRSexZ2z_wl9QD4"; 
    const API_URL = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;

    sendMessageBtn.addEventListener('click', async (event) => {
        event.preventDefault();

        // Kullanıcı mesajını al
        const userMessage = messageInput.value.trim();
        if (userMessage === '') return; // Mesaj yoksa işlemi durdur

        // Kullanıcı mesajını chat alanına ekle
        const userMessageDiv = document.createElement('div');
        userMessageDiv.classList.add('message', 'user-message');
        userMessageDiv.innerHTML = `<div class="message-text">${userMessage}</div>`;
        chatBody.appendChild(userMessageDiv);

        const botMessageDiv = document.createElement('div');
        botMessageDiv.classList.add('message', 'bot-message');
        botMessageDiv.innerHTML = `
            <div class="message-text">
                <div class="thinking-indicator">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
            </div>`;
        chatBody.appendChild(botMessageDiv);

        // Mesaj alanını temizle
        messageInput.value = '';

        // Bot yanıtını al
        await generateBotResponse(botMessageDiv, userMessage);
        chatBody.scrollTop = chatBody.scrollHeight;
    });

    // Bot yanıtını oluşturma fonksiyonu
    const generateBotResponse = async (botMessageDiv, userMessage) => {
        const messageElement = botMessageDiv.querySelector(".message-text");

        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                contents: [{
                    parts: [{ text: userMessage }]
                }]
            })
        };

        try {
            const response = await fetch(API_URL, requestOptions);
            const data = await response.json();
            if (!response.ok) throw new Error(data.error.message);

            const apiResponseText = data.candidates[0]?.content?.parts[0]?.text?.trim() || "Yanıt alınamadı.";
            messageElement.innerText = apiResponseText;

            // Mesaj alanını temizle (Yanıt alındıktan sonra)
            messageInput.value = '';

        } catch (error) {
            messageElement.innerText = "Hata: " + error.message;
            console.log(error);
        }
    };
});





