// import React from "react";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "./ui/card";
// import { Badge } from "./ui/badge";
// import { useSelector } from "react-redux";
// import {Link} from 'react-router-dom';

// const LatestJobs = () => {
//   const randomJobs = [
//     {
//       title: "Frontend Developer",
//       company: "Apple",
//       description:
//         "Develop and maintain web applications using React, Tailwind CSS, and Next.js.",
//       logo: "https://media.designrush.com/inspirations/540509/conversions/apple-logo-design-preview.jpg",
//       location: "Remote",
//       postedDate: "3 days ago",
//       badges: {
//         positions: "12 Positions",
//         type: "Part Time",
//         salary: "24LPA",
//         experience: "Fresher",
//       },
//     },
//     {
//       title: "Backend Developer",
//       company: "Softaccel Solutions",
//       description:
//         "Work on backend services and APIs using Node.js and MongoDB.",
//       logo: "https://media.designrush.com/inspirations/676695/conversions/20-preview_mobile.jpg",
//       location: "New York, USA",
//       postedDate: "1 week ago",
//       badges: {
//         positions: "5 Positions",
//         type: "Full Time",
//         salary: "22LPA",
//         experience: "2-4 years",
//       },
//     },
//     {
//       title: "UI/UX Designer",
//       company: "Stripe",
//       description: "Design user interfaces for mobile and web applications.",
//       logo: "https://media.designrush.com/inspirations/656399/conversions/1-preview_mobile.jpg",
//       location: "San Francisco, USA",
//       postedDate: "5 days ago",
//       badges: {
//         positions: "3 Positions",
//         type: "Contract",
//         salary: "18LPA",
//         experience: "1-2 years",
//       },
//     },
//     {
//       title: "Graphics Designer",
//       company: "UFC",
//       description:
//         "Design graphical user interfaces for mobile and web applications.",
//       logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Y1MqOudRAvtdLgM2J-9OdDahmSbK6MwkXw&s",
//       location: "Texas, USA",
//       postedDate: "3 days ago",
//       badges: {
//         positions: "7 Positions",
//         type: "Freelance",
//         salary: "20LPA",
//         experience: "Fresher",
//       },
//     },
//     {
//       title: "DevOps Developer",
//       company: "Tesla",
//       description:
//         "Develop and maintain web applications using Docker, Kubernetes.",
//       logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3GYDIvxL-beJ8TFMwamtsRNTKncCUMcXNdA&s",
//       location: "Remote",
//       postedDate: "3 days ago",
//       badges: {
//         positions: "4 Positions",
//         type: "Full Time",
//         salary: "30LPA",
//         experience: "3-5 years",
//       },
//     },
//     {
//       title: "Backend Developer",
//       company: "Softaccel Solutions",
//       description:
//         "Work on backend services and APIs using Node.js and MongoDB.",
//       logo: "https://media.designrush.com/inspirations/676695/conversions/20-preview_mobile.jpg",
//       location: "New York, USA",
//       postedDate: "1 week ago",
//       badges: {
//         positions: "5 Positions",
//         type: "Full Time",
//         salary: "22LPA",
//         experience: "2-4 years",
//       },
//     },
//     {
//       title: "Frontend Developer",
//       company: "Apple",
//       description:
//         "Develop and maintain web applications using React, Tailwind CSS, and Next.js.",
//       logo: "https://media.designrush.com/inspirations/540509/conversions/apple-logo-design-preview.jpg",
//       location: "Remote",
//       postedDate: "3 days ago",
//       badges: {
//         positions: "12 Positions",
//         type: "Part Time",
//         salary: "24LPA",
//         experience: "Fresher",
//       },
//     },
//     {
//       title: "Backend Developer",
//       company: "Softaccel Solutions",
//       description:
//         "Work on backend services and APIs using Node.js and MongoDB.",
//       logo: "https://media.designrush.com/inspirations/676695/conversions/20-preview_mobile.jpg",
//       location: "New York, USA",
//       postedDate: "1 week ago",
//       badges: {
//         positions: "5 Positions",
//         type: "Full Time",
//         salary: "22LPA",
//         experience: "2-4 years",
//       },
//     },
//     {
//       title: "UI/UX Designer",
//       company: "Stripe",
//       description: "Design user interfaces for mobile and web applications.",
//       logo: "https://media.designrush.com/inspirations/656399/conversions/1-preview_mobile.jpg",
//       location: "San Francisco, USA",
//       postedDate: "5 days ago",
//       badges: {
//         positions: "3 Positions",
//         type: "Contract",
//         salary: "18LPA",
//         experience: "1-2 years",
//       },
//     },
//     {
//       title: "Graphics Designer",
//       company: "UFC",
//       description:
//         "Design graphical user interfaces for mobile and web applications.",
//       logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Y1MqOudRAvtdLgM2J-9OdDahmSbK6MwkXw&s",
//       location: "Texas, USA",
//       postedDate: "3 days ago",
//       badges: {
//         positions: "7 Positions",
//         type: "Freelance",
//         salary: "20LPA",
//         experience: "Fresher",
//       },
//     },
//     {
//       title: "DevOps Developer",
//       company: "Tesla",
//       description:
//         "Develop and maintain web applications using Docker, Kubernetes.",
//       logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3GYDIvxL-beJ8TFMwamtsRNTKncCUMcXNdA&s",
//       location: "Remote",
//       postedDate: "3 days ago",
//       badges: {
//         positions: "4 Positions",
//         type: "Full Time",
//         salary: "30LPA",
//         experience: "3-5 years",
//       },
//     },
//     {
//       title: "Backend Developer",
//       company: "Softaccel Solutions",
//       description:
//         "Work on backend services and APIs using Node.js and MongoDB.",
//       logo: "https://media.designrush.com/inspirations/676695/conversions/20-preview_mobile.jpg",
//       location: "New York, USA",
//       postedDate: "1 week ago",
//       badges: {
//         positions: "5 Positions",
//         type: "Full Time",
//         salary: "22LPA",
//         experience: "2-4 years",
//       },
//     },
//   ];

