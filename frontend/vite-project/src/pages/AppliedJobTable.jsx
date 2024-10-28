import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { setAllAppliedCompanies } from "@/redux/applicationSlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const AppliedJobTable = () => {
  const dispatch = useDispatch();
  const { allAppliedCompanies } = useSelector((store) => store.application);
  const [companyNames, setCompanyNames] = useState({});

  const fetchUsersAppliedJobs = async () => {
    try {
      const res = await fetch(`http://localhost:8080/api/v1/application/get`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });

      const data = await res.json();
      dispatch(setAllAppliedCompanies(data?.application));
    } catch (error) {
      console.log(error);
    }
  };

  const getCompanyName = async (id) => {
    if (companyNames[id]) return; // Skip if name is already fetched
    try {
      const res = await fetch(`${COMPANY_API_END_POINT}/company/${id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await res.json();
      setCompanyNames((prevNames) => ({
        ...prevNames,
        [id]: data?.company?.name || "Unknown",
      }));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsersAppliedJobs();
  }, []);

  return (
    <div>
      <Table>
        <TableCaption>List of your Applied Jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {allAppliedCompanies.map((item, index) => {
            const companyId = item?.job?.company; // Assume companyId is here
            getCompanyName(companyId); // Fetch company name if not already done

            return (
              <TableRow key={index}>
                <TableCell>
                  {new Date(item.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell>{item?.job?.title || "NA"}</TableCell>
                <TableCell>{companyNames[companyId] || "Loading..."}</TableCell>
                <TableCell className="text-right">
                  <Badge
                    className={`${
                      item?.status === "rejected"
                        ? "bg-red-400"
                        : item?.status === "pending"
                        ? "bg-gray-400"
                        : "bg-green-400"
                    }`}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
