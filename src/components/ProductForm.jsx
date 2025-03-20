import { useState } from "react";

function ProductForm() {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    price: "",
    description: "",
    email: ""
  });
  const [errors, setErrors] = useState({});

  const validate = () => {
    let newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.image.trim()) newErrors.image = "Image is required.";
    if (formData.price === "") newErrors.price = "Price is required.";
    else if (parseFloat(formData.price) < 0) newErrors.price = "Price cannot be less than 0.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format.";
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      alert(JSON.stringify(formData, null, 2));
    }
  };

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h1>Create Product Form</h1>
      <div className="input-container">
        <label>Name</label>
        <input name="name" type="text" value={formData.name} onChange={handleChange} placeholder="Enter name here" />
        {errors.name && <p className="error">{errors.name}</p>}
      </div>
      <div className="input-container">
        <label>Image Url</label>
        <input name="image" type="text" value={formData.image} onChange={handleChange} placeholder="Enter image url here" />
        {errors.image && <p className="error">{errors.image}</p>}
      </div>
      <div className="input-container">
        <label>Price</label>
        <input name="price" type="number" value={formData.price} onChange={handleChange} placeholder="Enter price here" />
        {errors.price && <p className="error">{errors.price}</p>}
      </div>
      <div className="input-container">
        <label>Description</label>
        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter description here" rows={4} cols={30} />
        {errors.description && <p className="error">{errors.description}</p>}
      </div>
      <div className="input-container">
        <label>User's email</label>
        <input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="Enter your email here" />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default ProductForm;
