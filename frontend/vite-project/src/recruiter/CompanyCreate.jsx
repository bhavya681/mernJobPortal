import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { setSingleCompany } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CompanyCreate = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const navigateBack = () => {
    navigate("/admin/companies");
  };
  const [companyName, setCompanyName] = useState();

  const registerNewCompany = async () => {
    try {
      const res = await fetch(`${COMPANY_API_END_POINT}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
        body: JSON.stringify({ companyName: companyName }),
      });
      const data = await res.json();
      if (data?.success) {
        toast.success(data.message);
        dispatch(setSingleCompany(data.company));
        const companyId = data?.company?._id;
        navigate(`/admin/companies/${companyId}`);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
    setCompanyName("");
  };
  return (
    <>
      <div className="m-2 p-4">
        <div className="max-x-4xl mx-auto">
          <div className="my-10">
            <h1 className="font-bold text-2xl">Your Company Name</h1>
            <p className="text-gray-500">
              What would you like to give your company name? you can change this
              later.
            </p>
          </div>
          <Label>Company Name</Label>
          <Input
            type="text"
            className="my-2"
            placeholder="JobHunt,UFC,..."
            onChange={(e) => {
              setCompanyName(e.target.value);
            }}
            value={companyName}
          />
          <div className="flex items-center gap-2 my-10">
            <Button variant="outline" onClick={navigateBack}>
              Cancel
            </Button>
            <Button onClick={registerNewCompany}>Continue</Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CompanyCreate;
