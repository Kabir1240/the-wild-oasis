import styled from "styled-components"
import GlobalStyles from "./styles/GlobalStyles"
import Button from './ui/Button'
import Input from "./ui/Input"
import Heading from "./ui/Heading"

const StyledApp = styled.main`
  background-color: orangered;
  padding: 20px;
`

export default function App() {
  return (
    <>
      <GlobalStyles />
      <StyledApp>
        <Heading as="h1">The Wild Oasis</Heading>
        <Heading as="h2">Subheading</Heading>
        <Button onClick={ () => alert("Bye")}>
          Hello
        </Button>
        <Input />
      </StyledApp>
    </>
  )
}
