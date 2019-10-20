import faker from "faker";
import { shuffle } from "./components/Friends";
faker.locale = "cz";
const WWW_ROOT = "";

export const getSliderData = () => {
  let data = [
    {
      imgUrl: "/img/1.jpg",
      id: 1
    },
    {
      imgUrl: "/img/2.jpg",
      id: 1
    },
    {
      imgUrl: "/img/3.jpg",
      id: 1
    }
  ];
  return data;
};

export const getMenuData = () => {
  let data = [
    {
      url: "https://www.barevnysvetdeti.cz/",
      external: "true",
      text: "Barevný svět dětí"
    },
    {
      url: "/#superkamos",
      external: undefined,
      text: "Staň se super kámošem"
    },
    {
      url: WWW_ROOT + "/#kamosi",
      external: undefined,
      text: "Dvojice kámošů"
    },
    {
      url: WWW_ROOT + "/#partneri",
      external: undefined,
      text: "Partneři"
    },
    {
      url: WWW_ROOT + "/kontakty",
      external: undefined,
      text: "Kontakty"
    }
  ];

  return data;
};

export const getFriendsData = () => {
  let data = [];
  const names = [
    "Úžasňákovi",
    "Marmeládoví dragouni",
    "Radostní sporťáci",
    "Dareboušové",
    "Drvoštěpové"
  ];
  const logos = ["sponz.png", "kamos.png", "non.png"];
  const images = ["uzasn.png", "sport.png", "marm.png"];
  for (let i = 0; i < 17; i++) {
    shuffle(names);
    shuffle(logos);
    shuffle(images);
    data.push({
      imgUrl: `/img/${images[0]}`,
      hasPartner: faker.random.boolean(),
      name: names[0],
      adult: {
        name: faker.name.firstName()
      },
      kid: {
        name: faker.name.firstName()
      },
      logoUrl: `/img/${logos[0]}`,
      url: "/kamosi/1"
    });
  }

  return data;
};

export const getPartnersData = () => {
  let data = [];
  const texts = [
    "Úžasňákovi",
    "Marmeládoví dragouni",
    "Radostní sporťáci",
    "Dareboušové",
    "Drvoštěpové"
  ];
  const images = [
    "anywhere.jpg",
    "gpe.jpg",
    "tmobile.png",
    "safy.png",
    "logos.png",
    "kde-muzu-pomuzu.jpg",
    "ntm.png",
    "celistvost.png"
  ];
  const names = [
    "T-mobile",
    "Alza.cz",
    "Podnik 30",
    "TV ČT",
    "Helping.com",
    "Safety s.r.o."
  ];
  for (let i = 0; i < 17; i++) {
    shuffle(names);
    shuffle(texts);
    shuffle(images);
    data.push({
      imgUrl: `/img/${images[0]}`,
      hasPartner: faker.random.boolean(),
      name: names[0],
      text: texts[0]
    });
  }

  return data;
};

export const getNewsData = () => {
  let data = [];
  const images = [
    "anywhere.jpg",
    "gpe.jpg",
    "tmobile.png",
    "safy.png",
    "logos.png",
    "kde-muzu-pomuzu.jpg",
    "ntm.png",
    "celistvost.png"
  ];
  for (let i = 0; i < 17; i++) {
    shuffle(images);
    data.push({
      imgUrl: `/img/${images[0]}`,
      name: faker.name.title(),
      date: faker.date.future(),
      id: faker.random.uuid(),
      url: "/" + faker.random.word()
    });
  }

  return data;
};
