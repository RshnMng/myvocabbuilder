import { Link } from "react-router-dom";

export default function PathOption(props) {
  let { url, title } = props;
  return (
    <>
      <Link to={url}>
        <button>{title}</button>
      </Link>
    </>
  );
}
