import Carousel from "./component/Carousel";
import Hero from "./component/Hero";
import Legal from "./component/Legals";
import Showcase from "./component/Showcase";

export default function Home() {
  return (
    <div>
      <div className="text-center font-bold text-xs bg-gray-300 py-5">
        Intro text: Description about the website, product, sale on products and
        everything that mekforus want to highlight
      </div>
      <Hero />
      <Showcase />
      <Carousel />
      <Legal />
    </div>
  );
}
