import React from "react";
import Image from "./Image";
import Button from "./UI/Button";
import { IProduct } from "../Interface/Interface";
import Circlecolor from "./Circlecolor/Circlecolor";
interface Iprod {
  product: IProduct;
  productUpdate: Iprod;
  setProductUpdate: (product: Iprod) => void;
  onEdite: () => void;
  openModalEdite: () => void;
  openModalDelete: () => void;
  index: number;
  setProductInd: (value: number) => void;
  setIdDelete: (value: string) => void;
  productInd: number;
}
function ProductDetailes({
  product,
  setProductUpdate,
  productUpdate,
  openModalEdite,
  index,
  setProductInd,
  productInd,
  openModalDelete,
  setIdDelete,
}: Iprod) {
  let { id, title, description, imageURL, price, colors, category } = product;
  function onEdite() {
    setProductUpdate(product);
    setProductInd(index);
    openModalEdite();
  }
  function onDelete() {
    openModalDelete();
    setProductUpdate(product);
  }
  return (
    <div id={id} className="p-3 border-2 rounded-md flex flex-col ">
      <Image className=" rounded-md h-60" src={imageURL} alt={title} />
      <h5 className="font-medium">{title}</h5>
      <p>{description.slice(0, 100)}...</p>
      <div className="flex flex-row flex-wrap space-x-3 my-3">
        {colors?.map((ele) => (
          <Circlecolor color={ele} key={ele} onClick={() => {}} />
        ))}
      </div>
      <div className="flex flex-row justify-between">
        <h3>{price}$</h3>

        <div className="flex flex-row gap-2">
          <h6>{category?.name}</h6>
          <Image
            className="w-8 h-8 rounded-full object-bottom"
            src={imageURL}
            alt={title}
          />
        </div>
      </div>
      <div className="flex justify-between space-x-2 py-3">
        <Button className="bg-stone-700 w-full" onClick={onEdite}>
          EDITE
        </Button>
        <Button className="bg-red-700 w-full" onClick={onDelete}>
          DELETE
        </Button>
      </div>
    </div>
  );
}

export default ProductDetailes;
