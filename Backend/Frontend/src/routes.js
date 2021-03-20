
import Index from "views/Index.js";
import Profile from "views/examples/Profile.js";
import Maps from "views/examples/Maps.js";
import Tables from "views/examples/Tables.js";
import Icons from "views/examples/Icons.js";
import Register from "views/examples/Register.js";
import Login from "views/examples/Login.js";
import Events from "views/examples/Events.js";
import EventsList from "views/examples/EventsList";
import EventDetails from "views/examples/EventDetails";

var routes = [
  {
    path: "/index",
    name: "Inventory",
    component: Index,
    layout: "/admin",
  },
  {
    path: "/category",
    name: "Category",
    component: Maps,
    layout: "/admin",
  },
  {
    path: "/products",
    name: "Products",
    component: Profile,
    layout: "/admin",
  },
  {
    path: "/prodlist",
    name: "Products List",
    component: Tables,
    layout: "/admin",
  },
  {
    path: "/prodmanagement",
    name: "Products Details",
    component: Icons,
    layout: "/admin",
  },
  {
    path: "/events",
    name: "Events",
    component: Events,
    layout: "/admin",
  },
  {
    path: "/eventslist",
    name: "Events List",
    component: EventsList,
    layout: "/admin",
  },
  {
    path: "/eventdetails",
    name: "Events Details",
    component: EventDetails,
    layout: "/admin",
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
    layout: "/auth",
  },
  {
    path: "/register",
    name: "Register",
    component: Register,
    layout: "/auth",}
  
];
export default routes;
