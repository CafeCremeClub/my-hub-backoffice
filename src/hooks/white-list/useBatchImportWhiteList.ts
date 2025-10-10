import { useMutation } from '@tanstack/react-query';
import { batchImportWhiteList } from '@/services/whiteListService';

const useBatchImportWhiteList = () => {
  return useMutation({
    mutationKey: ['batch-import-white-list'],
    mutationFn: async (emails: string[]) => await batchImportWhiteList(emails),
    retry: 0,
  });
};

export default useBatchImportWhiteList;
