import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function JobList() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    axios.get('/api/job/all-jobs')
      .then(response => setJobs(response.data.data))
      .catch(error => console.error(error));
  }, []);

  return (
    <div>
      <h2>Job Listings</h2>
      <ul>
        {jobs.map(job => (
          <li key={job._id}>
            <Link to={`/apply/${job._id}`}>{job.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default JobList;
