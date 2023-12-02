import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import { Details, Explore, Home, PageNotFound, Search } from "./pages";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path=":mediaType/:id" element={<Details />} />
        <Route path="explore/:mediaType" element={<Explore />} />
        <Route path="search/:query" element={<Search />} />
      </Route>
      <Route path="*" element={<PageNotFound />} />
    </>
  )
);