//   const { allJobs } = useSelector((state) => state.job);
//   return (
//     <>
//     <div className="max-w-7xl mx-auto my-20 px-4">
//   <h1 className="text-4xl font-bold text-center mb-10">
//     <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
//   </h1>

//   <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
//     {allJobs.length <= 0 ? (
//       <h1 className="text-xl text-center col-span-3 text-gray-500">No Job Available</h1>
//     ) : (
//       allJobs.slice(0, 6).map((job, index) => (
//         <div
//           key={index}
//           className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 bg-white rounded-lg overflow-hidden border border-gray-200"
//         >
//           <div className="flex items-center p-4 bg-gray-50 border-b border-gray-200">
//             <div>
//               <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
//               <p className="text-sm text-gray-500">{job.company.name}</p>
//             </div>
//           </div>

//           <div className="p-4">
//             <p className="text-gray-700 line-clamp-3 mb-4">{job.description}</p>

//             <div className="flex flex-wrap gap-2 mb-4">
//               <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-sm font-medium">
//                 {job.position}
//               </span>
//               <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md text-sm font-medium">
//                 {job.jobType}
//               </span>
//               <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm font-medium">
//                 {job.salary}
//               </span>
//               <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-md text-sm font-medium">
//                 {job.experienceLevel}
//               </span>
//             </div>

//             <p className="mt-2 text-sm text-gray-500">
//               <strong>Location:</strong> {job.location}
//             </p>
//             <p className="text-sm text-gray-500">
//               <strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}
//             </p>
//           </div>

//           <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
//             <Link to={`/apply/${job._id}`}>
//               <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors">
//                 Apply Now
//               </button>
//             </Link>
//           </div>
//         </div>
//       ))
//     )}
   
//           {/* {randomJobs.slice(0, 6).map((job, index) => (
//             <Card
//               key={index}
//               className="shadow-lg hover:shadow-2xl transition-shadow duration-300"
//             >
//               <CardHeader className="flex items-center">
//                 <img
//                   src={job.logo}
//                   alt={`${job.company} logo`}
//                   className="w-16 h-16 object-cover rounded-full mr-4 shadow-md shadow-gray-600 cursor-pointer p-1 hover:transition-all hover:animate-bounce"
//                 />
//                 <div>
//                   <CardTitle className="text-xl font-semibold">
//                     {job.title}
//                   </CardTitle>
//                   <CardDescription className="text-sm text-gray-500">
//                     {job.company}
//                   </CardDescription>
//                 </div>
//               </CardHeader>
//               <CardContent>
//                 <p className="text-gray-700">{job.description}</p>
                
