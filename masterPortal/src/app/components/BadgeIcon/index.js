import React from 'react';
import Badge from '@material-ui/core/Badge';
import { withStyles } from '@material-ui/core/styles';
import Icon from '@mdi/react';
import { mdiCarTireAlert, mdiAccountGroup } from '@mdi/js/mdi';

const styles = theme => ({
  badge: {
    top: '50%',
    right: -3,
    border: `2px solid ${
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]
      }`,
  },
});

function CustomizedBadge(props) {
  const { classes, content, style } = props;
  return (
    <Badge 
        badgeContent={content ? content : 0} 
        className="Badge_icon_width opcToolTip_outer" 
        showZero={true} 
        max={10000000}
        min={0} classes={{ badge: classes.badge }} style={{color: 'white'}}>
      <Icon path={mdiAccountGroup} size={1.2} color="salmon" />
    </Badge>
  );
}

export default withStyles(styles)(CustomizedBadge);