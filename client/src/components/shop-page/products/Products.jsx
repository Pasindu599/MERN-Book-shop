import "./Products.css";

const Products = ({ result }) => {
  return (
    <>
      <section className="grid gap-7 mr-4 my-8 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1">
        {result}
      </section>
    </>
  );
};

export default Products;
