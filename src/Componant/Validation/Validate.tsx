export function validateInput(product: {
  title: string;
  description: string;
  imageURL: string;
  price: string;
}) {
  const errors = {
    title: "",
    description: "",
    imageURL: "",
    price: "",
  };
  // const validUrl = /^(ftp|http|https):\/\/[^ "]+$/.test(product.imageURL);
  const validUrl = /.*/.test(product.imageURL);

  if (
    !product.title.trim() ||
    product.title.length < 10 ||
    product.title.length > 100
  ) {
    errors.title =
      "the title must be grater than 10 character and less than 100 character";
  }
  if (
    !product.description.trim() ||
    product.description.length < 10 ||
    product.description.length > 100
  ) {
    errors.description =
      "the description must be grater than 10 character and less than 200 character";
  }
  if (!validUrl || !product.imageURL.trim()) {
    errors.imageURL = "please enter the correct url";
  }
  if (!product.price.trim() || isNaN(Number(product.price))) {
    errors.price = "please enter the correct price";
  }
  return errors;
}
