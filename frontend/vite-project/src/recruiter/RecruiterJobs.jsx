import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { setAdminJobs } from "@/redux/jobSlice";
import { JOB_API_END_POINT } from "@/utils/constant";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const RecruiterJobs = () => {
  const { adminJobs, searchJobByText } = useSelector((store) => store.job);
  const dispatch = useDispatch();
  const [searchJob,setSearchJob]=useState('');

  const fetchAllJobs = async () => {
    try {
      const res = await fetch(`${JOB_API_END_POINT}/getadminjobs`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await res.json();
      if (data.success) {
        dispatch(setAdminJobs(data.jobs));
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllJobs();
  }, []);

  const [filteredJobs, setFilteredJobs] = useState([]);

  useEffect(() => {
    if(searchJobByText===''){
    setFilteredJobs(adminJobs);
    }
    const filtered = adminJobs.filter(
      (job) =>
        job?.title?.toLowerCase().includes(searchJob.toLocaleLowerCase()) ||
        job?.company?.name
          ?.toLowerCase()
          .includes(searchJob.toLocaleLowerCase())
    );
    setFilteredJobs(filtered);
  }, [searchJob, adminJobs]);

  return (
    <div className="p-5 m-2">
      <h1 className="font-bold font-mono">Post a New Job</h1>
      <div className="mb-4 flex items-center justify-between my-5">
        <input
          type="text"
          className="w-fit p-1 rounded-lg outline outline-gray-400 placeholder-slate-700"
          placeholder="Filter By Job Name, Role"
          // value={searchJobByText}
          onChange={(e)=>{dispatch(setSearchJob(e.target.value));}}
        />
      </div>

      <div className="overflow-hidden rounded-lg shadow-lg">
        <div
          className="max-h-[400px] overflow-y-auto scrollbar-none hover:scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          style={{ scrollbarWidth: "thin" }}
        >
          <Table className="min-w-full">
            <TableCaption className="text-sm font-semibold text-left text-gray-600">
              List of your recent jobs posted
            </TableCaption>
            <TableHeader className="bg-gray-50 border-b border-gray-200">
              <TableRow>
                <TableHead className="p-4 text-left font-medium text-gray-700">
                  Company Name
                </TableHead>
                <TableHead className="p-4 text-left font-medium text-gray-700">
                  Job Title
                </TableHead>
                <TableHead className="p-4 text-left font-medium text-gray-700">
                  Date
                </TableHead>
                <TableHead className="p-4 text-left font-medium text-gray-700">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody className="bg-white divide-y divide-gray-200">
              {filteredJobs?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center p-4">
                    No jobs found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredJobs?.map((job, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="p-4 text-gray-900">
                      {job.company.name}
                    </TableCell>
                    <TableCell className="p-4 text-gray-900">
                      {job.title || "N/A"}
                    </TableCell>
                    <TableCell className="p-4 text-gray-500">
                      {new Date(job.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="p-4">
                      <Popover>
                        <PopoverTrigger>
                          <button className="focus:outline-none">
                            <MoreHorizontal className="w-5 h-5 text-gray-500" />
                          </button>
                        </PopoverTrigger>
                        <PopoverContent className="w-32 p-2 bg-white shadow-md rounded-lg">
                          <div className="flex items-center gap-2 cursor-pointer p-2 hover:bg-gray-100 rounded">
                            <Edit2 className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-600">
                              <Link to={`/admin/jobs/${job._id}`}>Edit</Link>
                            </span>
                          </div>
                          <div className="flex items-center gap-2 w-fit mt-2 cursor-pointer p-2 hover:bg-gray-100 rounded">
                            <Eye className="w-4 h-4 text-gray-600" />
                            <span className="text-gray-600">
                              <Link to={`/admin/jobs/${job._id}/applicants`}>Applicant</Link>
                            </span>
                          </div>
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default RecruiterJobs;
