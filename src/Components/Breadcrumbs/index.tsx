import React, { ReactNode } from 'react';

import { Breadcrumbs as MaterialBreadcrumbs } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const CustomBreadcrumbs: any = withStyles(() => ({
  root: {
    marginBottom: 15,
    '& a': {
      textTransform: 'uppercase',
      fontWeight: 700,
      color: '#ff00e0',
    },
  },
}))(MaterialBreadcrumbs);

interface BreadcrumbsProps {
  children: ReactNode;
}

const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ children }) => (
  <CustomBreadcrumbs separator="›" aria-label="breadcrumb">
    {children}
  </CustomBreadcrumbs>
);

export default Breadcrumbs;
