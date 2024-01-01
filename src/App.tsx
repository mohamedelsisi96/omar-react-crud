import React, { ChangeEvent, FormEvent, useState } from "react";
import "./index.css";
import ProductDetailes from "./Componant/ProductDetailes";
import { productList, colors } from "./Data/Data";
import { IProduct } from "./Interface/Interface";
import Model from "./Componant/Model/Model";
import Button from "./Componant/UI/Button";
import { formInputsList } from "./Data/Data";
import { validateInput } from "./Componant/Validation/Validate";
import { v4 as uuid } from "uuid";
import Errors from "./Componant/Error/Errors";
import Circlecolor from "./Componant/Circlecolor/Circlecolor";
import Select from "./Componant/UI/Select";
import { categories } from "./Data/Data";
import toast, { Toaster } from "react-hot-toast";

function App() {
  let defultProduct = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
    colors: [],
    category: {
      name: "",
      imageURL: "",
    },
  };
  let [isOpen, setIsOpen] = useState(false);
  let [idDelete, setIdDelete] = useState(0);

  let [isOpenEdite, setIsOpenEdite] = useState<boolean>(false);
  let [isOpenDelete, setIsOpenDelete] = useState<boolean>(false);
  let [products, setProducts] = useState<IProduct[]>(productList);
  let [product, setProduct] = useState<IProduct>(defultProduct);
  let [productUpdate, setProductUpdate] = useState<IProduct>(defultProduct);
  let [productInd, setProductInd] = useState<number>(0);

  let [errorMsg, setErrorMsg] = useState<IProduct>(defultProduct);
  let [tempColor, setTempColor] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState(categories[3]);

  function onChangeHandle(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setProduct({
      ...product,
      [name]: value,
    });
    setErrorMsg({
      ...errorMsg,
      [name]: "",
    });
  }
  function onChangeHandleEdite(event: ChangeEvent<HTMLInputElement>): void {
    const { name, value } = event.target;
    setProductUpdate({
      ...productUpdate,
      [name]: value,
    });
    setErrorMsg({
      ...errorMsg,
      [name]: "",
    });
  }
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  function closeModalDelete() {
    setIsOpenDelete(false);
    console.log(isOpenDelete);
  }

  function openModalDelete() {
    setIsOpenDelete(true);
    console.log("222");
    console.log(isOpenDelete);
  }

  function closeModalEdite() {
    setIsOpenEdite(false);
  }

  function openModalEdite() {
    setIsOpenEdite(true);
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(product);
    const errors = validateInput({
      title: product.title,
      description: product.description,
      price: product.price,
      imageURL: product.imageURL,
    });
    console.log(errors);
    const hasError =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    console.log(hasError);

    if (!hasError) {
      setErrorMsg(errors);
      console.log(errors);

      return;
    }

    setProducts((prev) => [
      ...prev,
      { ...product, id: uuid(), colors: tempColor, category: selectedCategory },
    ]);
    setTempColor([]);
    onCancel();
    toast("Product has been added successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  }
  function handleSubmitEdite(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    console.log(product);
    const errors = validateInput({
      title: product.title,
      description: product.description,
      price: product.price,
      imageURL: product.imageURL,
    });
    console.log(errors);
    const hasError =
      Object.values(errors).some((value) => value === "") &&
      Object.values(errors).every((value) => value === "");
    console.log(hasError);

    if (hasError) {
      setErrorMsg(errors);
      console.log(errors);

      return;
    }
    let upProd = [...products];
    upProd[productInd] = {
      ...productUpdate,
      colors: tempColor.concat(productUpdate.colors),
    };

    setProducts(upProd);
    setTempColor([]);
    onCancelEdite();
    toast("Product has been updated successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  }

  function onCancel() {
    setProduct(defultProduct);
    setTempColor([]);
    closeModal();
  }
  function onCancelEdite() {
    // setProduct(defultProduct);
    // setTempColor([]);
    closeModalEdite();
  }
  function removeProductHandler() {
    setProducts(products.filter((prod) => prod.id !== productUpdate.id));
    closeModalDelete();
    toast("Product has been deleted successfully!", {
      icon: "👏",
      style: {
        backgroundColor: "black",
        color: "white",
      },
    });
  }
  return (
    <div className="container mx-auto ">
      <button
        onClick={openModal}
        className="block bg-indigo-200 rounded-md hover:text-white hover:bg-indigo-800 mx-auto my-10 px-10  font-medium"
      >
        Add Product
      </button>
      <div className="App  grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  m-5 gap-2 md:gap-4 p-3">
        {products.map((product: IProduct, index) => (
          <ProductDetailes
            key={product.id}
            product={product}
            setProductUpdate={setProductUpdate}
            setIdDelete={setIdDelete}
            productUpdate={productUpdate}
            openModalEdite={openModalEdite}
            index={index}
            setProductInd={setProductInd}
            productInd={productInd}
            openModalDelete={openModalDelete}
          />
        ))}
        {/* add product */}
        <Model
          isOpen={isOpen}
          closeModal={closeModal}
          openModal={openModal}
          title="ADD A NEW PRODUCT"
        >
          <form className="space-y-3" onSubmit={handleSubmit}>
            <div>
              {formInputsList.map((input) => (
                <div className="flex flex-col my-3" key={input.id}>
                  <label htmlFor={input.id}>Product {input.name}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    name={input.name}
                    value={product[input.name]}
                    onChange={onChangeHandle}
                    className="rounded-md border-2 shadow-md focus:border-stone-500 focus:outline-none p-2 border-stone-400 mt-1"
                  />
                  {errorMsg[input.name] && (
                    <Errors msg={errorMsg[input.name]} />
                  )}
                </div>
              ))}
            </div>
            <Select
              selected={selectedCategory}
              setSelected={selectedCategory}
            />
            <div className="flex flex-row flex-wrap text-white px-2 space-x-1 my-3">
              {tempColor.map((ele) => (
                <span
                  style={{ backgroundColor: ele }}
                  className="p-1 rounded-md my-1"
                >
                  {ele}
                </span>
              ))}
            </div>
            <div className="flex flex-row px-2 space-x-1 my-3">
              {colors.map((ele) => (
                <Circlecolor
                  color={ele}
                  key={ele}
                  onClick={() => {
                    if (tempColor.includes(ele)) {
                      setTempColor((prev) =>
                        prev.filter((item) => item !== ele)
                      );
                      return;
                    }
                    setTempColor((prev) => [...prev, ele]);
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between space-x-3 py-3">
              <Button className="bg-indigo-700 py-2 hover:bg-indigo-800 text-white w-full">
                SUBMITE
              </Button>
              <Button
                className="bg-gray-400 py-2 hover:bg-gray-500 text-white w-full"
                onClick={onCancel}
              >
                CANCEL
              </Button>
            </div>
          </form>
        </Model>
        {/* edite product */}
        <Model
          isOpen={isOpenEdite}
          closeModal={closeModalEdite}
          openModal={openModalEdite}
          onCancelEdite={onCancelEdite}
          productUpdate={productUpdate}
          title="Edite PRODUCT"
          productUpdate={productUpdate}
          onChangeHandleEdite={onChangeHandleEdite}
          handleSubmitEdite={handleSubmitEdite}
          tempColor={tempColor}
        >
          <form className="space-y-3" onSubmit={handleSubmitEdite}>
            <div>
              {formInputsList.map((input) => (
                <div className="flex flex-col my-3" key={input.id}>
                  <label htmlFor={input.id}>Product {input.name}</label>
                  <input
                    id={input.id}
                    type={input.type}
                    name={input.name}
                    value={productUpdate[input.name]}
                    onChange={onChangeHandleEdite}
                    className="rounded-md border-2 shadow-md focus:border-stone-500 focus:outline-none p-2 border-stone-400 mt-1"
                  />
                  {errorMsg[input.name] && (
                    <Errors msg={errorMsg[input.name]} />
                  )}
                </div>
              ))}
            </div>
            <Select
              selected={selectedCategory}
              setSelected={selectedCategory}
            />
            <div className="flex flex-row flex-wrap text-white px-2 space-x-1 my-3">
              {tempColor.concat(productUpdate.colors).map((ele) => (
                <span
                  style={{ backgroundColor: ele }}
                  className="p-1 rounded-md my-1"
                >
                  {ele}
                </span>
              ))}
            </div>
            <div className="flex flex-row px-2 space-x-1 my-3">
              {colors.map((ele) => (
                <Circlecolor
                  color={ele}
                  key={ele}
                  onClick={() => {
                    if (tempColor.includes(ele)) {
                      setTempColor((prev) =>
                        prev.filter((item) => item !== ele)
                      );
                      return;
                    }
                    setTempColor((prev) => [...prev, ele]);
                  }}
                />
              ))}
            </div>
            <div className="flex justify-between space-x-3 py-3">
              <Button className="bg-indigo-700 py-2 hover:bg-indigo-800 text-white w-full">
                Edite
              </Button>
              <Button
                className="bg-gray-400 py-2 hover:bg-gray-500 text-white w-full"
                onClick={onCancelEdite}
              >
                CANCEL
              </Button>
            </div>
          </form>
        </Model>
        {/* delete product */}
        <Model
          isOpen={isOpenDelete}
          closeModal={closeModalDelete}
          openModal={openModalDelete}
          title="Are you sure you want to remove this Product from your Store?"
          closeModalEdite={closeModalEdite}
          removeProductHandler={removeProductHandler}
        >
          <div className="flex flex-col space-y-3">
            <p>
              "Deleting this product will remove it permanently from your
              inventory. Any associated data, sales history, and other related
              information will also be deleted. Please make sure this is the
              intended action."
            </p>

            <div className="flex items-center space-x-3">
              <Button
                className="bg-[#c2344d] hover:bg-red-800"
                onClick={removeProductHandler}
              >
                Yes, remove
              </Button>
              <Button
                className="bg-[#f5f5fa] hover:bg-gray-300 !text-black"
                onClick={() => closeModalDelete()}
              >
                Cancel
              </Button>
            </div>
          </div>
        </Model>

        <Toaster />
      </div>
    </div>
  );
}

export default App;
