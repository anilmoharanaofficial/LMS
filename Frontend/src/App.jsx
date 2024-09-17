import styled from "styled-components";
import Home from "./pages/Home";
import GlobalStyles from "./styles/GlobalStyles";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Learn from "./pages/Learn";
import Explore from "./pages/Explore";
import AppLayout from "./UI/AppLayout";
import { QueryClient, QueryClientProvider } from "react-query";

const StyledHomePage = styled.div`
  margin: 2.5rem 18rem 1rem 18rem;
`;

function App() {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 0,
      },
    },
  });

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <GlobalStyles />
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <StyledHomePage>
                  <Home />
                </StyledHomePage>
              }
            />

            <Route element={<AppLayout />}>
              <Route path="learn" element={<Learn />} />
              <Route path="/learn/explore" element={<Explore />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </QueryClientProvider>
    </>
  );
}

export default App;
