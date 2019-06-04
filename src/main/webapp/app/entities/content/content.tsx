import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './content.reducer';
import { IContent } from 'app/shared/model/content.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IContentProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Content extends React.Component<IContentProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { contentList, match } = this.props;
    return (
      <div>
        <h2 id="content-heading">
          <Translate contentKey="jHipsterDemoApp.content.home.title">Contents</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jHipsterDemoApp.content.home.createLabel">Create new Content</Translate>
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
                  <Translate contentKey="jHipsterDemoApp.content.created">Created</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.content.updated">Updated</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.content.deleted">Deleted</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.content.media">Media</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.content.mediaInfo">Media Info</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.content.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {contentList.map((content, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${content.id}`} color="link" size="sm">
                      {content.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={content.created} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={content.updated} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{content.deleted ? 'true' : 'false'}</td>
                  <td>
                    <Translate contentKey={`jHipsterDemoApp.ContentType.${content.media}`} />
                  </td>
                  <td>{content.mediaInfo}</td>
                  <td>{content.user ? content.user.id : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${content.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${content.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${content.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ content }: IRootState) => ({
  contentList: content.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Content);
