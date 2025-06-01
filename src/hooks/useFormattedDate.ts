import { useMemo } from 'react';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

type Mode = 'relative' | 'absolute' | 'raw';

export function useFormattedDate(isoDate?: string, mode: Mode = 'relative'): string {
  return useMemo(() => {
    if (!isoDate) return '';
    const date = dayjs(isoDate);

    switch (mode) {
      case 'relative':
        return date.fromNow();
      case 'absolute':
        return date.format('YYYY-MM-DD HH:mm');
      case 'raw':
      default:
        return date.toString();
    }
  }, [isoDate, mode]);
}
