import PathOption from "../../Components/Navigation Components/PathOption";
import { Link } from "react-router-dom";

export default function HomePage() { // page uses the PathOption components for its button structure and passes url and title info as props to be used inside each pathoption
  return (
    <>
      <PathOption url="/word-search" title="Search a Word"></PathOption>
      <PathOption url="/vocab-section-home" title="Enter Vocab Trainer"></PathOption>
      <PathOption url="/study-deck-home" title="See Study Decks"></PathOption>
    </>
  );
}
