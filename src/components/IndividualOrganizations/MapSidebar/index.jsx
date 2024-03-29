/* eslint-disable react/no-array-index-key */
/* eslint-disable react/jsx-no-useless-fragment */
import React from 'react';
import { useHistory, useParams, Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { Creators } from '@Actions/individualOrganization';
import { Creators as PopupCreator } from '@Actions/popup';
import { mapProjectOptions } from '@src/constants/commonData';
import Sidebar from '@Components/common/Sidebar/index';
import Dropdown from '../Dropdown/index';
import CardLoader from '../CardLoader/index';

const { setActive, openProjectPopup, getIndividualProjectDataRequest, handleInput, getProjectCountryDataRequest } =
  Creators;
const { openPopup, setPopupType } = PopupCreator;

const MapSidebar = ({ active, isLoading, setPopup, permission }) => {
  const { id } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const individualOrganizationData = useSelector((state) => state.individualOrganizations.individualOrganizationData);
  const handleSearch = () => {};

  const handleClick = () => {
    dispatch(setActive('filter'));
  };
  const handleRoute = (value) => {
    history.push(`/organizations/${id}/projects/${value}`);
  };
  const onButtonClick = (e) => {
    e.stopPropagation();
    dispatch(openProjectPopup(true));
  };
  const handleEdit = (name, projectId) => {
    dispatch(getIndividualProjectDataRequest(projectId));
    dispatch(getProjectCountryDataRequest());
    dispatch(openPopup(true));
    dispatch(setPopupType('Edit'));
  };
  const handleDeleteClick = (projectId, projectName) => {
    dispatch(handleInput({ id: projectId, name: projectName }));
    dispatch(openPopup(true));
    dispatch(setPopupType('Delete'));
  };
  return (
    <Sidebar
      handleClick={handleClick}
      handleSearch={handleSearch}
      buttonTitle="Project"
      onButtonClick={onButtonClick}
      permission={permission}
    >
      <div className="dvd-sidebar-body is-overflow" style={{ height: '60vh' }}>
        <div className="project-list ">
          {isLoading ? (
            <CardLoader />
          ) : (
            individualOrganizationData?.map((item, index) => (
              <div
                className="project-list_item project-list_item-active is-flex is-between is-align-start  pd-15"
                key={`${index}${item.name}`}
              >
                <div
                  className="flex-content is-grow mr-15"
                  onClick={permission.includes('view_project') ? () => handleRoute(item.id) : () => {}}
                  style={{ cursor: 'pointer' }}
                >
                  <h4>{item.name}</h4>
                  {item?.country.length || item?.state.length ? (
                    <p className="mt-05">{`${item?.state}, ${item?.country}`}</p>
                  ) : (
                    <></>
                  )}
                </div>
                <Dropdown
                  setPopup={setPopup}
                  handleEdit={() => {
                    handleEdit(item.name, item.id);
                  }}
                  handleDeleteClick={() => {
                    handleDeleteClick(item.id, item.name);
                  }}
                  data={item}
                  permission={permission}
                />
              </div>
            ))
          )}
        </div>
      </div>
    </Sidebar>
  );
};

MapSidebar.propTypes = {
  active: PropTypes.string,
  isLoading: PropTypes.bool,
  setPopup: PropTypes.func.isRequired,
  permission: PropTypes.array.isRequired,
};

MapSidebar.defaultProps = {
  active: '',
  isLoading: false,
};

export default MapSidebar;
