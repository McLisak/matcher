import { Container, Stack, Typography, styled } from '@mui/material';
import { PeopleCard } from './PeopleCard';
import { Result } from './Result';

const Title = styled(Typography)`
  font-size: clamp(3.5rem, 10vw, 6rem);
  font-weight: 100;
  text-align: center;
`;

function App() {
  return (
    <Stack height='100dvh' alignItems='center'>
      <Title>Matcher</Title>
      <Container>
        <PeopleCard />
      </Container>
      <Result />
    </Stack>
  );
}

export default App;
