import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function AdminProtected(props) {
  const { Component } = props;
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("admin");

  useEffect(() => {
  

    if (isAdmin === null && token === null) {
      navigate("/");
    }
  }, []);

  return (
    <div>
        {isAdmin === 'true' && token !== null && (  <Component />)}
   
    </div>
  );
}

export default AdminProtected;
