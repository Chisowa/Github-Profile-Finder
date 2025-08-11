import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

export interface GitHubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  followers: number;
  following: number;
  public_repos: number;
}

type ProfileCardProps = {
  user: GitHubUser;
};

const numberFormatter = new Intl.NumberFormat();

const ProfileCard = ({ user }: ProfileCardProps) => {
  return (
    <Card className="max-w-2xl w-full mx-auto transition-transform duration-300 ease-out hover:-translate-y-0.5">
      <CardHeader className="flex flex-row items-center gap-4">
        <img
          src={user.avatar_url}
          alt={`${user.name ?? user.login} avatar`}
          loading="lazy"
          className="h-20 w-20 rounded-full border border-border"
        />
        <div className="min-w-0">
          <div className="text-xl font-semibold truncate">
            {user.name ?? user.login}
          </div>
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:underline"
          >
            @{user.login}
          </a>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {user.bio && (
          <p className="text-sm text-muted-foreground leading-relaxed">{user.bio}</p>
        )}

        <div className="grid grid-cols-3 divide-x divide-border rounded-md border">
          <div className="p-4 text-center">
            <div className="text-2xl font-bold">
              {numberFormatter.format(user.public_repos)}
            </div>
            <div className="text-xs text-muted-foreground">Repositories</div>
          </div>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold">
              {numberFormatter.format(user.followers)}
            </div>
            <div className="text-xs text-muted-foreground">Followers</div>
          </div>
          <div className="p-4 text-center">
            <div className="text-2xl font-bold">
              {numberFormatter.format(user.following)}
            </div>
            <div className="text-xs text-muted-foreground">Following</div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button asChild variant="secondary">
          <a href={user.html_url} target="_blank" rel="noopener noreferrer" aria-label="Open GitHub profile">
            <Github className="mr-2 h-4 w-4" /> View on GitHub
          </a>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProfileCard;
