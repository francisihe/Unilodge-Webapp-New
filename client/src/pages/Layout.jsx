import Header from "../components/Header";
import {Outlet} from "react-router-dom";

export default function Layout() {
  return (
    
    <div className="px-6 md:px-10 md:py-8 lg:px-16 flex flex-col min-h-screen mx-auto">
      <Header />
      <Outlet />
    </div>
  );
}
