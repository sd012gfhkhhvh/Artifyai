import React from 'react';
import { ClerkProvider } from '@clerk/nextjs';

//theme
import { dark, neobrutalism, shadesOfPurple } from '@clerk/themes';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ClerkProvider
        appearance={{
          baseTheme: [neobrutalism],
          variables: { colorPrimary: 'blue' },
          signIn: {
            variables: { colorPrimary: 'red' },
          },
        }}
      >
        {children}
      </ClerkProvider>
    </div>
  );
};

export default Providers;
