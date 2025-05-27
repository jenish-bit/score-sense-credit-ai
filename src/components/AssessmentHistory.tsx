
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCreditAssessments } from '@/hooks/useCreditAssessments';
import { format } from 'date-fns';
import { History, TrendingUp, TrendingDown, Minus } from 'lucide-react';

export const AssessmentHistory = () => {
  const { assessments, loading } = useCreditAssessments();

  const getScoreCategory = (score: number) => {
    if (score >= 800) return { category: "Excellent", color: "bg-green-500" };
    if (score >= 740) return { category: "Very Good", color: "bg-emerald-500" };
    if (score >= 670) return { category: "Good", color: "bg-blue-500" };
    if (score >= 580) return { category: "Fair", color: "bg-yellow-500" };
    return { category: "Poor", color: "bg-red-500" };
  };

  const getScoreTrend = (current: number, previous: number) => {
    if (current > previous) return { icon: TrendingUp, color: "text-green-600" };
    if (current < previous) return { icon: TrendingDown, color: "text-red-600" };
    return { icon: Minus, color: "text-gray-600" };
  };

  if (loading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History size={20} />
            Assessment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-16 bg-gray-200 rounded"></div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (assessments.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <History size={20} />
            Assessment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <History size={48} className="mx-auto text-gray-400 mb-4" />
            <p className="text-muted-foreground">No assessments yet</p>
            <p className="text-sm text-muted-foreground">Complete your first assessment to see your history here</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <History size={20} />
          Assessment History
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {assessments.map((assessment, index) => {
            const { category, color } = getScoreCategory(assessment.score);
            const previousScore = assessments[index + 1]?.score;
            const trend = previousScore ? getScoreTrend(assessment.score, previousScore) : null;

            return (
              <div key={assessment.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{assessment.score}</div>
                    <Badge variant="outline" className={`${color} text-white border-0`}>
                      {category}
                    </Badge>
                  </div>
                  
                  <div>
                    <p className="font-medium">
                      {format(new Date(assessment.assessment_date), 'MMM d, yyyy')}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Employment: {assessment.employment_status}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Income: ${assessment.income?.toLocaleString()}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  {trend && (
                    <div className={`flex items-center gap-1 ${trend.color}`}>
                      <trend.icon size={16} />
                      <span className="text-sm font-medium">
                        {Math.abs(assessment.score - previousScore)}
                      </span>
                    </div>
                  )}
                  <Button variant="outline" size="sm">
                    View Details
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
