import React from "react";
import { ClerkProvider } from "@clerk/nextjs";

//theme
import { dark, neobrutalism, shadesOfPurple } from "@clerk/themes";
import { ThemeProvider } from "@/components/theme-prover";

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <ClerkProvider
          appearance={{
            baseTheme: [neobrutalism],
            variables: { colorPrimary: "blue" },
            signIn: {
              variables: { colorPrimary: "red" },
            },
          }}
        >
          {children}
        </ClerkProvider>
      </ThemeProvider>
    </div>
  );
};

export default Providers;
