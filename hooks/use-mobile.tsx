import * as React from "react";

const BREAKPOINTS = {
  mobile: 640,
  tablet: 1024,
  desktop: 1280,
} as const;

type DeviceType = "mobile" | "tablet" | "desktop";

export function useDeviceType() {
  const [deviceType, setDeviceType] = React.useState<DeviceType | undefined>(
    undefined
  );

  React.useEffect(() => {
    const getDeviceType = (): DeviceType => {
      const width = window.innerWidth;
      if (width < BREAKPOINTS.mobile) return "mobile";
      if (width < BREAKPOINTS.tablet) return "tablet";
      return "desktop";
    };

    const handleResize = () => {
      setDeviceType(getDeviceType());
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return deviceType;
}

export function useIsMobile() {
  const deviceType = useDeviceType();
  return deviceType === "mobile";
}

export function useIsTablet() {
  const deviceType = useDeviceType();
  return deviceType === "tablet";
}

export function useIsDesktop() {
  const deviceType = useDeviceType();
  return deviceType === "desktop";
}
