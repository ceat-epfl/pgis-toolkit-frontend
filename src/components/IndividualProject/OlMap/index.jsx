/* eslint-disable consistent-return */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-nested-ternary */
/* eslint-disable react/jsx-no-useless-fragment */
import React, { useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fromLonLat } from 'ol/proj';
import VectorTile from 'ol/layer/VectorTile';
import MapContainer from '@Components/common/OpenLayersComponent/MapContainer';
import VectorTileLayer from '@Components/common/OpenLayersComponent/Layers/VectorTileLayer';
import FullScreenControl from '@Components/common/OpenLayersComponent/Control/FullScreenControl';
import CustomLayerSwitcher from '@Components/common/OpenLayersComponent/LayerSwitcher/CustomLayerSwitcher';
import ZoomControl from '@Components/common/OpenLayersComponent/Control/ZoomControl';
import EditableLayer from '@Components/common/OpenLayersComponent/CustomLayer/EditableLayer';
import useOLMap from '@Components/common/OpenLayersComponent/useOLMap';
import LayerSwitcherControl from '@Components/common/OpenLayersComponent/LayerSwitcher/index';
import Scalebar from '@Components/common/OpenLayersComponent/Scalebar';
import individualActions, { Creators } from '@Actions/individualProject';
import toastActions from '@Actions/toast';
import { switcherOptions } from '@src/constants/commonData';
import MeasureControl from '@Components/common/OpenLayersComponent/Control/MeasureControl';
import { selectedLayerStyleSelector } from '@Selectors/individualProject';
import { defaultStyles, getStyles } from '@Components/common/OpenLayersComponent/helpers/styleUtils';
import DownloadControl from '@Components/common/OpenLayersComponent/Control/DownloadControl';
import Popup from '@Components/common/OpenLayersComponent/Popup/index';
import MapPopup from '@Components/common/OpenLayersComponent/Popup/MapPopup';
import HoverEffects from '@Components/common/OpenLayersComponent/Effects/HoverEffects';

const { BASE_URL, TOKEN } = process.env;
const {
  setZoomToLayerId,
  getFeatureByIdRequest,
  cancelFeaturePolygonEdit,
  updateFeatureByIdRequest,
  setRefreshFeatureLayer,
} = Creators;

