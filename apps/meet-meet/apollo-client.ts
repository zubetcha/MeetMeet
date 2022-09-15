import { ApolloClient, InMemoryCache, HttpLink, ApolloLink, concat } from "@apollo/client";
import { getCookie } from "@utils/cookies";
import { API_BASE_URL } from "constants/common";
import { ACCESS_TOKEN } from "constants/auth";

const httpLink = new HttpLink({uri: API_BASE_URL + "/graphql"});

const authMiddleware = new ApolloLink((operation, forward) => {
  const accessToken = getCookie(ACCESS_TOKEN);
  // DESCRIBE: add the authorization to the headers
  operation.setContext(({ headers = {} }) => ({
    headers: {
      ...headers,
      authorization: accessToken ? `Bearer ${accessToken}` : null,
    }
  }));

  return forward(operation);
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: concat(authMiddleware, httpLink),
});

export default client;
