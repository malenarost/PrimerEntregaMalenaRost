export let products = [
  {
    pId: 1,
    title: "dress",
    description: "summerPinkDress",
    price: "1900",
    category: "clothes",
    code: 2000,
    stock: "20",
  },
  {
    pId: 2,
    title: "bikini",
    description: " summerWhitebikini",
    price: "2000",
    category: "clothes",
    code: 2001,
    stock: "20",
  },
  {
    pId: 3,
    title: "glasses",
    description: "redGlasses",
    price: "1300",
    category: "clothes",
    code: 2002,
    stock: "20",
  },
  {
    pId: 4,
    title: " croptop",
    description: " blackCroptop",
    price: "1100",
    category: "clothes",
    code: 2003,
    stock: "20",
  },
  {
    pId: 5,
    title: "t.shirt",
    description: "summert.TShirt",
    price: "1000",
    category: "clothes",
    code: 2004,
    stock: "20",
  },
  {
    pId: 6,
    title: "trousers",
    description: "winterTrousers",
    price: " 2000",
    category: "clothes",
    code: 2005,
    stock: "20",
  },
  {
    pId: 7,
    title: "pants",
    description: "summerPants",
    price: "3500",
    category: "clothes",
    code: 2006,
    stock: "20",
  },
];
export let carts = [
  {
    cId: 12,
    title: "cart1",
    description: "market cart",
  },
];

import path from "path";
import { fileURLToPath } from "url";
export const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);
console.log(__dirname);

import multer from "multer";
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __dirname + "/public");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

export const uploader = multer({ storage });
