import { useCallback, useEffect, useState } from 'react';
import { usePlatziPunks } from '../usePlatziPunks/index';

const getPunkData = async ({
  platziPunks,
  tokenId,
}: {
  platziPunks: any;
  tokenId: number;
}) => {
  const [
    tokenURI,
    dna,
    owner,
    accessoriesType,
    clotheColor,
    clotheType,
    eyeType,
    eyeBrowType,
    facialHairColor,
    facialHairType,
    hairColor,
    hatColor,
    graphicType,
    mouthType,
    skinColor,
    topType,
  ] = await Promise.all([
    platziPunks.methods.tokenURI(tokenId).call(),
    platziPunks.methods.tokenDNA(tokenId).call(),
    platziPunks.methods.ownerOf(tokenId).call(),
    platziPunks.methods.getAccessoriesType(tokenId).call(),
    platziPunks.methods.getAccessoriesType(tokenId).call(),
    platziPunks.methods.getClotheColor(tokenId).call(),
    platziPunks.methods.getClotheType(tokenId).call(),
    platziPunks.methods.getEyeType(tokenId).call(),
    platziPunks.methods.getEyeBrowType(tokenId).call(),
    platziPunks.methods.getFacialHairColor(tokenId).call(),
    platziPunks.methods.getFacialHairType(tokenId).call(),
    platziPunks.methods.getHairColor(tokenId).call(),
    platziPunks.methods.getHatColor(tokenId).call(),
    platziPunks.methods.getGraphicType(tokenId).call(),
    platziPunks.methods.getMouthType(tokenId).call(),
    platziPunks.methods.getSkinColor(tokenId).call(),
    platziPunks.methods.getTopType(tokenId).call(),
  ]);

  console.log('aa');

  const responseMetadata = await fetch(tokenURI);

  const metadata = await responseMetadata.json();

  return {
    tokenURI,
    attributes: {
      accessoriesType,
      clotheColor,
      clotheType,
      eyeType,
      eyeBrowType,
      facialHairColor,
      facialHairType,
      hairColor,
      hatColor,
      graphicType,
      mouthType,
      skinColor,
      topType,
    },
    dna,
    owner,
    tokenId,
    ...metadata,
  };
};

export const usePlatziPunksData = () => {
  const [punks, setPunks] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const platziPunks = usePlatziPunks();

  const update = useCallback(async () => {
    if (platziPunks) {
      setLoading(true);

      let tokenIds;

      const totalSupply = await platziPunks.methods.totalSupply().call();
      tokenIds = Array.from({ length: totalSupply }, (_, index) => index);
      const punksPromise = tokenIds.map((tokenId) =>
        getPunkData({ platziPunks, tokenId })
      );

      const punks = await Promise.all(punksPromise);

      setPunks([...punks]);
      setLoading(false);
    }
  }, [platziPunks]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    punks,
    update,
  };
};

export const usePlatziPunkData = (tokenId: number | null = null) => {
  const [punk, setPunk] = useState<any>({});
  const [loading, setLoading] = useState(true);
  const platziPunks = usePlatziPunks();

  const update = useCallback(async () => {
    if (platziPunks && tokenId !== null) {
      setLoading(true);
      const toSet = await getPunkData({ platziPunks, tokenId });
      setPunk(toSet);
      setLoading(false);
    }
  }, [platziPunks, tokenId]);

  useEffect(() => {
    update();
  }, [update]);

  return {
    loading,
    punk,
    update
  }
};
