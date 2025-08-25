import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

interface ProfileAvatarProps {
  size?: "sm" | "md" | "lg" | "xl";
  className?: string;
  priority?: boolean;
}

const sizeClasses = {
  sm: "w-16 h-16",
  md: "w-24 h-24", 
  lg: "w-32 h-32",
  xl: "w-44 h-44"
};

const ringClasses = {
  sm: "ring-2 ring-cyan-400/40",
  md: "ring-3 ring-cyan-400/40",
  lg: "ring-4 ring-cyan-400/30", 
  xl: "ring-4 ring-cyan-400/30"
};

export const ProfileAvatar = ({ size = "md", className, priority = false }: ProfileAvatarProps) => {
  return (
    <div className={cn("relative group", className)}>
      {/* Glow effect */}
      <div className={cn(
        "absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/20 blur-lg transition-all duration-300 group-hover:from-cyan-400/30 group-hover:to-blue-500/30",
        sizeClasses[size]
      )} />
      
      {/* Avatar with gradient ring */}
      <Avatar className={cn(
        "relative border-2 border-transparent bg-gradient-to-br from-cyan-400 to-blue-500 p-0.5 transition-all duration-300 hover:from-cyan-300 hover:to-blue-400",
        sizeClasses[size],
        ringClasses[size]
      )}>
        <div className="w-full h-full rounded-full overflow-hidden bg-gradient-to-r from-[hsl(var(--profile-gradient-start))] to-[hsl(var(--profile-gradient-end))]">
          <AvatarImage 
            src="/images/Profile_Pic.png" 
            alt="Ajay Bervanshi - MS SQL Database Administrator"
            className="object-contain w-full h-full scale-105"
            loading={priority ? "eager" : "lazy"}
          />
          <AvatarFallback className="bg-gradient-to-br from-cyan-600 to-blue-600 text-white text-xl font-bold border-0">
            AB
          </AvatarFallback>
        </div>
      </Avatar>
    </div>
  );
};