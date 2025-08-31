import { Box } from "@mui/material";

import Brand from "@/components/partials/global/Brand";

import Sidebar from "./sidebar/Sidebar";
import SidebarHeader from "./sidebar/SidebarHeader";
import SidebarSection from "./sidebar/SidebarSection";

export default function NavBar() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Brand />
      </SidebarHeader>
      <Box
        sx={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          padding: 2,
          "& > [data-slot=section] + [data-slot=section]": {
            marginTop: 4
          }
        }}
      >
        <SidebarSection>
          <div>Sidebar content</div>
        </SidebarSection>
      </Box>
    </Sidebar>
  );
}
