"use client";

import React, { useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@radix-ui/react-tabs";

import CheckEmailStatus from "./check-email";
import CheckUrlStatus from "./check-url";
import ImageDeepfakeChecker from "./check-deepfake";

const YourComponent: React.FC = () => {
  const [activeTab, setActiveTab] = useState("email");

  return (
    <div className="min-h-[400px] pb-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Try it yourself
        </h1>
      </div>

      {/* Radix UI Tabs Implementation */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-4">
          <TabsTrigger
            value="email"
            className="data-[state=active]:outline-3 m-2 mx-4 rounded-lg px-4 py-2"
          >
            Check Email
          </TabsTrigger>
          <TabsTrigger
            value="url"
            className="data-[state=active]:outline-3 my-2 mx-4 rounded-lg px-4 py-2"
          >
            Check URL
          </TabsTrigger>
          <TabsTrigger
            value="deepfake"
            className="data-[state=active]:outline-3 m-2 mx-4 rounded-lg px-4 py-2"
          >
            Deepfake Detection
          </TabsTrigger>
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
