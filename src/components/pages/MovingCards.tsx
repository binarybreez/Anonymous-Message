"use client";

import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import React from "react";
import AnimatedTooltipPreview from "../Tooltip";

export default function InfiniteMovingCardsDemo() {
  return (
    <div className="h-[30rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
      <InfiniteMovingCards
        items={testimonials}
        direction="right"
        speed="normal"
      />
      <div className="mt-12">
        <AnimatedTooltipPreview/>
      </div>
    </div>
  );
}

const testimonials = [
    {
      "quote": "I've been using the platform for a few weeks now, and I really appreciate the ease of navigation. It’s intuitive and saves me so much time! The only thing I would suggest is improving the search function a bit to make it more efficient.",
      "name": "Sarah M.",
      "title": "January 15, 2025"
    },
    {
      "quote": "Overall, I’m satisfied with my experience. The updates have made the interface smoother, and I haven't had any technical issues so far. One area for improvement could be adding more customization options, especially for user profiles.",
      "name": "John T.",
      "title": "January 17, 2025"
    },
    {
      "quote": "I love the product! It's been very helpful in streamlining my daily tasks. However, I do think the customer support response times could be faster. I had to wait a bit longer than expected for a solution to my issue.",
      "name": "Emily W.",
      "title": "January 18, 2025"
    },
    {
      "quote": "Great service overall. The features are comprehensive and easy to use. My only complaint is that sometimes the app feels a little slow when there’s heavy traffic on the server. Would appreciate better speed optimization in those cases.",
      "name": "Marcus L.",
      "title": "January 19, 2025"
    },
    {
      "quote": "Fantastic experience so far. I really appreciate the transparency in updates and the clear communication from the team. One suggestion would be to offer more tutorial resources for new users. A quick-start guide would be a nice addition.",
      "name": "Grace B.",
      "title": "January 14, 2025"
    }
  ];
