import React from 'react';

import { Typography } from '@material-ui/core';
import Popover from '@material-ui/core/Popover';

import styles from './styles.module.scss';

const StyledPopover = ({ className, text, popoverContent }: any) => {
  const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

  const handlePopoverOpen = (
    event: React.MouseEvent<HTMLElement, MouseEvent>,
  ) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Typography
        className={className}
        aria-owns={open ? 'mouse-over-popover' : undefined}
        aria-haspopup="true"
        onMouseEnter={handlePopoverOpen}
        onMouseLeave={handlePopoverClose}
      >
        {text}
      </Typography>
      <Popover
        id="mouse-over-popover"
        className={styles.popover}
        classes={{
          paper: styles.paper,
        }}
        open={open}
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        onClose={handlePopoverClose}
        disableRestoreFocus
      >
        {popoverContent}
      </Popover>
    </>
  );
};

export default StyledPopover;
