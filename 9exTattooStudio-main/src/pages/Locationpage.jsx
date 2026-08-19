import { useParams, Navigate } from "react-router-dom";
import { studioLocations } from "../data/StudioLocations.js";
import Home from "./Home.jsx";


export default function LocationPage() {
  const { slug } = useParams();
  const loc = studioLocations.find((l) => l.slug === slug);

  
  if (!loc) return <Navigate to="/" replace />;

  return   <Home locationOverride={loc} />;
}

