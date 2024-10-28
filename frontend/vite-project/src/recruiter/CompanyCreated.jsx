import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";

const CompanyCreated = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { singleCompany } = useSelector((store) => store.company);
  const [input, setInput] = useState({
    name: "",
    descripton: "",
    website: "",
    location: "",
    file: null,
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    const file = e.target.files?.[0];
    setInput({ ...input, file });
  };

  // Fetch company data by ID and update Redux store
  const singleUserData = async () => {
    try {
      const res = await fetch(`${COMPANY_API_END_POINT}/company/${id}`, {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      const data = await res.json();

      if (data.company) {
        dispatch(setSingleCompany(data.company));
      } else {
        console.error("Company data not found");
      }
    } catch (error) {
      console.error("Error fetching company data:", error);
    }
  };

  // Set initial input values based on singleCompany once it's fetched
  useEffect(() => {
    if (id) {
      singleUserData();
    }
  }, [id]);

  useEffect(() => {
    if (singleCompany) {
      setInput({
        name: singleCompany.name || "",
        descripton: singleCompany.description || "",
        website: singleCompany.website || "",
        location: singleCompany.location || "",
        file: singleCompany.file || null,
      });
    }
  }, [singleCompany]);

  // Handle form submission for updating company details
  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.descripton);
    formData.append("website", input.website);
    formData.append("location", input.location);

    if (input.file) {
      formData.append("file", input.file); // New file is uploaded
    } else if (singleCompany.logo) {
      formData.append("logo", singleCompany.logo); // Use the existing logo URL
    }

    try {
      const res = await fetch(`${COMPANY_API_END_POINT}/company-edit/${id}`, {
        method: "PUT",
        headers: {
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: formData,
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
            <h1 className="font-bold text-xl">Company Setup</h1>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label>Company Name</Label>
              <Input
                type="text"
                placeholder="Enter Company Name"
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Company Description</Label>
              <Input
                type="text"
                placeholder="Enter Company Description"
                name="descripton"
                value={input.descripton}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Company Website</Label>
              <Input
                type="text"
                placeholder="Enter Company Website"
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Company Location</Label>
              <Input
                type="text"
                placeholder="Enter Company Location"
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Company Logo</Label>
              <Input
                type="file"
                placeholder="Upload Company Logo"
                accept="image/*"
                onChange={changeFileHandler}
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

export default CompanyCreated;
