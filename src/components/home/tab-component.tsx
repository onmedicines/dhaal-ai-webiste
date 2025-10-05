"use client";

import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";

import CheckEmailStatus from "./check-email";
import CheckUrlStatus from "./check-url";
import ImageDeepfakeChecker from "./check-deepfake";

const YourComponent: React.FC = () => {
  return (
    <div>
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Try it yourself
        </h1>
      </div>

      {/* Radix UI Tabs Implementation */}
      <Tabs defaultValue="email">
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger value="email">Check Email</TabsTrigger>
          <TabsTrigger value="url">Check URL</TabsTrigger>
          <TabsTrigger value="deepfake">Deepfake Detection</TabsTrigger>
        </TabsList>

        <TabsContent value="email">
          <CheckEmailStatus />
        </TabsContent>
        <TabsContent value="url">
          <CheckUrlStatus />
        </TabsContent>
        <TabsContent value="deepfake">
          <ImageDeepfakeChecker />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default YourComponent;
