import {render, screen} from '@testing-library/react';
import React from 'react';

import RoleSelectControl from './roleSelectControl';
import type {BaseRole} from 'sentry/types/organization';

describe('RoleSelectControl', () => {
  const roles: BaseRole[] = [
    {id: 'member', name: 'Member', isAllowed: false, isRetired: false, desc: 'Member description'},
    {id: 'admin', name: 'Admin', isAllowed: true, isRetired: false, desc: 'Admin description'},
  ];

  it('should render the roles', () => {
    render(<RoleSelectControl roles={roles} disableUnallowed={false} value="member" />);
    expect(screen.getByText('Member')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();
  });

  it('should disable unallowed roles when disableUnallowed is true', () => {
    render(<RoleSelectControl roles={roles} disableUnallowed={true} value="member" />);
    expect(screen.getByText('Member')).toBeDisabled();
    expect(screen.getByText('Admin')).not.toBeDisabled();

  });

  it('should enable member role when isMemberInvite is true', () => {
      render(<RoleSelectControl roles={roles} disableUnallowed={true} value="member" isMemberInvite={true} />);
      expect(screen.getByText('Member')).not.toBeDisabled();
      expect(screen.getByText('Admin')).not.toBeDisabled();
  });


  it('should behave as before when isMemberInvite is false', () => {
    render(<RoleSelectControl roles={roles} disableUnallowed={true} value="member" isMemberInvite={false} />);
    expect(screen.getByText('Member')).toBeDisabled();
    expect(screen.getByText('Admin')).not.toBeDisabled();
  });

});
