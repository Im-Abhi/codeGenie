import React from 'react';

import { HStack, Button, Container, Heading } from '@chakra-ui/react';

const Header = () => (
  <div>
    <Container centerContent paddingBlock={4} rowGap={2}>
      <Heading as='h3' size='lg'>
        Online Code Editor
      </Heading>
      <HStack>
        <Button color="blue">
          <a href='/'>
            Home
          </a>
        </Button>
        <Button color="blue">
          <a href='/editor'>
            Code Editor
          </a>
        </Button>
      </HStack>
    </Container>
    <hr />
  </div>
);

export default Header;
