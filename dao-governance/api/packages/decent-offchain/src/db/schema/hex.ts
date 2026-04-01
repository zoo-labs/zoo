import { customType } from 'drizzle-orm/pg-core';

export const hex = customType<{ data: `0x${string}` }>({
  dataType() {
    return 'text';
  },
  toDriver(hex) {
    return hex;
  },
  fromDriver(hex) {
    return hex as `0x${string}`;
  },
});
