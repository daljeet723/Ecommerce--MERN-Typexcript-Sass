import { Link } from "react-router-dom";
import { FaSearch, FaShoppingBag, FaSignInAlt, FaSignOutAlt, FaUser } from "react-icons/fa";
import { useState } from "react";

const Header = () => {
    //_id ="" indicates user is not signed in so by deafult make it logout
    const user = { _id: "", role: "admin" };
    const [isOpen, setIsOpen] = useState<boolean>(false);

    const logoutHandler =()=>{
        setIsOpen(false);
    }
    return (
        <nav className="header">
            <Link onClick={()=> setIsOpen(false)} to={"/"}>Home</Link>
            <Link onClick={()=> setIsOpen(false)} to={"/search"}><FaSearch /></Link>
            <Link onClick={()=> setIsOpen(false)} to={"/cart"}><FaShoppingBag /></Link>

            {/* If user is logged in show profile icon else sho login button */}
            {
                user?._id ? (
                    <>
                        {/* Toggle Isopen to display links */}
                        <button onClick={()=>setIsOpen((prev)=>!prev)}>
                            <FaUser />
                            </button>
                        <dialog open={isOpen}>
                            <div>
                                {user.role === "admin" && (
                                    <Link to="/admin/dashboard">Admin</Link>
                                )}
                                <Link to="/orders">Orders</Link>
                                <button onClick={logoutHandler}><FaSignOutAlt /></button>
                            </div>
                        </dialog>
                    </>
                ) : (<Link to={"/login"}><FaSignInAlt /></Link>)
            }
        </nav>
    )
}

export default Header



// Why do we return <nav></nav> instead of <div>

// (1) Semantic Meaning:
//     The <nav> element in HTML is used to define a navigation section on a webpage.
//     It gives a semantic meaning to the content inside it, indicating that the enclosed links are part of the navigation structure of the site.
//     This helps both developers and browsers understand the purpose of the content.

// (2) Accessibility:
//     Screen readers and other assistive technologies rely on HTML semantics to convey information to users.
//     By using <nav>, you're providing clear information to these tools that the content inside is navigation-related.
//     This enhances the accessibility of your website.

// (3) Search Engine Optimization (SEO):
//     While search engines are quite sophisticated, using semantic HTML can still have a positive impact on SEO.
//     Search engines may give slightly more weight to content within specific semantic elements like <nav> when determining the relevance of your page.