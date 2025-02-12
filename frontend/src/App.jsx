// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import JobList from "./pages/JobList";
// import JobDetails from "./pages/JobDetails";
// import CreateJob from "./pages/CreateJob";
// import EditJob from "./pages/EditJob";
// import NotFound from "./pages/NotFound";
// import JobSearch from "./pages/JobSearch";
import JobSearch2 from "./pages/JobSearch2";


function App() {
  return (
    // <BrowserRouter>
    //   <Routes>
    //     <Route path="/" element={<JobList />} />
    //     <Route path="/jobs/:id" element={<JobDetails />} />
    //     <Route path="/create" element={<CreateJob />} />
    //     <Route path="/edit/:id" element={<EditJob />} />
    //     <Route path="/jobsearch" element={<JobSearch />} />
    //     <Route path="/jobsearch2" element={<JobSearch2/>}/>


    //     <Route path="*" element={<NotFound />} /> {/* 404 Page */}
    //   </Routes>
    // </BrowserRouter>
    <JobSearch2/>
  );
}

export default App;
