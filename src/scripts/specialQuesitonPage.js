const yesButton = document.getElementById("yesButton");
const noButton = document.getElementById("noButton");

// Available behaviours
const behaviours = [
    "yesOnly",
    "hiddenYes",
    "prompt",
    "grow",
    "escape"
];

// Randomly select a behaviour
const selectedBehaviour =
    behaviours[Math.floor(Math.random() * behaviours.length)];

console.log("Selected behaviour:", selectedBehaviour);


// YES BUTTON ACTION
function handleYes() {
    alert("You said yes! I'm soo happy... Uhhh I will work on the form so that you can pick a time and every thing. It's gonna take me some time...");
}


// BEHAVIOUR SELECTION
switch (selectedBehaviour) {

    // 1. YES ONLY
    case "yesOnly":

        noButton.style.visibility = "hidden";

        break;


    // 2. HIDDEN YES
    case "hiddenYes":

        noButton.addEventListener("mouseenter", () => {
            noButton.textContent = "Yes";
            noButton.classList.remove("noButton");
            noButton.classList.add("yesButton");
        });

        noButton.addEventListener("mouseleave", () => {
            noButton.textContent = "No";
            noButton.classList.remove("yesButton");
            noButton.classList.add("noButton");
        });

        noButton.addEventListener("click", handleYes);

        break;


    // 3. PROMPT
    case "prompt": {

        const messages = [
            "Wrong button! Try again.",
            "I don't think that's the right answer.",
            "This button doesn't seem to be working, for some reason.",
            "This button is seriously broken. The programmer should do a better job!",
            "Can you try pressing the other button?",
            "Are you sure you want to keep pressing this button?",
            "Would you reconsider pressing the other button?",
            "Can you please give it another thought...",
            "Can I bribe you with sweets?",
            "I'll take you to 'Amadeus Patisserie', its very good!",
            "It's a cake shop! Your favourite type of sweets! Are you sure I can't bribe you with this place?",
            "How about 'Melt n dip Sweets'? It's like an all melted chocolate lovers paradise!",
            "Still saying no? What about a trip to Japan? And we get fat off the sweets over there!",
            "I'm running out of ideas...",
            "Ok... you win!"
        ];

        let messageIndex = 0;

        noButton.addEventListener("click", () => {

            alert(messages[messageIndex]);

            messageIndex = (messageIndex + 1) % messages.length;

        });

        break;
    }


    // 4. GROWING YES
    case "grow": {

        let scale = 1;

        noButton.addEventListener("click", () => {

            scale += 0.25;

            yesButton.style.transform = `scale(${scale})`;

        });

        break;
    }


    // 5. ESCAPING NO BUTTON
    case "escape": {
        const buttonRect = noButton.getBoundingClientRect();

        const placeholder = document.createElement("span");
        placeholder.style.width = `${buttonRect.width}px`;
        placeholder.style.height = `${buttonRect.height}px`;
        placeholder.style.flex = "0 0 auto";

        noButton.replaceWith(placeholder);
        document.body.appendChild(noButton);

        Object.assign(noButton.style, {
            position: "fixed",
            left: `${buttonRect.left}px`,
            top: `${buttonRect.top}px`,
            margin: "0",
            transform: "none",
            zIndex: "9999",
            transition: "left 0.45s ease, top 0.45s ease"
        });

        let isMoving = false;

        document.addEventListener("pointermove", (event) => {
            if (isMoving) return;

            const rect = noButton.getBoundingClientRect();

            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;

            const dx = centerX - event.clientX;
            const dy = centerY - event.clientY;

            const distance = Math.hypot(dx, dy);
            const threshold = 160;

            if (distance < threshold) {
                isMoving = true;

                const moveDistance = 180;

                const nextX = rect.left + (dx / distance) * moveDistance;
                const nextY = rect.top + (dy / distance) * moveDistance;

                const padding = 12;

                const x = Math.max(
                    padding,
                    Math.min(window.innerWidth - rect.width - padding, nextX)
                );

                const y = Math.max(
                    padding,
                    Math.min(window.innerHeight - rect.height - padding, nextY)
                );

                noButton.style.left = `${x}px`;
                noButton.style.top = `${y}px`;

                setTimeout(() => {
                    isMoving = false;
                }, 450);
            }
        });

        break;
    }
}


// YES BUTTON CLICK
yesButton.addEventListener("click", handleYes);