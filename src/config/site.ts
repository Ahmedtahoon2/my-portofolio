export const siteConfig = {
  name: "JollyBlog",
  description: "Nextjs 14 blog using velite, tailwind and shadcn",
  author: "Ahmed Tahoon",
  links: {
    twitter: "https://twitter.com/jollyshopland",
    github: "https://github.com/Ahmedtahoon2",
    email: "ahmedtahoon73@gmail.com",
  },
  geolocation: {
    lang: "en",
    locale: "en-US",
    dir: "ltr",
  },
};

const productionConfig = {
  url:
    process.env.NEXT_PUBLIC_APP_URL ||
    "https://my-portofolio-roan-three.vercel.app/",
};

const developmentConfig = {
  url: "http://localhost:3000",
};

export const config =
  process.env.NODE_ENV === "development" ? developmentConfig : productionConfig;
