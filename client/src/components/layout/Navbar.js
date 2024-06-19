import React from "react";
import { Flex, Box, Text, Button } from "@chakra-ui/react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem("accessToken");

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");

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
