import JobCard from "./JobCard";
import FilterCard from "./FilterCard";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";

const JobsPage = () => {
  const jobs = [
    {
      id: 1,
      title: "Frontend Developer",
      company: "Apple",
      description:
        "Develop and maintain web applications using React, Tailwind CSS, and Next.js.",
      logo: "https://media.designrush.com/inspirations/540509/conversions/apple-logo-design-preview.jpg",
      location: "Remote",
      postedDate: "3 days ago",
      badges: {
        positions: "12 Positions",
        type: "Part Time",
        salary: "24LPA",
        experience: "Fresher",
      },
    },
    {
      id: 2,
      title: "Backend Developer",
      company: "Softaccel Solutions",
      description:
        "Work on backend services and APIs using Node.js and MongoDB.",
      logo: "https://media.designrush.com/inspirations/676695/conversions/20-preview_mobile.jpg",
      location: "New York, USA",
      postedDate: "1 week ago",
      badges: {
        positions: "5 Positions",
        type: "Full Time",
        salary: "22LPA",
        experience: "2-4 years",
      },
    },
    {
      id: 3,
      title: "UI/UX Designer",
      company: "Stripe",
      description: "Design user interfaces for mobile and web applications.",
      logo: "https://media.designrush.com/inspirations/656399/conversions/1-preview_mobile.jpg",
      location: "San Francisco, USA",
      postedDate: "5 days ago",
      badges: {
        positions: "3 Positions",
        type: "Contract",
        salary: "18LPA",
        experience: "1-2 years",
      },
    },
    {
      id: 4,
      title: "Graphics Designer",
      company: "UFC",
      description:
        "Design graphical user interfaces for mobile and web applications.",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Y1MqOudRAvtdLgM2J-9OdDahmSbK6MwkXw&s",
      location: "Texas, USA",
      postedDate: "3 days ago",
      badges: {
        positions: "7 Positions",
        type: "Freelance",
        salary: "20LPA",
        experience: "Fresher",
      },
    },
    {
      id: 5,
      title: "DevOps Developer",
      company: "Tesla",
      description:
        "Develop and maintain web applications using Docker, Kubernetes.",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3GYDIvxL-beJ8TFMwamtsRNTKncCUMcXNdA&s",
      location: "Remote",
      postedDate: "3 days ago",
      badges: {
        positions: "4 Positions",
        type: "Full Time",
        salary: "30LPA",
        experience: "3-5 years",
      },
    },
    {
      id: 6,
      title: "Backend Developer",
      company: "Softaccel Solutions",
      description:
        "Work on backend services and APIs using Node.js and MongoDB.",
      logo: "https://media.designrush.com/inspirations/676695/conversions/20-preview_mobile.jpg",
      location: "New York, USA",
      postedDate: "1 week ago",
      badges: {
        positions: "5 Positions",
        type: "Full Time",
        salary: "22LPA",
        experience: "2-4 years",
      },
    },
    {
      id: 7,
      title: "Frontend Developer",
      company: "Apple",
      description:
        "Develop and maintain web applications using React, Tailwind CSS, and Next.js.",
      logo: "https://media.designrush.com/inspirations/540509/conversions/apple-logo-design-preview.jpg",
      location: "Remote",
      postedDate: "3 days ago",
      badges: {
        positions: "12 Positions",
        type: "Part Time",
        salary: "24LPA",
        experience: "Fresher",
      },
    },
    {
      id: 8,
      title: "Backend Developer",
      company: "Softaccel Solutions",
      description:
        "Work on backend services and APIs using Node.js and MongoDB.",
      logo: "https://media.designrush.com/inspirations/676695/conversions/20-preview_mobile.jpg",
      location: "New York, USA",
      postedDate: "1 week ago",
      badges: {
        positions: "5 Positions",
        type: "Full Time",
        salary: "22LPA",
        experience: "2-4 years",
      },
    },
    {
      id: 9,
      title: "UI/UX Designer",
      company: "Stripe",
      description: "Design user interfaces for mobile and web applications.",
      logo: "https://media.designrush.com/inspirations/656399/conversions/1-preview_mobile.jpg",
      location: "San Francisco, USA",
      postedDate: "5 days ago",
      badges: {
        positions: "3 Positions",
        type: "Contract",
        salary: "18LPA",
        experience: "1-2 years",
      },
    },
    {
      id: 10,
      title: "Graphics Designer",
      company: "UFC",
      description:
        "Design graphical user interfaces for mobile and web applications.",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9Y1MqOudRAvtdLgM2J-9OdDahmSbK6MwkXw&s",
      location: "Texas, USA",
      postedDate: "3 days ago",
      badges: {
        positions: "7 Positions",
        type: "Freelance",
        salary: "20LPA",
        experience: "Fresher",
      },
    },
    {
      id: 11,
      title: "DevOps Developer",
      company: "Tesla",
      description:
        "Develop and maintain web applications using Docker, Kubernetes.",
      logo: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3GYDIvxL-beJ8TFMwamtsRNTKncCUMcXNdA&s",
      location: "Remote",
      postedDate: "3 days ago",
      badges: {
        positions: "4 Positions",
        type: "Full Time",
        salary: "30LPA",
        experience: "3-5 years",
      },
    },
    {
      id: 12,
      title: "Backend Developer",
      company: "Softaccel Solutions",
      description:
        "Work on backend services and APIs using Node.js and MongoDB.",
      logo: "https://media.designrush.com/inspirations/676695/conversions/20-preview_mobile.jpg",
      location: "New York, USA",
      postedDate: "1 week ago",
      badges: {
        positions: "5 Positions",
        type: "Full Time",
        salary: "22LPA",
        experience: "2-4 years",
      },
    },
  ];
  const { allJobs, serachQuery } = useSelector((state) => state.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  useEffect(() => {
    if (serachQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(serachQuery.toLowerCase()) ||
          job.description.toLowerCase().includes(serachQuery.toLowercase()) ||
          job.location.toLowerCase().includes(serachQuery.toLowercase()) ||
          job.salary.toLowerCase().includes(serachQuery.toLowercase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [allJobs, serachQuery]);
  return (
    <>
      <div className="min-h-screen bg-gray-100 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-5">
            {/* Filter Section */}
            <aside className="w-1/4 bg-white p-5 shadow-lg rounded-lg">
              <FilterCard />
            </aside>
            <main className="flex-1 h-[88vh] overflow-y-auto scrollbar-hide pb-5">
              {allJobs.length === 0 ? (
                <span className="text-gray-600">No jobs found</span>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filterJobs.map((job, index) => (
                    <JobCard key={index} jobs={job} />
                  ))}
                </div>
              )}
            </main>
          </div>
        </div>
      </div>
      {/*
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-7xl mx-auto">
        <div className="flex gap-5">
         
          <aside className="w-1/4 bg-white p-5 shadow-lg rounded-lg">
            <FilterCard />
          </aside>

         
          <main className="flex-1 h-[88vh] overflow-y-auto scrollbar-hide pb-5">
            {jobs.length === 0 ? (
              <span className="text-gray-600">No jobs found</span>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {jobs.map((job, index) => (
                  <JobCard key={index} jobs={job} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
    */}
    </>
  );
};

export default JobsPage;
