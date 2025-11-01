import { Button, Flex, Icon, Text } from '@chakra-ui/react';
import { ArrowsDownUp, Trash } from '@phosphor-icons/react';
import { useTranslation } from 'react-i18next';
import { formatUnits } from 'viem';
import { useGetAccountName } from '../../../hooks/utils/useGetAccountName';
import { SendAssetsData } from '../../../utils/dao/prepareSendAssetsActionData';
import { Card } from './Card';

export function SendAssetsActionCard({
  action,
  onRemove,
}: {
  action: SendAssetsData;
  onRemove: () => void;
}) {
  const { t } = useTranslation('common');
  const { displayName } = useGetAccountName(action.recipientAddress);
  return (
    <Card my="0.5rem">
      <Flex justifyContent="space-between">
        <Flex
          alignItems="center"
          gap="0.5rem"
        >
          <Icon
            as={ArrowsDownUp}
            w="1.5rem"
            h="1.5rem"
            color="color-lilac-100"
          />
          <Text>{t('transfer')}</Text>
          <Text color="color-lilac-100">
            {formatUnits(action.transferAmount, action.asset.decimals)} {action.asset.symbol}
          </Text>
          <Text>{t('to').toLowerCase()}</Text>
          <Text color="color-lilac-100">{displayName}</Text>
        </Flex>
        <Button
          color="color-error-500"
          variant="tertiary"
          size="sm"
          onClick={onRemove}
        >
          <Icon as={Trash} />
        </Button>
      </Flex>
    </Card>
  );
}
