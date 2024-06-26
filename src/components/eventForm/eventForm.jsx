import React, { useRef, useState } from 'react'
import DatePicker from 'react-datepicker';
import { CiCalendar,CiLocationOn  } from "react-icons/ci";
import { LuTicket } from "react-icons/lu";
import { MdOutlineReduceCapacity,MdOutlineVisibility,MdApproval,MdOutlineEdit,MdArrowDropUp, MdArrowDropDown } from "react-icons/md";
import { TiTick } from "react-icons/ti";
import { addEvent, selectEvents } from '../../features/eventsSlice';
import { useDispatch, useSelector } from 'react-redux';
import 'react-datepicker/dist/react-datepicker.css';


const EventForm = () => {
// const [startDate,setStartDate]=useState(new Date());
const [selectedImage, setSelectedImage] = useState(null);
const [editticketfield,setEditTicketfield]=useState(false);
const [editcapacityfield,setEditCapacityField]=useState(false);
const [visibilityValue,setVisibilityValue]=useState("Public");
const [visibilityAnimation, setVisibilityAnimation]=useState(true);
const [selectedDate, setSelectedDate] = useState(new Date());
const eventInfo=useSelector(selectEvents);
const monthNames = [
    "Jan", "Feb", "Mar", "April", "May", "June",
    "July", "Aug", "Sept", "Oct", "Nov", "Dec"
  ];
const checkBoxRef=useRef();
const eventNameRef=useRef();
const eventLocationRef=useRef();
const eventTicketRef=useRef();
const eventCapacityRef=useRef();

const dispatch=useDispatch();

const handleChangeVisibilty=() => {
    setVisibilityAnimation(false)
    if(visibilityValue=="Public") {
        setVisibilityValue("Private");
        setVisibilityAnimation(true); 
    }
    if(visibilityValue=="Private") {
        setVisibilityAnimation(true)
        setVisibilityValue("Public");
    }
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

  };

  const handleSubmit =e=>{
    e.preventDefault();
    const eventChecked=checkBoxRef.current.checked;
    const eventName=eventNameRef.current.value;
    const eventLocation=eventLocationRef.current.value;
    const eventTicket=eventTicketRef.current.value || 'Free';
    const eventCapacity=eventCapacityRef.current.value || 'Unlimited';
    const eventVisibility=visibilityValue
    dispatch(addEvent({eventChecked, eventName, eventLocation, eventTicket, eventCapacity, eventVisibility}))

  }
let currentDay=new Date().getDate();
let currentMonth=new Date().getMonth() ;
let currentHours=new Date().getHours();
let currentMinutes=new Date().getMinutes();

console.log(monthNames[currentMonth], currentDay,currentHours, currentMinutes);


  return (
    <div className="eventform shadow-md container p-10 bg-offwhite">
        <form className='flex' onSubmit={handleSubmit}>
        <div className='pr-[3rem]'>
        <div className='py-3'>
            <input type="text" placeholder="Event Name" className="eventname text-stone-400" ref={eventNameRef} required /></div>
            <div className='py-3 flex items-center justify-between'>
            <CiCalendar   color='black' className='iconEvent'/>
          <div className='flex justify-between'>
            <label className='px-2 pr-[5rem]'>Start</label>
      
            {/* <div className='starteventinputs'>
            <input type="text" placeholder={monthNames[currentMonth]} />
            <input type="number" placeholder={Math.max(0, currentDay)} />
            <input type="number" placeholder={Math.max(0, currentHours)} />
            <input type="number" placeholder={Math.max(0, currentMinutes)} />
</div> */}
<DatePicker
      selected={selectedDate}
      onChange={(date) => setSelectedDate(date)}
      showTimeSelect
      dateFormat="MMMM d, yyyy h:mm aa"
      timeFormat="HH:mm"
      timeIntervals={15}
      timeCaption="Time"
      placeholderText="Select Date and Time"
    />
</div>

</div>
<div className='py-3 flex items-center'>
<CiLocationOn color="#8d8d8d" size="22" className='iconEvent'/>
<input type="text" placeholder="Event Location" className="eventLocation px-2 text-stone-400" ref={eventLocationRef} required/>
</div>
<div className='py-3 text-stone-400 text-justify'>
<span>Event Options</span>
<div className='flex items-center pt-5 justify-between'><label className='px-2 flex items-center'><LuTicket color='#8d8d8d' size="22" className='iconEvent'/> <span className='pl-3'>Tickets Required:</span></label>
 <div className='flex relative'>
 {editticketfield ? (<span><input type="text" placeholder='Free' className='inputCapacity' ref={eventTicketRef}/><TiTick  color="green" size="22" className='iconEvent editIcon relative' onClick={()=>handleEditEventFields("ticket")}/></span>):(<span className='flex'>Free<MdOutlineEdit color='#8d8d8d' size="22" className='iconEvent relative editIcon' onClick={()=>handleEditEventFields("ticket")}/></span>) }  
 </div></div> 




<div className='flex items-center pt-5 justify-between'><label className='px-2 flex items-center'><MdApproval color='#8d8d8d' size="22" className='iconEvent'/> <span className='pl-3'>Required Approval:</span></label>
<label class="inline-flex items-center cursor-pointer">
  <input type="checkbox" value="" class="sr-only peer" ref={checkBoxRef}/>
  <div class="relative w-11 h-6 bg-gray-200 rounded-full peer peer-focus:ring-4 peer-focus:ring-stone-400 dark:peer-focus:ring-stone-400 dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-[#F85C44]"></div>
  
</label>
</div>
<div className='flex items-center pt-5 justify-between'><label className='px-2 flex items-center'><MdOutlineReduceCapacity color='#8d8d8d' size="22" className='iconEvent'/> <span className='pl-3'>Capacity:</span></label>
<span className='flex relative'><div className='flex '>
{editcapacityfield ? (<span><input type="text" placeholder='Unlimited' className='inputCapacity' ref={eventCapacityRef}/><TiTick  color="green" size="22" className='iconEvent editIcon relative' onClick={()=>handleEditEventFields("capacity")}/></span>):(<span className='flex'>Unlimited <MdOutlineEdit color='#8d8d8d' size="22" className='iconEvent editIcon relative' onClick={()=>handleEditEventFields("capacity")}/></span>) }  
</div></span></div>


<div className='flex items-center pt-5 justify-between overflow-hidden'>
  <label className='px-2 flex items-center'>
    <MdOutlineVisibility color='#8d8d8d' size="22" />
    <span className='pl-3'> Visibility:</span>
  </label>
  <div className='flex items-center'>
    <span className={`visibilitySpan pr-3 ${visibilityAnimation ? 'visibilityAnimation' : ''}`}>
      {visibilityValue}
    </span>
    <div className='flex flex-col'>
      <MdArrowDropUp color='#8d8d8d' size="22" className='iconEvent' onClick={handleChangeVisibilty}/>
      <MdArrowDropDown color='#8d8d8d' size="22" className='iconEvent' onClick={handleChangeVisibilty}/>
    </div>
  </div>
</div>
</div>
<button type="submit" className='bg-black text-white submitbtnevent rounded-lg py-2 hover:bg-stone-900'>Create Event</button>

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