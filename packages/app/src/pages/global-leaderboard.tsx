import React from 'react';
import Image from 'next/image';

const GlobalLeaderboard = () => {
  const [isActive, setIsActive] = React.useState('nft-value');
  const dummyData = [
    {
      id: 1,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 2,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 3,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 4,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 5,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 6,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 7,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 8,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 9,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    },
    {
      id: 10,
      name: '@finessequeen ',
      address: '0xd8 … 3a8db'
    }
  ];
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        minHeight: '100vh',
        alignItems: 'center',
        marginTop: 50
      }}
    >
      <div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'flex-end',
            marginBottom: 22
          }}
        >
          <Image src="/img/Path.svg" alt="" width={20} height={20} />
        </div>
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(180deg, #3772FF 0%, #9757D7 100%)',
            padding: 2,
            borderRadius: 12,
            marginBottom: 20
          }}
        >
          <div
            style={{
              padding: '14px 20px',
              fontSize: 30,
              fontWeight: 500,
              background: '#000000',
              borderRadius: 12
            }}
          >
            ZOO NFT Leaderboard
          </div>
        </div>
        <div
          style={{
            position: 'relative',
            background: 'linear-gradient(180deg, #3772FF 0%, #9757D7 100%)',
            padding: 2,
            borderRadius: 12,
            marginBottom: 20
          }}
        >
          <div
            style={{
              borderRadius: 12,
              background: '#000',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              fontSize: 16,
              fontWeight: 500,
              // padding: '0 24px',
              height: 42
            }}
          >
            <span
              onClick={() => setIsActive('nft-value')}
              style={{
                background: isActive === 'nft-value' ? '#FF592C' : 'initial',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                borderRadius: 12,
                cursor: 'pointer'
              }}
            >
              NFT Value
            </span>
            <span
              onClick={() => setIsActive('top-zoo')}
              style={{
                background: isActive === 'top-zoo' ? '#FF592C' : 'initial',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                borderRadius: 12,
                cursor: 'pointer'
              }}
            >
              Top ZOO
            </span>
            <span
              onClick={() => setIsActive('global-user')}
              style={{
                background: isActive === 'global-user' ? '#FF592C' : 'initial',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                width: '100%',
                borderRadius: 12,
                cursor: 'pointer'
              }}
            >
              Global Users
            </span>
          </div>
        </div>
        {dummyData.map(({ id, name, address }) => (
          <div
            key={id}
            style={{
              position: 'relative',
              background: 'linear-gradient(180deg, #3772FF 0%, #9757D7 100%)',
              padding: 2,
              borderRadius: 12,
              marginBottom: 7
            }}
          >
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                background: '#000',
                borderRadius: 12,
                padding: '12px',
                fontWeight: 500,
                fontSize: 16
              }}
            >
              <span>{id}.</span>
              <span>{name}</span>
              <span>{address}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlobalLeaderboard;
