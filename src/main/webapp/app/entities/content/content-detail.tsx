import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './content.reducer';
import { IContent } from 'app/shared/model/content.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ContentDetail extends React.Component<IContentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { contentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jHipsterDemoApp.content.detail.title">Content</Translate> [<b>{contentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="created">
                <Translate contentKey="jHipsterDemoApp.content.created">Created</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={contentEntity.created} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updated">
                <Translate contentKey="jHipsterDemoApp.content.updated">Updated</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={contentEntity.updated} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="deleted">
                <Translate contentKey="jHipsterDemoApp.content.deleted">Deleted</Translate>
              </span>
            </dt>
            <dd>{contentEntity.deleted ? 'true' : 'false'}</dd>
            <dt>
              <span id="media">
                <Translate contentKey="jHipsterDemoApp.content.media">Media</Translate>
              </span>
            </dt>
            <dd>{contentEntity.media}</dd>
            <dt>
              <span id="mediaInfo">
                <Translate contentKey="jHipsterDemoApp.content.mediaInfo">Media Info</Translate>
              </span>
            </dt>
            <dd>{contentEntity.mediaInfo}</dd>
            <dt>
              <Translate contentKey="jHipsterDemoApp.content.user">User</Translate>
            </dt>
            <dd>{contentEntity.user ? contentEntity.user.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/content" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/content/${contentEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.edit">Edit</Translate>
            </span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ content }: IRootState) => ({
  contentEntity: content.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentDetail);
