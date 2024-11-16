import { useEffect } from 'react';

const BASE_TITLE = 'Task Manager';

const useDocumentTitle = (pageTitle?: string) => {
  useEffect(() => {
    document.title = pageTitle ? `${BASE_TITLE} - ${pageTitle}` : BASE_TITLE;
  }, [pageTitle]);
};

export default useDocumentTitle;