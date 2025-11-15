"use client";

import * as React from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import Image from "next/image";

import { useIsMobile } from "@/hooks/use-mobile";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/ThemeToggle";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import Brand from "@/components/shared/Brand";

const aiTools: { title: string; href: string; description: string }[] = [
  {
    title: "Image Restore",
    href: "/transformations/add/restore",
    description: "Restore and enhance old or damaged photos with AI",
  },
  {
    title: "Background Remove",
    href: "/transformations/add/removeBackground",
    description: "Remove backgrounds from images instantly",
  },
  {
    title: "Object Remove",
    href: "/transformations/add/remove",
    description: "Erase unwanted objects from your photos",
  },
  {
    title: "Generative Fill",
    href: "/transformations/add/fill",
    description: "Fill and extend images with AI-generated content",
  },
  {
    title: "Object Recolor",
    href: "/transformations/add/recolor",
    description: "Change colors of specific objects in images",
  },
];

const solutionUseCases = [
  {
    title: "Photographers & Creators",
    href: "/solutions/photography",
    description: "Enhance portraits, landscapes, and studio shoots in seconds.",
  },
  {
    title: "E-commerce Teams",
    href: "/solutions/ecommerce",
    description: "Create consistent, on-brand product photos without a studio.",
  },
  {
    title: "Marketing & Agencies",
    href: "/solutions/marketing",
    description: "Produce polished campaign visuals and A/B test creative ideas.",
  },
  {
    title: "Developers & Platforms",
    href: "/solutions/platforms",
    description: "Embed Artify AI via API for end-to-end automation.",
  },
];

const resourcesItems = [
  {
    title: "Documentation",
    href: "/docs",
    description: "Learn how to use all features and tools",
  },
  {
    title: "API Access",
    href: "/api",
    description: "Integrate our AI tools into your applications",
  },
  {
    title: "Tutorials",
    href: "/tutorials",
    description: "Step-by-step guides and video tutorials",
  },
];

export function LandingNav() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);

  if (isMobile) {
    return (
      <header className="px-4 sm:px-6 py-4 border-b w-full flex items-center justify-between backdrop-blur-md bg-background/80 sticky top-0 z-50 shadow-sm">
        <Link href="/" className="sidebar-logo">
          <Brand />
        </Link>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-4 w-4" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-full sm:w-[320px]">
            <SheetHeader>
              <SheetTitle>
                <Link href="/" onClick={() => setIsOpen(false)}>
                  <Brand />
                </Link>
              </SheetTitle>
            </SheetHeader>
            <Separator className="my-4" />
            <div className="flex flex-col justify-between h-[calc(100%-120px)]">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="all-tools">
                  <AccordionTrigger className="text-sm">
                    AI Tools
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {aiTools.map((item) => (
                        <MobileLink
                          key={item.title}
                          href={item.href}
                          onOpenChange={setIsOpen}
                        >
                          {item.title}
                        </MobileLink>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="solutions">
                  <AccordionTrigger className="text-sm">
                    Solutions
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs uppercase text-muted-foreground mb-2">
                          Use cases
                        </p>
                        <div className="flex flex-col space-y-2">
                          {solutionUseCases.map((item) => (
                            <MobileLink
                              key={item.title}
                              href={item.href}
                              onOpenChange={setIsOpen}
                            >
                              {item.title}
                            </MobileLink>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs uppercase text-muted-foreground mb-2">
                          Resources
                        </p>
                        <div className="flex flex-col space-y-2">
                          {resourcesItems.map((item) => (
                            <MobileLink
                              key={item.title}
                              href={item.href}
                              onOpenChange={setIsOpen}
                            >
                              {item.title}
                            </MobileLink>
                          ))}
                        </div>
                      </div>
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </Accordion>

              <MobileLink
                href="/pricing"
                className="py-4 text-sm font-medium"
                onOpenChange={setIsOpen}
              >
                Pricing
              </MobileLink>

              <div className="flex flex-col space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Theme</span>
                  <ThemeToggle />
                </div>
                <Separator />
                <Button variant={"outline"} className="w-full" asChild>
                  <Link href="/sign-in">Sign In</Link>
                </Button>
                <Button variant="default" className="w-full" asChild>
                  <Link href="/sign-up">Sign Up</Link>
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </header>
    );
  }

  return (
    <div className="md:px-6 lg:px-16 xl:px-12 2xl:px-32 py-4 border-b w-full flex items-center justify-between backdrop-blur-md bg-background/80 sticky top-0 z-50 shadow-sm">
      <Link href="/" className="sidebar-logo">
        {/* <Image
          src="/assets/images/logo.png"
          alt="logo"
          width={100}
          height={28}
        /> */}
        <Brand />
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>AI Tools</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[420px] lg:w-[520px] lg:grid-cols-[.8fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-t from-accent/20 to-accent p-6 no-underline outline-none"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Artify AI Suite
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        Pick the exact transformation workflow you need.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                {aiTools.map((item) => (
                  <ListItem
                    key={item.title}
                    href={item.href}
                    title={item.title}
                  >
                    {item.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
            <NavigationMenuContent>
              <div className="grid gap-6 p-6 md:w-[520px] lg:w-[640px] lg:grid-cols-2">
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
                    Use cases
                  </p>
                  <ul className="space-y-3">
                    {solutionUseCases.map((item) => (
                      <ListItem
                        key={item.title}
                        href={item.href}
                        title={item.title}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-wide text-muted-foreground mb-3">
                    Resources
                  </p>
                  <ul className="space-y-3">
                    {resourcesItems.map((item) => (
                      <ListItem
                        key={item.title}
                        href={item.href}
                        title={item.title}
                      >
                        {item.description}
                      </ListItem>
                    ))}
                  </ul>
                </div>
              </div>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/pricing" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                Pricing
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>

      <div className="flex items-center space-x-2">
        <ThemeToggle />
        <Button variant={"outline"} asChild>
          <Link href="/sign-in">Sign In</Link>
        </Button>
        <Button variant="default" asChild>
          <Link href="/sign-up">Sign Up</Link>
        </Button>
      </div>
    </div>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
          }
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

interface MobileLinkProps extends React.PropsWithChildren {
  href: string;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

function MobileLink({
  href,
  onOpenChange,
  className,
  children,
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      onClick={() => onOpenChange?.(false)}
      className={className}
    >
      {children}
    </Link>
  );
}
