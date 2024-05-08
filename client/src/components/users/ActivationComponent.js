import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { activateUser } from "../../api/auth";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const ActivationComponent = () => {
    console.log("here")
  const history = useNavigate();
  const [activationStatus, setActivationStatus] = useState(null);
    const { uid, token } = useParams();
  const mutation = useMutation({
    mutationFn: activateUser,
    onSuccess: () => {
      setActivationStatus("success");
      setActivationStatus("success");
      toast("Activated, redirect to login");
      // Redirect to login page
      setTimeout(() => {
        history.push("/login");
      }, 3000);
    },
    onError: (error) => {
      toast("Something went wrong, resend activation");
      setTimeout(() => {
        history.push("/user-registered");
      }, 3000);
    },
  });

  useEffect(() => {
    // Function to handle activation process
    mutation.mutate(JSON.stringify({ uid, token }));

  }, []);


  return (
    <div>
      {activationStatus === "success" && (
        <div>
          <h2>User activated successfully!</h2>
          <p>Redirecting to login page...</p>
        </div>
      )}

      {activationStatus === null && <p>Activating user...</p>}
    </div>
  );
};

export default ActivationComponent;
