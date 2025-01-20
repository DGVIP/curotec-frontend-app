import {
  createRouter,
  createRoute,
  createRootRoute,
  redirect,
} from "@tanstack/react-router";
import { LoginScreen } from "./features/auth/login/login.screen";
import { RegisterScreen } from "./features/auth/register/register.screen";
import { CreateAuctionScreen } from "./features/auction/create-auction/create-auction.screen";
import { AuctionListScreen } from "./features/auction/auction-list/auction-list.screen";
import { AuctionDetailsScreen } from "./features/auction/auction-details/auction-details.screen";
import { AuctionsLayout } from "./shared/layouts/auctions.layout";
import { CurrentUserAuctionListScreen } from "./features/auction/current-user-auction-list/current-user-auction-list.screen";

const getIsUserAuthenticated = () => !!localStorage.getItem("access_token");

const protectedRouteMiddleware = () => {
  if (!getIsUserAuthenticated()) {
    throw redirect({ to: "/login" });
  }
};

const authRouteMiddleware = () => {
  if (getIsUserAuthenticated()) {
    throw redirect({ to: "/auctions" });
  }
};

const rootRoute = createRootRoute();

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/login",
  component: LoginScreen,
  beforeLoad: () => {
    authRouteMiddleware();
  },
});

const registerRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/register",
  component: RegisterScreen,
  beforeLoad: () => {
    authRouteMiddleware();
  },
});

const auctionsRootRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "auctions",
  component: AuctionsLayout,
  beforeLoad: () => {
    protectedRouteMiddleware();
  },
});

const auctionListRoute = createRoute({
  getParentRoute: () => auctionsRootRoute,
  path: "/",
  component: AuctionListScreen,
});

const auctionDetailsRoute = createRoute({
  getParentRoute: () => auctionsRootRoute,
  path: "$auctionId",
  component: AuctionDetailsScreen,
});

const createAuctionRoute = createRoute({
  getParentRoute: () => auctionsRootRoute,
  path: "add",
  component: CreateAuctionScreen,
});

const currentUserAuctionListRoute = createRoute({
  getParentRoute: () => auctionsRootRoute,
  path: "current",
  component: CurrentUserAuctionListScreen,
});

const notDefinedRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "*",
  beforeLoad: () => {
    if (getIsUserAuthenticated()) {
      throw redirect({ to: "/auctions" });
    } else {
      throw redirect({ to: "/login" });
    }
  },
});

const routeTree = rootRoute.addChildren([
  loginRoute,
  registerRoute,
  auctionsRootRoute.addChildren([
    auctionListRoute,
    auctionDetailsRoute,
    createAuctionRoute,
    currentUserAuctionListRoute,
  ]),
  notDefinedRoute,
]);

export const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
