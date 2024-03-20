import { Link } from "react-router-dom";

export default function FeatureCard(props) {
  let { title, link } = props;
  return (
    <>
      <Link to={link}>
        <div className="col-12 welcome-cards">{title}</div>
      </Link>
    </>
  );
}
