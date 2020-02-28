import { generateMedia } from "styled-media-query";

const size = generateMedia({
  phone: "660px",
  desktop: "1280px"
});

const mq2style = (mediaQuery: Array<string>) => {
  return mediaQuery.reduce((acc, cur) => acc + cur);
};

export const media = {
  phone: (style: any) => mq2style(size.lessThan("phone")`${style.raw.join()}`),
  tablet: (style: any) =>
  mq2style(size.greaterThan("desktop")`${style.raw.join()}`),
  desktop: (style: any) => mq2style(size.greaterThan("desktop")`${style.raw.join()}`)
};
