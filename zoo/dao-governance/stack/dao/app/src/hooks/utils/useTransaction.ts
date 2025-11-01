import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { toast } from 'sonner';
import { ContractFunctionExecutionError, Hash, TransactionReceipt } from 'viem';
import { logError } from '../../helpers/errorLogging';
import useNetworkPublicClient from '../useNetworkPublicClient';

interface ProviderRpcError extends Error {
  message: string;
  code: string | number;
  data?: any;
}

interface ContractCallParams {
  contractFn: () => Promise<Hash>;
  pendingMessage: string;
  failedMessage: string;
  successMessage: string;
  failedCallback?: () => void;
  successCallback?: (txReceipt: TransactionReceipt) => void;
  completedCallback?: () => void;
}

const useTransaction = () => {
  const [pending, setPending] = useState(false);
  const { t } = useTranslation(['transaction', 'common']);
  const publicClient = useNetworkPublicClient();

  const contractCall = useCallback(
    (params: ContractCallParams) => {
      let toastId = toast.loading(params.pendingMessage, {
        duration: Infinity,
      });
      setPending(true);
      params
        .contractFn()
        .then(txReceipt => publicClient.waitForTransactionReceipt({ hash: txReceipt }))
        .then(txReceipt => {
          if (txReceipt.status === 'reverted') {
            toast.error(params.failedMessage, { id: toastId });
            if (params.failedCallback) params.failedCallback();
          } else if (txReceipt.status === 'success') {
            toast.success(params.successMessage, { id: toastId });
            if (params.successCallback) params.successCallback(txReceipt);
          } else {
            toast.error(t('errorTransactionUnknown'), { id: toastId });
            if (params.failedCallback) params.failedCallback();
          }
          if (params.completedCallback) params.completedCallback();

          // Give the block event emitter a couple seconds to play the latest
          // block on the app state, before informing app that the transaction
          // is completed.
          setTimeout(() => {
            setPending(false);
          }, 2000);
        })
        .catch((error: any) => {
          setPending(false);

          // @dev we do not want to log user denied transaction
          if (
            // viem error
            (error as ContractFunctionExecutionError)?.shortMessage ===
              'User rejected the request.' ||
            // metamask code error
            (error as ProviderRpcError)?.code === 4001
          ) {
            toast.dismiss(toastId);
            toast.info(t('errorUserDeniedTransaction', { ns: 'transaction', id: toastId }));
            return;
          }
          logError(error);
          if (error.message === t('wrongNetwork', { ns: 'common' })) {
            toast.error(error.message, { id: toastId });
            return;
          }

          toast.error(t('errorGeneral', { ns: 'common' }), { id: toastId });
        });
    },
    [t, publicClient],
  );

  return [contractCall, pending] as const;
};

export { useTransaction };
