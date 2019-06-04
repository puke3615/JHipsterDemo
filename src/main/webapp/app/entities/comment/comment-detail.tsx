import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './comment.reducer';
import { IComment } from 'app/shared/model/comment.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommentDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CommentDetail extends React.Component<ICommentDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { commentEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jHipsterDemoApp.comment.detail.title">Comment</Translate> [<b>{commentEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="created">
                <Translate contentKey="jHipsterDemoApp.comment.created">Created</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={commentEntity.created} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updated">
                <Translate contentKey="jHipsterDemoApp.comment.updated">Updated</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={commentEntity.updated} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="deleted">
                <Translate contentKey="jHipsterDemoApp.comment.deleted">Deleted</Translate>
              </span>
            </dt>
            <dd>{commentEntity.deleted ? 'true' : 'false'}</dd>
            <dt>
              <span id="depth">
                <Translate contentKey="jHipsterDemoApp.comment.depth">Depth</Translate>
              </span>
            </dt>
            <dd>{commentEntity.depth}</dd>
            <dt>
              <span id="text">
                <Translate contentKey="jHipsterDemoApp.comment.text">Text</Translate>
              </span>
            </dt>
            <dd>{commentEntity.text}</dd>
            <dt>
              <Translate contentKey="jHipsterDemoApp.comment.user">User</Translate>
            </dt>
            <dd>{commentEntity.user ? commentEntity.user.id : ''}</dd>
            <dt>
              <Translate contentKey="jHipsterDemoApp.comment.content">Content</Translate>
            </dt>
            <dd>{commentEntity.content ? commentEntity.content.id : ''}</dd>
            <dt>
              <Translate contentKey="jHipsterDemoApp.comment.parent">Parent</Translate>
            </dt>
            <dd>{commentEntity.parent ? commentEntity.parent.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/comment" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/comment/${commentEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ comment }: IRootState) => ({
  commentEntity: comment.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CommentDetail);
