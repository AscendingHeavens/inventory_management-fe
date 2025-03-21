import BarChart from "@/components/BarChart";
import Header from "@/components/Header";
import RecentOrders from "@/components/RecentOrders";
import Table from "@/components/Table";
import TopCard from "@/components/TopCard";

export default function Home() {
  return (
    <main className="bg-gray-100 min-h-screen">

      <Header />
      <div className="p-4">
      <Table/>
      </div>
  
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
    
      </div>
    </main>
  );
}
