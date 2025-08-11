import { useState } from "react";
import { Helmet } from "react-helmet-async";
import SearchBar from "@/components/github/SearchBar";
import ProfileCard, { GitHubUser } from "@/components/github/ProfileCard";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";

const Index = () => {
  const [query, setQuery] = useState("");
  const [user, setUser] = useState<GitHubUser | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setError(null);
    setUser(null);
    try {
      const res = await fetch(`https://api.github.com/users/${encodeURIComponent(query.trim())}`);
      if (res.status === 404) {
        setError("User not found. Please try another username.");
        setUser(null);
      } else if (res.status === 403) {
        setError("Rate limit exceeded. Please try again later.");
      } else if (!res.ok) {
        setError("Something went wrong. Please try again.");
      } else {
        const data = (await res.json()) as GitHubUser;
        setUser(data);
      }
    } catch (e) {
      setError("Network error. Check your connection and try again.");
    } finally {
      setLoading(false);
    }
  };

  const pageTitle = user ? `${user.name ?? user.login} — GitHub Profile` : "GitHub Profile Finder";
  const metaDesc = user
    ? `View ${user.name ?? user.login}'s GitHub profile: repos, followers, following.`
    : "Search any GitHub username to instantly see profile details, repos, followers, and more.";

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta name="description" content={metaDesc} />
        <link rel="canonical" href="/" />
        <meta property="og:title" content={pageTitle} />
        <meta property="og:description" content={metaDesc} />
        <meta property="og:type" content="website" />
      </Helmet>

      {user && (
        <Helmet>
          <script type="application/ld+json">{JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Person',
            name: user.name ?? user.login,
            url: user.html_url,
            image: user.avatar_url,
            sameAs: [user.html_url],
            description: user.bio ?? undefined,
          })}</script>
        </Helmet>
      )}

      <header className="pt-14 pb-8">
        <div className="container mx-auto text-center space-y-3">
          <h1 className="text-4xl md:text-5xl font-extrabold gradient-text-primary">GitHub Profile Finder</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Enter a GitHub username to fetch profile details using the public GitHub API.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-20">
        <section className="flex justify-center mb-8">
          <SearchBar value={query} onChange={setQuery} onSubmit={search} loading={loading} />
        </section>

        {loading && (
          <div className="max-w-2xl mx-auto border rounded-md p-6">
            <div className="flex items-center gap-4 mb-6">
              <Skeleton className="h-20 w-20 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-5 w-40" />
                <Skeleton className="h-4 w-32" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
              <Skeleton className="h-16" />
            </div>
          </div>
        )}

        {error && !loading && (
          <div className="max-w-2xl mx-auto">
            <Alert variant="destructive">
              <AlertTitle>Oops!</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          </div>
        )}

        {user && !loading && <ProfileCard user={user} />}

        {!user && !loading && !error && (
          <section className="max-w-2xl mx-auto text-center text-sm text-muted-foreground">
            Try searching for popular usernames like "torvalds", "gaearon", or "vercel".
          </section>
        )}
      </main>
    </>
  );
};

export default Index;
