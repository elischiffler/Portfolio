import "./GlassIcons.css";

const gradientMapping = {
  blue: "linear-gradient(hsl(223, 90%, 50%), hsl(208, 90%, 50%))",
};

const GlassIcons = ({ items, className, link }) => {
  const getBackgroundStyle = (color) => {
    if (gradientMapping[color]) {
      return { background: gradientMapping[color] };
    }
    return { background: color };
  };

  return (
    <div className={`icon-btns ${className || ""}`}>
      {items.map((item, index) => (
        <button
          key={index}
          onClick={item.onClick}
          className={`icon-btn ${item.customClass || ""}`}
          aria-label={item.label}
          type="button"
        >
          <span
            className="icon-btn__back"
            style={getBackgroundStyle(item.color)}
          ></span>
          <span className="icon-btn__front">
            <span className="icon-btn__icon" aria-hidden="true">
              {item.icon}
            </span>
          </span>
          <span className="icon-btn__label">{item.label}</span>
        </button>
      ))}
    </div>
  );
};

export default GlassIcons;
