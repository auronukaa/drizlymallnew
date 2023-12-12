import { useState } from "react";
import Confetti from "./Confetti";

export default function ConfettiLayout() {
  const [isVisible, setIsVisible] = useState(true);

  return <>{isVisible && <Confetti />}</>;
}
