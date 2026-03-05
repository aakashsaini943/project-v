import { Button } from "@/components/ui/button"
import { Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"

const ButtonLoading = ({ type, text, loading, className, onClick, ...props }) => {
  return (
    <Button
      type={type}
      variant="outline"
      disabled={loading}
      onClick={onClick}
      className={cn("", className)}
      {...props}
    >
      {loading && <Loader2 className="animate-spin mr-2" />}
      {text}
    </Button>
  )
}

export default ButtonLoading