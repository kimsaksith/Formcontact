const telegramBotId = "7224803885:AAFbOTrp-jE95OrHc_ldODkFwSMbdOmbNAI";
const chatId = 473035185; // Replace with your chat ID

async function sendToTelegram() {
    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const tradingViewUsername = document.getElementById("message").value;
    const fileInput = document.getElementById("file");
    const file = fileInput.files[0]; // Get the selected file

    // Validate file
    if (!file) {
        alert("Please select an image to upload.");
        return;
    }
    if (file.size > 50 * 1024 * 1024) {
        alert("File size exceeds 50 MB. Please select a smaller file.");
        return;
    }
    if (!file.type.startsWith("image/")) {
        alert("Invalid file type. Please select an image.");
        return;
    }
    if(!email){
        alert("Wrong email.");
        return;
    }

    const caption = `Name: ${name}\nEmail: ${email}\nTradingView Username: ${tradingViewUsername}`;
    const formData = new FormData();
    formData.append("chat_id", chatId);
    formData.append("caption", caption);
    formData.append("photo", file); // Add the file as 'photo'

    try {
        const response = await fetch(`https://api.telegram.org/bot${telegramBotId}/sendPhoto`, {
            method: "POST",
            body: formData
        });

        const result = await response.json();
        if (result.ok) {
            // Show success message
            const successMessage = document.getElementById("successMessage");
            successMessage.style.display = "block";

            // Clear form fields
            document.getElementById("name").value = "";
            document.getElementById("email").value = "";
            document.getElementById("message").value = "";
            fileInput.value = "";
        } else {
            console.error("Telegram API Error:", result);
            alert(`Error sending image: ${result.description}`);
        }
    } catch (error) {
        console.error("Fetch Error:", error);
        alert("An error occurred while sending the image. Check the console for details.");
    }
    
}
