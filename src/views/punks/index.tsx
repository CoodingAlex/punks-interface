import { Grid } from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import React from 'react';
import { Link } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { PunkCard } from '../../components/punk-card';
import { RequestAccess } from '../../components/request-access';
import { usePlatziPunksData } from '../../layout/hooks/usePlatziPunksData';

export const Punks = () => {
  const { active } = useWeb3React();
  const { loading, punks, update } = usePlatziPunksData();
  console.log(punks);

  if (!active) return <RequestAccess />;
  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <Grid templateColumns={'repeat(auto-fill, minmax(250px, 1fr))'} gap={6}>
          {punks.map(({ tokenId, image, name }) => (
            <Link key={tokenId} to={''+tokenId}>
              <PunkCard key={tokenId} image={image} name={name} />
            </Link>
          ))}
        </Grid>
      )}
    </>
  );
};
