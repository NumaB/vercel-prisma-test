import * as React from "react";
import MainMenu from "./Menu";

interface Props {
  children: React.ReactNode;
}

const MainLayout = ({ children }: Props) => {
  return (
    <div>
      <div className="lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col ">
        {/* Sidebar component */}
        <MainMenu />
      </div>
      <main className="py-10 lg:pl-72">{children}</main>
    </div>
  );
};
export default MainLayout;
