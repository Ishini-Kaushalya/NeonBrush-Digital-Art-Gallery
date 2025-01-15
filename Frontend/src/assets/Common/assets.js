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
import illustration from "./illustration.jpeg";
import anime from "./anime.jpeg";
import doodling from "./doodling.jpeg";
import geometric from "./geometric.jpeg";
import pointilism from "./pointilism.jpeg";
import charcoal from "./charcoal.jpeg";
import typography from "./typography.jpeg";
import painting from "./painting.jpeg";

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
  { menu_name: "Illustration", menu_image: illustration },
  { menu_name: "Anime", menu_image: anime },
  { menu_name: "Doodling", menu_image: doodling },
  { menu_name: "Geometric", menu_image: geometric },
  { menu_name: "Pointilism", menu_image: pointilism },
  { menu_name: "Charcoal", menu_image: charcoal },
  { menu_name: "Typography", menu_image: typography },
  { menu_name: "Painting", menu_image: painting },
];

export const art_list = [
  { _id: "1", name: "Digital Portrait", image: illus_1, price: 50, description: "A beautiful hand-drawn digital portrait.", category: "Illustration", ownerName: "Alice ", imageSize: "3000x2000" },
  { _id: "2", name: "Fantasy Scene", image: illus_2, price: 75, description: "An imaginative fantasy landscape illustration.", category: "Illustration", ownerName: "Michael Lee", imageSize: "3500x2500" },
  { _id: "3", name: "Anime Character", image: bg_3, price: 60, description: "An original anime character design.", category: "Anime", ownerName: "Hiroshi Yamamoto", imageSize: "4000x3000" },
  { _id: "4", name: "Chibi Style", image: bg_3, price: 40, description: "Cute and playful chibi-style artwork.", category: "Anime", ownerName: "Sakura Tanaka", imageSize: "3500x2200" },
  { _id: "5", name: "Creative Doodles", image: bg_3, price: 25, description: "A collection of fun and whimsical doodles.", category: "Doodling", ownerName: "Tom Harris", imageSize: "2800x1800" },
  { _id: "6", name: "Abstract Doodles", image: bg_3, price: 30, description: "Abstract and modern doodle art.", category: "Doodling", ownerName: "Lisa Brown", imageSize: "3200x2400" },
  { _id: "7", name: "Geometric Design", image: bg_3, price: 70, description: "Precise and intricate geometric patterns.", category: "Geometric", ownerName: "David Clark", imageSize: "3800x2500" },
  { _id: "8", name: "Symmetric Geometry", image: bg_3, price: 65, description: "A work of perfect symmetry and balance.", category: "Geometric", ownerName: "Emma White", imageSize: "3600x2400" },
  { _id: "9", name: "Dot Art Portrait", image: bg_3, price: 55, description: "A portrait created using the pointillism technique.", category: "Pointilism", ownerName: "Chris Adams", imageSize: "3000x2000" },
  { _id: "10", name: "Point Art Landscape", image: bg_3, price: 80, description: "A breathtaking landscape made of dots.", category: "Pointilism", ownerName: "Olivia Martinez", imageSize: "3500x2300" },
  { _id: "11", name: "Charcoal Sketch", image: bg_3, price: 45, description: "A dramatic charcoal sketch of a figure.", category: "Charcoal", ownerName: "Robert Wilson", imageSize: "2900x1900" },
  { _id: "12", name: "Charcoal Landscape", image: bg_3, price: 60, description: "An expressive charcoal landscape artwork.", category: "Charcoal", ownerName: "Sophia Robinson", imageSize: "3100x2100" },
  { _id: "13", name: "Typography Poster", image: bg_3, price: 35, description: "A creative poster with stylish typography.", category: "Typography", ownerName: "Ethan Wright", imageSize: "2500x1800" },
  { _id: "14", name: "Typography Art", image: bg_3, price: 40, description: "Unique and modern typography artwork.", category: "Typography", ownerName: "Isabella Lopez", imageSize: "2700x1900" },
  { _id: "15", name: "Abstract Painting", image: bg_3, price: 120, description: "A vibrant abstract painting with bold colors.", category: "Painting", ownerName: "James Anderson", imageSize: "4000x3000" },
  { _id: "16", name: "Watercolor Landscape", image: bg_3, price: 90, description: "A serene watercolor painting of a landscape.", category: "Painting", ownerName: "Grace Thomas", imageSize: "3500x2200" },
  { _id: "17", name: "Illustration - Ocean Bliss", image: illus_3, price: 65, description: "A peaceful ocean view illustration.", category: "Illustration", ownerName: "Daniel Garcia", imageSize: "3200x2100" },
  { _id: "18", name: "Illustration - Starry Night", image: illus_4, price: 70, description: "A magical starry night illustration.", category: "Illustration", ownerName: "Sophia King", imageSize: "3300x2200" },
  { _id: "19", name: "Illustration - Wildlife Harmony", image: illus_5, price: 80, description: "An illustration featuring wildlife in harmony.", category: "Illustration", ownerName: "William Scott", imageSize: "3600x2400" },
];

