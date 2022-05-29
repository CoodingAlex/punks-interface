import { useWeb3React } from '@web3-react/core';
import { useMemo } from 'react';
import { PlatziPunksArtifact } from '../../../config/artifacts/PlatziPunks';

export const usePlatziPunks = () => {
  const { activate, library, chainId, active } = useWeb3React();

  const { abi, address } = PlatziPunksArtifact as any;

  const platziPunks = useMemo(() => {
    if (active) {
      return new library.eth.Contract(abi, address[chainId || 4] as any);
    }
  }, [active, chainId, library?.eth?.Contract]);

  return platziPunks
};
