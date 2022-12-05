import { Link } from "react-router-dom"
import { HomeIcon } from "@heroicons/react/24/outline"

const Navbar = () => {
  return (
    <div className="w-full h-10 bg-slate-100 shadow mb-4 flex items-center p-4">
      <Link to='/' className="flex items-center gap-2"><HomeIcon className="w-4 h-4"/>Home</Link>
    </div>
  )
}

export default Navbar