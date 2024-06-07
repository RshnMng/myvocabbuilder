import { Link } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "../../App";

export default function PathOption(props) {
  let { url, title } = props; // gets url and button title passed in  through props and destructures them into variables to be used later
  let appState = useContext(AppContext); // gets appState from App file - saves it into appState variable
  let allDecksEmpty = appState.allDecksEmpty; // gets alldecksempty from appstate

  return (
    <>
      <Link to={url}>
        {/* takes the url so on click the user is directed to that page  */}
        {title === "See Study Decks" && allDecksEmpty === true ? ( // checks to see if all the decks are empty, if so it disables the go to study deck button and adds the class disabled-btn so we can style it later on in css
          <button disabled className="disabled-btn">
            {title}
          </button>
        ) : (
          <button>{title}</button> // shows regular button if not study deck button or if local storage decks arent empty
        )}
        {/* sets the title of button for each button  */}
      </Link>
    </>
  );
}
