import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "./ui/button";
import { useDispatch, useSelector } from "react-redux";
import { APPLICATION_API_END_POINT, JOB_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { toast } from "sonner";

function JobDetail() {
  const params = useParams();
  const jobId = params.id;
  const { user } = useSelector((state) => state.auth);
  const { singleJob } = useSelector((state) => state.job);

  const isInitialApplied =
    singleJob?.applications?.some(
      (application) => application?.applicant?._id === user?._id
    ) || false;

  const [isApplied, setIsApplied] = useState(isInitialApplied);

  const dispatch = useDispatch();

  const applyJobHandler = async () => {
    try {
      const res = await fetch(`${APPLICATION_API_END_POINT}/apply/${jobId}`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await res.json();
      if (data.success) {
        setIsApplied(true);
        const updateSingleJob = {
          ...singleJob,
          applications: [...singleJob.applications, { applicant: user?._id }],
        };
        dispatch(setSingleJob(updateSingleJob));
        toast.success(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const fetchSingleJobs = async () => {
      try {
        const res = await fetch(`${JOB_API_END_POINT}/get/${jobId}`, {
          method: "GET",
          headers: {
            "auth-token": localStorage.getItem("auth-token"),
          },
        });
        const data = await res.json();
        if (data.success) {
        
          dispatch(setSingleJob(data.job));
          setIsApplied(
            data.job.applications.some(
              (application) => application.applicant._id === user?._id
            )
          );
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchSingleJobs();
  }, [jobId, dispatch, user?._id]);

  return (
    <div className="max-w-7xl mx-auto my-10 min-h-[27rem]">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-bold text-xl">
            {singleJob?.title ? singleJob?.title : "Frontend Developer"}
          </h1>
          <div className="flex flex-wrap gap-2 mt-4">
            <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
              {singleJob?.location ? singleJob?.location : "Remote"}
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full">
              {singleJob?.salary ? singleJob?.salary : "$700k"}
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
              {singleJob?.experienceLevel
                ? singleJob?.experienceLevel
                : "3-5 Yrs"}
            </span>
            <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-600 rounded-full">
              {singleJob?.title ? singleJob?.title : "Frontend Developer"}
            </span>
          </div>
        </div>

        <Button
          onClick={isApplied ? null : applyJobHandler}
          disable={isApplied}
          className={`rounded-lg ${
            isApplied
              ? "bg-gray-600 cursor-not-allowed"
              : "bg-[#7209b7] hover:bg-[#5f32ad]"
          }`}
        >
          {isApplied ? "Already Applied" : "Apply Now"}
        </Button>
      </div>
      <h1 className="border-b-2 border-b-gray-300 font-medium my-4 py-4">
        Job Description
      </h1>
      <div>
        <h1 className="font-bold my-1">
          Role:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.title ? singleJob?.title : "Frontend Developer"}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Location:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.location ? singleJob?.location : "Remote"}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Experience:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.experienceLevel
              ? singleJob?.experienceLevel
              : "3-5 Yrs"}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Salary:{" "}
          <span className="pl-4 font-normal text-gray-800">
            ${singleJob?.salary ? singleJob?.salary : 4000}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Total Applicants:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.applications?.length
              ? singleJob?.applications?.length
              : 0}
          </span>
        </h1>
        <h1 className="font-bold my-1">
          Posted Date:{" "}
          <span className="pl-4 font-normal text-gray-800">
            {singleJob?.createdAt
              ? new Date(singleJob?.createdAt).toLocaleDateString()
              : "32 Jun 2025"}
          </span>
        </h1>
      </div>
    </div>
  );
}

export default JobDetail;
