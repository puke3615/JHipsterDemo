import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, UncontrolledTooltip } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { Translate, translate, ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IDepartment } from 'app/shared/model/department.model';
import { getEntities as getDepartments } from 'app/entities/department/department.reducer';
import { getEntities as getEmployees } from 'app/entities/employee/employee.reducer';
import { getEntity, updateEntity, createEntity, reset } from './employee.reducer';
import { IEmployee } from 'app/shared/model/employee.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IEmployeeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IEmployeeUpdateState {
  isNew: boolean;
  departmentId: string;
  managerId: string;
}

export class EmployeeUpdate extends React.Component<IEmployeeUpdateProps, IEmployeeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      departmentId: '0',
      managerId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (!this.state.isNew) {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getDepartments();
    this.props.getEmployees();
  }

  saveEntity = (event, errors, values) => {
    values.hireDate = convertDateTimeToServer(values.hireDate);

    if (errors.length === 0) {
      const { employeeEntity } = this.props;
      const entity = {
        ...employeeEntity,
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
    this.props.history.push('/entity/employee');
  };

  render() {
    const { employeeEntity, departments, employees, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="jHipsterDemoApp.employee.home.createOrEditLabel">
              <Translate contentKey="jHipsterDemoApp.employee.home.createOrEditLabel">Create or edit a Employee</Translate>
            </h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : employeeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="employee-id">
                      <Translate contentKey="global.field.id">ID</Translate>
                    </Label>
                    <AvInput id="employee-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="firstNameLabel" for="employee-firstName">
                    <Translate contentKey="jHipsterDemoApp.employee.firstName">First Name</Translate>
                  </Label>
                  <AvField id="employee-firstName" type="text" name="firstName" />
                  <UncontrolledTooltip target="firstNameLabel">
                    <Translate contentKey="jHipsterDemoApp.employee.help.firstName" />
                  </UncontrolledTooltip>
                </AvGroup>
                <AvGroup>
                  <Label id="lastNameLabel" for="employee-lastName">
                    <Translate contentKey="jHipsterDemoApp.employee.lastName">Last Name</Translate>
                  </Label>
                  <AvField id="employee-lastName" type="text" name="lastName" />
                </AvGroup>
                <AvGroup>
                  <Label id="emailLabel" for="employee-email">
                    <Translate contentKey="jHipsterDemoApp.employee.email">Email</Translate>
                  </Label>
                  <AvField id="employee-email" type="text" name="email" />
                </AvGroup>
                <AvGroup>
                  <Label id="phoneNumberLabel" for="employee-phoneNumber">
                    <Translate contentKey="jHipsterDemoApp.employee.phoneNumber">Phone Number</Translate>
                  </Label>
                  <AvField id="employee-phoneNumber" type="text" name="phoneNumber" />
                </AvGroup>
                <AvGroup>
                  <Label id="hireDateLabel" for="employee-hireDate">
                    <Translate contentKey="jHipsterDemoApp.employee.hireDate">Hire Date</Translate>
                  </Label>
                  <AvInput
                    id="employee-hireDate"
                    type="datetime-local"
                    className="form-control"
                    name="hireDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.employeeEntity.hireDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="salaryLabel" for="employee-salary">
                    <Translate contentKey="jHipsterDemoApp.employee.salary">Salary</Translate>
                  </Label>
                  <AvField id="employee-salary" type="string" className="form-control" name="salary" />
                </AvGroup>
                <AvGroup>
                  <Label id="commissionPctLabel" for="employee-commissionPct">
                    <Translate contentKey="jHipsterDemoApp.employee.commissionPct">Commission Pct</Translate>
                  </Label>
                  <AvField id="employee-commissionPct" type="string" className="form-control" name="commissionPct" />
                </AvGroup>
                <AvGroup>
                  <Label for="employee-department">
                    <Translate contentKey="jHipsterDemoApp.employee.department">Department</Translate>
                  </Label>
                  <AvInput id="employee-department" type="select" className="form-control" name="department.id">
                    <option value="" key="0" />
                    {departments
                      ? departments.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="employee-manager">
                    <Translate contentKey="jHipsterDemoApp.employee.manager">Manager</Translate>
                  </Label>
                  <AvInput id="employee-manager" type="select" className="form-control" name="manager.id">
                    <option value="" key="0" />
                    {employees
                      ? employees.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/employee" replace color="info">
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
  departments: storeState.department.entities,
  employees: storeState.employee.entities,
  employeeEntity: storeState.employee.entity,
  loading: storeState.employee.loading,
  updating: storeState.employee.updating,
  updateSuccess: storeState.employee.updateSuccess
});

const mapDispatchToProps = {
  getDepartments,
  getEmployees,
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
)(EmployeeUpdate);
