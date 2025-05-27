
import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { AssessmentHistory } from '@/components/AssessmentHistory';
import { ProfileSection } from '@/components/ProfileSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, User, LogOut, CreditCard } from 'lucide-react';
import { useCreditAssessments } from '@/hooks/useCreditAssessments';

export const UserDashboard = () => {
  const { user, signOut } = useAuth();
  const { assessments } = useCreditAssessments();

  const latestAssessment = assessments[0];

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Welcome back!</h1>
          <p className="text-muted-foreground">
            Manage your credit profile and track your progress
          </p>
        </div>
        <Button variant="outline" onClick={handleSignOut}>
          <LogOut size={16} className="mr-2" />
          Sign Out
        </Button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Latest Score</CardTitle>
            <CreditCard className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {latestAssessment?.score || 'No assessments yet'}
            </div>
            {latestAssessment && (
              <p className="text-xs text-muted-foreground">
                Assessed on {new Date(latestAssessment.assessment_date).toLocaleDateString()}
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Assessments</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assessments.length}</div>
            <p className="text-xs text-muted-foreground">
              Credit assessments completed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Account Status</CardTitle>
            <User className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">
              Member since {user?.created_at ? new Date(user.created_at).toLocaleDateString() : 'Unknown'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <AssessmentHistory />
        </div>
        <div>
          <ProfileSection />
        </div>
      </div>
    </div>
  );
};
