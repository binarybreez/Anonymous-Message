'use client'
import image1 from "../../public/illustrat01.jpg"
import image2 from "../../public/illustrat02.jpg"
import image3 from "../../public/illustrat03.jpg"
import image4 from "../../public/illustrat04.jpg"
import React from "react";
import {
  IconClipboardCopy,
  IconFileBroken,
  IconSignature,
  IconTableColumn,
} from "@tabler/icons-react";
import { BentoGrid, BentoGridItem } from "@/components/ui/bento-grid";
import Image from "next/image";

export default function BentoGridSecondDemo() {
  return (
    <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem]">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className + ''}
          icon={item.icon}
        />
      ))}
    </BentoGrid>
  );
}
const Skeleton = ({image} : any) => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl 
    dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)] 
     border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black">
      <Image src={image} alt="loading" />
     </div>
);
const items = [
  {
    title: "Smart Message Suggestions",
    description: "Save time and improve communication with AI-powered suggestions tailored to your feedback.",
    header: <Skeleton image={image4}/>,
    className: "md:col-span-2",
    icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Empower Your Voice",
    description: "Post feedback that makes an impact. Share your thoughts on products and help shape their future.",
    header: <Skeleton image={image1}/>,
    className: "md:col-span-1",
    icon: <IconFileBroken className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Control Your Privacy",
    description: "Decide who can message you and ensure your feedback remains anonymous or visible—your choice, your control.",
    header: <Skeleton image={image2}/>,
    className: "md:col-span-1",
    icon: <IconSignature className="h-4 w-4 text-neutral-500" />,
  },
  {
    title: "Track Your Feedback",
    description:
      "Stay informed with an intuitive dashboard. View your activity, analyze your impact, and celebrate your contribution.",
    header: <Skeleton image={image3}/>,
    className: "md:col-span-2",
    icon: <IconTableColumn className="h-4 w-4 text-neutral-500" />,
  },
];
