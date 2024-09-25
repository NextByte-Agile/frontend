"use client";
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
          <div className="flex-1 ml-64 p-6">
            <div className="max-w-6xl mx-auto">{children}</div></div>
        </div>
      )}
      {!isAuthenticatedRoute && children}
    </>
  );
};

export default Navigation;
