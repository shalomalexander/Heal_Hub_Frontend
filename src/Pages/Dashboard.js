import CovidTracker from "../components/CovidTracker"
import RecentActivities from "../components/RecentActivities"

const Dashboard = () => {
  return (
    <>
    <div className="content-inner">
      <p className="bold-300">Dashboard</p>
      <hr />
      <CovidTracker/>
      <RecentActivities />
    </div>  
    </>
  );
};

export default Dashboard;
