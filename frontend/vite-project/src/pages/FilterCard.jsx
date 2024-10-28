// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { setSearchQuery } from "@/redux/jobSlice";
// import { Label } from "@radix-ui/react-label";
// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";

// const FilterCard = () => {
//   const filterData = [
//     {
//       filterType: "Location",
//       array: ["Delhi NCR", "Banglore", "Hydrabad", "Pune", "Mumbai"],
//     },
//     {
//       filterType: "Industry",
//       array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
//     },
//     {
//       filterType: "salary",
//       array: ["0-49k", "42-1lakh", "1lakh-5lakh"],
//     },
//   ];

//   const [selected, setSelected] = useState("");

//   const changeHandleChanger = (value) => {
//     setSelected(value);
//   };
// const dispatch=useDispatch();
//   useEffect(() => {
// dispatch(setSearchQuery(selected));
//   }, [selected]);

//   return (
//     <>
//       <div className="w-full bg-white p-3 rounded-md">
//         <h1 className="font-bold text-lg font-mono">Filter Jobs</h1>
//         <hr className="mt-3" />
//         <RadioGroup value={selected} onValueChange={changeHandleChanger}>
//           {filterData.map((data, index) => (
//             <>
//               <div key={index}>
//                 <h1 className="font-bold text-lg">{data.filterType}</h1>
//                 {data.array.map((item, idx) => (
//                   <>
//                     <div key={idx}>
//                       <div className="flex items-center space-x-2 m-2 ">
//                         <RadioGroupItem value={item} id={index-idx} />
//                         <Label htmlFor={index-idx}>{item}</Label>
//                       </div>
//                     </div>
//                   </>
//                 ))}
//               </div>
//             </>
//           ))}
//         </RadioGroup>
//       </div>
//     </>
//   );
// };

// export default FilterCard;


import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { setSearchQuery } from "@/redux/jobSlice";
import { Label } from "@radix-ui/react-label";
import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";

const FilterCard = () => {
  const filterData = [
    {
      filterType: "Location",
      array: ["Delhi NCR", "Banglore", "Hyderabad", "Pune", "Mumbai"],
    },
    {
      filterType: "Industry",
      array: ["Frontend Developer", "Backend Developer", "Fullstack Developer"],
    },
    {
      filterType: "Salary",
      array: ["0-49k", "42-1lakh", "1lakh-5lakh"],
    },
  ];

  const [selected, setSelected] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    if (selected) {
      dispatch(setSearchQuery(selected));
    }
  }, [selected]);

  const changeHandleChanger = (value) => {
    setSelected(value);
  };

  return (
    <div className="w-full bg-white p-3 rounded-md">
      <h1 className="font-bold text-lg font-mono">Filter Jobs</h1>
      <hr className="mt-3" />
      <RadioGroup value={selected} onValueChange={changeHandleChanger}>
        {filterData.map((data, index) => (
          <div key={index}>
            <h1 className="font-bold text-lg">{data.filterType}</h1>
            {data.array.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-2 m-2">
                <RadioGroupItem value={item} id={`${index}-${idx}`} />
                <Label htmlFor={`${index}-${idx}`}>{item}</Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
