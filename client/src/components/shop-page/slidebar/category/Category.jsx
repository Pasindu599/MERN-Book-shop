import "./Category.css";
import Input from "../../../Input";

function Category({ handleChange }) {
  return (
    <div>
      <h2 className="sidebar-title">Category</h2>

      <div>
        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test" />
          <span className="checkmark"></span>All
        </label>
        <Input
          handleChange={handleChange}
          value="Electronic"
          title="Electronic"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Clothing"
          title="Clothing"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Books"
          title="Books"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Shoes"
          title="Shoes"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Jewelry"
          title="Jewelry"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Beauty"
          title="Beauty"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Toys"
          title="Toys"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Home Appliances"
          title="Home Appliances"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Furniture"
          title="Furniture"
          name="test"
        />
        <Input
          handleChange={handleChange}
          value="Others"
          title="Others"
          name="test"
        />
      </div>
    </div>
  );
}

export default Category;
