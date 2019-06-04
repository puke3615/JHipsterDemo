import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Comment from './comment';
import Content from './content';
import Pet from './pet';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/comment`} component={Comment} />
      <ErrorBoundaryRoute path={`${match.url}/content`} component={Content} />
      <ErrorBoundaryRoute path={`${match.url}/pet`} component={Pet} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
