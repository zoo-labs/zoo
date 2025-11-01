import * as amplitude from '@amplitude/analytics-browser';
import { Center } from '@chakra-ui/react';
import { FormikErrors } from 'formik';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { ProposalBuilder } from '../../../../components/ProposalBuilder/ProposalBuilder';
import {
  TemplateDetails,
  TransactionsDetails,
} from '../../../../components/ProposalBuilder/ProposalDetails';
import { TEMPLATE_PROPOSAL_METADATA_TYPE_PROPS } from '../../../../components/ProposalBuilder/ProposalMetadata';
import ProposalTransactionsForm from '../../../../components/ProposalBuilder/ProposalTransactionsForm';
import { GoToTransactionsStepButton } from '../../../../components/ProposalBuilder/StepButtons';
import { DEFAULT_PROPOSAL } from '../../../../components/ProposalBuilder/constants';
import { BarLoader } from '../../../../components/ui/loaders/BarLoader';
import { useHeaderHeight } from '../../../../constants/common';
import { DAO_ROUTES } from '../../../../constants/routes';
import { logError } from '../../../../helpers/errorLogging';
import useCreateProposalTemplate from '../../../../hooks/DAO/proposal/useCreateProposalTemplate';
import { useCurrentDAOKey } from '../../../../hooks/DAO/useCurrentDAOKey';
import { analyticsEvents } from '../../../../insights/analyticsEvents';
import { useDAOStore } from '../../../../providers/App/AppProvider';
import useIPFSClient from '../../../../providers/App/hooks/useIPFSClient';
import { useNetworkConfigStore } from '../../../../providers/NetworkConfig/useNetworkConfigStore';
import { useProposalActionsStore } from '../../../../store/actions/useProposalActionsStore';
import { BigIntValuePair } from '../../../../types';
import {
  CreateProposalSteps,
  CreateProposalTransaction,
  ProposalTemplate,
} from '../../../../types/proposalBuilder';

export function SafeCreateProposalTemplatePage() {
  useEffect(() => {
    amplitude.track(analyticsEvents.CreateProposalTemplatePageOpened);
  }, []);

  const ipfsClient = useIPFSClient();
  const { proposalMetadata } = useProposalActionsStore();
  const [initialProposalTemplate, setInitialProposalTemplate] = useState(DEFAULT_PROPOSAL);
  const { prepareProposalTemplateProposal } = useCreateProposalTemplate();
  const [searchParams] = useSearchParams();
  const defaultProposalTemplatesHash = useMemo(
    () => searchParams?.get('templatesHash'),
    [searchParams],
  );
  const defaultProposalTemplateIndex = useMemo(
    () => searchParams?.get('templateIndex'),
    [searchParams],
  );
  const { daoKey } = useCurrentDAOKey();
  const {
    node: { safe },
  } = useDAOStore({ daoKey });
  const { addressPrefix } = useNetworkConfigStore();

  useEffect(() => {
    const loadInitialTemplate = async () => {
      if (defaultProposalTemplatesHash && defaultProposalTemplateIndex) {
        try {
          const proposalTemplates = await ipfsClient.cat(defaultProposalTemplatesHash);
          const initialTemplate: ProposalTemplate = proposalTemplates[defaultProposalTemplateIndex];
          if (initialTemplate) {
            const newInitialValue = {
              ...DEFAULT_PROPOSAL,
              proposalMetadata: {
                ...DEFAULT_PROPOSAL.proposalMetadata,
                title: initialTemplate.title,
                description: initialTemplate.description || '',
              },
              transactions: initialTemplate.transactions.map(tx => ({
                ...tx,
                ethValue: {
                  value: tx.ethValue.value,
                  bigintValue:
                    tx.ethValue.bigintValue !== undefined
                      ? BigInt(tx.ethValue.bigintValue)
                      : undefined,
                },
              })),
            };
            setInitialProposalTemplate(newInitialValue);
          }
        } catch (e) {
          logError('Error while fetching initial template values', e);
        }
      }
    };
    loadInitialTemplate();
  }, [defaultProposalTemplatesHash, defaultProposalTemplateIndex, ipfsClient]);

  const HEADER_HEIGHT = useHeaderHeight();
  const { t } = useTranslation('proposalTemplate');
  const navigate = useNavigate();

  if (!safe || !safe?.address) {
    return (
      <Center minH={`calc(100vh - ${HEADER_HEIGHT})`}>
        <BarLoader />
      </Center>
    );
  }

  const pageHeaderBreadcrumbs = [
    {
      terminus: t('proposalTemplates', { ns: 'breadcrumbs' }),
      path: DAO_ROUTES.proposalTemplates.relative(addressPrefix, safe.address),
    },
    {
      terminus: t('proposalTemplateNew', { ns: 'breadcrumbs' }),
      path: '',
    },
  ];

  const pageHeaderButtonClickHandler = () => {
    navigate(DAO_ROUTES.proposalTemplates.relative(addressPrefix, safe.address));
  };

  const stepButtons = ({
    formErrors,
    onStepChange,
  }: {
    formErrors: boolean;
    createProposalBlocked: boolean;
    onStepChange: (step: CreateProposalSteps) => void;
  }) => (
    <GoToTransactionsStepButton
      isDisabled={formErrors}
      onStepChange={onStepChange}
    />
  );

  return (
    <ProposalBuilder
      pageHeaderTitle={t('createProposalTemplate', { ns: 'proposalTemplate' })}
      pageHeaderBreadcrumbs={pageHeaderBreadcrumbs}
      pageHeaderButtonClickHandler={pageHeaderButtonClickHandler}
      proposalMetadataTypeProps={TEMPLATE_PROPOSAL_METADATA_TYPE_PROPS(t)}
      stepButtons={stepButtons}
      transactionsDetails={transactions => <TransactionsDetails transactions={transactions} />}
      templateDetails={title => <TemplateDetails title={title} />}
      streamsDetails={null}
      key={initialProposalTemplate.proposalMetadata.title}
      initialValues={{
        ...initialProposalTemplate,
        proposalMetadata: {
          ...initialProposalTemplate.proposalMetadata,
          ...(proposalMetadata && { ...proposalMetadata }),
          nonce: safe.nextNonce,
        },
      }}
      prepareProposalData={prepareProposalTemplateProposal}
      mainContent={(formikProps, pendingCreateTx, _nonce, currentStep) => {
        if (currentStep !== CreateProposalSteps.TRANSACTIONS) return null;
        const { setFieldValue, errors, values } = formikProps;
        return (
          <ProposalTransactionsForm
            pendingTransaction={pendingCreateTx}
            isProposalMode={true}
            values={values.transactions}
            setFieldValue={setFieldValue as any}
            errors={
              errors?.transactions as FormikErrors<CreateProposalTransaction<BigIntValuePair>>[]
            }
          />
        );
      }}
    />
  );
}
