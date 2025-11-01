import { useCallback, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Address, getAddress, isAddress } from 'viem';
import { normalize } from 'viem/ens';
import { AnyObject } from 'yup';
import { useNetworkConfigStore } from '../../../providers/NetworkConfig/useNetworkConfigStore';
import { useGlobalStore } from '../../../store/store';
import { AddressValidationMap, ERC721TokenConfig } from '../../../types';
import { validateENSName } from '../../../utils/url';
import { useCurrentDAOKey } from '../../DAO/useCurrentDAOKey';
import { useNetworkEnsAddressAsync } from '../../useNetworkEnsAddress';

export const useValidationAddress = () => {
  /**
   * addressValidationMap
   * @description holds ENS resolved addresses
   * @dev updated via the `addressValidation`
   * @dev this is used for any other functions contained within this hook, to lookup resolved addresses in this session without requesting again.
   */

  const addressValidationMap = useRef<AddressValidationMap>(new Map());

  const { t } = useTranslation(['daoCreate', 'common', 'modals']);
  const { daoKey } = useCurrentDAOKey();
  const { getDaoNode } = useGlobalStore();
  const { chain } = useNetworkConfigStore();

  const { getEnsAddress } = useNetworkEnsAddressAsync();
  const [isValidating, setIsValidating] = useState(false);

  const validateAddress = useCallback(
    async ({
      address,
      checkENS = true,
    }: {
      address: string;
      checkENS?: boolean;
    }): Promise<{
      validation: { address: string; isValidAddress: boolean };
      isValid: boolean;
    }> => {
      if (checkENS && !isAddress(address)) {
        const resolvedAddress = await getEnsAddress({ name: normalize(address) });
        if (resolvedAddress) {
          return {
            validation: {
              address: resolvedAddress,
              isValidAddress: true,
            },
            isValid: false,
          };
        } else {
          return {
            validation: {
              address: '',
              isValidAddress: false,
            },
            isValid: false,
          };
        }
      }
      const isValidAddress = isAddress(address);
      if (isValidAddress) {
        return {
          validation: {
            address,
            isValidAddress,
          },
          isValid: true,
        };
      } else {
        return {
          validation: {
            address: '',
            isValidAddress,
          },
          isValid: false,
        };
      }
    },
    [getEnsAddress],
  );

  const addressValidationTest = useMemo(() => {
    return {
      name: 'Address Validation',
      message: t('errorInvalidENSAddress', { ns: 'common', chain: chain.name }),
      test: async function (address: string | undefined) {
        if (!address) return false;
        setIsValidating(true);

        try {
          const { validation } = await validateAddress({ address });
          if (validation.isValidAddress) {
            addressValidationMap.current.set(address, validation);
          }
          setIsValidating(false);
          return validation.isValidAddress;
        } catch (error) {
          setIsValidating(false);
          return false;
        }
      },
    };
  }, [chain.name, t, validateAddress]);

  const ensNameValidationTest = useMemo(() => {
    return {
      name: 'ENS Validation',
      message: t('errorInvalidENSName', { ns: 'common' }),
      test: async function (ensName: string | undefined) {
        if (ensName === undefined) return true;
        const isValid = validateENSName(ensName);
        return isValid;
      },
    };
  }, [t]);

  const addressValidationTestSimple = useMemo(() => {
    return {
      name: 'Address Validation',
      message: t('errorInvalidAddress', { ns: 'common' }),
      test: async function (address: string | undefined) {
        if (!address) return false;
        setIsValidating(true);
        const { validation } = await validateAddress({
          address,
          checkENS: false,
        });
        if (validation.isValidAddress) {
          addressValidationMap.current.set(address, validation);
        }
        setIsValidating(false);
        return validation.isValidAddress;
      },
    };
  }, [validateAddress, addressValidationMap, t]);

  const newSignerValidationTest = useMemo(() => {
    return {
      name: 'New Signer Validation',
      message: t('alreadySigner', { ns: 'modals' }),
      test: async function (addressOrENS: string | undefined) {
        if (!addressOrENS || !daoKey) return false;
        const safe = getDaoNode(daoKey).safe;
        if (!safe) return false;
        let resolvedAddress: Address | null;

        if (validateENSName(addressOrENS)) {
          resolvedAddress = await getEnsAddress({
            name: normalize(addressOrENS),
          });

          if (!resolvedAddress) return false;
        } else {
          resolvedAddress = getAddress(addressOrENS);
        }

        return !safe.owners.includes(resolvedAddress);
      },
    };
  }, [daoKey, getDaoNode, getEnsAddress, t]);

  const testUniqueAddressArray = useCallback(
    async (value: string, addressArray: string[]) => {
      // looks up tested value
      let inputValidation = addressValidationMap.current.get(value);
      if (!!value && !inputValidation) {
        inputValidation = (await validateAddress({ address: value })).validation;
      }
      // converts all inputs to addresses to compare
      // uses addressValidationMap to save on requests
      const resolvedAddresses: string[] = await Promise.all(
        addressArray.map(async (address: string) => {
          // look up validated values
          const addressValidation = addressValidationMap.current.get(address);
          if (addressValidation && addressValidation.isValidAddress) {
            return addressValidation.address;
          }
          // because mapping is not 'state', this catches values that may not be resolved yet
          if (normalize(address)) {
            const { validation } = await validateAddress({ address });
            return validation.address;
          }
          return address;
        }),
      );

      const uniqueFilter = resolvedAddresses.filter(
        address => address === value || address === inputValidation?.address,
      );

      return uniqueFilter.length === 1;
    },
    [validateAddress],
  );

  const uniqueAddressValidationTest = useMemo(() => {
    return {
      name: 'Unique Addresses',
      message: t('errorDuplicateAddress'),
      test: async function (value: string | undefined, context: AnyObject) {
        if (!value) return false;
        // retreive parent array
        const parentAddressArray = context.parent;
        const isUnique = await testUniqueAddressArray(value, parentAddressArray);
        return isUnique;
      },
    };
  }, [t, testUniqueAddressArray]);

  const uniqueNFTAddressValidationTest = useMemo(() => {
    return {
      name: 'Unique Address',
      message: t('errorDuplicateAddress'),
      test: async function (value: string | undefined, context: AnyObject) {
        if (!value) return false;
        // retreive parent array
        const parentAddressArray = context.from[1].value.nfts.map(
          ({ tokenAddress }: ERC721TokenConfig) => tokenAddress,
        );
        const isUnique = await testUniqueAddressArray(value, parentAddressArray);
        return isUnique;
      },
    };
  }, [t, testUniqueAddressArray]);

  return {
    addressValidationTestSimple,
    addressValidationTest,
    ensNameValidationTest,
    newSignerValidationTest,
    uniqueAddressValidationTest,
    uniqueNFTAddressValidationTest,
    isValidating,
    validateAddress,
  };
};
