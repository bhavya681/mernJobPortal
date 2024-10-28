import { Avatar, AvatarImage } from "@/components/ui/avatar";
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
import { setCompanies } from "@/redux/companySlice";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { Edit2, MoreHorizontal } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const CompaniesTable = () => {
  const [data, setData] = useState([]);
  const [filteredCompanies, setFilteredCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  const fetchAllCompanies = async () => {
    try {
      const res = await fetch(`${COMPANY_API_END_POINT}/companies`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("auth-token"),
        },
      });
      const data = await res.json();
      if (data.success) {
        setData(data.companies);
        dispatch(setCompanies(data));
      } 
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    if (searchTerm === "") {
      setFilteredCompanies(data);
    }

    const filtered = data.filter((company) =>
      company.name.toLowerCase().includes(searchTerm.toLocaleLowerCase())
    );

    setFilteredCompanies(filtered);
  }, [data, searchTerm]);

  useEffect(() => {
    fetchAllCompanies();
  }, []);

  return (
    <>
      {/* Search Input for Filtering */}
      <div className="mb-4 flex items-center justify-between my-5">
        <input
          type="text"
          className="w-fit p-1 rounded-lg outline outline-gray-400 placeholder-slate-700"
          placeholder="Filter By Name"
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
        />
      </div>
      {/* Table for Displaying Companies */}
      <div className="overflow-hidden rounded-lg shadow-lg">
        <div
          className="max-h-[400px] overflow-y-auto scrollbar-none hover:scrollbar scrollbar-thumb-gray-400 scrollbar-track-gray-200"
          style={{ scrollbarWidth: "thin" }}
        >
          <Table className="min-w-full">
            <TableCaption className="text-sm font-semibold text-left text-gray-600">
              List of your recent registered companies
            </TableCaption>
            <TableHeader className="bg-gray-50 border-b border-gray-200">
              <TableRow>
                <TableHead className="p-4 text-left font-medium text-gray-700">
                  Logo
                </TableHead>
                <TableHead className="p-4 text-left font-medium text-gray-700">
                  Name
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
              {filteredCompanies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center p-4">
                    No companies found.
                  </TableCell>
                </TableRow>
              ) : (
                filteredCompanies.map((item, index) => (
                  <TableRow key={index} className="hover:bg-gray-50">
                    <TableCell className="p-4">
                      <Avatar
                        className="p-2 w-20"
                        style={{ borderRadius: "100%" }}
                      >
                        <AvatarImage
                          src={item.logo}
                          alt={item.name}
                          className="cursor-pointer"
                        />
                      </Avatar>
                    </TableCell>
                    <TableCell className="p-4 text-gray-900">
                      {item.name}
                    </TableCell>
                    <TableCell className="p-4 text-gray-500">
                      {new Date(item.createdAt).getDate()}/
                      {new Date(item.createdAt).getMonth() + 1}/
                      {new Date(item.createdAt).getFullYear()}
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
                              <Link to={`/admin/companies/${item._id}`}>
                                Edit
                              </Link>
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
    </>
  );
};

export default CompaniesTable;
