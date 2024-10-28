// import { Avatar } from "@/components/ui/avatar";
// import { Button } from "@/components/ui/button";
// import { AvatarImage } from "@radix-ui/react-avatar";
// import { Bookmark } from "lucide-react";
// import { Link } from "react-router-dom";

// const JobCard = ({ jobs }) => {
  
//   const timeAgo = (date) => {
//     const createdAt = new Date(date);
//     const currentTime = new Date();
//     const timeDiff = currentTime - createdAt;
//     return Math.floor(timeDiff / (1000 * 24 * 60 * 60));
//   };

//   return (
//     <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px]">
//       {/* Job Header */}
//       <div className="flex justify-between items-center">
//         <p className="text-gray-500 text-sm"> {timeAgo(jobs?.createdAt)===0 ? 'Today': ` ${timeAgo(jobs?.createdAt)} days ago `}</p>
//         <Button variant="outline" className="rounded-full p-2" size="icon">
//           <Bookmark className="text-gray-600 hover:text-black" />
//         </Button>
//       </div>

//       {/* Company & Logo */}
//       <div className="flex items-center gap-3 mt-4">
//         <Avatar>
//           <AvatarImage
//             src={
//               jobs?.logo
//                 ? jobs?.logo
//                 : "https://media.designrush.com/inspirations/676695/conversions/20-preview_mobile.jpg"
//             }
//             alt={`${jobs?.company?.name} logo`}
//             className="w-20 h-12 rounded-full"
//           />
//         </Avatar>
//         <div>
//           <h2 className="text-xl font-semibold">{jobs.company.name}</h2>
//           <p className="text-gray-600">{jobs.location}</p>
//         </div>
//       </div>

//       {/* Job Title & Description */}
//       <h3 className="mt-4 text-lg font-medium text-gray-800">{jobs.title}</h3>
//       <p className="mt-2 text-sm text-gray-500">{jobs.description}</p>

//       {/* Job Badges */}
//       <div className="flex flex-wrap gap-2 mt-4">
//         <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
//           {jobs.jobType}
//         </span>
//         <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full">
//           {jobs.salary}
//         </span>
//         <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
//           {jobs.experienceLevel}
//         </span>
//         <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-600 rounded-full">
//           {jobs.position}
//         </span>
//       </div>

//       {/* Buttons */}
//       <div className="flex items-center gap-4 mt-4">
//         <Link to={`/details/${jobs._id}`}>
//           <Button variant="outline">Details</Button>
//         </Link>

//         <Button className="bg-[#7289b7]">Save For Later</Button>
//       </div>
//     </div>
//   );
// };

// export default JobCard;


import React from 'react';
import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { AvatarImage } from "@radix-ui/react-avatar";
import { Bookmark } from "lucide-react";
import { Link } from "react-router-dom";

// JobCard component accepts jobs as a prop
const JobCard = ({ jobs }) => {

  // Function to calculate time ago in days
  const timeAgo = (date) => {
    if (!date) return 'N/A';
    const createdAt = new Date(date);
    const currentTime = new Date();
    const timeDiff = currentTime - createdAt;
    const daysAgo = Math.floor(timeDiff / (1000 * 60 * 60 * 24));
    return daysAgo;
  };

  // Fallback for missing job data
  if (!jobs || !jobs.company || !jobs.company.name) {
    return <div>Job information is unavailable.</div>;
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-lg p-6 hover:shadow-2xl transition-shadow duration-300 w-full max-w-[350px] md:max-w-[450px] lg:max-w-[500px]">
      
      {/* Job Header with time ago and bookmark button */}
      <div className="flex justify-between items-center">
        <p className="text-gray-500 text-sm">
          {timeAgo(jobs?.createdAt) === 0 ? 'Today' : `${timeAgo(jobs?.createdAt)} days ago`}
        </p>
        <Button variant="outline" className="rounded-full p-2" size="icon">
          <Bookmark className="text-gray-600 hover:text-black" />
        </Button>
      </div>

      {/* Company Logo and Information */}
      <div className="flex items-center gap-3 mt-4">
        <Avatar>
          <AvatarImage
            src={jobs?.company?.logo || "https://media.designrush.com/inspirations/676695/conversions/20-preview_mobile.jpg"}
            alt={`${jobs?.company?.name} logo`}
            className="w-20 h-12 rounded-full"
          />
        </Avatar>
        <div>
          <h2 className="text-xl font-semibold">{jobs?.company?.name}</h2>
          <p className="text-gray-600">{jobs?.location || 'Location not provided'}</p>
        </div>
      </div>

      {/* Job Title and Description */}
      <h3 className="mt-4 text-lg font-medium text-gray-800">{jobs?.title || 'Job title unavailable'}</h3>
      <p className="mt-2 text-sm text-gray-500">{jobs?.description || 'No description available for this job.'}</p>

      {/* Job Badges */}
      <div className="flex flex-wrap gap-2 mt-4">
        <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-600 rounded-full">
          {jobs?.jobType || 'Job type not specified'}
        </span>
        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-600 rounded-full">
          {jobs?.salary || 'Salary not specified'}
        </span>
        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
          {jobs?.experienceLevel || 'Experience level not specified'}
        </span>
        <span className="px-2 py-1 text-xs font-medium bg-purple-100 text-purple-600 rounded-full">
          {jobs?.position || 'Position not specified'}
        </span>
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-4 mt-4">
        <Link to={`/details/${jobs?._id || ''}`}>
          <Button variant="outline">Details</Button>
        </Link>
        <Button className="bg-[#7289b7]">Save For Later</Button>
      </div>
    </div>
  );
};

export default JobCard;
