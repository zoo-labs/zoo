import { AbsoluteCenter, Button, Text, VStack } from '@chakra-ui/react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { LuxTriangle } from '../assets/theme/custom/icons/LuxTriangle';
import { BASE_ROUTES } from '../constants/routes';

export default function FourOhFourPage() {
  const { t } = useTranslation('common');
  const navigate = useNavigate();
  const home = () => {
    navigate(BASE_ROUTES.landing);
  };
  return (
    <AbsoluteCenter>
      <VStack>
        <LuxTriangle boxSize="5rem" color="white" />
        <Text
          paddingTop="3.25rem"
          data-testid="404-pageCode"
          textStyle="display-3xl"
          color="color-neutral-400"
        >
          404
        </Text>
        <Text
          data-testid="404-pageTitle"
          color="color-neutral-300"
          marginTop="0.5rem"
          paddingBottom="3.25rem"
        >
          {t('404Title')}
        </Text>
        <Button
          onClick={home}
          data-testid={'404-linkHome'}
        >
          {t('404Button')}
        </Button>
      </VStack>
    </AbsoluteCenter>
  );
}
