import Spinner from "@/ui/Spinner";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center py-22">
            {/* <Spinner /> */}  
            <div className="w-16 h-16 border-4 border-primary-900 border-t-primary-200 rounded-full animate-spin"></div>
            <p className="text-xl text-primary-800">Loading all shipments...</p>
        </div> 
    )
}