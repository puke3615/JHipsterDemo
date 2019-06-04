import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './comment.reducer';
import { IComment } from 'app/shared/model/comment.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICommentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Comment extends React.Component<ICommentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { commentList, match } = this.props;
    return (
      <div>
        <h2 id="comment-heading">
          <Translate contentKey="jHipsterDemoApp.comment.home.title">Comments</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jHipsterDemoApp.comment.home.createLabel">Create new Comment</Translate>
          </Link>
        </h2>
        <div className="table-responsive">
          <Table responsive>
            <thead>
              <tr>
                <th>
                  <Translate contentKey="global.field.id">ID</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.comment.created">Created</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.comment.updated">Updated</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.comment.deleted">Deleted</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.comment.depth">Depth</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.comment.text">Text</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.comment.user">User</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.comment.content">Content</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.comment.parent">Parent</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {commentList.map((comment, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${comment.id}`} color="link" size="sm">
                      {comment.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={comment.created} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={comment.updated} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{comment.deleted ? 'true' : 'false'}</td>
                  <td>{comment.depth}</td>
                  <td>{comment.text}</td>
                  <td>{comment.user ? comment.user.id : ''}</td>
                  <td>{comment.content ? <Link to={`content/${comment.content.id}`}>{comment.content.id}</Link> : ''}</td>
                  <td>{comment.parent ? <Link to={`comment/${comment.parent.id}`}>{comment.parent.id}</Link> : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${comment.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${comment.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${comment.id}/delete`} color="danger" size="sm">
                        <FontAwesomeIcon icon="trash" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.delete">Delete</Translate>
                        </span>
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ comment }: IRootState) => ({
  commentList: comment.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);