export const artists = [
  { _id: "1", name: "Alice", image: artist_1, description: "Alice Johnson is an accomplished digital artist specializing in portraits. Her work is celebrated for its vibrant colors and intricate details." },
  { _id: "2", name: "Michael ", image: illus_2, description: "Michael Lee is an imaginative fantasy artist whose landscapes transport viewers to magical realms." },
  { _id: "3", name: "Hiroshi", image: bg_3, description: "Hiroshi Yamamoto is a renowned anime artist known for their unique character designs and storytelling." },
  { _id: "4", name: "Sakura ", image: bg_3, description: "Sakura Tanaka creates adorable chibi-style artworks that are both playful and expressive." },
  { _id: "5", name: "Tom ", image: bg_3, description: "Tom Harris specializes in fun and whimsical doodles that add joy to any setting." },
  { _id: "6", name: "Lisa ", image: bg_3, description: "Lisa Brown focuses on abstract and modern doodle art, blending creativity and style." },
  { _id: "7", name: "David ", image: bg_3, description: "David Clark crafts precise and intricate geometric designs that showcase artistic symmetry." },
  { _id: "8", name: "Emma ", image: bg_3, description: "Emma White specializes in symmetric and balanced geometric patterns." },
  { _id: "9", name: "Chris ", image: bg_3, description: "Chris Adams creates stunning pointillism portraits with meticulous detail." },
  { _id: "10", name: "Olivia ", image: bg_3, description: "Olivia Martinez produces breathtaking landscapes using the pointillism technique." },
  { _id: "11", name: "Robert ", image: bg_3, description: "Robert Wilson excels in dramatic and expressive charcoal sketches." },
  { _id: "12", name: "Sophia", image: bg_3, description: "Sophia Robinson creates evocative charcoal landscapes with a unique touch." },
  { _id: "13", name: "Ethan ", image: bg_3, description: "Ethan Wright designs creative posters with stylish typography." },
  { _id: "14", name: "Isabella Lopez", image: bg_3, description: "Isabella Lopez specializes in modern typography artwork that blends creativity and design." },
  { _id: "15", name: "James Anderson", image: bg_3, description: "James Anderson creates vibrant abstract paintings with bold and striking colors." },
  { _id: "16", name: "Grace Thomas", image: bg_3, description: "Grace Thomas produces serene watercolor landscapes that captivate the viewer." },
  { _id: "17", name: "Daniel Garcia", image: illus_3, description: "Daniel Garcia specializes in peaceful and inspiring ocean-themed illustrations." },
  { _id: "18", name: "Sophia King", image: illus_4, description: "Sophia King captures the magic of the night sky in their enchanting starry night illustrations." },
  { _id: "19", name: "William Scott", image: illus_5, description: "William Scott creates illustrations featuring wildlife in harmony, celebrating the beauty of nature." },
];
