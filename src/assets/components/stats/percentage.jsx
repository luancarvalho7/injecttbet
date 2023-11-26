export function Percentage({ value }) {
    let className = "statsPercentage";
  
    if (value > 10) {
      className += " sp-good";
    } else if (value > 0 && value <= 10) {
      className += " sp-medium";
    } else {
      className += " sp-bad";
    }
  
    return (
      <div className={className}>
        <h1>{value > 0 ? `+${value}%` : `${value}%`}</h1>
      </div>
    );
  }
  