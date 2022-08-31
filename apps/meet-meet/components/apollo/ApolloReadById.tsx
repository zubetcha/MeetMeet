import React from "react";
import { useQuery, gql } from "@apollo/client";

interface Country {
  code: string;
  emoji: string;
  name: string;
}

interface CountryData {
  countries: Country[];
}

const GET_COUNTRIES = gql`
  query Countries($filter: CountryFilterInput) {
    countries(filter: $filter) {
      code
      name
      emoji
    }
  }
`;

// GRAPHQL READ_BYFILTER
export function ApolloReadById() {
  const { data, loading, error } = useQuery<CountryData>(GET_COUNTRIES, {
    variables: {
      filter: {
        code: {
          eq: "AD",
        },
      },
    },
  });

  if (loading) {
    return <h2>로딩중</h2>;
  }

  if (error) {
    return <h1>에러 발생</h1>;
  }

  const countries = data?.countries.slice(0, 4);

  //   https://studio.apollographql.com/sandbox/explorer
  return (
    <div>
      <h1>필터링 건 데이터</h1>
      {countries?.map((country: Country, idx: number) => (
        <div key={`country-${idx}`}>
          {country.code} / {country.emoji} / {country.name}
        </div>
      ))}
    </div>
  );
}
