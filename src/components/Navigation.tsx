"use client";
import Navbar from "@/app/layout/navbar";
import Sidebar from "@/app/layout/sidebar";
import { usePathname } from "next/navigation";

interface NavigationProps {
  children: React.ReactNode;
}

const Navigation = ({ children }: NavigationProps) => {
  const pathname = usePathname();

  const isAuthenticatedRoute = pathname !== "/login";

  return (
    <>
      {isAuthenticatedRoute && (
        <div className="flex h-screen">
          <Sidebar />
          <div className="flex-1">
            <Navbar />
            <div className="p-6">{children}</div>
          </div>
        </div>
      )}
      {!isAuthenticatedRoute && children}
    </>
  );
};

export default Navigation;
