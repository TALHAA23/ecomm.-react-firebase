import ProductsArea from "./ProductsArea";
import PromotionArea from "./PromotionArea";

export default function MainShop() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-[auto_200px]">
      <ProductsArea />
      <PromotionArea />
    </div>
  );
}
