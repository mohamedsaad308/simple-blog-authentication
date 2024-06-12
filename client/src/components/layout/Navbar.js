import React, { useEffect, useState } from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { useAuthTokens } from "../hooks";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const tokens = useAuthTokens();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!tokens?.access); // Update the logged-in state based on the presence of the access token
  }, [tokens]);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    queryClient.setQueryData("authTokens", null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <Flex as="nav" align="center" justify="space-between" padding="1rem" bg="teal.500" color="white">
      <Box>
        <Text fontSize="xl" fontWeight="bold">
          MyBlog
        </Text>
      </Box>
      <Flex align="center" justify="flex-end">
        <Link to="/" style={{ textDecoration: "none" }}>
          <Button variant={location.pathname === "/" ? "solid" : "ghost"} mr={4}>
            Home
          </Button>
        </Link>
        <Link to="/about" style={{ textDecoration: "none" }}>
          <Button variant={location.pathname === "/about" ? "solid" : "ghost"} mr={4}>
            About
          </Button>
        </Link>
        {!isLoggedIn && (
          <>
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button variant={location.pathname === "/register" ? "solid" : "ghost"} mr={4}>
                Register
              </Button>
            </Link>
            <Link to="/login" style={{ textDecoration: "none" }}>
              <Button variant={location.pathname === "/login" ? "solid" : "ghost"} mr={4}>
                Login
              </Button>
            </Link>
          </>
        )}
        {isLoggedIn && (
          <Button variant="ghost" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Flex>
    </Flex>
  );
};

export default Navbar;
