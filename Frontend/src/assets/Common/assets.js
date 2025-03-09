import basket_icon from "./basket_icon.png";
import logo from "./logo.png";
import header_img from "./header_img.png";

import bg_1 from "./bg_1.png";
import bg_2 from "./bg_2.png";
import bg_3 from "./bg_3.png";

import illus_1 from "./i_1.jpeg";
import illus_2 from "./i_2.jpg";
import illus_3 from "./i_3.png";
import illus_4 from "./i_4.png";
import illus_5 from "./i_6.jpeg";

import artist_1 from "./artist_1.png"
import artist_bg1 from "./artist_bg_1.jpg"

import search_icon from "./search_icon.png";
import canvas from "./canvas.jpg";
import acrylic from "./acrylic.jpg";
import oil from "./oil.jpg";
import pastel from "./pastel.jpg";
import pencil from "./pencil.jpg";
import charcoal from "./charcoal.jpeg";
import ink from "./ink.jpg";
import watercolor from "./watercolor.jpg";

import image_SigninSelection1 from "./image_46.png";
import image_SigninSelection2 from "./image_47.jpg";
import image_SigninSelection3 from "./image_48.jpg";

import add_icon_white from "./add_icon_white.png";
import add_icon_green from "./add_icon_green.png";
import remove_icon_red from "./remove_icon_red.png";
import app_store from "./app_store.png";
import play_store from "./play_store.png";
import linkedin_icon from "./linkedin_icon.png";
import facebook_icon from "./facebook_icon.png";
import twitter_icon from "./twitter_icon.png";
import cross_icon from "./cross_icon.png";
import selector_icon from "./selector_icon.png";
import rating_starts from "./rating_starts.png";
import profile_icon from "./profile_icon.png";
import bag_icon from "./bag_icon.png";
import logout_icon from "./logout_icon.png";
import parcel_icon from "./parcel_icon.png";

export const assets = {
  logo,
  basket_icon,
  header_img,
  search_icon,
  rating_starts,
  add_icon_green,
  add_icon_white,
  remove_icon_red,
  app_store,
  play_store,
  linkedin_icon,
  facebook_icon,
  twitter_icon,
  cross_icon,
  selector_icon,
  profile_icon,
  logout_icon,
  bag_icon,
  parcel_icon,
  bg_1,
  bg_2,
  bg_3,
  image_SigninSelection1,
  image_SigninSelection2,
  image_SigninSelection3,
  artist_1 ,
  artist_bg1,
};

export const menu_list = [
  {
    menu_name: "canvas",
    menu_image: canvas,
  },
  {
    menu_name: "acrylic",
    menu_image: acrylic,
  },
  {
    menu_name: "ink",
    menu_image: ink,
  },
  {
    menu_name: "oil",
    menu_image: oil,
  },
  {
    menu_name: "pastel",
    menu_image: pastel,
  },
  {
    menu_name: "charcoal",
    menu_image: charcoal,
  },
  {
    menu_name: "pencil",
    menu_image: pencil,
  },
  {
    menu_name: "watercolor",
    menu_image: watercolor,
  },
];

