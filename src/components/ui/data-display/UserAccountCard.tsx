/**
 * @file src/components/ui/data-display/UserAccountCard.tsx
 * @description Reusable card component for displaying user account information.
 *
 * This component provides:
 * - Standardized layout for user account display
 * - Role-based icon and color theming
 * - Edit and delete action buttons
 * - Accessible and responsive design
 */

import { Card, CardContent, Box, Typography, Stack } from "@mui/material";
import { type ReactNode } from "react";

import { Button } from "@/components/ui/actions";
import { type User, type Role } from "@/db/models";

interface UserAccountCardProps {
  user: User;
  icon: ReactNode;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  editLabel: string;
  deleteLabel: string;
  getRoleDisplayName: (role: Role) => string;
  className?: string;
}

export default function UserAccountCard({
  user,
  icon,
  onEdit,
  onDelete,
  editLabel,
  deleteLabel,
  getRoleDisplayName,
}: UserAccountCardProps) {
  const getIconColor = (role: Role) => {
    return role === "caregiver" ? "primary.main" : "secondary.main";
  };

  return (
    <Card 
      sx={{ 
        p: 2,
        backgroundColor: (theme) => 
          theme.palette.mode === 'dark' ? 'grey.800' : 'grey.50'
      }}
    >
      <CardContent sx={{ p: 0, "&:last-child": { pb: 0 } }}>
        <Stack direction="row" spacing={2} alignItems="center" justifyContent="space-between">
          <Stack direction="row" spacing={2} alignItems="center">
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                backgroundColor: getIconColor(user.role),
                color: "white",
              }}
            >
              {icon}
            </Box>
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 500 }}>
                {user.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {user.email} • {getRoleDisplayName(user.role)}
              </Typography>
            </Box>
          </Stack>
          <Stack direction="row" spacing={1}>
            <Button
              outline
              onClick={() => onEdit(user)}
              className="text-sm px-3 py-1"
            >
              {editLabel}
            </Button>
            <Button
              color="red"
              onClick={() => onDelete(user)}
              className="text-sm px-3 py-1"
            >
              {deleteLabel}
            </Button>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
