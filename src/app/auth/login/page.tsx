import { Suspense } from 'react';

import LoginForm from './components/LoginForm';

export default function LoginPage() {
  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br">
      <Suspense>
        <LoginForm />
      </Suspense>
    </div>
  );
}
