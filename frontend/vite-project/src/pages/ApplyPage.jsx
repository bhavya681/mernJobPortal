import  { useEffect } from "react";
import JobCard from "./JobCard";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import useGetAllJobs from "@/hooks/useGetAllJobs";

const ApplyPage = () => {
  useGetAllJobs();

  const { allJobs } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, []);

  return (
    <>
      <div className="mw-7xl mx-auto my-10 p-4">
        <div>
          <h1 className="font-bold text-xl my-10">
            Search Results {allJobs.length}
          </h1>
          <div className="grid grid-cols-3 gap-4 mt-5">
            {allJobs.map((job, index) => (
              <>
                <JobCard key={index} jobs={job} />
              </>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyPage;
