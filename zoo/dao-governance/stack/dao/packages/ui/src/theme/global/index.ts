import inputStyles from './input';
import scrollStyles from './scroll';

export default {
  global: () => ({
    '*': {
      fontFamily: 'Inter, sans-serif !important',
    },
    body: {
      background: 'color-black',
      backgroundRepeat: 'no-repeat',
      fontFamily: 'Inter, sans-serif',
      textStyle: 'text-base-regular',
      color: 'color-white',
      height: '100%',
    },
    html: {
      background: 'color-black',
      backgroundAttachment: 'fixed',
      backgroundRepeat: 'no-repeat',
      scrollBehavior: 'smooth',
      height: '100%',
    },
    ...scrollStyles,
    ...inputStyles,
  }),
};
