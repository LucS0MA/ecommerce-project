import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import "../styles/Festival.scss";
import Date from "./Date";
import IvyBranch3 from "./animations/svg/IvyBranch3";

gsap.registerPlugin(ScrollTrigger);

function Festival() {
  const ivyFestRef = useRef(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 550px)", () => {
      const tl4 = gsap.timeline({
        scrollTrigger: {
          trigger: "#branch1Fest",
          start: "top center",
          end: "bottom center",
          scrub: 20,
          once: true,
        },
      });

      const childrenIvyFest = ivyFestRef.current.querySelectorAll(
        "path:not(.ivyBranch4)"
      );

      tl4
        .fromTo(
          "#branch1Fest",
          {
            strokeDasharray: 1000,
            strokeDashoffset: 1000,
          },
          {
            strokeDashoffset: 0,
            duration: 5,
          }
        )
        .from(childrenIvyFest, {
          transformOrigin: "bottom",
          opacity: 0,
          scale: 0,
          duration: 2,
          stagger: 0.03,
          delay: -4,
        });
    });
  }, []);

  return (
    <div className="festival">
      <IvyBranch3 BranchID="branch1Fest" IvyRef={ivyFestRef} />
      <div className="festival-container">
        <div className="principal-box">
          <h1>Retrouvez vos sellies et nos Prochains Festivals</h1>
        </div>
        <div className="dates-box">
          <Date
            date="12 - 13 JUIN 2024"
            nom="Médiéval de Mecquignies"
            lieu="Mecquignies / Hauts-de-France / France MECQUIGNIES 59570 - Impasse
              du Culot"
          />
          <Date
            date="16 - 17 NOVEMBRE 2024 "
            nom="LudiGeek Festival"
            lieu="Salle du Manège, 11 Rue Jacquard, 59250 Halluin"
          />
          <Date date={null} nom={null} lieu={null} />
        </div>
      </div>
    </div>
  );
}

export default Festival;
