import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useRef } from "react";
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import PropTypes from "prop-types";

gsap.registerPlugin(ScrollTrigger);

function IvyAnimation({ children, ivyId }) {
  const ivyRef = useRef(null);

  useGSAP(() => {
    if (!ivyRef.current) return;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ivyRef.current,
        start: "top center",
        end: "bottom center",
        scrub: 5.2,
      },
    });

    const childrenIvy = Array.from(ivyRef.current.children[0].children).filter(
      (child) => !child.classList.contains("ivyBranch")
    );

    tl.fromTo(
      ".ivyBranch",
      {
        strokeDasharray: 1000,
        strokeDashoffset: 1000,
      },
      {
        strokeDashoffset: 0,
        duration: 10,
      }
    );
    tl.from(childrenIvy, {
      transformOrigin: "bottom",
      opacity: 0,
      scale: 0,
      duration: 2,
      stagger: 0.03,
      delay: -8,
    });
  }, []);

  return (
    <div ref={ivyRef} id={ivyId}>
      {children}
    </div>
  );
}

IvyAnimation.propTypes = {
  children: PropTypes.node.isRequired,
  ivyId: PropTypes.node.isRequired,
};

export default IvyAnimation;
