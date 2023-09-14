import { Link } from "react-router-dom";

const Navbar = () => {
   return (
      <div className="navbar bg-primary text-primary-content">
         <Link to={'/'} className="btn btn-ghost normal-case text-xl ">All User</Link>
         <Link to={'/adduser'} className="btn btn-ghost normal-case text-xl ">Add User</Link>
         <Link to={'/demo'} className="btn btn-ghost normal-case text-xl ">demo check</Link>
         
      </div>
   );
};

export default Navbar;