import { useState } from "react";

function ProductForm() {
  const [product, setProduct] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    email: "",
  });
  const [error, setError] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    email: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value });

    let errorMessage = "";

    if (value.trim() === "") {
      errorMessage = `${name} is required.`;
    } else if (name === "price" && Number(value) < 0) {
      errorMessage = "Price cannot be less than 0.";
    } else if (name === "email") {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        errorMessage = "Email is not valid.";
      }
    }

    setError((prev) => ({ ...prev, [name]: errorMessage }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    Object.keys(product).forEach((key) => {
      if (!product[key].trim()) {
        newErrors[key] = `${key} is required.`;
      }
    });

    if (Number(product.price) <= 0) {
      newErrors.price = "Price cannot be less than 0.";
    }
    
    const emailPattern = /^[^\s@]+@[^\s@]+\.[a-zA-Z]{2,}$/;
    if (!emailPattern.test(product.email)) {
      newErrors.email = "Email is not valid.";
    }

    if (Object.keys(newErrors).length > 0) {
      setError(newErrors);
      return;
    }

    alert(JSON.stringify(product));

    setProduct({
      name: "",
      image: "",
      price: "",
      description: "",
      email: "",
    });

    setError({
      name: "",
      image: "",
      price: "",
      description: "",
      email: "",
    });
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h1>Create Product Form</h1>
      <div className="input-container">
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Enter name here"
            value={product.name}
            onChange={handleChange}
          />
        </label>
      </div>
      <div>{error.name && <p className="error">{error.name}</p>}</div>
      <div className="input-container">
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Enter image url here"
            value={product.image}
            onChange={handleChange}
          />
        </label>
      </div>
      {error.image && <p className="error">{error.image}</p>}
      <div className="input-container">
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            placeholder="Enter price here"
            value={product.price}
            onChange={handleChange}
          />
        </label>
      </div>
      {error.price && <p className="error">{error.price}</p>}
      <div className="input-container">
        <label>
          Description
          <textarea
            id="description"
            name="description"
            type="text"
            placeholder="Enter description here"
            value={product.description}
            onChange={handleChange}
            rows={4}
            cols={30}
          />
        </label>
      </div>
      {error.description && <p className="error">{error.description}</p>}
      <div className="input-container">
        <label>
          User's email
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Enter your email here"
            value={product.email}
            onChange={handleChange}
          />
        </label>
      </div>
      {error.email && <p className="error">{error.email}</p>}
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default ProductForm;
