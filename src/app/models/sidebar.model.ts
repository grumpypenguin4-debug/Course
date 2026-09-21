import { PagePermissions } from '../services/permissions.enum';

export interface SidebarItem {
  id: number;
  title: string;
  icon: string;
  route: string;
  permission: PagePermissions;
  canDisable?: boolean;
}
