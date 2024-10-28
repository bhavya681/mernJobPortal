import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import RecruiterJobs from "./RecruiterJobs";

const RecruiterallJobs = () => {
  const navigate = useNavigate();

  return (
    <div className="p-4 m-3">
      <div className="max-w-full mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          <h1 className="font-mono font-bold ml-6">Create New Job</h1>
          <Button
            className="mr-8"
            onClick={() => {
              navigate("/admin/job/create");
            }}
          >
            New Job
          </Button>
        </div>
        <RecruiterJobs />
      </div>
    </div>
  );
};

export default RecruiterallJobs;
