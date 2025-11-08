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
} from "@components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@components/ui/accordion";
import { ThemeToggle } from "@components/ThemeToggle";
import { Button } from "@components/ui/button";
import { Separator } from "@components/ui/separator";
import Brand from "@components/shared/Brand";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

const allToolsItems = [
  {
    title: "Introduction",
    href: "/",
    description: "Re-usable components built using Radix UI and Tailwind CSS.",
  },
  {
    title: "Installation",
    href: "/",
    description: "How to install dependencies and structure your app.",
  },
  {
    title: "Typography",
    href: "/",
    description: "Styles for headings, paragraphs, lists...etc",
  },
];

export function LandingNav() {
  const isMobile = useIsMobile();
  const [isOpen, setIsOpen] = React.useState(false);

  if (isMobile) {
    return (
      <header className="px-4 sm:px-6 py-4 border-b w-full flex items-center justify-between backdrop-blur-md bg-background/20 sticky top-0 z-50">
        <Link href="/" className="sidebar-logo">
          {/* <Image
            src="/assets/images/logo.png"
            alt="logo"
            width={100}
            height={28}
          /> */}
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
                  {/* <Image
                    src="/assets/images/logo.png"
                    alt="logo"
                    width={100}
                    height={28}
                  /> */}
                  <Brand />
                </Link>
              </SheetTitle>
            </SheetHeader>
            <Separator className="my-4" />
            <div className="flex flex-col justify-between h-[calc(100%-120px)]">
              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="all-tools">
                  <AccordionTrigger className="text-sm">
                    All Tools
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {allToolsItems.map((item) => (
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
                <AccordionItem value="components">
                  <AccordionTrigger className="text-sm">
                    Components
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {components.map((component) => (
                        <MobileLink
                          key={component.title}
                          href={component.href}
                          onOpenChange={setIsOpen}
                        >
                          {component.title}
                        </MobileLink>
                      ))}
                    </div>
                  </AccordionContent>
                </AccordionItem>
                <MobileLink
                  href="/pricing"
                  className="py-4 text-sm font-medium"
                  onOpenChange={setIsOpen}
                >
                  Pricing
                </MobileLink>
              </Accordion>

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
    <div className="md:px-6 lg:px-16 xl:px-12 2xl:px-32 py-4 border-b w-full flex items-center justify-between backdrop-blur-md bg-background/20 sticky top-0 z-50">
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
            <NavigationMenuTrigger>All Tools</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                <li className="row-span-3">
                  <NavigationMenuLink asChild>
                    <a
                      className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-t from-accent/20 to-accent p-6 no-underline outline-none"
                      href="/"
                    >
                      <div className="mb-2 mt-4 text-lg font-medium">
                        Artify AI
                      </div>
                      <p className="text-sm leading-tight text-muted-foreground">
                        All the AI tools you need in one place.
                      </p>
                    </a>
                  </NavigationMenuLink>
                </li>
                {allToolsItems.map((item) => (
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
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
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
