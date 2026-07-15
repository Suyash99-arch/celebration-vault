let clockInterval = null;

export function startLiveClock() {

    const dateElement = document.getElementById("currentDate");

    const timeElement = document.getElementById("currentTime");

    const greeting = document.getElementById("heroGreeting");

    if (!dateElement || !timeElement) return;

    if (clockInterval) {

        clearInterval(clockInterval);

    }

    function updateClock() {

        const now = new Date();

        const hour = now.getHours();

        let greet = "Good Evening 🌙";

        if (hour < 12) {

            greet = "Good Morning ☀️";

        }

        else if (hour < 17) {

            greet = "Good Afternoon 🌤";

        }

        else if (hour < 20) {

            greet = "Good Evening 🌆";

        }

        if (greeting) {

            greeting.textContent = greet;

        }

        dateElement.textContent =

            now.toLocaleDateString("en-IN",{

                weekday:"long",

                day:"numeric",

                month:"long",

                year:"numeric"

            });

        timeElement.textContent =

            now.toLocaleTimeString("en-IN",{

                hour:"2-digit",

                minute:"2-digit",

                second:"2-digit"

            });

    }

    updateClock();

    clockInterval = setInterval(updateClock,1000);

}