
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Check } from "lucide-react";

interface RecommendedProductsProps {
  score: number;
}

export const RecommendedProducts = ({ score }: RecommendedProductsProps) => {
  // Generate recommendations based on credit score
  const getRecommendations = (score: number) => {
    if (score >= 750) {
      return [
        {
          title: "Premium Rewards Credit Card",
          description: "Our top-tier rewards card with exclusive benefits",
          features: ["5% cash back on all purchases", "No annual fee", "Travel insurance", "24/7 concierge service"],
          apr: "14.99%",
          match: "Excellent",
          matchPercentage: 95,
        },
        {
          title: "Low Interest Personal Loan",
          description: "Best rates for high-credit borrowers",
          features: ["Rates from 6.99% APR", "Borrow up to $50,000", "No origination fee", "Flexible terms"],
          apr: "6.99%",
          match: "Very Good",
          matchPercentage: 90,
        },
        {
          title: "Premium Mortgage",
          description: "Our lowest rate mortgage product",
          features: ["Rates from 3.75% APR", "Low down payment options", "Quick approval process", "Flexible terms"],
          apr: "3.75%",
          match: "Good",
          matchPercentage: 85,
        },
      ];
    } else if (score >= 670) {
      return [
        {
          title: "Rewards Credit Card",
          description: "Great rewards for good credit customers",
          features: ["3% cash back on common purchases", "Low annual fee", "Travel benefits", "Purchase protection"],
          apr: "17.99%",
          match: "Very Good",
          matchPercentage: 85,
        },
        {
          title: "Standard Personal Loan",
          description: "Competitive rates for good credit profiles",
          features: ["Rates from 9.99% APR", "Borrow up to $25,000", "Low origination fee", "Terms up to 60 months"],
          apr: "9.99%",
          match: "Good",
          matchPercentage: 80,
        },
        {
          title: "Home Mortgage",
          description: "Competitive mortgage rates and terms",
          features: ["Rates from 4.25% APR", "Multiple down payment options", "Standard approval process", "30-year terms available"],
          apr: "4.25%",
          match: "Fair",
          matchPercentage: 70,
        },
      ];
    } else {
      return [
        {
          title: "Credit Builder Card",
          description: "Build or rebuild your credit with responsible use",
          features: ["1% cash back on all purchases", "Monthly reporting to credit bureaus", "Free credit score access", "Path to upgrade"],
          apr: "22.99%",
          match: "Good",
          matchPercentage: 75,
        },
        {
          title: "Secured Credit Card",
          description: "Security deposit required to establish credit line",
          features: ["No annual fee", "Credit limits from $200-$2,500", "Monthly credit bureau reporting", "Online account management"],
          apr: "21.99%",
          match: "Very Good",
          matchPercentage: 90,
        },
        {
          title: "Credit Builder Loan",
          description: "Build credit with a small installment loan",
          features: ["Borrow $500-$2,500", "Reports to all credit bureaus", "Affordable fixed payments", "No credit check required"],
          apr: "15.99%",
          match: "Fair",
          matchPercentage: 65,
        },
      ];
    }
  };
  
  const recommendations = getRecommendations(score);
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recommended Financial Products</CardTitle>
        <CardDescription>
          Based on your credit profile, we've matched you with these products
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {recommendations.map((product, index) => (
            <Card key={index} className="border overflow-hidden">
              <CardHeader className="pb-2">
                <div className="flex justify-between items-start">
                  <CardTitle className="text-lg">{product.title}</CardTitle>
                  <Badge variant={
                    product.matchPercentage >= 85 ? "default" : 
                    product.matchPercentage >= 70 ? "secondary" : "outline"
                  }>
                    {product.match} Match
                  </Badge>
                </div>
                <CardDescription>{product.description}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">APR:</span>
                  <span className="font-medium">{product.apr}</span>
                </div>
                <div className="space-y-1.5">
                  {product.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex items-center text-sm">
                      <Check className="h-4 w-4 mr-2 text-green-500 flex-shrink-0" />
                      <span>{feature}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="pt-0">
                <Button variant="outline" className="w-full">Learn More</Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
