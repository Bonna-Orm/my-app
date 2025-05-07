'use client'

import React from "react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarHeader, SidebarProvider } from "./sidebar";
import Link from "next/link";

export default function sidebarDashboard() {
  return (
    <SidebarProvider>
       <Sidebar>
      <SidebarHeader />
      <SidebarContent>
        <SidebarGroup>
        <Link href='/admin/create-account'>
        
        </Link>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
    </SidebarProvider>
  );
}