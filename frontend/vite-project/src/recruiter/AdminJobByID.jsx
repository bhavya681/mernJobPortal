import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setSingleJob } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const AdminJobByID = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleJob } = useSelector((store) => store.job);

  // Initialize the form state
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: "",
  });

  // Handle input changes for form fields
  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // Fetch company/job data by ID and populate the form with existing data
  const fetchJobDataById = async (e) => {
    try {
      const res = await fetch(`${JOB_API_END_POINT}/get/${params.id}`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      const data = await res.json();

      if (data.company) {
        dispatch(setSingleJob(data.company));
        setInput({...input,[e.target.name]:e.target.value});
      } else {
        console.error("Company data not found");
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  useEffect(() => {
    if (params.id) {
      fetchJobDataById();
    }
  }, [params.id]);

  // Populate the form fields with fetched data
  useEffect(() => {
    if (singleJob) {
      setInput({
        title: singleJob.title || "",
        description: singleJob.description || "",
        requirements: singleJob.requirements.join(", ") || "", // Join array for display
        salary: singleJob.salary || "",
        location: singleJob.location || "",
        jobType: singleJob.jobType || "",
        experienceLevel: singleJob.experienceLevel || "",
        position: singleJob.position || "",
      });
    }
  }, [singleJob]);

  // Handle form submission for updating job details
  const submitHandler = async (e) => {
    e.preventDefault();

    // Check for empty fields
    for (const [key, value] of Object.entries(input)) {
      if (!value) {
        toast.error(`Please fill out the ${key} field.`);
        return;
      }
    }

    const formData = {
      title: input.title,
      description: input.description,
      requirements: input.requirements.split(",").map(req => req.trim()), // Convert to array
      salary: input.salary,
      location: input.location,
      jobType: input.jobType,
      experienceLevel: input.experienceLevel,
      position: input.position,
    };

    try {
      const res = await fetch(`${JOB_API_END_POINT}/update/${params.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (data.success) {
        toast.success(data.message);
        navigate("/admin/companies");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Error updating company details");
    }
  };

  return (
    <div className="min-h-[80vh]">
      <div className="max-w-xl mx-auto my-10">
        <form onSubmit={submitHandler}>
          <div className="flex items-center gap-5 p-8">
            <Button
              onClick={() => navigate("/admin/companies")}
              variant="outline"
              className="flex items-center gap-2 text-gray-500 font-semibold"
            >
              <ArrowLeft />
              <span>Back</span>
            </Button>
            <h1 className="font-bold text-xl">Job Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Job Title</Label>
              <Input
                type="text"
                placeholder="Enter Job Title"
                name="title"
                value={input.title}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Job Description</Label>
              <Input
                type="text"
                placeholder="Enter Job Description"
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Job Requirements</Label>
              <Input
                type="text"
                placeholder="Enter Job Requirements (comma-separated)"
                name="requirements"
                value={input.requirements}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Job Location</Label>
              <Input
                type="text"
                placeholder="Enter Job Location"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Salary</Label>
              <Input
                type="text"
                placeholder="Enter Salary"
                name="salary"
                value={input.salary}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Job Type</Label>
              <Input
                type="text"
                placeholder="Enter Job Type"
                name="jobType"
                value={input.jobType}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Experience Level</Label>
              <Input
                type="text"
                placeholder="Enter Experience Level"
                name="experienceLevel"
                value={input.experienceLevel}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Position</Label>
              <Input
                type="text"
                placeholder="Enter Job Position"
                name="position"
                value={input.position}
                onChange={changeEventHandler}
              />
            </div>
          </div>
          <Button type="submit" className="w-full mt-8">
            Update
          </Button>
        </form>
      </div>
    </div>
  );
};

export default AdminJobByID;
