import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { Translate, ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './pet.reducer';
import { IPet } from 'app/shared/model/pet.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPetProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Pet extends React.Component<IPetProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { petList, match } = this.props;
    return (
      <div>
        <h2 id="pet-heading">
          <Translate contentKey="jHipsterDemoApp.pet.home.title">Pets</Translate>
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp;
            <Translate contentKey="jHipsterDemoApp.pet.home.createLabel">Create new Pet</Translate>
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
                  <Translate contentKey="jHipsterDemoApp.pet.created">Created</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.pet.updated">Updated</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.pet.deleted">Deleted</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.pet.petType">Pet Type</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.pet.nick">Nick</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.pet.birthday">Birthday</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.pet.age">Age</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.pet.avatar">Avatar</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.pet.background">Background</Translate>
                </th>
                <th>
                  <Translate contentKey="jHipsterDemoApp.pet.user">User</Translate>
                </th>
                <th />
              </tr>
            </thead>
            <tbody>
              {petList.map((pet, i) => (
                <tr key={`entity-${i}`}>
                  <td>
                    <Button tag={Link} to={`${match.url}/${pet.id}`} color="link" size="sm">
                      {pet.id}
                    </Button>
                  </td>
                  <td>
                    <TextFormat type="date" value={pet.created} format={APP_DATE_FORMAT} />
                  </td>
                  <td>
                    <TextFormat type="date" value={pet.updated} format={APP_DATE_FORMAT} />
                  </td>
                  <td>{pet.deleted ? 'true' : 'false'}</td>
                  <td>
                    <Translate contentKey={`jHipsterDemoApp.PetType.${pet.petType}`} />
                  </td>
                  <td>{pet.nick}</td>
                  <td>{pet.birthday}</td>
                  <td>{pet.age}</td>
                  <td>{pet.avatar}</td>
                  <td>{pet.background}</td>
                  <td>{pet.user ? pet.user.id : ''}</td>
                  <td className="text-right">
                    <div className="btn-group flex-btn-group-container">
                      <Button tag={Link} to={`${match.url}/${pet.id}`} color="info" size="sm">
                        <FontAwesomeIcon icon="eye" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.view">View</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pet.id}/edit`} color="primary" size="sm">
                        <FontAwesomeIcon icon="pencil-alt" />{' '}
                        <span className="d-none d-md-inline">
                          <Translate contentKey="entity.action.edit">Edit</Translate>
                        </span>
                      </Button>
                      <Button tag={Link} to={`${match.url}/${pet.id}/delete`} color="danger" size="sm">
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

const mapStateToProps = ({ pet }: IRootState) => ({
  petList: pet.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Pet);
