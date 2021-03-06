import { call, put, takeLatest } from 'redux-saga/effects';
import { push } from 'connected-react-router';
import toastActions from '@Actions/toast';
import withLoader from '@Utils/sagaUtils';
import { getIndividualOrganizationData, getOrganizationDetailData } from '@Services/individualOrganization';
import individualActions, { Types } from '@Actions/individualOrganization';

export function* getIndividualOrganizationDataRequest(action) {
  const { type, params } = action;
  try {
    const response = yield call(getIndividualOrganizationData, params);
    yield put(individualActions.getIndividualOrganizationDataSuccess({ data: response.data }));
  } catch (error) {
    // yield put(redirectActions.getStatusCode(error?.response?.status));
    // if (error?.response?.status >= 400) {
    //   yield put(push('/redirect'));
    // }
    yield put(individualActions.getIndividualOrganizationDataFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

export function* getOrganizationDetailDataRequest(action) {
  const { type, params } = action;
  try {
    const response = yield call(getOrganizationDetailData, params);
    yield put(individualActions.getOrganizationDetailDataSuccess({ data: response.data }));
  } catch (error) {
    // yield put(redirectActions.getStatusCode(error?.response?.status));
    // if (error?.response?.status >= 400) {
    //   yield put(push('/redirect'));
    // }
    yield put(individualActions.getOrganizationDetailDataFailure());
    yield put(toastActions.error({ message: error?.response?.data?.message }));
  }
}

function* individualOrganizatonWatcher() {
  yield takeLatest(Types.GET_INDIVIDUAL_ORGANIZATION_DATA_REQUEST, withLoader(getIndividualOrganizationDataRequest));
  yield takeLatest(Types.GET_ORGANIZATION_DETAIL_DATA_REQUEST, withLoader(getOrganizationDetailDataRequest));
}

export default individualOrganizatonWatcher;
