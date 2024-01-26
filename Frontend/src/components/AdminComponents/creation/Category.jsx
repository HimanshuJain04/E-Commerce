import React, { useState, useContext, useEffect } from 'react';
import { ApiCalling } from "../../../services/Api";
import { AppContext } from '../../../context/AppContext';
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";


function Category() {

  const [category, setCategory] = useState("");
  const [tag, setTag] = useState("");
  const { tags, setCategories } = useContext(AppContext);
  const navigate = useNavigate();

  const categoriesReassign = async () => {

    const res = await ApiCalling("GET", "category/getAllCategory");
    console.log("res : ", res);
    if (res?.success === true) {
      setCategories(res?.data);
    } else {
      toast.error(res?.data?.message);
      setCategories([]);
      navigate("/error/something-went-wrong");
    }
  };


  const sumbitHandler = async (e) => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", category);
    fd.append("tagName", tag);

    const res = await ApiCalling("POST", "category/createCategory", fd)
    if (res?.success) {
      await categoriesReassign();
      toast.success("Category created successfully")
    } else {
      toast.error(res?.data?.message);
    }
    setCategory("");
  }

  return (
    <div className='w-full flex justify-center shadow-xl mt-10 bg-white p-10 rounded-xl items-center h-full'>
      <form className='flex flex-col gap-10 w-full'>

        <div className='flex flex-col gap-8 justify-start items-center'>

          {/* tags */}
          <select onChange={(e) => { setTag(e.target.value) }} name="tag" className='outline-none rounded-md border-[2px] font-semibold border-[black]/[0.15]  py-2 px-2 w-[300px] uppercase'>
            <option value="">Select Tag</option>
            {
              tags.map((tag) => (
                <option className='uppercase'
                  key={tag._id}
                  value={tag?.name}

                > {tag?.name}</option>
              ))
            }

          </select>

          {/* category */}
          <input
            className='outline-none font-semibold border-[2px] rounded-md border-[black]/[0.15] py-2 px-2 w-full '
            type="text"
            placeholder='Category Name'
            name="name"
            value={category}
            onChange={(e) => { setCategory(e.target.value) }}
          />
        </div>

        <div className='w-full flex justify-center text-white items-center'>
          <button
            onClick={sumbitHandler}
            className='w-full flex justify-center items-center gap-1 rounded-lg py-3 font-semibold bg-blue-700'
          >
            <span className='text-2xl'><MdAdd /></span>
            <span>Create Category</span>
          </button>
        </div>

      </form>

    </div>
  )
}

export default Category;