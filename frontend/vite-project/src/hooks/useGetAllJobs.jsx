// import { setAllJobs } from "@/redux/jobSlice";
// import { JOB_API_END_POINT } from "@/utils/constant";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// const useGetAllJobs = () => {
//   const dispatch = useDispatch();
//   const {searchQuery}=useSelector((store)=>store.job);
//   useEffect(() => {
//     const fetchAllJobs = async () => {
//       try {
//         const res = await fetch(`${JOB_API_END_POINT}/get`, {
//           //${JOB_API_END_POINT}/get?keyword=${searchQuery}
//           method: "GET",
//           headers: {
//             "auth-token": localStorage.getItem("auth-token"),
//           },
//         });
//         const data = await res.json();
//         if (data.success) {
//           dispatch(setAllJobs(data.jobs));
//         }
//       } catch (error) {
//         console.log(error);
//       }
//     };
//     fetchAllJobs();
//   }, []);
// };

// export default useGetAllJobs;


import { setAllJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useGetAllJobs = () => {
  const dispatch = useDispatch();
  const { searchQuery } = useSelector((store) => store.job);

  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        const query = searchQuery ? `?keyword=${searchQuery}` : "";
        const res = await fetch(`${JOB_API_END_POINT}/get${query}`, {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        const data = await res.json();
        if (data.success) {
          dispatch(setAllJobs(data.jobs));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchAllJobs();
  }, [searchQuery]); // Add searchQuery here to refetch on change
};

export default useGetAllJobs;
