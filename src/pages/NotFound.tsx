import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Helmet } from "react-helmet-async";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <>
      <Helmet>
        <title>404 — Page Not Found | GitHub Profile Finder</title>
        <meta name="description" content="The page you’re looking for doesn’t exist." />
        <link rel="canonical" href="/" />
      </Helmet>
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center space-y-4">
          <h1 className="text-5xl font-extrabold">404</h1>
          <p className="text-muted-foreground">Oops! Page not found</p>
          <a href="/" className="underline underline-offset-4 hover:no-underline">
            Return to Home
          </a>
        </div>
      </div>
    </>
  );
};

export default NotFound;
