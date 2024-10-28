// import { setSearchQuery } from "@/redux/jobSlice";
// import { Button } from "./ui/button";
// import { Card, CardContent } from "./ui/card";
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "./ui/carousel";
// import { useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";

// const CategoryCarousel = () => {

// const navigate=useNavigate();
//   const dispatch=useDispatch();

//   const serachJobHandler = async (query) => {
//     dispatch(setSearchQuery(query));
//     navigate("/browse");
//   };

//   const category = [
//     "Frontend Developer",
//     "Backend Developer",
//     "Data Science",
//     "Graphic Designer",
//     "Fullstack Developer",
//   ];

//   return (
//     <>
//       <div>
//         <Carousel className="w-full max-w-xl mx-auto my-20">
//           <CarouselContent>
//             {category.map((cat, index) => (
//               <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
//                 <Button onClick={()=>{serachJobHandler(cat)}} variant="outline" className="rounded-full">
//                   {cat}
//                 </Button>
//               </CarouselItem>
//             ))}
//           </CarouselContent>
//           <CarouselPrevious />
//           <CarouselNext />
//         </Carousel>
//       </div>
//     </>
//   );
// };

// export default CategoryCarousel;


import { setSearchQuery } from "@/redux/jobSlice";
import { Button } from "./ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

const CategoryCarousel = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const serachJobHandler = (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "Fullstack Developer",
  ];

  return (
    <div>
      <Carousel className="w-full max-w-xl mx-auto my-20">
        <CarouselContent>
          {category.map((cat, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg-basis-1/3">
              <Button onClick={() => serachJobHandler(cat)} variant="outline" className="rounded-full">
                {cat}
              </Button>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default CategoryCarousel;
