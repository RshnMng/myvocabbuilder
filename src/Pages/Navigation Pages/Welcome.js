import { Link } from "react-router-dom";

export default function Welcome() { // home page that has a welcome div to the user and a button that links to the home page
  return (
    <>
      <div>Welcome to Vocab Trainer</div>
      <Link to="/home">
        <button>Enter</button>
      </Link>
    </>
  );
}
