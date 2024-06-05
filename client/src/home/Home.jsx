import Banner from "../components/Banner";
import BestSellerBooks from "./BestSellerBooks";
import FavBook from "./AllProducts";
import OtherBooks from "./OtherBooks";
import PromoBanner from "./PromoBanner";
import Review from "./Review";
import AllCategories from "./AllCategories";

export default function Home() {
  return (
    <>
      <Banner />
      {/* <BestSellerBooks /> */}
      <AllCategories />
      <FavBook />
      <PromoBanner />
      <OtherBooks />
      {/* <Review /> */}
    </>
  );
}
