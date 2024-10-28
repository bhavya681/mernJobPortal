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
import { MoreHorizontal } from "lucide-react";
import { useSelector } from "react-redux";
import { toast } from "sonner";

const ApplicantTable = () => {
  const shortlistingStatus = ["Accepted", "Rejected"];

  const { applicants } = useSelector((store) => store.application);

  const statusHandler = async (status, id) => {
    try {
      const res = await fetch(
        `http://localhost:8080/api/v1/application/status/${id}/update`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "auth-token": localStorage.getItem("auth-token"),
          },
          body:JSON.stringify({status})
        }
      );
      const data = await res.json();
      if(data.success){
        toast.success(data.message);

      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <>
      <div className="m-2 p-2">
        <Table>
          <TableCaption>A list of your recent applied user</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>FullName</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date / Time</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants &&
              applicants?.map((item) => (
                <>
                  <TableRow>
                    <TableCell>{item.fullname}</TableCell>
                    <TableCell>{item.email}</TableCell>
                    <TableCell>{item.phoneNumber}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell className="text-blue-600 cursor-pointer">
                      <a href={item?.resume} target="blank">
                        {item?.resumeName || "not uploaded"}
                      </a>
                    </TableCell>
                    <TableCell>
                      {new Date(item.createdAt).toLocaleString()}
                    </TableCell>
                    <TableCell className="float-right cursor-pointer">
                      <Popover>
                        <PopoverTrigger>
                          <MoreHorizontal />
                        </PopoverTrigger>
                        <PopoverContent className="w-32">
                          {shortlistingStatus.map((status, index) => (
                            <>
                              <div onClick={()=>{statusHandler(status,item?.id)}}
                                key={index}
                                className="flex w-fit my-2 cursor-pointer items-center"
                              >
                                <span>{status}</span>
                              </div>
                            </>
                          ))}
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  </TableRow>
                </>
              ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default ApplicantTable;
