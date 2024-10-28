import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CompaniesTable from "./CompaniesTable";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { data } from "autoprefixer";
import { setSearchCompanyByText } from "@/redux/companySlice";

const RecruiterCompanies = () => {
  const navigate = useNavigate();

  

  // const [input, setInput] = useState("");

  // const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(setSearchCompanyByText(input));
  // }, [input]);

  return (
    <div className="p-4 m-1">
      <div className="max-w-full mx-auto my-10">
        <div className="flex items-center justify-between my-5">
          {/* <Input
            className="w-fit"
            placeholder="Filter By Name"
            // onChange={(e) => setInput(e.target.value)}
          /> */}
          <h1 className="font-mono font-bold">Create New Company</h1>
          <Button
            className=""
            onClick={() => {
              navigate("/recruiter/company/create");
            }}
          >
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default RecruiterCompanies;
