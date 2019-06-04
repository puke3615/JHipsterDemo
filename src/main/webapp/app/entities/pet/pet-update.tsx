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
import { getEntity, updateEntity, createEntity, reset } from './pet.reducer';
import { IPet } from 'app/shared/model/pet.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IPetUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IPetUpdateState {
  isNew: boolean;
  userId: string;
}

export class PetUpdate extends React.Component<IPetUpdateProps, IPetUpdateState> {
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
      const { petEntity } = this.props;
      const entity = {
        ...petEntity,
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
    this.props.history.push('/entity/pet');
  };

  render() {
    const { petEntity, users, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jHipsterDemoApp.pet.home.createOrEditLabel">
              <Translate contentKey="jHipsterDemoApp.pet.home.createOrEditLabel">Create or edit a Pet</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : petEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="pet-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="pet-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="createdLabel" for="pet-created">
                    <Translate contentKey="jHipsterDemoApp.pet.created">Created</Translate>
                  </Label>
                  <AvInput
                    id="pet-created"
                    type="datetime-local"
                    className="form-control"
                    name="created"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.petEntity.created)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedLabel" for="pet-updated">
                    <Translate contentKey="jHipsterDemoApp.pet.updated">Updated</Translate>
                  </Label>
                  <AvInput
                    id="pet-updated"
                    type="datetime-local"
                    className="form-control"
                    name="updated"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.petEntity.updated)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="deletedLabel" check>
                    <AvInput id="pet-deleted" type="checkbox" className="form-control" name="deleted" />
                    <Translate contentKey="jHipsterDemoApp.pet.deleted">Deleted</Translate>
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label id="petTypeLabel" for="pet-petType">
                    <Translate contentKey="jHipsterDemoApp.pet.petType">Pet Type</Translate>
                  </Label>
                  <AvInput
                    id="pet-petType"
                    type="select"
                    className="form-control"
                    name="petType"
                    value={(!isNew && petEntity.petType) || 'JINMAO'}
                  >
                    <option value="JINMAO">
                      <Translate contentKey="jHipsterDemoApp.PetType.JINMAO" />
                    </option>
                    <option value="HASHIQI">
                      <Translate contentKey="jHipsterDemoApp.PetType.HASHIQI" />
                    </option>
                    <option value="SHAMOYE">
                      <Translate contentKey="jHipsterDemoApp.PetType.SHAMOYE" />
                    </option>
                    <option value="KEJI">
                      <Translate contentKey="jHipsterDemoApp.PetType.KEJI" />
                    </option>
                    <option value="ALASIJIA">
                      <Translate contentKey="jHipsterDemoApp.PetType.ALASIJIA" />
                    </option>
                    <option value="BIANMU">
                      <Translate contentKey="jHipsterDemoApp.PetType.BIANMU" />
                    </option>
                    <option value="TIANYUAN">
                      <Translate contentKey="jHipsterDemoApp.PetType.TIANYUAN" />
                    </option>
                    <option value="BOMEI">
                      <Translate contentKey="jHipsterDemoApp.PetType.BOMEI" />
                    </option>
                    <option value="TAIDI">
                      <Translate contentKey="jHipsterDemoApp.PetType.TAIDI" />
                    </option>
                    <option value="DEMU">
                      <Translate contentKey="jHipsterDemoApp.PetType.DEMU" />
                    </option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="nickLabel" for="pet-nick">
                    <Translate contentKey="jHipsterDemoApp.pet.nick">Nick</Translate>
                  </Label>
                  <AvField
                    id="pet-nick"
                    type="text"
                    name="nick"
                    validate={{
                      required: { value: true, errorMessage: translate('entity.validation.required') }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="birthdayLabel" for="pet-birthday">
                    <Translate contentKey="jHipsterDemoApp.pet.birthday">Birthday</Translate>
                  </Label>
                  <AvField id="pet-birthday" type="text" name="birthday" />
                </AvGroup>
                <AvGroup>
                  <Label id="ageLabel" for="pet-age">
                    <Translate contentKey="jHipsterDemoApp.pet.age">Age</Translate>
                  </Label>
                  <AvField id="pet-age" type="string" className="form-control" name="age" />
                </AvGroup>
                <AvGroup>
                  <Label id="avatarLabel" for="pet-avatar">
                    <Translate contentKey="jHipsterDemoApp.pet.avatar">Avatar</Translate>
                  </Label>
                  <AvField id="pet-avatar" type="text" name="avatar" />
                </AvGroup>
                <AvGroup>
                  <Label id="backgroundLabel" for="pet-background">
                    <Translate contentKey="jHipsterDemoApp.pet.background">Background</Translate>
                  </Label>
                  <AvField id="pet-background" type="text" name="background" />
                </AvGroup>
                <AvGroup>
                  <Label for="pet-user">
                    <Translate contentKey="jHipsterDemoApp.pet.user">User</Translate>
                  </Label>
                  <AvInput id="pet-user" type="select" className="form-control" name="user.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/pet" replace color="info">
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
  petEntity: storeState.pet.entity,
  loading: storeState.pet.loading,
  updating: storeState.pet.updating,
  updateSuccess: storeState.pet.updateSuccess
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
)(PetUpdate);
