import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <>
      <div>Welcome to Vocab Trainer</div>
      <Link to="/home">
        <button>Enter</button>
      </Link>
    </>
  );
}
