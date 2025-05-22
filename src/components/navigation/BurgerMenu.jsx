export default function BurgerMenu({ isOpen, onClick }) {
  return (
    <button
      className="md:hidden flex flex-col justify-center items-center w-8 h-8 space-y-1.5 group cursor-pointer"
      onClick={onClick}
      aria-label={isOpen ? "Close menu" : "Open menu"}
    >
      <span
        className={`block w-8 h-0.5 bg-white transform transition-all duration-300 ease-in-out ${
          isOpen ? "rotate-45 translate-y-2" : ""
        }`}
      />
      <span
        className={`block w-8 h-0.5 bg-white transform transition-all duration-300 ease-in-out ${
          isOpen ? "opacity-0 translate-x-3" : ""
        }`}
      />
      <span
        className={`block w-8 h-0.5 bg-white transform transition-all duration-300 ease-in-out ${
          isOpen ? "-rotate-45 -translate-y-2" : ""
        }`}
      />
    </button>
  );
}
