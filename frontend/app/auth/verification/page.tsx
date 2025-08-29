import Verification from '@/components/auth/verification';
import BeatLoader from 'react-spinners/BeatLoader';
import { Suspense } from 'react';

const VerificationPage = () => {
  return (
    <Suspense fallback={<BeatLoader color="#ffffff" />}>
      <Verification />
    </Suspense>
  );
};

export default VerificationPage;
