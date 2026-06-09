import { Composition } from "remotion";
import { PortfolioGraphic } from "./PortfolioGraphic";

export const RemotionRoot = () => {
  return (
    <Composition
      id="PortfolioGraphic"
      component={PortfolioGraphic}
      durationInFrames={360}
      fps={30}
      width={1080}
      height={1920}
    />
  );
};
