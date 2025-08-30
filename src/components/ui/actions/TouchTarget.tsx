import { Box } from "@mui/material";

export default function TouchTarget({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          width: "max(100%, 2.75rem)",
          height: "max(100%, 2.75rem)",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          "@media (pointer: fine)": {
            display: "none",
          },
        }}
        aria-hidden="true"
      />
      {children}
    </>
  );
}
