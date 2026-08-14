import Image from "next/image";
import Hero from "./_components/Hero";
import FeaturedProducts from "./_components/FeaturedProperties";
import WhatWeDo from "./_components/WhatWeDo";
import ConnectingPeople from "./_components/ConnectingPeople";
import WhatClientWant from "./_components/WhatClientWant";

export default function Home() {
  return (
    <div className="">

      <Hero />
      <FeaturedProducts />
      <WhatWeDo />
      <ConnectingPeople />
      <WhatClientWant />
    </div>
  );
}
