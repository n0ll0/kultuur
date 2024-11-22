import { LoaderPinwheel } from "lucide-react"

export default function Loading() {
  // You can add any UI inside Loading, including a Skeleton.
  return (<div className="flex justify-center items-center h-screen">
      <LoaderPinwheel className="animate-spin" />
      </div>)
}