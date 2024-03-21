import React, { useRef, useState } from 'react'
// import DateTimePicker from 'react-datetime-picker';
import { CiCalendar,CiLocationOn  } from "react-icons/ci";
import { LuTicket } from "react-icons/lu";
import { MdOutlineReduceCapacity,MdOutlineVisibility,MdApproval,MdOutlineEdit,MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { TiTick } from "react-icons/ti";

const EventForm = () => {
// const [startDate,setStartDate]=useState(new Date());
const [selectedImage, setSelectedImage] = useState(null);
const [editticketfield,setEditTicketfield]=useState(false);
const [editcapacityfield,setEditCapacityField]=useState(false);
const [visibilityValue,setVisibilityValue]=useState("Public");

const checkBoxRef=useRef();


const handleChangeVisibilty=() => {
    if(visibilityValue=="Public") setVisibilityValue("Private");
    if(visibilityValue=="Private") setVisibilityValue("Public");

}
const handleEditEventFields=(field)=>{
if(field=="ticket"){
    setEditTicketfield(!editticketfield);
    console.log("ticket" + editticketfield)
}
else if(field=="capacity"){
    setEditCapacityField(!editcapacityfield);
    console.log("capacity" +editcapacityfield )
}

// console.log("dsds")    
}
const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
console.log(selectedImage)

  };
  const handleSubmit =e=>{
    e.preventDefault();
    console.log(checkBoxRef.current.checked)
  }


  return (
    <div className="eventform shadow-md container p-10 bg-offwhite">
        <form className='flex' onSubmit={handleSubmit}>
        <div className='pr-[3rem]'>
        <div className='py-3'>
            <input type="text" placeholder="Event Name" className="eventname text-stone-400"/></div>
            <div className='py-3 flex items-center'>
            <CiCalendar   color='black' className='iconEvent'/>
            <label className='px-2'>Start</label>
            <input type="date" />
            <input type="time" />

            {/* <DateTimePicker
      showIcon
      selected={startDate}
      onChange={(date) => setStartDate(date)} /> */}
</div>
<div className='py-3 flex items-center'>
<CiLocationOn color="#8d8d8d" size="22" className='iconEvent'/>
<input type="text" placeholder="Event Location" className="eventLocation px-2 text-stone-400"/>
</div>
<div className='py-3 text-stone-400 text-justify'>
<span>Event Options</span>
<div className='flex items-center pt-5 justify-between'><label className='px-2 flex items-center'><LuTicket color='#8d8d8d' size="22" className='iconEvent'/> <span className='pl-3'>Tickets Required:</span></label>
 <div className='flex relative'>
 {editticketfield ? (<span><input type="text" placeholder='Free' className='inputCapacity'/><TiTick  color="green" size="22" className='iconEvent editIcon relative' onClick={()=>handleEditEventFields("ticket")}/></span>):(<span className='flex'>Free<MdOutlineEdit color='#8d8d8d' size="22" className='iconEvent relative editIcon' onClick={()=>handleEditEventFields("ticket")}/></span>) }  
 </div></div> 




<div className='flex items-center pt-5 justify-between'><label className='px-2 flex items-center'><MdApproval color='#8d8d8d' size="22" className='iconEvent'/> <span className='pl-3'>Required Approval:</span></label>
<label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer" ref={checkBoxRef}/>
  <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-stone-400 dark:peer-focus:ring-stone-400 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#F85C44]"></div>
  
</label>
</div>
<div className='flex items-center pt-5 justify-between'><label className='px-2 flex items-center'><MdOutlineReduceCapacity color='#8d8d8d' size="22" className='iconEvent'/> <span className='pl-3'>Capacity:</span></label>
<span className='flex relative'><div className='flex '>
{editcapacityfield ? (<span><input type="text" placeholder='Unlimited' className='inputCapacity'/><TiTick  color="green" size="22" className='iconEvent editIcon relative' onClick={()=>handleEditEventFields("capacity")}/></span>):(<span className='flex'>Unlimited <MdOutlineEdit color='#8d8d8d' size="22" className='iconEvent editIcon relative' onClick={()=>handleEditEventFields("capacity")}/></span>) }  
</div></span></div>


<div className='flex items-center pt-5 justify-between'><label className='px-2 flex items-center'><MdOutlineVisibility color='#8d8d8d' size="22" /><span className='pl-3'> Visibility:</span></label>
<div className='flex items-center'>
<span className='visibilitySpan pr-3'>{visibilityValue}</span>
<div className='flex flex-col'><MdArrowDropUp color='#8d8d8d' size="22" className='iconEvent' onClick={handleChangeVisibilty}/><MdArrowDropDown color='#8d8d8d' size="22" className='iconEvent' onClick={handleChangeVisibilty}/></div></div>
</div>
</div>
<button type="submit" className='bg-black text-white submitbtnevent'>Create Event</button>

</div>
<div>
<img src={selectedImage} className='eventBannerImg '/>
<input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />
</div>
        </form>
    </div>
  )
}

export default EventForm