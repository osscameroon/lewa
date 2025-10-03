import { MoveRight, PhoneCall, SearchIcon, UserPlus } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

function CTA() {
  return (
    <div className="w-full py-10 lg:py-20">
      <div className="mx-auto">
        <div
          className="flex flex-col text-center bg-muted rounded-md p-4 lg:p-14 gap-8 items-center">
          <div>
            <Badge>Get started</Badge>
          </div>
          <div className="flex flex-col gap-2">
            <h3 className="text-3xl md:text-5xl tracking-tighter max-w-xl font-regular">
              Ready to Learn African Writing Systems?
            </h3>
            <p
              className="text-lg leading-relaxed tracking-tight text-muted-foreground max-w-xl">
              Join thousands reclaiming African literacy.
            </p>
          </div>
          <div className="flex flex-row gap-4">
            <Button className="gap-2" variant="outline">
              Sign Up Free <UserPlus className="w-4 h-4" />
            </Button>
            <Button className="gap-2">
              Explore Languages <SearchIcon className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export { CTA };
