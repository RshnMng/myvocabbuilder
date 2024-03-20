export default function FeatureCard(props) {
  let { title } = props;
  return (
    <>
      <div className="col-4 welcome-cards">{title}</div>
    </>
  );
}
