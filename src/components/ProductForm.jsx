import { useState } from "react";


function ProductForm() {
  // สร้าง useState เก็บค่าฟอร์มทั้งหมด
  const [formData,setFormData] = useState({name:"",image:"",price: 0,description:"",email:""})
  // สร้างฟังก์ชั่นสำหรับค่าที่เปลี่ยนแปลงของ input
  const handleChange = (event) => {
    const {name,value} = event.target;
    setFormData({...formData,[name]: value})
  }
  // แสดง Error Message ใต้ Input
  const [error,setError] = useState({name:"",image:"",price: 0,description:"",email:""})
  // ฟังก์ชั่นตรวจสอบ format email
  const isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  // ฟังก์ชันตรวจสอบข้อมูลทั้งหมดว่าเว้นว่างมั้ย
  const validateForm = () => {
    let tempErrors = {name:"",image:"",price:0,description:"",email:""}
    let isValid = true;
    // ฟังก์ชั่นตรวจสอบ ชื่อ
    if (!formData.name) {
      tempErrors.name = "Name is required."
      isValid = false;
    }
    // ฟังก์ชั่นตรวจสอบ รูป
    if (!formData.image) {
      tempErrors.image = "Image is required."
      isValid = false;
    }
    // ฟังก์ชั่นตรวจสอบ ราคา
    if (!formData.price) {
      tempErrors.price = "Price is required."
      isValid = false;
    } else if (formData.price <= 0) {
      tempErrors.price = "Price cannot be less than 0."
      isValid = false;
    }
    // ฟังก์ชั่นตรวจสอบ description
    if (!formData.description) {
      tempErrors.description = "Description is required."
      isValid = false;
    }
    // ฟังก์ชั่นตรวจสอบ email
    if (!formData.email) {
      tempErrors.email = "Email is required."
      isValid = false;
    } else if (!isValidEmail(formData.email)) {
      tempErrors.email = "Invalid email format."
      isValid = false;
    }

    setError(tempErrors)
    return isValid
}
  
  // alert ข้อมูลฟอร์มโดยใช้ built-in-array
  const handleSubmit = (event) => {
    event.preventDefault();

    if(validateForm()) {
      const formattedData  = {
        name: formData.name,
        image: formData.image,
        price: Number(formData.price),
        description: formData.description,
        email: formData.email
      }
      // แสดงข้อมูลผ่าน alert ในรูปแบบ JSON
      alert(JSON.stringify(formattedData, null, 2));
      
      // ส่งข้อมูลไปยังเซิร์ฟเวอร์หรือทำการประมวลผลต่อไป (ถ้าต้องการ)
      console.log("Form submitted:", formData);
    }
  }

  return (
    <form className="post-form" onSubmit={handleSubmit}>
      <h1>Create Product Form</h1>
      <div className="input-container">
        {/* name */}
        <label>
          Name
          <input
            id="name"
            name="name"
            type="text"
            value={formData.name}
            placeholder="Enter name here"
            onChange={handleChange} 
            className={error.name ? 'error': ""}
          />
        </label>
        {error.name && <div className="error-message">{error.name}</div>}
      </div>
      <div className="input-container">
        {/* Image */}
        <label>
          Image Url
          <input
            id="image"
            name="image"
            type="text"
            value={formData.image}
            placeholder="Enter image url here"
            onChange={handleChange} 
            className={error.image ? 'error': ""}
          />
        </label>
        {error.image && <div className="error-message">{error.image}</div>}
      </div>
      <div className="input-container">
        {/* Price */}
        <label>
          Price
          <input
            id="price"
            name="price"
            type="number"
            value={formData.price}
            placeholder="Enter price here"
            onChange={handleChange} 
            className={error.price ? 'error': 0}
          />
        </label>
        {error.price && <div className="error-message">{error.price}</div>}
      </div>
      <div className="input-container">
        {/* Description */}
        <label>
          Description
          <textarea
            id="description"
            name="description"
            type="text"
            value={formData.description}
            placeholder="Enter description here"
            onChange={handleChange} 
            className={error.description ? 'error': ""}
            rows={4}
            cols={30}
          />
        </label>
        {error.description && <div className="error-message">{error.description}</div>}
      </div>
      <div className="input-container">
        {/* email */}
        <label>
          User's email
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            placeholder="Enter your email here"
            onChange={handleChange} 
            className={error.email ? 'error': ""}
          />
        </label>
        {error.email && <div className="error-message">{error.email}</div>}
      </div>
      <div className="form-actions">
        <button type="submit">Create</button>
      </div>
    </form>
  );
}

export default ProductForm;
