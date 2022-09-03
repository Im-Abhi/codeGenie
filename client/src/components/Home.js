import React from 'react';

import { Heading, Text, Container } from '@chakra-ui/react';

const Home = () => (
  <Container centerContent>
    <Heading as='h1' size='4xl' noOfLines={1}>
      Online Code Editor
    </Heading>
    <Text fontSize='xl'>Built with React, Node.js, Express and Webpack.</Text>
  </Container>
);

export default Home;
