import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Returns a function that accepts a Request object and returns whether the request matches 
// the list of predefined routes that can be passed in as the first argument.
const isProtectedRoute = createRouteMatcher([
  '/profile(.*)',
  '/credits(.*)',
  '/transformations(.*)',
]);

export default clerkMiddleware((auth, req) => {
  if (!auth().userId && isProtectedRoute(req)) {
    // Add custom logic to run before redirecting
    console.log('Redirecting to signin page');

    return auth().redirectToSignIn();
  }
});

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