export const art_list = [
  {
    _id: "1",
    name: "Digital Portrait",
    image: illus_1,
    price: 50,
    description: "A beautiful hand-drawn digital portrait.",
    category: "Illustration",
    ownerName: "John Doe",
    imageSize: "3000x2000",
  },
  {
    _id: "2",
    name: "Fantasy Scene",
    image: illus_2,
    price: 75,
    description: "An imaginative fantasy landscape illustration.",
    category: "Illustration",
    ownerName: "Jane Smith",
    imageSize: "3500x2500",
  },
  {
    _id: "3",
    name: "Anime Character",
    image: bg_3,
    price: 60,
    description: "An original anime character design.",
    category: "Anime",
    ownerName: "Yuuki Tanaka",
    imageSize: "4000x3000",
  },
  {
    _id: "4",
    name: "Chibi Style",
    image: bg_3,
    price: 40,
    description: "Cute and playful chibi-style artwork.",
    category: "Anime",
    ownerName: "Mika Yamada",
    imageSize: "3500x2200",
  },
  {
    _id: "5",
    name: "Creative Doodles",
    image: bg_3,
    price: 25,
    description: "A collection of fun and whimsical doodles.",
    category: "Doodling",
    ownerName: "Tomato Artworks",
    imageSize: "2800x1800",
  },
  {
    _id: "6",
    name: "Abstract Doodles",
    image: bg_3,
    price: 30,
    description: "Abstract and modern doodle art.",
    category: "Doodling",
    ownerName: "Lily Draws",
    imageSize: "3200x2400",
  },
  {
    _id: "7",
    name: "Geometric Design",
    image: bg_3,
    price: 70,
    description: "Precise and intricate geometric patterns.",
    category: "Geometric",
    ownerName: "SquarePatterns",
    imageSize: "3800x2500",
  },
  {
    _id: "8",
    name: "Symmetric Geometry",
    image: bg_3,
    price: 65,
    description: "A work of perfect symmetry and balance.",
    category: "Geometric",
    ownerName: "PatternMasters",
    imageSize: "3600x2400",
  },
  {
    _id: "9",
    name: "Dot Art Portrait",
    image: bg_3,
    price: 55,
    description: "A portrait created using the pointillism technique.",
    category: "Pointilism",
    ownerName: "Dotty Artist",
    imageSize: "3000x2000",
  },
  {
    _id: "10",
    name: "Point Art Landscape",
    image: bg_3,
    price: 80,
    description: "A breathtaking landscape made of dots.",
    category: "Pointilism",
    ownerName: "Pixel Artist",
    imageSize: "3500x2300",
  },
  {
    _id: "11",
    name: "Charcoal Sketch",
    image: bg_3,
    price: 45,
    description: "A dramatic charcoal sketch of a figure.",
    category: "Charcoal",
    ownerName: "SketchMaster",
    imageSize: "2900x1900",
  },
  {
    _id: "12",
    name: "Charcoal Landscape",
    image: bg_3,
    price: 60,
    description: "An expressive charcoal landscape artwork.",
    category: "Charcoal",
    ownerName: "ArtByAlex",
    imageSize: "3100x2100",
  },
  {
    _id: "13",
    name: "Typography Poster",
    image: bg_3,
    price: 35,
    description: "A creative poster with stylish typography.",
    category: "Typography",
    ownerName: "TypeArt Studios",
    imageSize: "2500x1800",
  },
  {
    _id: "14",
    name: "Typography Art",
    image: bg_3,
    price: 40,
    description: "Unique and modern typography artwork.",
    category: "Typography",
    ownerName: "TextFlow",
    imageSize: "2700x1900",
  },
  {
    _id: "15",
    name: "Abstract Painting",
    image: bg_3,
    price: 120,
    description: "A vibrant abstract painting with bold colors.",
    category: "Painting",
    ownerName: "ModernArtHub",
    imageSize: "4000x3000",
  },
  {
    _id: "16",
    name: "Watercolor Landscape",
    image: bg_3,
    price: 90,
    description: "A serene watercolor painting of a landscape.",
    category: "Painting",
    ownerName: "Watercolor Expressions",
    imageSize: "3500x2200",
  },
  {
    _id: "17",
    name: "Illustration - Ocean Bliss",
    image: illus_3,
    price: 65,
    description: "A peaceful ocean view illustration.",
    category: "Illustration",
    ownerName: "OceanArt Studio",
    imageSize: "3200x2100",
  },
  {
    _id: "18",
    name: "Illustration - Starry Night",
    image: illus_4,
    price: 70,
    description: "A magical starry night illustration.",
    category: "Illustration",
    ownerName: "StarryArt",
    imageSize: "3300x2200",
  },
  {
    _id: "19",
    name: "Illustration - Wildlife Harmony",
    image: illus_5,
    price: 80,
    description: "An illustration featuring wildlife in harmony.",
    category: "Illustration",
    ownerName: "NatureSketch",
    imageSize: "3600x2400",
  },
];
export const artists = [
  {
    _id: "1",
    name: "John Doe",
    image: artist_1, // Corresponding image from art_list
    description: "John Doe is an accomplished digital artist specializing in portraits. His work is celebrated for its vibrant colors and intricate details.",
  },
  {
    _id: "2",
    name: "Jane Smith",
    image: artist_1, // Corresponding image from art_list
    description: "Jane Smith is an imaginative fantasy artist whose landscapes transport viewers to magical realms.",
  },
  {
    _id: "3",
    name: "Yuuki Tanaka",
    image: artist_1, // Corresponding image from art_list
    description: "Yuuki Tanaka is a renowned anime artist known for their unique character designs and storytelling.",
  },
  {
    _id: "4",
    name: "Mika Yamada",
    image: artist_1, // Corresponding image from art_list
    description: "Mika Yamada is an artist celebrated for her playful and adorable chibi-style artworks.",
  },
  {
    _id: "5",
    name: "Tomato Artworks",
    image: artist_1, // Corresponding image from art_list
    description: "Tomato Artworks is a creator of whimsical and creative doodles that capture the essence of fun.",
  },
  {
    _id: "6",
    name: "Lily Draws",
    image: artist_1, // Corresponding image from art_list
    description: "Lily Draws is an artist known for her abstract and modern doodles that push the boundaries of creativity.",
  },
  {
    _id: "7",
    name: "SquarePatterns",
    image: artist_1, // Corresponding image from art_list
    description: "SquarePatterns is a master of geometric design, producing intricate and precise patterns.",
  },
  {
    _id: "8",
    name: "PatternMasters",
    image: artist_1, // Corresponding image from art_list
    description: "PatternMasters specialize in the creation of perfect symmetry and balance through geometric art.",
  },
  {
    _id: "9",
    name: "Dotty Artist",
    image: artist_1, // Corresponding image from art_list
    description: "Dotty Artist is a skilled pointillist known for creating stunning portraits using the pointillism technique.",
  },
  {
    _id: "10",
    name: "Pixel Artist",
    image: artist_1, // Corresponding image from art_list
    description: "Pixel Artist is an artist who creates breathtaking landscapes using the pointillism technique.",
  },
  {
    _id: "11",
    name: "SketchMaster",
    image: artist_1, // Corresponding image from art_list
    description: "SketchMaster is a renowned artist famous for dramatic and expressive charcoal sketches.",
  },
  {
    _id: "12",
    name: "ArtByAlex",
    image: artist_1, // Corresponding image from art_list
    description: "ArtByAlex specializes in expressive charcoal landscapes that evoke deep emotions.",
  },
  {
    _id: "13",
    name: "TypeArt Studios",
    image: artist_1, // Corresponding image from art_list
    description: "TypeArt Studios is a creative collective focused on making modern typography posters and art.",
  },
  {
    _id: "14",
    name: "TextFlow",
    image:artist_1, // Corresponding image from art_list
    description: "TextFlow creates innovative and unique typography art that blends style with meaning.",
  },
  {
    _id: "15",
    name: "ModernArtHub",
    image: artist_1, // Corresponding image from art_list
    description: "ModernArtHub is an abstract artist known for creating vibrant paintings with bold colors.",
  },
  {
    _id: "16",
    name: "Watercolor Expressions",
    image:artist_1, // Corresponding image from art_list
    description: "Watercolor Expressions specializes in serene and soothing watercolor landscape paintings.",
  },
  {
    _id: "17",
    name: "OceanArt Studio",
    image: artist_1, // Corresponding image from art_list
    description: "OceanArt Studio is an artist focused on creating peaceful and calming ocean-themed illustrations.",
  },
  {
    _id: "18",
    name: "StarryArt",
    image: artist_1, // Corresponding image from art_list
    description: "StarryArt is a talented artist who creates magical starry night illustrations filled with wonder.",
  },
  {
    _id: "19",
    name: "NatureSketch",
    image: artist_1, // Corresponding image from art_list
    description: "NatureSketch is an artist who creates beautiful wildlife illustrations in harmony with nature.",
  },
];

