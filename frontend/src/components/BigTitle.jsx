import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Trompignon from "../svg/Trompignon";
import Star from "../svg/Star";
import "../styles/BigTitle.scss";

function BigTitle() {
  const titleRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from("#imagine", {
      opacity: "0",
      duration: 1.5,
      scale: 0,
    }).from(["#dream", "#create"], {
      opacity: 0,
      duration: 1,
      stagger: 1,
    });
  }, []);

  return (
    <div id="bigTitle" ref={titleRef}>
      <h1 className="linear-text yellowTitle" id="imagine">
        Imaginez
      </h1>
      <h2 className="linear-text greenTitle" id="dream">
        Rêvez
      </h2>
      <h2 className="linear-text greenTitle" id="create">
        Créez
      </h2>
      <div id="trompignonContainer">
        <button id="exploreButton" type="button">
          EXPLORER LE CATALOGUE
        </button>
        <Trompignon />
      </div>
      <Star starClassname="star1" />
      <Star starClassname="star2" />
    </div>
  );
}

export default BigTitle;
