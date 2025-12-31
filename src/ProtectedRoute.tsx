import { useNavigate } from "react-router-dom";
import useUser from "./features/authentication/useUser";
import Spinner from "./ui/Spinner";
import styled from "styled-components";
import { useEffect } from "react";

const FullPage = styled.div`
  height: 100vh;
  background-color: var(--color-grey-50);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  // 1. Load authenticated user
  const {isLoading: isLoadingUser, isAuthenticated} = useUser();

  // 2. If no authenticated user, redirect to login
  useEffect(() => {
    if ( !isAuthenticated && !isLoadingUser ) navigate("/login");
  }, [isAuthenticated, isLoadingUser, navigate]);


  // 3. While loading, show spinner
  if (isLoadingUser) return (
    <FullPage>
      <Spinner />
    </FullPage>
  );

  // 4. If authenticated, render app
  if (isAuthenticated) return children;
}
