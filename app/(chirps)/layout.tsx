import { Header } from "@/components/navigation/Header";
import React, { ReactNode } from "react";

function layout({ children }: { children: ReactNode }) {
  return (
    <React.Fragment>
      <Header />
      {children}
    </React.Fragment>
  );
}

export default layout;
