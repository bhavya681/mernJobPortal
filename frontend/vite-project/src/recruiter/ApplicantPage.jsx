import { useEffect } from "react";
import ApplicantTable from "./ApplicantTable";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/applicationSlice";

const ApplicantPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();

  const { applicants } = useSelector((store) => store.application);

  const fetchAllApplicants = async () => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/application/${id}/applicants`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
        }
      );
  
      const data = await res.json();
      
      // Extract applicant details from applications array
      const applicantsDetails = data?.job?.applications.map(app => ({
        id: app._id,
        fullname: app.applicant?.fullname,
        email: app.applicant?.email,
        phoneNumber: app.applicant?.phoneNumber,
        profile: app.applicant?.profile,
        status: app.status,
        createdAt: app.createdAt,
        resume: app.applicant?.profile?.resume,
        resumeName: app.applicant?.profile?.resumeOriginalName,
        updatedAt: app.updatedAt,
      }));
  
      // Dispatch the applicants details to the store
      dispatch(setApplicants(applicantsDetails));

    } catch (error) {
      console.log("Error fetching applicants:", error);
    }
  };
  

  useEffect(() => {
    fetchAllApplicants();
  }, []);

  return (
    <>
      <div className="max-w-7xl min-h-[100vh] mx-auto">
        <h1 className="font-bold text-xl my-5">
          Applicants ({applicants?.length})
        </h1>

        <ApplicantTable />
      </div>
    </>
  );
};

export default ApplicantPage;
