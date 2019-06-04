import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { getEntity, updateEntity, createEntity, reset } from './content.reducer';
import { IContent } from 'app/shared/model/content.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IContentUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IContentUpdateState {
  isNew: boolean;
  userId: string;
}

export class ContentUpdate extends React.Component<IContentUpdateProps, IContentUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
  }

  saveEntity = (event, errors, values) => {
    values.created = convertDateTimeToServer(values.created);
    values.updated = convertDateTimeToServer(values.updated);

    if (errors.length === 0) {
      const { contentEntity } = this.props;
      const entity = {
        ...contentEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/content');
  };

  render() {
    const { contentEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jHipsterDemoApp.content.home.createOrEditLabel">
              <Translate contentKey="jHipsterDemoApp.content.home.createOrEditLabel">Create or edit a Content</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : contentEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="content-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="content-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="createdLabel" for="content-created">
                    <Translate contentKey="jHipsterDemoApp.content.created">Created</Translate>
                  </Label>
                  <AvInput
                    id="content-created"
                    type="datetime-local"
                    className="form-control"
                    name="created"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.contentEntity.created)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedLabel" for="content-updated">
                    <Translate contentKey="jHipsterDemoApp.content.updated">Updated</Translate>
                  </Label>
                  <AvInput
                    id="content-updated"
                    type="datetime-local"
                    className="form-control"
                    name="updated"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.contentEntity.updated)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="deletedLabel" check>
                    <AvInput id="content-deleted" type="checkbox" className="form-control" name="deleted" />
                    <Translate contentKey="jHipsterDemoApp.content.deleted">Deleted</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="mediaLabel" for="content-media">
                    <Translate contentKey="jHipsterDemoApp.content.media">Media</Translate>
                  </Label>
                  <AvInput
                    id="content-media"
                    type="select"
                    className="form-control"
                    name="media"
                    value={(!isNew && contentEntity.media) || 'IMAGE'}
                  >
                    <option value="IMAGE">
                      <Translate contentKey="jHipsterDemoApp.ContentType.IMAGE" />
                    </option>
                    <option value="VIDEO">
                      <Translate contentKey="jHipsterDemoApp.ContentType.VIDEO" />
                    </option>
                    <option value="AUDIO">
                      <Translate contentKey="jHipsterDemoApp.ContentType.AUDIO" />
                    </option>
                    <option value="NONE">
                      <Translate contentKey="jHipsterDemoApp.ContentType.NONE" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="mediaInfoLabel" for="content-mediaInfo">
                    <Translate contentKey="jHipsterDemoApp.content.mediaInfo">Media Info</Translate>
                  </Label>
                  <AvField id="content-mediaInfo" type="text" name="mediaInfo" />
                </AvGroup>
                <AvGroup>
                  <Label for="content-user">
                    <Translate contentKey="jHipsterDemoApp.content.user">User</Translate>
                  </Label>
                  <AvInput id="content-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/content" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">
                    <Translate contentKey="entity.action.back">Back</Translate>
                  </span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp;
                  <Translate contentKey="entity.action.save">Save</Translate>
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  contentEntity: storeState.content.entity,
  loading: storeState.content.loading,
  updating: storeState.content.updating,
  updateSuccess: storeState.content.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContentUpdate);
