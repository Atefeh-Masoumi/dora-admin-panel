import { FC, useEffect, useRef, useState } from "react";
import { Container, Stack, SwipeableDrawer } from "@mui/material";
import { Box } from "@mui/material";
import Header from "src/components/organisms/layout/header/Header";
import { Sidebar } from "src/components/organisms/layout/sidebar/SidebarMenu";

export const sidebarWidth = 280;

export type MainTemplatePropsType = {
  children?: any;
  pageTitle?: string;
  link?: { text: string; url: string };
  RightComponent?: FC;
  hideSidebar?: boolean;
};

export const MainTemplate: FC<MainTemplatePropsType> = ({
  children,
  pageTitle,
  link,
  RightComponent,
  hideSidebar = false,
}) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (!containerRef?.current) {
      return;
    }
    const container = containerRef.current;

    const scrollListener = (event: Event) => {
      if (container.scrollTop > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    container.addEventListener("wheel", scrollListener);
    return () => {
      container.removeEventListener("wheel", scrollListener);
    };
  }, []);

  return (
    <Stack
      direction="row"
      sx={{
        pt: { xs: 1, lg: 2 },
        px: 2,
        bgcolor: "#F5F5F5",
        height: "100vh",
        width: "100vw",
        ...(hideSidebar && { display: "block" }),
      }}
    >
      {!hideSidebar && (
        <>
          <Box
            sx={{
              minWidth: sidebarWidth,
              display: { xs: "none", lg: "block" },
            }}
          >
            <Sidebar />
          </Box>
          <SwipeableDrawer
            dir="rtl"
            anchor="left"
            open={showSidebar}
            onClose={() => setShowSidebar(false)}
            onOpen={() => setShowSidebar(true)}
            PaperProps={{ sx: { width: sidebarWidth, overflow: "overlay" } }}
            sx={{ display: { xs: "block", lg: "none" } }}
          >
            <Sidebar />
          </SwipeableDrawer>
        </>
      )}
      <Box
        sx={{
          ...(!hideSidebar && {
            width: { xs: "100%", lg: `calc(100vw - ${sidebarWidth + 32}px)` },
            maxWidth: {
              xs: "100%",
              lg: `calc(100vw - ${sidebarWidth + 32}px)`,
            },
          }),
          height: "100%",
          pl: { xs: 0, lg: 6.5 },
          pr: { xs: 0, lg: 4.5 },
          overflowX: "scroll",
        }}
      >
        <Box
          sx={{
            height: "100%",
            overflowY: "hidden",
            overflowX: "visible",
            maxHeight: "100vh",
            position: "relative",
          }}
        >
          <Header
            setShowSidebar={setShowSidebar}
            title={pageTitle}
            link={link}
            isScrolled={isScrolled}
            RightComponent={RightComponent}
          />
          <Container
            ref={containerRef}
            sx={{
              height: "100%",
              overflow: "overlay",
              overflowY: "scroll",
              overflowX: "hidden",
              msOverflowStyle: "none",
              mt: 4,
              py: 8,
              px: "0 !important",
            }}
            maxWidth="xl"
          >
            {children}
          </Container>
        </Box>
      </Box>
    </Stack>
  );
};
