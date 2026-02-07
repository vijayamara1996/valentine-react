import { useState, useEffect } from "react";
import "./styles.css";

export default function App() {
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const messages = [
    "Are you sure?",
    "Really sure??",
    "Are you positive?",
    "Pookie please...",
    "Just think about it!",
    "If you say no, I will be really sad...",
    "I will be very sad...",
    "I will be very very very sad...",
    "Ok fine, I will stop asking...",
    "Just kidding, say yes please! ❤️"
  ];

  const [messageIndex, setMessageIndex] = useState(0);
  const [yesSize, setYesSize] = useState(1.5);
  const [noText, setNoText] = useState("No");
  const yesSound = new Audio("/yes.mp3");
  const noSound = new Audio("/no.mp3");



  useEffect(() => {
    const checkForUpdates = async () => {
      try {
        const res = await fetch(
          "https://raw.githubusercontent.com/ivysone/Will-you-be-my-Valentine-/main/version.json"
        );
        if (!res.ok) return;
        const data = await res.json();
        if (data.version !== "1.0") {
          alert(data.updateMessage);
        }
      } catch (err) {
        console.error(err);
      }
    };

    checkForUpdates();
  }, []);

  const handleNoClick = () => {
    noSound.play();
    setNoText(messages[messageIndex]);
    setMessageIndex((prev) => (prev + 1) % messages.length);
    setYesSize((prev) => prev * 1.3);
  };

  const handleYesClick = () => {
    yesSound.play();
    setTimeout(() => {
      window.location.href = "/yes_page.html";
    }, 500);
  };

  return (
    <div className="container">
      <h1>Will you be my Valentine?</h1>

      <div className="buttons">
        <button
          className="yes-button"
          style={{ fontSize: `${yesSize}em` }}
          onClick={handleYesClick}
        >
          Yes
        </button>

        <button
          className="no-button"
          style={{
            transform: `translate(${noPos.x}px, ${noPos.y}px)`
          }}
          onMouseEnter={() => {
            const x = Math.random() * 200 - 100;
            const y = Math.random() * 200 - 100;
            setNoPos({ x, y });
          }}
          onClick={handleNoClick}
        >
          {noText}
        </button>

      </div>

      <div className="gif_container">
        <img
          src="https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbW5lenZyZHI5OXM2eW95b3pmMG40cWVrMDhtNjVuM3A4dGNxa2g2dSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/VM1fcpu2bKs1e2Kdbj/giphy.gif"
          alt="Cute GIF"
        />
      </div>
      <div className="hearts">
        {Array.from({ length: 15 }).map((_, i) => (
          <span key={i}>💖</span>
        ))}
      </div>

    </div>
  );
}
