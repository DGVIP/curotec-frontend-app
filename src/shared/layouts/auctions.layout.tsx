import { Button } from "@/components/ui/button";
import { useNavigate } from "@tanstack/react-router";
import { Link, Outlet } from "@tanstack/react-router";

export const AuctionsLayout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    navigate({ to: "/login" });
  };

  return (
    <div className="max-w-screen-lg mx-auto p-4">
      <div className="flex justify-between items-center">
        <h1>Auctions App</h1>

        <div className="flex flex-row gap-4 items-center">
          <Link to="/auctions">Auctions</Link>
          <Link to="/auctions/current">My Auctions</Link>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};
