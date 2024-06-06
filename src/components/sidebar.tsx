import { Button } from "./ui/button";
import "./sidebar.css";
import { ModeToggle } from "./ui/theme-toggle";

export default function Sidebar() {
  return (
    <>
      <div className="sidebar">
        <Button className="sidebar-btn" variant={"outline"}>
          Items
        </Button>
        <Button className="sidebar-btn" variant={"outline"}>
          Suppliers
        </Button>
        <Button className="sidebar-btn" variant={"outline"}>
          Purchases
        </Button>
        <Button className="sidebar-btn" variant={"outline"}>
          Orders
        </Button>
        <Button className="sidebar-btn" variant={"outline"}>
          Sales Analysis
        </Button>
        <Button className="sidebar-btn" variant={"outline"}>
          Purchases Analysis
        </Button>

        <div className="lower-sidebar">
          <div className="toggle">
            <ModeToggle />
          </div>

          <Button className="sign-out-btn sidebar-btn" variant={"outline"}>
            Sign Out
          </Button>
        </div>
      </div>
    </>
  );
}
