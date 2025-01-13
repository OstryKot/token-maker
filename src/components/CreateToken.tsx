import React, { useState } from 'react';
import Web3 from 'web3';
import './CreateToken.css';

import SimpleERC20 from '../contract/SimpleERC20.json';

const CreateToken: React.FC = () => {
  const [tokenName, setTokenName] = useState<string>('');
  const [tokenSymbol, setTokenSymbol] = useState<string>('');
  const [tokenSupply, setTokenSupply] = useState<string>('');
  const [tokenDecimals, setTokenDecimals] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [walletAddress, setWalletAddress] = useState<string>(''); 
  
  const connectMetaMask = async () => {
    if (window.ethereum) {
      try {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.request({ method: 'eth_requestAccounts' }); 
        const accounts = await web3.eth.getAccounts();
        setWalletAddress(accounts[0]);
        setError('');
      } catch (err) {
        setError('Błąd podczas łączenia z MetaMask: ' + (err as Error).message);
      }
    } else {
      setError('MetaMask nie jest zainstalowany.');
    }
  };

  const handleCreateToken = async () => {
    setLoading(true);
    setError('');

    try {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        const accounts = await web3.eth.getAccounts();
        const account = accounts[0];
        
        const abi = SimpleERC20.abi;
        const bytecode = SimpleERC20.bytecode;
        
        const contract = new web3.eth.Contract(abi);
        
        const deployedContract = await contract.deploy({
          data: bytecode,
          arguments: [tokenName, tokenSymbol, parseInt(tokenDecimals), parseInt(tokenSupply)],
        }).send({
          from: account,
          gas: '1500000',
          gasPrice: '30000000000',
        });

        console.log('Token został wdrożony pod adresem:', deployedContract.options.address);
        alert(`Token został wdrożony pod adresem: ${deployedContract.options.address}`);
      } else {
        setError('MetaMask nie jest zainstalowany.');
      }
    } catch (err) {
      setError('Błąd podczas wdrażania tokena: ' + (err as Error).message);
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="create-token-container">
      <h1>Stwórz własny token ERC20</h1>
      
      {!walletAddress ? (
        <button onClick={connectMetaMask} className="connect-button">
          Podłącz MetaMask
        </button>
      ) : (
        <p className="wallet-address">Podłączony portfel: {walletAddress}</p>
      )}

      <div className="input-group">
        <label htmlFor="tokenName">Nazwa tokena:</label>
        <input
          id="tokenName"
          type="text"
          value={tokenName}
          onChange={(e) => setTokenName(e.target.value)}
          placeholder="Wpisz nazwę tokena"
        />
      </div>
      <div className="input-group">
        <label htmlFor="tokenSymbol">Symbol tokena:</label>
        <input
          id="tokenSymbol"
          type="text"
          value={tokenSymbol}
          onChange={(e) => setTokenSymbol(e.target.value)}
          placeholder="Wpisz symbol tokena"
        />
      </div>
      <div className="input-group">
        <label htmlFor="tokenSupply">Ilość tokenów:</label>
        <input
          id="tokenSupply"
          type="number"
          value={tokenSupply}
          onChange={(e) => setTokenSupply(e.target.value)}
          placeholder="Wpisz ilość tokenów"
        />
      </div>
      <div className="input-group">
        <label htmlFor="tokenDecimals">Miejsca po przecinku:</label>
        <input
          id="tokenDecimals"
          type="number"
          value={tokenDecimals}
          onChange={(e) => setTokenDecimals(e.target.value)}
          placeholder="Wpisz liczbę miejsc po przecinku"
        />
      </div>
      <button onClick={handleCreateToken} disabled={loading || !walletAddress}>
        {loading ? 'Wdrażanie...' : 'Stwórz token'}
      </button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default CreateToken;