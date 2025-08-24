import BeatLoader from 'react-spinners/BeatLoader';
import { Suspense } from 'react';
import Verification from '@/components/auth/verification';

const VerificationPage = () => {
  return (
    <Suspense fallback={<BeatLoader color="#ffffff" />}>
      <Verification />
    </Suspense>
  );
};

export default VerificationPage;
