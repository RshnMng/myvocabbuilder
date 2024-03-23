// import react from "react";
import { Link } from "react-router-dom";

export default function Trainer() {
  return (
    <>
      <div className="container-fluid d-flex flex-wrap">
        <Link to="/studydeck" className="col-6">
          <div className="col-12 deck-section">
            <div className="col-12 deck-title">Study Deck</div>
          </div>
        </Link>
        <Link to="/favorites" className="col-6">
          <div className="col-12 deck-section">
            <div className="col-12 deck-title">Favorites Deck</div>
          </div>
        </Link>
        <Link to="/struggledeck" className="col-6">
          <div className="col-12 deck-section">
            <div className="col-12 deck-title">Struggle Deck</div>
          </div>
        </Link>
        <Link to="/dojo" className="col-6">
          <div className="col-12 deck-section">
            <div className="col-12 deck-title">Vocab Dojo</div>
          </div>
        </Link>
      </div>
    </>
  );
}
