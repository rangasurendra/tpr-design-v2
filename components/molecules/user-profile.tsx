import { Avatar } from "@/components/atoms/avatar"

interface UserProfileProps {
  name: string
  email: string
  avatar?: string
}

export function UserProfile({ name, email, avatar }: UserProfileProps) {
  return (
    <div className="flex items-center space-x-3 p-4 bg-slate-700 rounded-lg">
      <Avatar src={avatar} fallback={name.charAt(0).toUpperCase()} alt={name} />
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-white truncate">{name}</p>
        <p className="text-xs text-slate-300 truncate">{email}</p>
      </div>
    </div>
  )
}
