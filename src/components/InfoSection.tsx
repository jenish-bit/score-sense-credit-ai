
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const InfoSection = () => {
  return (
    <div className="space-y-8">
      <Card>
        <CardHeader>
          <CardTitle>About ScoreSense Credit AI</CardTitle>
          <CardDescription>
            Learn how our alternative credit scoring system works
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <p>
              ScoreSense Credit AI uses advanced machine learning algorithms and alternative data sources to provide credit assessments for individuals who may not have extensive traditional credit histories.
            </p>
            
            <p>
              Unlike conventional credit scoring models that rely heavily on credit card history and loan repayments, our system analyzes a diverse range of signals including utility payment history, mobile phone usage patterns, online behavior, and more to build a comprehensive financial profile.
            </p>
            
            <p>
              This approach enables more inclusive access to financial services while maintaining high standards of risk assessment.
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Frequently Asked Questions</CardTitle>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How is my credit score calculated?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Our credit score is calculated using a combination of traditional credit factors and alternative data sources. The model analyzes patterns in your payment history, financial behavior, and stability indicators to generate a comprehensive score between 300 and 850.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-2">
              <AccordionTrigger>Is my data secure?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Yes, we take data security very seriously. All data is encrypted both in transit and at rest. We comply with industry-standard security protocols and regulations. Your information is only used for credit assessment purposes and is never sold to third parties.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-3">
              <AccordionTrigger>How often is my credit score updated?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Your credit score is updated whenever you request a new assessment. For subscribed users, we also perform automatic monthly updates to reflect the latest available data and changes in your financial behavior.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-4">
              <AccordionTrigger>What are alternative data sources?</AccordionTrigger>
              <AccordionContent>
                <p>
                  Alternative data sources include information beyond traditional credit reports, such as utility and telecom payment history, rental payments, bank account transactions, mobile phone usage patterns, and online behavior. These sources provide additional insights into financial responsibility and stability.
                </p>
              </AccordionContent>
            </AccordionItem>
            
            <AccordionItem value="item-5">
              <AccordionTrigger>How can I improve my credit score?</AccordionTrigger>
              <AccordionContent>
                <p>
                  To improve your credit score, focus on paying all bills on time, reducing debt, maintaining stable financial behavior, and addressing any negative factors identified in your assessment. Our AI-powered recommendations provide personalized guidance for your specific situation.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Privacy Policy</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <p>
              ScoreSense Credit AI is committed to protecting your privacy. We collect and process personal data solely for the purpose of providing credit assessment services.
            </p>
            
            <p>
              The data we collect includes information you provide directly to us, as well as information from alternative data sources with your consent. This data is used only for credit scoring, product recommendations, and service improvement.
            </p>
            
            <p>
              We implement appropriate technical and organizational measures to secure your data and comply with all applicable data protection regulations.
            </p>
            
            <p>
              For more information, please review our full Privacy Policy document available on our website.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
