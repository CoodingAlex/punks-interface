import {
  Stack,
  Heading,
  Text,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Tag,
  useToast,
} from '@chakra-ui/react';
import { useWeb3React } from '@web3-react/core';
import { RequestAccess } from '../../components/request-access';
import { PunkCard } from '../../components/punk-card';
import { usePlatziPunkData } from '../../layout/hooks/usePlatziPunksData';
import { useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { useState } from 'react';
import { usePlatziPunks } from '../../layout/hooks/usePlatziPunks';

export const Punk = () => {
  const { active, account, library } = useWeb3React();
  const platziPunks = usePlatziPunks();
  const { tokenId } = useParams();
  const { loading, punk, update } = usePlatziPunkData(Number(tokenId));
  const toast = useToast();
  const [isTransferring, setIsTransferring] = useState(false);

  const transfer = () => {
    setIsTransferring(true);

    const address = prompt('Ingresa la dirección del nuevo dueño');

    const isAddress = library.utils.isAddress(address);

    if (!isAddress) {
      toast({
        title: 'Dirección inválida',
        description: 'La dirección ingresada no es válida',
        status: 'error',
      });
      setIsTransferring(false);
    } else {
      platziPunks.methods
        .safeTransferFrom(punk.owner, address, punk.tokenId)
        .send({ from: account })
        .on('transactionHash', (txHash: string) => {
          toast({
            title: 'Transaccion enviada',
            description: txHash,
            status: 'info',
          });
        })
        .on('receipt', () => {
          setIsTransferring(false);
          toast({
            title: `Transaccion confirmada el punk ahora pertenece a ${address}`,
            description: 'Nunca pares de aprender',
            status: 'success',
          });

          update();
        })
        .on('error', (error: Error) => {
          setIsTransferring(false);
          toast({
            title: 'Transaccion fallida',
            description: error.message,
            status: 'error',
          });
        });
    }
  };

  if (!active) return <RequestAccess />;

  if (loading) return <Loading />;

  return (
    <Stack
      spacing={{ base: 8, md: 10 }}
      py={{ base: 5 }}
      direction={{ base: 'column', md: 'row' }}
    >
      <Stack>
        <PunkCard name={punk.name} image={punk.image} />
        <Button
          disabled={account !== punk.owner}
          colorScheme="green"
          onClick={transfer}
        >
          {account !== punk.owner ? 'No eres el dueño' : 'Transferir'}
        </Button>
      </Stack>
      <Stack width="100%" spacing={5}>
        <Heading>{punk.name}</Heading>
        <Text fontSize="xl">{punk.description}</Text>
        <Text fontWeight={600}>
          DNA:
          <Tag ml={2} colorScheme="green">
            {punk.dna}
          </Tag>
        </Text>
        <Text fontWeight={600}>
          Owner:
          <Tag ml={2} colorScheme="green">
            {punk.owner}
          </Tag>
        </Text>
        <Table size="sm" variant="simple">
          <Thead>
            <Tr>
              <Th>Atributo</Th>
              <Th>Valor</Th>
            </Tr>
          </Thead>
          <Tbody>
            {Object.entries(punk.attributes).map(([key, value]: any) => (
              <Tr key={key}>
                <Td>{key}</Td>
                <Td>
                  <Tag>{value}</Tag>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Stack>
    </Stack>
  );
};
