import { Metadata } from "next";
import GroupsCard from "./components/groups-card";
import { Suspense } from "react";
import { SkeletonCard } from "@/components/skeleton-card";

export const metadata: Metadata = {
  title: "Dashboard",
};

const DashboardPage = () => {
  return (
    <div className="flex flex-col w-full p-4 gap-8">
      <h1 className="text-center sm:text-2xl">Meus Grupos</h1>
      <Suspense fallback={<SkeletonCard />}>
        <GroupsCard />
      </Suspense>
    </div>
  );
};

export default DashboardPage;
