import React from 'react';

import Radio, { RadioProps } from '@material-ui/core/Radio';

import styles from './styles.module.scss';
/* eslint-disable react/jsx-props-no-spreading */

const StyledRadio: React.FC<RadioProps> = (props: RadioProps) => (
  <Radio
    disableRipple
    color="default"
    checkedIcon={<span className={styles.checkedIcon} />}
    icon={<span className={styles.icon} />}
    {...props}
  />
);

export default StyledRadio;
