import React from 'react';
import { ApiCalling } from "../../services/Api";
import { useState, useContext } from 'react';
import { AppContext } from '../../context/AppContext';
import { toast } from "react-toastify"
import { useNavigate } from "react-router-dom"


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
    <div className='w-full flex justify-center items-center h-full'>
      <form className='flex flex-col gap-10'>

        <div>
          <input
            className='outline-none border-[2px] border-[black]/[0.5] py-2 px-2 w-[200px] '
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
            className='w-full rounded-lg py-3 bg-blue-500'
          >Create Tag</button>
        </div>

      </form>

    </div>
  )
}

export default Tag;