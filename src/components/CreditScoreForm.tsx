
import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

interface CreditScoreFormProps {
  onSubmit: (data: any) => void;
  isLoading: boolean;
}

export const CreditScoreForm = ({ onSubmit, isLoading }: CreditScoreFormProps) => {
  const [formData, setFormData] = React.useState({
    personal: {
      name: "",
      age: "",
      education: "",
      employmentStatus: "",
    },
    financial: {
      income: 2500,
      expenses: 1500,
      savings: 5000,
      utilityBillsPaid: true,
      phoneContractStatus: "good",
    },
    alternatives: {
      socialMedia: "",
      onlineShoppingFrequency: "",
      phoneUsagePatterns: 50,
    }
  });
  
  const handleChange = (section: keyof typeof formData, field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Credit Assessment Form</CardTitle>
        <CardDescription>
          Fill in the details below to get your personalized credit assessment
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <h3 className="text-lg font-medium mb-4">Personal Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe"
                  value={formData.personal.name}
                  onChange={(e) => handleChange("personal", "name", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="age">Age</Label>
                <Input 
                  id="age" 
                  type="number" 
                  placeholder="30"
                  min="18"
                  max="100"
                  value={formData.personal.age}
                  onChange={(e) => handleChange("personal", "age", e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="education">Education Level</Label>
                <Select 
                  value={formData.personal.education} 
                  onValueChange={(value) => handleChange("personal", "education", value)}
                >
                  <SelectTrigger id="education">
                    <SelectValue placeholder="Select education level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="high-school">High School</SelectItem>
                    <SelectItem value="bachelor">Bachelor's Degree</SelectItem>
                    <SelectItem value="master">Master's Degree</SelectItem>
                    <SelectItem value="phd">PhD or Doctorate</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="employment">Employment Status</Label>
                <Select 
                  value={formData.personal.employmentStatus} 
                  onValueChange={(value) => handleChange("personal", "employmentStatus", value)}
                >
                  <SelectTrigger id="employment">
                    <SelectValue placeholder="Select employment status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="employed-full">Employed (Full-time)</SelectItem>
                    <SelectItem value="employed-part">Employed (Part-time)</SelectItem>
                    <SelectItem value="self-employed">Self-employed</SelectItem>
                    <SelectItem value="unemployed">Unemployed</SelectItem>
                    <SelectItem value="student">Student</SelectItem>
                    <SelectItem value="retired">Retired</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Financial Information</h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="income">Monthly Income ($)</Label>
                  <span className="text-sm text-muted-foreground">${formData.financial.income}</span>
                </div>
                <Slider 
                  id="income"
                  min={0}
                  max={10000}
                  step={100}
                  value={[formData.financial.income]}
                  onValueChange={(values) => handleChange("financial", "income", values[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="expenses">Monthly Expenses ($)</Label>
                  <span className="text-sm text-muted-foreground">${formData.financial.expenses}</span>
                </div>
                <Slider 
                  id="expenses"
                  min={0}
                  max={8000}
                  step={100}
                  value={[formData.financial.expenses]}
                  onValueChange={(values) => handleChange("financial", "expenses", values[0])}
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <Label htmlFor="savings">Total Savings ($)</Label>
                  <span className="text-sm text-muted-foreground">${formData.financial.savings}</span>
                </div>
                <Slider 
                  id="savings"
                  min={0}
                  max={100000}
                  step={1000}
                  value={[formData.financial.savings]}
                  onValueChange={(values) => handleChange("financial", "savings", values[0])}
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="utility-bills"
                  checked={formData.financial.utilityBillsPaid}
                  onCheckedChange={(checked) => handleChange("financial", "utilityBillsPaid", checked)}
                />
                <Label htmlFor="utility-bills">Utility bills paid on time (last 12 months)</Label>
              </div>
              
              <div className="space-y-2">
                <Label>Phone Contract Payment Status</Label>
                <RadioGroup 
                  value={formData.financial.phoneContractStatus}
                  onValueChange={(value) => handleChange("financial", "phoneContractStatus", value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="good" id="phone-good" />
                    <Label htmlFor="phone-good">Always paid on time</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="occasional" id="phone-occasional" />
                    <Label htmlFor="phone-occasional">Occasional late payments</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="frequent" id="phone-frequent" />
                    <Label htmlFor="phone-frequent">Frequent late payments</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="none" id="phone-none" />
                    <Label htmlFor="phone-none">No phone contract</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-medium mb-4">Alternative Data Sources</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="social-media">Connected Social Media Accounts</Label>
                <Select 
                  value={formData.alternatives.socialMedia} 
                  onValueChange={(value) => handleChange("alternatives", "socialMedia", value)}
                >
                  <SelectTrigger id="social-media">
                    <SelectValue placeholder="Select number of accounts" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="none">None</SelectItem>
                    <SelectItem value="one">One account</SelectItem>
                    <SelectItem value="two-three">2-3 accounts</SelectItem>
                    <SelectItem value="four-plus">4+ accounts</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="shopping">Online Shopping Frequency</Label>
                <Select 
                  value={formData.alternatives.onlineShoppingFrequency} 
                  onValueChange={(value) => handleChange("alternatives", "onlineShoppingFrequency", value)}
                >
                  <SelectTrigger id="shopping">
                    <SelectValue placeholder="Select shopping frequency" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="rarely">Rarely (few times a year)</SelectItem>
                    <SelectItem value="sometimes">Sometimes (monthly)</SelectItem>
                    <SelectItem value="often">Often (weekly)</SelectItem>
                    <SelectItem value="very-often">Very often (multiple times a week)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <div className="flex justify-between">
                  <Label htmlFor="phone-usage">Phone Usage Patterns (Stability Score)</Label>
                  <span className="text-sm text-muted-foreground">{formData.alternatives.phoneUsagePatterns}/100</span>
                </div>
                <Slider 
                  id="phone-usage"
                  min={0}
                  max={100}
                  step={1}
                  value={[formData.alternatives.phoneUsagePatterns]}
                  onValueChange={(values) => handleChange("alternatives", "phoneUsagePatterns", values[0])}
                />
                <p className="text-xs text-muted-foreground mt-1">
                  This score is typically calculated from phone usage patterns, consistency of contacts, calling times, etc.
                </p>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <p className="text-sm text-muted-foreground">
          Your data is processed securely.
        </p>
        <Button type="submit" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Processing..." : "Submit for Assessment"}
        </Button>
      </CardFooter>
    </Card>
  );
};