//                 <div className="mt-2 space-x-2 space-y-1 flex flex-wrap">
//                   <Badge
//                     variant={"ghost"}
//                     className="shadow-lg shadow-gray-400 cursor-pointer font-bold"
//                   >
//                     {job.badges.positions}
//                   </Badge>
//                   <Badge
//                     variant={"ghost"}
//                     className="shadow-lg shadow-gray-400  cursor-pointer font-bold text-blue-600 "
//                   >
//                     {job.badges.type}
//                   </Badge>
//                   <Badge
//                     variant={"ghost"}
//                     className="shadow-lg shadow-gray-400  cursor-pointer font-bold text-[#F83002]"
//                   >
//                     {job.badges.salary}
//                   </Badge>
//                   <Badge
//                     variant={"ghost"}
//                     className="shadow-lg shadow-gray-400  cursor-pointer font-bold teext-[#7209b7]"
//                   >
//                     {job.badges.experience}
//                   </Badge>
//                 </div>
//                 <p className="mt-2 text-sm text-gray-500">
//                   <strong>Location:</strong> {job.location}
//                 </p>
//                 <p className="text-sm text-gray-500">
//                   <strong>Posted:</strong> {job.postedDate}
//                 </p>
//               </CardContent>
//               <CardFooter className="text-right">
//                 <button className="bg-[#6A38C2] text-white py-2 px-4 rounded-lg hover:bg-[#5A2BA3] transition-colors">
//                   Apply Now
//                 </button>
//               </CardFooter>
//             </Card>
//           ))} */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default LatestJobs;


import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const LatestJobs = () => {
  const { allJobs } = useSelector((state) => state.job);

  return (
    <>
      <div className="max-w-7xl mx-auto my-20 px-4">
        <h1 className="text-4xl font-bold text-center mb-10">
          <span className="text-[#6A38C2]">Latest & Top</span> Job Openings
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {allJobs.length <= 0 ? (
            <h1 className="text-xl text-center col-span-3 text-gray-500">
              No Job Available
            </h1>
          ) : (
            allJobs.slice(0, 6).map((job, index) => (
              <div
                key={index}
                className="shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform duration-300 bg-white rounded-lg overflow-hidden border border-gray-200"
              >
                <div className="flex items-center p-4 bg-gray-50 border-b border-gray-200">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-800">{job.title}</h2>
                    <p className="text-sm text-gray-500">
                      {job.company?.name || "Company Not Available"}
                    </p>
                  </div>
                </div>

                <div className="p-4">
                  <p className="text-gray-700 line-clamp-3 mb-4">{job.description}</p>

                  <div className="flex flex-wrap gap-2 mb-4">
                    <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-md text-sm font-medium">
                      {job.position}
                    </span>
                    <span className="bg-green-100 text-green-600 px-2 py-1 rounded-md text-sm font-medium">
                      {job.jobType}
                    </span>
                    <span className="bg-red-100 text-red-600 px-2 py-1 rounded-md text-sm font-medium">
                      {job.salary}
                    </span>
                    <span className="bg-purple-100 text-purple-600 px-2 py-1 rounded-md text-sm font-medium">
                      {job.experienceLevel}
                    </span>
                  </div>

                  <p className="mt-2 text-sm text-gray-500">
                    <strong>Location:</strong> {job.location}
                  </p>
                  <p className="text-sm text-gray-500">
                    <strong>Posted:</strong> {new Date(job.createdAt).toLocaleDateString()}
                  </p>
                </div>

                <div className="p-4 bg-gray-50 border-t border-gray-200 text-right">
                  <Link to={`/details/${job._id}`}>
                    <button className="bg-indigo-600 text-white py-2 px-4 rounded-lg hover:bg-indigo-500 transition-colors">
                      Apply Now
                    </button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </>
  );
};

export default LatestJobs;
