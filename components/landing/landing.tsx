import React from "react";
import Globe from "../globe";

const Landing = () => {
  return (
    <div className="relative h-full w-full">
      {/* Hero text */}
      <div className="absolute inset-x-0 top-[30%] z-10 flex flex-col items-center px-6 text-center">
        <h1 className="text-2xl font-extrabold uppercase tracking-[0.4em] text-white sm:text-3xl">
          Developer Galaxy
        </h1>
        <p className="mt-4 text-sm tracking-wider text-white/50">
          Explore the open source universe
        </p>
      </div>

      {/*
        Half globe peeking from the bottom edge.

        - Sized off viewport HEIGHT (90vh), not page width. Page width
          varies enormously between mobile and desktop, but this box's
          "reveal exactly half of me" trick (bottom-0 + translate-y-1/2)
          is relative to page height — so tying the box's size to width
          made it balloon to several times the viewport's height on wide
          desktop screens, pushing the visible slice into the box's empty
          padding and making the globe appear to vanish. Driving it off
          vh keeps the proportions consistent on any screen.
        - aspect-square keeps it circular; width auto-derives from height.
        - bottom-0 anchors the box's bottom edge to the page's bottom edge.
        - translate-y-1/2 then shifts it down by exactly half its own
          height — which always reveals exactly the top half of the box,
          flush against the bottom edge, regardless of box size.
        - height="90vh" / width="auto" on the Globe props mirror the
          className so the inline style doesn't fight the aspect-ratio.
      */}
      <Globe
        width="auto"
        height="90vh"
        className="absolute bottom-0 left-1/2 aspect-square h-[90vh] w-[150%] -translate-x-1/2 translate-y-1/2"
      />
    </div>
  );
};

export default Landing;
