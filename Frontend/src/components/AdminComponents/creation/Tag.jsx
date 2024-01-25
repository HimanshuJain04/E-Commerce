import React from 'react';
import { ApiCalling } from "../../../services/Api";
import { useState, useContext } from 'react';
import { AppContext } from '../../../context/AppContext';
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom";
import { MdAdd } from "react-icons/md";



function Tag() {

  const [tag, setTag] = useState("");
  const navigate = useNavigate();
  const { setTags } = useContext(AppContext);

  const tagReassign = async () => {
    const res1 = await ApiCalling("GET", "tag/getAllTags");
    if (res1?.success === true) {
      setTags(res1?.data);
    } else {
      toast.error(res1?.data?.message);
      setTags([]);
      navigate("/error/something-went-wrong")

    }
  }


  const sumbitHandler = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("name", tag);

    const res = await ApiCalling("POST", "tag/createTag", fd)

    if (res?.success) {
      await tagReassign();
      toast.success("Tag created successfully")
    } else {
      toast.error(res?.data?.message);
    }
    setTag("");

  }

  return (
    <div className='w-full flex justify-center mt-10 bg-white p-10 rounded-lg items-center h-full'>
      <form className='flex flex-col gap-10'>

        <div>
          <input
            className='outline-none border-2 font-semibold border-[black]/[0.15] rounded-md py-2 px-2 w-[300px] '
            type="text"
            placeholder='Tag Name'
            name="name"
            value={tag}
            onChange={(e) => { setTag(e.target.value) }}
          />
        </div>

        <div className='w-full flex justify-center text-white items-center'>
          <button
            onClick={sumbitHandler}
            className='w-full flex justify-center items-center gap-1 rounded-lg font-semibold py-3 bg-blue-700 border-2 border-transparent transition-all duration-300 ease-in-out hover:text-blue-800 hover:border-blue-700 hover:bg-white'
          >
            <span className='text-2xl'><MdAdd /></span>
            <span>Create Tag</span>
          </button>
        </div>

      </form>

    </div>
  )
}

export default Tag;