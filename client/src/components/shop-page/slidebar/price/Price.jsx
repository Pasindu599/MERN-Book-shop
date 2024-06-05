import Input from "../../../Input";
import "./Price.css";

const Price = ({ handleChange }) => {
  return (
    <>
      <div className="ml">
        <h2 className="sidebar-title price-title">Price</h2>

        <label className="sidebar-label-container">
          <input onChange={handleChange} type="radio" value="" name="test2" />
          <span className="checkmark"></span>All
        </label>

        <Input
          handleChange={handleChange}
          value={"0-5000"}
          title="Rs.0 - Rs.5,000"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={"5000-25000"}
          title="Rs.5,000 - Rs.25,000"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={"25000-50000"}
          title="Rs.25,000 - Rs.50,000"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={"50000-100000"}
          title="Rs.50,000 - Rs.100,000"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={"100000-200000"}
          title="Rs.100,000 - Rs.200,000"
          name="test2"
        />

        <Input
          handleChange={handleChange}
          value={"200000-10000000000000"}
          title="Over Rs.200,000"
          name="test2"
        />
      </div>
    </>
  );
};

export default Price;
