import { useCallback } from 'react';
import { getAddress } from 'viem';
import { DAOModule, FractalModuleType } from '../../../types';
import { useAddressContractType } from '../../utils/useAddressContractType';

export const useDAOModules = () => {
  const { getAddressContractType } = useAddressContractType();
  const lookupModules = useCallback(
    async (_moduleAddresses: string[]) => {
      const modules = await Promise.all(
        _moduleAddresses.map(async moduleAddressString => {
          const moduleAddress = getAddress(moduleAddressString);

          const masterCopyData = await getAddressContractType(moduleAddress);

          let safeModule: DAOModule;

          if (masterCopyData.isModuleAzorius) {
            safeModule = {
              moduleAddress: moduleAddress,
              moduleType: FractalModuleType.AZORIUS,
            };
          } else if (masterCopyData.isModuleFractal) {
            safeModule = {
              moduleAddress: moduleAddress,
              moduleType: FractalModuleType.FRACTAL,
            };
          } else {
            safeModule = {
              moduleAddress: moduleAddress,
              moduleType: FractalModuleType.UNKNOWN,
            };
          }

          return safeModule;
        }),
      );
      return modules;
    },
    [getAddressContractType],
  );
  return lookupModules;
};
