import React, { useEffect, useState } from "react";
import Masonry from "../ui/Masonry";
import { useIsMobile } from "@/hooks/use-mobile";

const items = [
  {
    id: "1",
    img: "https://picsum.photos/id/1015/600/900?grayscale",
    url: "https://example.com/one",
    height: 400,
  },
  {
    id: "2",
    img: "https://picsum.photos/id/1011/600/750?grayscale",
    url: "https://example.com/two",
    height: 250,
  },
  {
    id: "3",
    img: "https://picsum.photos/id/1020/600/800?grayscale",
    url: "https://example.com/three",
    height: 600,
  },
  {
    id: "4",
    img: "https://picsum.photos/id/1035/600/900?grayscale",
    url: "https://example.com/four",
    height: 400,
  },
  {
    id: "5",
    img: "https://picsum.photos/id/1045/600/900?grayscale",
    url: "https://example.com/five",
    height: 250,
  },
  {
    id: "6",
    img: "https://picsum.photos/id/1055/600/900?grayscale",
    url: "https://example.com/six",
    height: 600,
  },
  {
    id: "7",
    img: "https://picsum.photos/id/1065/600/900?grayscale",
    url: "https://example.com/seven",
    height: 400,
  },
  {
    id: "8",
    img: "https://picsum.photos/id/1075/600/900?grayscale",
    url: "https://example.com/eight",
    height: 250,
  },
  {
    id: "9",
    img: "https://picsum.photos/id/1075/600/900?grayscale",
    url: "https://example.com/nine",
    height: 400,
  },
  {
    id: "10",
    img: "https://picsum.photos/id/1065/600/900?grayscale",
    url: "https://example.com/ten",
    height: 600,
  },
  {
    id: "11",
    img: "https://picsum.photos/id/1065/600/900?grayscale",
    url: "https://example.com/ten",
    height: 400,
  },
];

const LandingMasonry = ({ itemsToShow = 5 }: { itemsToShow: number }) => {
  const [currItems, setCurrItems] = useState(items);

  useEffect(() => {
    setCurrItems(items.slice(0, itemsToShow));
  }, [itemsToShow]);

  return (
    <Masonry
      items={currItems}
      ease="power3.out"
      duration={0.6}
      stagger={0.05}
      animateFrom="bottom"
      scaleOnHover={true}
      hoverScale={0.95}
      blurToFocus={true}
      colorShiftOnHover={false}
    />
  );
};

export default LandingMasonry;
