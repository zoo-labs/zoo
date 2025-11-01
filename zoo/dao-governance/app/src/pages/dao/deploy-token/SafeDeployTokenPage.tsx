import { Box, Button, Flex, Text } from '@chakra-ui/react';
import { ArrowLeft } from '@phosphor-icons/react';
import { Formik } from 'formik';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { initialState } from '../../../components/DaoCreator/constants';
import { AzoriusTokenDetails } from '../../../components/DaoCreator/formComponents/AzoriusTokenDetails';
import { DAOCreateMode } from '../../../components/DaoCreator/formComponents/EstablishEssentials';
import { usePrepareFormData } from '../../../components/DaoCreator/hooks/usePrepareFormData';
import PageHeader from '../../../components/ui/page/Header/PageHeader';
import { BASE_ROUTES, DAO_ROUTES } from '../../../constants/routes';
import { useCurrentDAOKey } from '../../../hooks/DAO/useCurrentDAOKey';
import useDeployTokenTx from '../../../hooks/DAO/useDeployTokenTx';
import { useERC20TokenSchema } from '../../../hooks/schemas/DAOCreate/useERC20TokenSchema';
import { useCanUserCreateProposal } from '../../../hooks/utils/useCanUserSubmitProposal';
import { useDAOStore } from '../../../providers/App/AppProvider';
import { useNetworkConfigStore } from '../../../providers/NetworkConfig/useNetworkConfigStore';
import { useProposalActionsStore } from '../../../store/actions/useProposalActionsStore';
import {
  CreatorFormState,
  CreatorSteps,
  GovernanceType,
  ICreationStepProps,
  ProposalActionType,
  TokenCreationType,
} from '../../../types';

export function SafeDeployTokenPage() {
  const { t } = useTranslation();
  const { erc20TokenValidation } = useERC20TokenSchema();
  const { deployToken } = useDeployTokenTx();
  const { prepareAzoriusERC20FormData } = usePrepareFormData();
  const { addAction, resetActions } = useProposalActionsStore();
  const navigate = useNavigate();
  const { addressPrefix } = useNetworkConfigStore();
  const { daoKey } = useCurrentDAOKey();
  const { canUserCreateProposal } = useCanUserCreateProposal();

  const {
    node: { safe },
  } = useDAOStore({ daoKey });
  const safeAddress = safe?.address;

  const pageHeaderBreadcrumbs = [
    {
      terminus: t('deployToken', { ns: 'breadcrumbs' }),
      path: '',
    },
  ];

  return (
    <Formik<Pick<CreatorFormState, 'essentials' | 'erc20Token'>>
      initialValues={{
        erc20Token: initialState.erc20Token,
        essentials: {
          //@todo refactor ticket: https://linear.app/hanzoai/issue/ENG-1147/untangle-the-typing-for-the-separate-form
          daoName: 'to_pass_useStepRedirect_check',
          governance: GovernanceType.AZORIUS_ERC20,
          snapshotENS: '',
        },
      }}
      validationSchema={erc20TokenValidation}
      onSubmit={async values => {
        // set maxTotalSupply to be same as tokenSupply
        //   this can be modified by the user later on settings
        const modifiedValues = {
          ...values.erc20Token,
          maxTotalSupply: values.erc20Token.tokenSupply,
        };
        const daoData = await prepareAzoriusERC20FormData({
          ...initialState.essentials,
          ...initialState.azorius,
          ...modifiedValues,
          freezeGuard: undefined,
        });

        if (daoData) {
          const transactions = await deployToken(daoData);
          let title = t('updateERC20Address', { ns: 'proposalMetadata' });
          if (values.erc20Token.tokenCreationType === TokenCreationType.NEW) {
            title = t('deployToken', { ns: 'proposalMetadata' }) + ', ' + title;
          }

          if (transactions) {
            if (!safeAddress) {
              throw new Error('Safe address is not set');
            }
            resetActions();
            addAction({
              actionType: ProposalActionType.EDIT,
              transactions,
              content: <Text>{title}</Text>,
            });
            navigate(DAO_ROUTES.proposalWithActionsNew.relative(addressPrefix, safeAddress));
          }
        }
      }}
      enableReinitialize
      validateOnMount
    >
      {({ handleSubmit, isSubmitting, ...rest }) => (
        <Box mt="2rem">
          <PageHeader
            title={t('tokenPageDeployTokenButton', { ns: 'settings' })}
            breadcrumbs={pageHeaderBreadcrumbs}
            ButtonIcon={ArrowLeft}
            buttonProps={{
              isDisabled: isSubmitting,
              variant: 'secondary',
              onClick: () =>
                navigate(
                  !safeAddress
                    ? BASE_ROUTES.landing
                    : DAO_ROUTES.dao.relative(addressPrefix, safeAddress),
                ),
            }}
          />
          <form onSubmit={handleSubmit}>
            <AzoriusTokenDetails
              steps={[CreatorSteps.ERC20_DETAILS]}
              mode={DAOCreateMode.EDIT}
              withSteps={false}
              {...(rest as any as Omit<ICreationStepProps, 'steps' | 'mode'>)}
            />

            <Flex
              alignItems="center"
              justifyContent="flex-end"
              width="100%"
              mt="1.5rem"
              gap="0.75rem"
            >
              <Button
                type="submit"
                isDisabled={isSubmitting || !canUserCreateProposal}
              >
                {t('createProposal', { ns: 'proposal' })}
              </Button>
            </Flex>
          </form>
        </Box>
      )}
    </Formik>
  );
}
