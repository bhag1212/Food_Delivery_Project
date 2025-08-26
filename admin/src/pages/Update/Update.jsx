import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import '../Add/Add.css'; // optional styling file

const Update = ({ url }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [editItem, setEditItem] = useState(null);
  const [editImage, setEditImage] = useState(null);

  // Fetch food item details on load
  useEffect(() => {
    const fetchFood = async () => {
      try {
        const res = await axios.get(`${url}/api/food/list/${id}`);
        if (res.data.success) {
          setEditItem(res.data.data);
        } else {
          toast.error("Failed to fetch food details");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error fetching food");
      }
    };
    fetchFood();
  }, [id, url]);

  // Submit updated data
  const onSubmitHandler = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", editItem.name);
    formData.append("description", editItem.description);
    formData.append("price", editItem.price);
    formData.append("category", editItem.category);
    if (editImage) {
      formData.append("image", editImage);
    }

    try {
      const res = await axios.put(`${url}/api/food/update/${id}`, formData);
      if (res.data.success) {
        toast.success("Updated successfully!");
        setEditImage(null);
        navigate("/");
      } else {
        toast.error("Update failed");
      }
    } catch (err) {
      toast.error("Something went wrong");
    }
  };

  if (!editItem) return <p>Loading...</p>;

  return (

    <div className='add'>
  <form onSubmit={onSubmitHandler} className='flex-col'>

    <div className="add-product-name flex-col">
      <p>Product Name</p>
      <input value={editItem?.name} onChange={(e) => setEditItem({ ...editItem, name: e.target.value })} type='text' name='name' placeholder='Enter product name'/>
    </div>

    <div className="add-img-upload flex-col">
      <p>Upload Image</p>
      <label htmlFor='image'>
        <img src={editImage ? URL.createObjectURL(editImage) : `${url}/images/${editItem?.image}`} alt="" />
      </label>
      <input onChange={(e) => setEditImage(e.target.files[0])} type='file' id='image' hidden />
    </div>

    <div className="add-product-description flex-col">
      <p>Product Description</p>
      <textarea onChange={(e) => setEditItem({ ...editItem, description: e.target.value })} value={editItem?.description} name="description" rows='6' placeholder='Enter Description'></textarea>
    </div>

    <div className="add-category-price">
      <div className="add-category flex-col">
        <p>Product Category</p>
        <select value={editItem?.category} onChange={(e) => setEditItem({ ...editItem, category: e.target.value })} name='category'>
          <option value="Salad">Salad</option>
          <option value="Rolls">Rolls</option>
          <option value="Deserts">Deserts</option>
          <option value="Sandwich">Sandwich</option>
          <option value="Cake">Cake</option>
          <option value="Pure Veg">Pure Veg</option>
          <option value="Pasta">Pasta</option>
          <option value="Noodles">Noodles</option>
        </select>
      </div>

      <div className="add-price flex-col">
        <p>Product Price</p>
        <input value={editItem?.price} onChange={(e) => setEditItem({ ...editItem, price: e.target.value })} type='number' name='price' placeholder='Enter price'/>
      </div>
    </div>

    <button type='submit' className='add-btn'>UPDATE</button>
  </form>
</div>

  );
};

export default Update;

