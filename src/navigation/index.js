import { allNav } from "./allNav";


export const getNavs = (category) => {
  const finalNavs = [];

  for (let i = 0; i < allNav.length; i++) {
    if (category === allNav[i].category) {
      finalNavs.push(allNav[i]);
    }
  }

  return finalNavs;
};
