
import memo from '../assets/memory.jpg'
function Card({ card, handleChoice, flipped, disabled }) {
  const handleClick = () => {
    if (!disabled) handleChoice(card);
  };

  return (
    <div
      className={`relative w-24 h-24 cursor-pointer ${
        flipped ? "" : "hover:scale-105"
      } transition-transform`}
      onClick={handleClick}
    >
      <div
        className={`absolute inset-0 flex items-center justify-center rounded-lg shadow-md ${
          flipped ? "bg-white" : "bg-blue-800"
        }`}
      >
        {flipped ? (
          <img src={card.src} alt="card" className="w-16 h-16" />
        ) : (
          <span className="text-2xl">😆</span>
        )}
      </div>
    </div>
  );
}
export default Card