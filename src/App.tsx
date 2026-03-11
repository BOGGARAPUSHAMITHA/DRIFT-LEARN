import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AuthProvider, useAuth, UserRole } from "@/lib/auth-context";
import LoginPage from "./pages/LoginPage";
import StudentLayout from "./layouts/StudentLayout";
import InstructorLayout from "./layouts/InstructorLayout";
import StudentDashboard from "./pages/student/StudentDashboard";
import PracticeCoding from "./pages/student/PracticeCoding";
import ProblemPage from "./pages/student/ProblemPage";
import RecommendedPractice from "./pages/student/RecommendedPractice";
import MySubmissions from "./pages/student/MySubmissions";
import LearningAnalytics from "./pages/student/LearningAnalytics";
import StudentProfile from "./pages/student/StudentProfile";
import InstructorDashboard from "./pages/instructor/InstructorDashboard";
import StudentsPage from "./pages/instructor/StudentsPage";
import StudentDetailPage from "./pages/instructor/StudentDetailPage";
import DriftAlertsPage from "./pages/instructor/DriftAlertsPage";
import InstructorAnalytics from "./pages/instructor/InstructorAnalytics";
import ReportsPage from "./pages/instructor/ReportsPage";
import QuizzesPage from "./pages/student/QuizzesPage";
import TakeQuizPage from "./pages/student/TakeQuizPage";
import QuizMonitoringPage from "./pages/instructor/QuizMonitoringPage";
import NotFound from "./pages/NotFound";
import { Loader2 } from "lucide-react";

const queryClient = new QueryClient();

function RoleGuard({ allowedRole, children }: { allowedRole: UserRole; children: React.ReactNode }) {
  const { user } = useAuth();
  if (user?.role !== allowedRole) {
    const redirectTo = user?.role === "instructor" ? "/instructor" : "/student";
    return <Navigate to={redirectTo} replace />;
  }
  return <>{children}</>;
}

function AppRoutes() {
  const { isAuthenticated, user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }

  const isInstructor = user?.role === "instructor";
  const defaultPath = isInstructor ? "/instructor" : "/student";

  return (
    <Routes>
      <Route path="/" element={<Navigate to={defaultPath} replace />} />

      <Route path="/student" element={<RoleGuard allowedRole="student"><StudentLayout /></RoleGuard>}>
        <Route index element={<StudentDashboard />} />
        <Route path="practice" element={<PracticeCoding />} />
        <Route path="practice/:id" element={<ProblemPage />} />
        <Route path="quizzes" element={<QuizzesPage />} />
        <Route path="quiz/:id" element={<TakeQuizPage />} />
        <Route path="recommended" element={<RecommendedPractice />} />
        <Route path="submissions" element={<MySubmissions />} />
        <Route path="analytics" element={<LearningAnalytics />} />
        <Route path="profile" element={<StudentProfile />} />
      </Route>

      <Route path="/instructor" element={<RoleGuard allowedRole="instructor"><InstructorLayout /></RoleGuard>}>
        <Route index element={<InstructorDashboard />} />
        <Route path="students" element={<StudentsPage />} />
        <Route path="students/:id" element={<StudentDetailPage />} />
        <Route path="drift-alerts" element={<DriftAlertsPage />} />
        <Route path="quiz-monitoring" element={<QuizMonitoringPage />} />
        <Route path="analytics" element={<InstructorAnalytics />} />
        <Route path="reports" element={<ReportsPage />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <AppRoutes />
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
