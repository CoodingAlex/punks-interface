import {
  Flex,
  Button,
  Tag,
  TagLabel,
  Badge,
  TagCloseButton,
} from '@chakra-ui/react';
import { AddIcon } from '@chakra-ui/icons';
import { Link } from 'react-router-dom';
import { UnsupportedChainIdError, useWeb3React } from '@web3-react/core';
import { connector } from '../../config/web3';
import { useCallback, useEffect, useState } from 'react';

const WalletData = () => {
  const [balance, setBalance] = useState(0);
  const { activate, account, active, deactivate, error, library } =
    useWeb3React();

  const isUnsupportedChainId = error instanceof UnsupportedChainIdError;

  const getBalance = useCallback(async () => {
    const toSet = await library.eth.getBalance(account);
    setBalance(Number((toSet / 1e18).toFixed(2)));
  }, [library?.eth, account]);

  const connect = useCallback(() => {
    activate(connector);
    localStorage.setItem('previouslyConnected', 'true');
  }, [activate]);

  useEffect(() => {
    if (localStorage.getItem('previouslyConnected') === 'true') {
      connect();
    }
  }, [connect]);

  useEffect(() => {
    if (active) getBalance();
  }, [active, getBalance]);

  const disconnect = () => {
    deactivate();
    localStorage.removeItem('previouslyConnected');
  };

  return (
    <Flex alignItems={'center'}>
      {active ? (
        <Tag colorScheme="green" borderRadius="full">
          <TagLabel>
            <Link to="/punks">{account}</Link>
          </TagLabel>
          <Badge variant="solid" fontSize="0.8rem" ml={1}>
            ~{balance} Ξ
          </Badge>
          <TagCloseButton onClick={disconnect} />
        </Tag>
      ) : (
        <Button
          variant={'solid'}
          colorScheme={'green'}
          size={'sm'}
          leftIcon={<AddIcon />}
          onClick={connect}
        >
          {isUnsupportedChainId ? 'Red no soportada' : 'Connect Wallet'}
        </Button>
      )}
    </Flex>
  );
};

export default WalletData;
