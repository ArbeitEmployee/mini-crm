import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import AddLead from "./pages/AddLead";
import LeadTable from "./pages/LeadTable";
import DealPayment from "./pages/DealPayment";
import Dashboard from "./pages/Dashboard";
import AddMeeting from "./pages/AddMeeting";
import MeetingTimeline from "./pages/MeetingTimeline";
import InstallmentStatus from "./pages/InstallmentStatus";
import PaymentTable from "./pages/PaymentTable";
import AddInstallmentPayment from "./pages/AddInstallmentPayment";
import ViewPaymentPlan from "./pages/ViewPaymentPlan";
function App() {
  return (
    <Router>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/add-lead" element={<AddLead />} />
          <Route path="/leads" element={<LeadTable />} />
          <Route path="/payments" element={<DealPayment />} />
          <Route path="/lead/:leadId/meetings" element={<MeetingTimeline />} />
          <Route path="/lead/:leadId/add-meeting" element={<AddMeeting />} />
          <Route path="/installments/:paymentId" element={<InstallmentStatus />} />
          <Route path="/payment-table" element={<PaymentTable />} />
          <Route path="/add-payment" element={<AddInstallmentPayment />} />
          <Route path="/payment-plans/:id" element={<ViewPaymentPlan />} />
        </Routes>
      </MainLayout>
    </Router>
  );
}

export default App;
