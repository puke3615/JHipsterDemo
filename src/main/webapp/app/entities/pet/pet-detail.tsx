import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './pet.reducer';
import { IPet } from 'app/shared/model/pet.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPetDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class PetDetail extends React.Component<IPetDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { petEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            <Translate contentKey="jHipsterDemoApp.pet.detail.title">Pet</Translate> [<b>{petEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="created">
                <Translate contentKey="jHipsterDemoApp.pet.created">Created</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={petEntity.created} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updated">
                <Translate contentKey="jHipsterDemoApp.pet.updated">Updated</Translate>
              </span>
            </dt>
            <dd>
              <TextFormat value={petEntity.updated} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="deleted">
                <Translate contentKey="jHipsterDemoApp.pet.deleted">Deleted</Translate>
              </span>
            </dt>
            <dd>{petEntity.deleted ? 'true' : 'false'}</dd>
            <dt>
              <span id="petType">
                <Translate contentKey="jHipsterDemoApp.pet.petType">Pet Type</Translate>
              </span>
            </dt>
            <dd>{petEntity.petType}</dd>
            <dt>
              <span id="nick">
                <Translate contentKey="jHipsterDemoApp.pet.nick">Nick</Translate>
              </span>
            </dt>
            <dd>{petEntity.nick}</dd>
            <dt>
              <span id="birthday">
                <Translate contentKey="jHipsterDemoApp.pet.birthday">Birthday</Translate>
              </span>
            </dt>
            <dd>{petEntity.birthday}</dd>
            <dt>
              <span id="age">
                <Translate contentKey="jHipsterDemoApp.pet.age">Age</Translate>
              </span>
            </dt>
            <dd>{petEntity.age}</dd>
            <dt>
              <span id="avatar">
                <Translate contentKey="jHipsterDemoApp.pet.avatar">Avatar</Translate>
              </span>
            </dt>
            <dd>{petEntity.avatar}</dd>
            <dt>
              <span id="background">
                <Translate contentKey="jHipsterDemoApp.pet.background">Background</Translate>
              </span>
            </dt>
            <dd>{petEntity.background}</dd>
            <dt>
              <Translate contentKey="jHipsterDemoApp.pet.user">User</Translate>
            </dt>
            <dd>{petEntity.user ? petEntity.user.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/pet" replace color="info">
            <FontAwesomeIcon icon="arrow-left" />{' '}
            <span className="d-none d-md-inline">
              <Translate contentKey="entity.action.back">Back</Translate>
            </span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/pet/${petEntity.id}/edit`} replace color="primary">
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

const mapStateToProps = ({ pet }: IRootState) => ({
  petEntity: pet.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PetDetail);