const OlMap = () => {
  const dispatch = useDispatch();
  const windowHeight = window.innerHeight;
  const mapToggle = useSelector((state) => state.individualProject.mapToggle);
  const geomData = useSelector((state) => state.individualProject.geomData);
  const selectedLayerId = useSelector((state) => state.individualProject.selectedLayerId);
  const projectHeaderHeight = useSelector((state) => state.projectHeader.projectHeaderHeight);
  const zoomToLayerId = useSelector((state) => state.individualProject.zoomToLayerId);
  const isLayerLoading = useSelector((state) => state.individualProject.isLayerLoading);
  const featureGeojson = useSelector((state) => state.individualProject.featureGeojson);
  const refreshFeatureLayer = useSelector((state) => state.individualProject.refreshFeatureLayer);
  const selectedFeatureIdForEdit = useSelector((state) => state.individualProject.selectedFeatureIdForEdit);
  const selectedLayerStyle = useSelector(selectedLayerStyleSelector);
  // const authToken = '0d133cd783c0bd4288ef0b8dca02de3889845612';
  const { mapRef, map, renderComplete } = useOLMap({
    center: fromLonLat([85.3, 27.7]),
    zoom: 2,
    maxZoom: 21,
  });
  // update map size on sidebar toggle
  useEffect(() => {
    if (!map) return;
    const timer = setTimeout(() => {
      map.updateSize();
    }, 500);

    return () => clearTimeout(timer);
  }, [map, mapToggle]);

  // reset zoom to layer for second press
  useEffect(() => {
    if (!map || !zoomToLayerId) return;
    const timeout = setTimeout(() => {
      dispatch(setZoomToLayerId(null));
    }, 1000);
    return () => clearTimeout(timeout);
  }, [dispatch, map, zoomToLayerId, map]);

  useEffect(() => {
    if (!map || !refreshFeatureLayer) return;
    const layers = map.getLayers();
    layers.forEach((layer) => {
      if (layer instanceof VectorTile) {
        const properties = layer.getProperties();
        if (properties.name === 'site') {
          layer.getSource().refresh();
          dispatch(setRefreshFeatureLayer(false));
        }
      }
    });
  }, [dispatch, map, refreshFeatureLayer]);

  const setFeatureLayerStyle = useCallback(
    (style, feature, resolution) => {
      const stylex = {
        ...style,
        showLabel: true,
        labelField: 'name',
        labelMaxResolution: 0.4,
      };
      const properties = feature.getProperties();
      const { id } = properties;

      if (selectedFeatureIdForEdit === id) {
        stylex.fillOpacity = 0;
        stylex.lineOpacity = 0;
      }
      return getStyles({
        style: stylex,
        feature,
        resolution,
      });
    },
    [selectedFeatureIdForEdit],
  );

  return (
    <div className="dbd-map_cntr is-grow">
      <div className="dbd-map_wrap">
        <MapContainer
          ref={mapRef}
          mapInstance={map}
          className="map"
          // style={{ height: '92vh' }}
          style={{ height: `${windowHeight - projectHeaderHeight}px` }}
        >
          <LayerSwitcherControl />
          <Scalebar />

          {geomData ? (
            geomData?.map((item, index) =>
              item?.type === 'group'
                ? item?.options.map((elem, i) => (
                    <VectorTileLayer
                      key={elem?.key}
                      url={`${BASE_URL}/maps/layer_vectortile/{z}/{x}/{y}/?layer=${elem.id}`}
                      authToken={TOKEN}
                      style={
                        selectedLayerId === elem?.id
                          ? selectedLayerStyle
                          : elem?.style?.fillColor
                          ? { ...elem?.style }
                          : { ...defaultStyles }
                      }
                      // setStyle={(feature, resolution) =>
                      //   setFeatureLayerStyle(
                      //     selectedLayerId === elem?.id
                      //       ? selectedLayerStyle
                      //       : elem?.style?.fillColor
                      //       ? { ...elem?.style }
                      //       : { ...defaultStyles },
                      //     feature,
                      //     resolution,
                      //   )
                      // }
                      zoomToLayer={elem?.id === zoomToLayerId}
                      bbox={elem?.bbox}
                      zIndex={item?.options.length - i}
                      selectedId={selectedFeatureIdForEdit}
                    />
                  ))
                : item?.type === 'layerWithSubLayer'
                ? item?.options.map((elem, i) => (
                    <VectorTileLayer
                      key={elem?.key}
                      url={`${BASE_URL}/maps/layer_vectortile/{z}/{x}/{y}/?layer=${item.id}&sub_layer=${elem.id}`}
                      authToken={TOKEN}
                      style={
                        selectedLayerId === elem?.id
                          ? selectedLayerStyle
                          : elem?.style?.fillColor
                          ? { ...elem?.style }
                          : { ...defaultStyles }
                      }
                      // setStyle={(feature, resolution) =>
                      //   setFeatureLayerStyle(
                      //     selectedLayerId === elem?.id
                      //       ? selectedLayerStyle
                      //       : elem?.style?.fillColor
                      //       ? { ...elem?.style }
                      //       : { ...defaultStyles },
                      //     feature,
                      //     resolution,
                      //   )
                      // }
                      zoomToLayer={elem?.id === zoomToLayerId}
                      bbox={elem?.bbox}
                      zIndex={item?.options.length - i}
                      selectedId={selectedFeatureIdForEdit}
                    />
                  ))
                : item.type !== 'group' && (
                    <VectorTileLayer
                      key={`${item.key}`}
                      url={`${BASE_URL}/maps/layer_vectortile/{z}/{x}/{y}/?layer=${item.id}`}
                      authToken={TOKEN}
                      style={
                        selectedLayerId === item?.id
                          ? selectedLayerStyle
                          : item?.style?.fillColor
                          ? { ...item?.style }
                          : { ...defaultStyles }
                      }
                      // setStyle={(feature, resolution) =>
                      //   setFeatureLayerStyle(
                      //     selectedLayerId === item?.id
                      //       ? selectedLayerStyle
                      //       : item?.style?.fillColor
                      //       ? { ...item?.style }
                      //       : { ...defaultStyles },
                      //     feature,
                      //     resolution,
                      //   )
                      // }
                      zoomToLayer={item?.id === zoomToLayerId}
                      bbox={item?.bbox}
                      zIndex={geomData.length - index}
                      selectedId={selectedFeatureIdForEdit}
                    />
                  ),
            )
          ) : (
            <></>
          )}
          {/* <Popup map={map} /> */}
          <MapPopup
            map={map}
            buttonText="Edit Feature"
            onButtonClick={(properties) => {
              dispatch(getFeatureByIdRequest(properties));
            }}
            closePopup={!!featureGeojson}
          />
          <EditableLayer
            geojson={featureGeojson}
            zIndex={100}
            onSave={(modifiedGeojson) => {
              dispatch(updateFeatureByIdRequest({ modifiedGeojson }));
            }}
            onCancel={() => {
              dispatch(cancelFeaturePolygonEdit());
            }}
            onError={(message) => {
              dispatch(toastActions.error({ message }));
            }}
          />
        </MapContainer>
        <a
          className={
            mapToggle
              ? 'map-aside_toggle is-square is-xs is-border is-radius-4 is-active'
              : 'map-aside_toggle is-square is-xs is-border is-radius-4'
          }
          onClick={() => dispatch(individualActions.handleMapToggle(!mapToggle))}
        >
          <i className="material-icons left-icon">chevron_left</i>
          <div className="right-icon">
            <div className="text-change is-flex is-start is-align-center ">
              <i className="material-icons ">chevron_right</i>
              <span>Showlist</span>
            </div>
          </div>
        </a>
        <div className="map-buttons">
          {isLayerLoading && (
            <div className="map-loader-container">
              <div className="map-loader-wrapper">
                <div className="map-loader" />
              </div>
            </div>
          )}
        </div>
        <div className="map-setting is-bottom is-right">
          <div className="setting-list" title="Tools">
            <a
              className="is-settings"
              style={{ cursor: 'pointer' }}
              onClick={() => dispatch(individualActions.handleMapToggle(!mapToggle))}
            >
              <i className="material-icons">crop_free</i>
            </a>
            <MeasureControl map={map} buttonText={<i className="material-icons">straighten</i>} measureBoth />
            <DownloadControl map={map} />
          </div>
          <CustomLayerSwitcher map={map} options={switcherOptions} />
          <ZoomControl map={map} />
        </div>
      </div>
    </div>
  );
};

export default OlMap;
