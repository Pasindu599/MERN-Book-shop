import React from "react";

import { Sidebar } from "flowbite-react";
import { BiBuoy } from "react-icons/bi";
import {
  HiArrowSmRight,
  HiChartPie,
  HiInbox,
  HiOutlineCloudUpload,
  HiShoppingBag,
  HiTable,
  HiUser,
  HiViewBoards,
} from "react-icons/hi";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthProvider";

import userImg from "../assets/awardbooks.png";

function SideBar() {
  const { user } = useContext(AuthContext);
  return (
    <Sidebar
      className="h-screen "
      aria-label="Sidebar with content separator example"
    >
      <Sidebar.Logo href="/" img={userImg} imgAlt={userImg}>
        {user?.displayName || "Demo User"}
      </Sidebar.Logo>
      <Sidebar.Items>
        <Sidebar.ItemGroup>
          {/* <Sidebar.Item href="/admin/dashboard" icon={HiChartPie}>
            Dashboard
          </Sidebar.Item> */}
          <Sidebar.Item
            href="/admin/dashboard/upload"
            icon={HiOutlineCloudUpload}
          >
            Upload Product
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/" icon={HiInbox}>
            Manage Products
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/profile" icon={HiUser}>
            User Profile
          </Sidebar.Item>
          {/* <Sidebar.Item href="#" icon={HiShoppingBag}>
            Products
          </Sidebar.Item> */}
          <Sidebar.Item href="/" icon={HiArrowSmRight}>
            Back to Home
          </Sidebar.Item>
          <Sidebar.Item href="/admin/dashboard/security/" icon={HiUser}>
            Security & Privacy
          </Sidebar.Item>
          <Sidebar.Item href="/logout" icon={HiTable}>
            Sign out
          </Sidebar.Item>
        </Sidebar.ItemGroup>
        {/* <Sidebar.ItemGroup>
          <Sidebar.Item href="#" icon={HiChartPie}>
            Upgrade to Pro
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={HiViewBoards}>
            Documentation
          </Sidebar.Item>
          <Sidebar.Item href="#" icon={BiBuoy}>
            Help
          </Sidebar.Item>
        </Sidebar.ItemGroup> */}
      </Sidebar.Items>
    </Sidebar>
  );
}

export default SideBar;
