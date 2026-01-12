import Heading from "../ui/Heading";
import Row from "../ui/Row";
import DashboardLayout from "./DashboardLayout";

function Dashboard() {
  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Dashboard</Heading>
        <p>TEST</p>
      </Row>

      <DashboardLayout />
    </>
  );
}

export default Dashboard;
