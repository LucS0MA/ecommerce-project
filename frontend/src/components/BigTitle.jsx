import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import Trompignon from "./animations/svg/Trompignon";
import Star from "./animations/svg/Star";
import "../styles/BigTitle.scss";
import AnimatedText from "./animations/AnimatitedText";

function BigTitle() {
  const titleRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline();
    tl.to("#imagine", {
      backgroundClip: "text",
      background: `linear-gradient(
        180deg,
        rgb(235, 232, 225) 0%,
        rgba(226, 185, 91, 1) 65%
      )`,
      duration: 1.5,
      scale: 1,
    })
      .to("#dream span", {
        backgroundClip: "text",
        background: `linear-gradient(
        0deg,
        rgba(189, 201, 172, 0.192) 20%,
        rgba(189, 201, 172, 0.774) 69%
      )`,
        duration: 1,
        stagger: 0.1,
      })
      .to(
        "#create span",
        {
          backgroundClip: "text",
          background: `linear-gradient(
          0deg,
          rgba(189, 201, 172, 0.192) 20%,
          rgba(189, 201, 172, 0.774) 69%
          )`,
          duration: 1,
          stagger: 0.1,
        },
        "-=0.5"
      );
  }, []);

  return (
    <div id="bigTitle" ref={titleRef}>
      <h1 className="yellowTitle" id="imagine">
        Imaginez
      </h1>
      <AnimatedText text="Rêvez" className="greenTitle" id="dream" />
      <AnimatedText text="Créez" className="greenTitle" id="create" />
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
