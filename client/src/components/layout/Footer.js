import React from "react";
import { Flex, Text } from "@chakra-ui/react";

const Footer = () => {
  return (
    <Flex
      as="footer"
      align="center"
      justify="center"
      padding="1rem"
      bg="teal.500"
      color="white"
      position="fixed"
      bottom="0"
      left="0"
      right="0"
    >
      <Text>© 2024 MyBlog. All rights reserved.</Text>
    </Flex>
  );
};

export default Footer;
