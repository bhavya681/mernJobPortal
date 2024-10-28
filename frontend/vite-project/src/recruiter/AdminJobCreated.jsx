import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { setSingleCompany } from "@/redux/companySlice";
import { JOB_API_END_POINT } from "@/utils/constant";

const AdminJobCreated = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experienceLevel: "",
    position: "",
    companyId: "",
  });

  const { comapnies } = useSelector((store) => store.company);

  const handleChange = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const registerNewJob = async () => {
    // Check for empty fields
    for (const [key, value] of Object.entries(input)) {
      if (!value && (key !== 'experienceLevel' && key !== 'position')) { // Allow zero for experienceLevel and position
        toast.error(`Please fill out the ${key} field.`);
        return;
      }
    }
  
    // Prepare data for the backend
    const jobData = {
      ...input,
      experienceLevel: parseInt(input.experienceLevel, 10), // Convert to number
      position: parseInt(input.position, 10) || 0, // Convert to number, default to 0 if NaN
    };
  

  
    try {
      const res = await fetch(`${JOB_API_END_POINT}/post`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify(jobData),
      });
      const data = await res.json();

      if (data) {
        toast.success('Job successfully created');
        // Assuming you want to fetch the new company details
        dispatch(setSingleCompany(data.company));
        navigate(`/admin/jobs`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const changeSelectChange = (value) => {
    const selected = comapnies?.companies?.find(
      (company) => company.name.toLowerCase() === value
    );
    if (selected) {
      setInput((prevInput) => ({ ...prevInput, companyId: selected._id }));
    }
  };

  return (
    <div className="m-2 p-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="font-bold text-2xl my-10">Create a New Job Posting</h1>
        <div className="grid grid-cols-1 gap-4">
          {/* Input fields */}
          {['title', 'description', 'requirements', 'salary', 'location', 'jobType', 'experienceLevel', 'position'].map((field, index) => (
            <div key={index}>
              <Label>{field.charAt(0).toUpperCase() + field.slice(1)}</Label>
              <Input
                type="text"
                name={field}
                placeholder={`Enter ${field}`}
                value={input[field]}
                onChange={handleChange}
              />
            </div>
          ))}
          {comapnies?.companies?.length > 0 && (
            <Select onValueChange={changeSelectChange}>
              <SelectTrigger className="w-full sm:w-[180px] bg-white border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-indigo-500 focus:border-indigo-500 transition">
                <SelectValue placeholder="Select Your Company" />
              </SelectTrigger>
              <SelectContent className="bg-white border border-gray-300 rounded-md shadow-md mt-2">
                {comapnies?.companies?.map((company) => (
                  <SelectItem
                    key={company._id}
                    value={company.name.toLowerCase()}
                    className="p-2 hover:bg-indigo-100 transition"
                  >
                    {company.name}
                  </SelectItem>
                ))}
                {!comapnies?.companies?.length && (
                  <SelectItem disabled className="p-2 text-gray-500">
                    No companies available
                  </SelectItem>
                )}
              </SelectContent>
            </Select>
          )}
        </div>
        <div className="flex items-center gap-2 my-10">
          <Button variant="outline" onClick={() => navigate("/admin/companies")}>
            Cancel
          </Button>
          <Button onClick={registerNewJob}>Create Job</Button>
        </div>
      </div>
    </div>
  );
};

export default AdminJobCreated;
