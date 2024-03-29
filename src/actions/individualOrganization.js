import { createActions } from 'reduxsauce';

export const { Types, Creators } = createActions(
  {
    getIndividualOrganizationDataRequest: ['params'],
    getIndividualOrganizationDataSuccess: ['payload'],
    getIndividualOrganizationDataFailure: null,

    getIndividualProjectDataRequest: ['params'],
    getIndividualProjectDataSuccess: ['payload'],
    getIndividualProjectDataFailure: null,

    getOrganizationDetailDataRequest: ['params'],
    getOrganizationDetailDataSuccess: ['payload'],
    getOrganizationDetailDataFailure: null,

    getProjectCountryDataRequest: ['params'],
    getProjectCountryDataSuccess: ['payload'],
    getProjectCountryDataFailure: null,

    getProjectStateDataRequest: ['params'],
    getProjectStateDataSuccess: ['payload'],
    getProjectStateDataFailure: null,

    postProjectDataRequest: ['payload'],
    postProjectDataSuccess: ['payload'],
    postProjectDataFailure: null,

    deleteProjectDataRequest: ['payload'],
    deleteProjectDataSuccess: ['payload'],
    deleteProjectDataFailure: null,

    postProjectAdditionalDataRequest: ['payload'],
    postProjectAdditionalDataSuccess: ['payload'],
    postProjectAdditionalDataFailure: null,

    getEmailList: ['payload'],
    filterEmailList: ['payload'],
    setActive: ['payload'],
    handleMapToggle: ['payload'],
    openProjectPopup: ['payload'],
    setAddProjectData: ['payload'],
    setAddBasicData: ['payload'],
    clearProjectData: ['payload'],
    setLoading: ['payload'],
    handleInput: ['payload'],
    getSelectedLocation: ['payload'],
    getSelectedTab: ['payload'],
    setGeometry: ['payload'],
    setAddUploadFile: ['payload'],
  },
  { prefix: 'IndividualOrganization/' },
);

export default Creators;
